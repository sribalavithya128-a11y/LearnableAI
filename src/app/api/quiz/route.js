import { NextResponse } from "next/server";
import { callLLM, cleanJsonResponse, isDemoMode } from "../../../lib/llm";
import { DEMO_QUIZZES } from "../../../lib/demoData";
import { purifyToPureTamil } from "../../../lib/tamilTranslator";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request) {
  try {
    const data = await request.json().catch(() => ({}));
    const text = (data.text || "").trim();
    const language = (data.language || "english").trim().toLowerCase();
    let count = parseInt(data.count, 10) || 5;

    if (![3, 5, 8, 10].includes(count)) {
      count = 5;
    }

    if (!text) {
      return NextResponse.json(
        { error: "Please provide educational text to generate a quiz." },
        { status: 400 }
      );
    }
    if (text.length < 20) {
      return NextResponse.json(
        { error: "Input text is too short. Please provide at least 20 characters." },
        { status: 400 }
      );
    }

    const targetLangStr = language === "tamil" ? "Tamil (தமிழ்)" : "English";

    const systemPrompt = `You are LearnAble AI's Assessment Generator. You create accessible multiple-choice quizzes designed to test comprehension, recall, and critical understanding.
Requirements:
1. Generate exactly ${count} multiple-choice questions based ONLY on the provided text.
2. Each question MUST have EXACTLY 4 plausible options.
3. Only ONE option must be correct.
4. Include a concise, helpful explanation for why the answer is correct.
5. All questions, options, and explanations must be written in ${targetLangStr}${language === "tamil" ? " in 100% PURE TAMIL with ZERO English words" : ""}.
6. Return ONLY a valid JSON object matching the requested schema. No markdown outside of JSON.`;

    const prompt = `Generate a quiz with exactly ${count} questions from this source text in ${targetLangStr}.

--- SOURCE TEXT ---
${text}
--- END SOURCE TEXT ---

Return strictly a JSON object with this exact schema:
{
  "questions": [
    {
      "question": "Clear question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_index": 0,
      "explanation": "Clear explanation of the answer."
    }
  ]
}`;

    const rawResponse = await callLLM({
      prompt,
      systemPrompt,
      jsonMode: true,
      taskType: "quiz",
      contextHint: { count, language, text }
    });

    let questionsList = [];
    try {
      const parsed = cleanJsonResponse(rawResponse);
      questionsList = parsed.questions || [];
    } catch (parseErr) {
      // Fallback to sample items if LLM JSON was broken
      const allQ = DEMO_QUIZZES[language] || DEMO_QUIZZES.english;
      questionsList = allQ.slice(0, count);
    }

    // Validate structure
    const validated = [];
    for (const q of questionsList) {
      if (!q || typeof q !== "object") continue;
      const qText = String(q.question || "").trim();
      const opts = Array.isArray(q.options) ? q.options : [];
      let cIdx = parseInt(q.correct_index, 10);
      if (isNaN(cIdx) || cIdx < 0 || cIdx > 3) cIdx = 0;
      const exp = String(q.explanation || "").trim();

      if (qText && opts.length === 4) {
        validated.push({
          question: qText,
          options: opts.map((o) => String(o).trim()),
          correct_index: cIdx,
          explanation: exp || "Correct answer according to the source material."
        });
      }
    }

    const candidateQuestions = (validated.length > 0
      ? validated
      : (DEMO_QUIZZES[language] || DEMO_QUIZZES.english)
    ).slice(0, count);

    const finalQuestions = (language === "tamil")
      ? candidateQuestions.map((q) => ({
          question: purifyToPureTamil(q.question),
          options: (q.options || []).map((o) => purifyToPureTamil(o)),
          correct_index: q.correct_index,
          explanation: purifyToPureTamil(q.explanation)
        }))
      : candidateQuestions;

    return NextResponse.json({
      success: true,
      questions: finalQuestions,
      count: finalQuestions.length,
      language,
      is_demo: language === "tamil" ? false : isDemoMode()
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Quiz generation failed: ${err.message}` },
      { status: 500 }
    );
  }
}
