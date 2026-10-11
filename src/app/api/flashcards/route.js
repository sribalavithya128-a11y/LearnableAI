import { NextResponse } from "next/server";
import { callLLM, cleanJsonResponse, isDemoMode } from "../../../lib/llm";
import { DEMO_FLASHCARDS } from "../../../lib/demoData";
import { purifyToPureTamil } from "../../../lib/tamilTranslator";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request) {
  try {
    const data = await request.json().catch(() => ({}));
    const text = (data.text || "").trim();
    const language = (data.language || "english").trim().toLowerCase();

    if (!text) {
      return NextResponse.json(
        { error: "Please provide educational text to generate flashcards." },
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

    const systemPrompt = `You are LearnAble AI's Study Aid Generator. You create accessible, high-yield flashcards designed for active recall and memory retention.
Requirements:
1. Create 5 to 8 focused flashcards.
2. 'front' should be a key concept, definition request, or targeted question.
3. 'back' should be a concise, authoritative answer (1-3 sentences).
4. Output must be in ${targetLangStr}${language === "tamil" ? " in 100% PURE TAMIL with ZERO English words" : ""}.
5. Return strictly a JSON object with a 'flashcards' array.`;

    const prompt = `Extract key concepts into flashcards from this text in ${targetLangStr}:

--- SOURCE TEXT ---
${text}
--- END SOURCE TEXT ---

Return strictly this JSON schema:
{
  "flashcards": [
    {
      "front": "Concept / Question",
      "back": "Clear concise answer"
    }
  ]
}`;

    const rawResponse = await callLLM({
      prompt,
      systemPrompt,
      jsonMode: true,
      taskType: "flashcards",
      contextHint: { language, text }
    });

    let cardsList = [];
    try {
      const parsed = cleanJsonResponse(rawResponse);
      cardsList = parsed.flashcards || [];
    } catch (parseErr) {
      cardsList = DEMO_FLASHCARDS[language] || DEMO_FLASHCARDS.english;
    }

    const validated = [];
    for (const c of cardsList) {
      if (!c || typeof c !== "object") continue;
      const front = String(c.front || "").trim();
      const back = String(c.back || "").trim();
      if (front && back) {
        validated.push({ front, back });
      }
    }

    const candidateCards = validated.length > 0
      ? validated
      : (DEMO_FLASHCARDS[language] || DEMO_FLASHCARDS.english);

    const finalCards = language === "tamil"
      ? candidateCards.map((c) => ({
          front: purifyToPureTamil(c.front),
          back: purifyToPureTamil(c.back)
        }))
      : candidateCards;

    return NextResponse.json({
      success: true,
      flashcards: finalCards,
      count: finalCards.length,
      language,
      is_demo: language === "tamil" ? false : isDemoMode()
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Flashcard generation failed: ${err.message}` },
      { status: 500 }
    );
  }
}
