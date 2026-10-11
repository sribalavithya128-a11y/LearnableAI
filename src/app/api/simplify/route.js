import { NextResponse } from "next/server";
import { callLLM, isDemoMode } from "../../../lib/llm";
import { buildExplainableAlignment } from "../../../lib/explainable";
import { assessTranslationCertainty } from "../../../lib/uncertainty";
import { purifyToPureTamil } from "../../../lib/tamilTranslator";
import { generateTopicFaqs } from "../../../lib/topicFaqs";
import { generateTopicDiagram } from "../../../lib/topicDiagram";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request) {
  try {
    const data = await request.json().catch(() => ({}));
    const text = (data.text || "").trim();
    const level = (data.level || "beginner").trim().toLowerCase();
    const language = (data.language || "english").trim().toLowerCase();

    // Validations
    if (!text) {
      return NextResponse.json(
        { error: "Please provide educational text to simplify." },
        { status: 400 }
      );
    }
    if (text.length < 20) {
      return NextResponse.json(
        { error: "Input text is too short. Please provide at least 20 characters." },
        { status: 400 }
      );
    }

    if (!["beginner", "intermediate", "advanced"].includes(level)) {
      return NextResponse.json(
        { error: "Invalid learning level. Choose beginner, intermediate, or advanced." },
        { status: 400 }
      );
    }

    if (!["english", "tamil"].includes(language)) {
      return NextResponse.json(
        { error: "Invalid language. Supported languages are 'english' and 'tamil'." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are LearnAble AI, a specialized assistive education engine designed for inclusive learning and Universal Design for Learning (UDL). Your mission is to simplify educational content to the user's selected reading level while STRICTLY AND FAITHFULLY PRESERVING definitions, equations, relationships, and essential meaning.

CORE PRESERVATION INVARIANTS (NON-NEGOTIABLE):
1. PRESERVE ALL DEFINITIONS:
   - Identify every formal definition, key term, and technical concept from the source text.
   - Retain these definitions with complete factual fidelity. In Beginner and Intermediate tiers, explain them using accessible plain language without altering what the term actually means.
   - Include an explicit section: "### 📖 Preserved Definitions & Key Terminology" (or in Tamil: "### 📖 பாதுகாக்கப்பட்ட வரையறைகள் & கலைச்சொற்கள்").

2. PRESERVE ALL EQUATIONS & FORMULAS:
   - NEVER omit, distort, or simplify away mathematical, physical, or chemical equations, reactions, or expressions (e.g., "2H2O -> 4H+ + 4e- + O2", "C6H12O6", "E = mc^2", "F = ma", balanced stoichiometry).
   - Display all equations verbatim in clear markdown or code blocks.
   - Provide a step-by-step breakdown of what each symbol, variable, or reactant/product represents so learners at this reading level understand the formula.
   - Include an explicit section: "### ➗ Preserved Equations & Formulas" (or in Tamil: "### ➗ பாதுகாக்கப்பட்ட அறிவியல் சமன்பாடுகள் & சூத்திரங்கள்").

3. PRESERVE ALL RELATIONSHIPS:
   - Map out all cause-and-effect dynamics, input-output cycles, dependencies, proportionalities (direct/inverse), and sequential progressions.
   - Make the relational dynamics crystal clear (e.g., "Input/Cause ➔ Mechanism ➔ Output/Effect").
   - Include an explicit section: "### 🔄 Preserved Relationships & Cause-and-Effect" (or in Tamil: "### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்").

4. PRESERVE ESSENTIAL MEANING & ZERO HALLUCINATION:
   - Retain 100% of the foundational facts, numbers, dates, experimental findings, and core conclusions.
   - Simplification means adjusting sentence syntax, readability pacing, and vocabulary accessibility—NOT deleting essential educational substance.
   - Do not invent facts or claims not supported by the source text.

5. COMPLETE PURE TAMIL (தூய தமிழ்) - MANDATORY:
   - When language is Tamil, the ENTIRE output MUST BE 100% IN TAMIL with ZERO English words left in the translation.
   - Do NOT include English words in parentheses (e.g., do NOT write "(Photosynthesis)", write only "ஒளிச்சேர்க்கை").
   - All section headings, definitions, analogies, takeaways, and explanations MUST be in pure Tamil.
   - Only mathematical or chemical equations (e.g. \`F = ma\` or \`2H2O -> 4H+ + 4e- + O2\`) may be preserved inside backticks.`;

    const levelInstructionsEn = {
      beginner: `Target Audience: Beginners, younger learners, or neurodivergent students requiring high clarity.
- Reading Pacing: Short, clear sentences (10-15 words max).
- Vocabulary: Simple, everyday words, with difficult terms defined immediately in context.
- Structure to produce:
  1. ### 💡 Essential Meaning & Core Idea (Simple explanation of what this lesson is about, retaining the core message)
  2. ### 📖 Preserved Definitions & Key Terminology (Every defined concept explained simply without losing its meaning)
  3. ### ➗ Preserved Equations & Formulas (Exact formulas/reactions preserved verbatim with simple explanations of each symbol)
  4. ### 🔄 Preserved Relationships & Step-by-Step Flow (Input ➔ Mechanism ➔ Output cause-and-effect)
  5. ### 🧩 Everyday Analogy (Intuitive, relatable real-world comparison)
  6. ### 🎯 Key Takeaway (Memorable concluding summary)`,

      intermediate: `Target Audience: General students, high school or college learners seeking balanced comprehension.
- Reading Pacing: Balanced, fluent sentences with clear transitions.
- Vocabulary: Professional clarity, eliminating dense academic jargon while keeping necessary domain terms.
- Structure to produce:
  1. ### 📝 Conceptual Overview & Essential Meaning
  2. ### 📖 Preserved Definitions & Technical Glossary
  3. ### ➗ Preserved Equations, Reactions & Formulas (Complete equations with full variable definitions)
  4. ### 🔄 Preserved Cause-and-Effect Dynamics & Relationships
  5. ### 🔍 Structural Mechanism Breakdown
  6. ### 💡 Practical Significance & Summary`,

      advanced: `Target Audience: Advanced learners and educators needing a crisp, structured conceptual synthesis.
- Reading Pacing: Concise, high-density analytical sentences.
- Vocabulary: Precise scientific, technical, and domain-specific terminology preserved in full.
- Structure to produce:
  1. ### ⚡ Executive Overview & Theoretical Foundations
  2. ### 📖 Preserved Formal Definitions & Taxonomies
  3. ### ➗ Complete Quantitative Equations, Reactions & Formulas
  4. ### 🔄 Relational Framework, Proportionalities & Dependencies
  5. ### 📊 Step-by-Step Mechanistic Progression
  6. ### 🎯 Methodological Implications & Analytical Conclusions`
    };

    const levelInstructionsTa = {
      beginner: `இலக்கு வாசகர்கள்: ஆரம்பநிலை மற்றும் பள்ளி மாணவர்கள்.
- வாசிப்பு வேகம்: எளிய, குறுகிய வாக்கியங்கள்.
- சொல்லகராதி: தூய எளிய தமிழ் கலைச்சொற்கள், ஆங்கில சொற்கள் ஏதுமின்றி.
- உருவாக்கும் கட்டமைப்பு:
  1. ### 💡 அடிப்படைக் கல்விப் பொருள்
  2. ### 📖 பாதுகாக்கப்பட்ட வரையறைகள் & கலைச்சொற்கள்
  3. ### ➗ பாதுகாக்கப்பட்ட அறிவியல் சமன்பாடுகள் & சூத்திரங்கள்
  4. ### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்
  5. ### 🧩 அன்றாட வாழ்க்கையின் எளிய உவமை
  6. ### 🎯 பாடத்தின் முக்கிய கற்றல் முடிவு & சுருக்கம்`,

      intermediate: `இலக்கு வாசகர்கள்: இடைநிலை மற்றும் கல்லூரி மாணவர்கள்.
- வாசிப்பு வேகம்: சமநிலையான விளக்க வாக்கியங்கள்.
- சொல்லகராதி: தெளிவான தமிழ் கலைச்சொற்கள், ஆங்கில சொற்கள் ஏதுமின்றி.
- உருவாக்கும் கட்டமைப்பு:
  1. ### 📝 கண்ணோட்டம் & அடிப்படைக் கல்விப் பொருள்
  2. ### 📖 பாதுகாக்கப்பட்ட வரையறைகள் & கலைச்சொற்கள்
  3. ### ➗ பாதுகாக்கப்பட்ட அறிவியல் சமன்பாடுகள் & சூத்திரங்கள்
  4. ### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்
  5. ### 🔍 செயல்முறை படிநிலைகள்
  6. ### 💡 நடைமுறை முக்கியத்துவம் & சுருக்கம்`,

      advanced: `இலக்கு வாசகர்கள்: உயர்கல்வி மற்றும் ஆராய்ச்சி மாணவர்கள்.
- வாசிப்பு வேகம்: ஆழமான அறிவியல் மற்றும் கோட்பாட்டு வாக்கியங்கள்.
- சொல்லகராதி: முழுமையான தூய தமிழ் அறிவியல் சொற்கள், ஆங்கில சொற்கள் ஏதுமின்றி.
- உருவாக்கும் கட்டமைப்பு:
  1. ### ⚡ அறிவியல் கண்ணோட்டம் & கோட்பாட்டு அடிப்படை
  2. ### 📖 பாதுகாக்கப்பட்ட வரையறைகள் & கலைச்சொற்கள்
  3. ### ➗ பாதுகாக்கப்பட்ட அறிவியல் சமன்பாடுகள் & சூத்திரங்கள்
  4. ### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்
  5. ### 📊 படிநிலைகளின் அறிவியல் பகுப்பாய்வு
  6. ### 🎯 பாடத்தின் முக்கிய கற்றல் முடிவு & சுருக்கம்`
    };

    const targetLangStr = language === "tamil" ? "Tamil (தமிழ்)" : "English";
    const selectedLevelInstructions = language === "tamil" ? levelInstructionsTa[level] : levelInstructionsEn[level];

    const prompt = `Transform the following educational content for a **${level.toUpperCase()}** learner while STRICTLY PRESERVING all definitions, equations, relationships, and essential meaning.
Target Output Language: **${targetLangStr}**.
${language === "tamil" ? "IMPORTANT: Ensure 100% PURE TAMIL with ZERO ENGLISH WORDS in prose, headings, or notes." : ""}

Pedagogical Guidelines for this level:
${selectedLevelInstructions}

--- SOURCE TEXT ---
${text}
--- END SOURCE TEXT ---

Produce the complete simplified educational output in ${targetLangStr} now:`;

    const rawSimplifiedText = await callLLM({
      prompt,
      systemPrompt,
      taskType: "simplify",
      contextHint: { level, language, text }
    });

    const simplifiedText = language === "tamil" ? purifyToPureTamil(rawSimplifiedText) : rawSimplifiedText;

    // Generate Explainable AI (XAI) bounding boxes, confidence scores, and original-vs-simplified alignment
    const explainable = buildExplainableAlignment({
      originalText: text,
      simplifiedText,
      level,
      language,
    });

    const translationAssessment = assessTranslationCertainty(text, simplifiedText, language);

    const topicFaqsData = await generateTopicFaqs({
      originalText: text,
      simplifiedText,
      language,
      level,
    });

    const diagramData = await generateTopicDiagram({
      originalText: text,
      simplifiedText,
      language,
      topicHint: topicFaqsData.topic_title,
    });

    return NextResponse.json({
      success: true,
      original_text: text,
      simplified_text: simplifiedText,
      topic_title: topicFaqsData.topic_title,
      faqs: topicFaqsData.faqs,
      diagram_data: diagramData,
      level,
      language,
      is_demo: language === "tamil" ? false : isDemoMode(),
      explainable_alignment: explainable.explainable_alignment,
      overall_confidence: explainable.overall_confidence,
      factual_alignment_score: explainable.factual_alignment_score,
      equation_fidelity_score: explainable.equation_fidelity_score,
      grounded_anchors_count: explainable.grounded_anchors_count,
      translation_assessment: translationAssessment,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to transform text." },
      { status: 500 }
    );
  }
}
