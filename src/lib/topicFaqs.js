/**
 * LearnAble AI - Dynamic Topic-Specific FAQ Generator
 * 
 * Generates high-yield, conceptually grounded FAQs directly from the user's
 * given educational topic and simplified output.
 * 
 * Guarantees:
 * 1. FAQs are 100% intimately related to the user's given topic (not static samples).
 * 2. When language is Tamil, all categories, questions, and answers are 100% in Pure Tamil
 *    with ZERO English words in prose (outside of formula code ticks).
 * 3. Incorporates preserved definitions, equations, cause-and-effect dynamics, and takeaways.
 */

import { purifyToPureTamil, fetchTranslateChunk } from "./tamilTranslator.js";

export async function generateTopicFaqs({ originalText = "", simplifiedText = "", language = "english" }) {
  const isTamil = language === "tamil";
  const source = (simplifiedText && simplifiedText.length > 30) ? simplifiedText : originalText;

  // 1. Extract Topic Title
  let topicTitle = "";
  const titleMatch = source.match(/###\s*[🌟📘🔬]?\s*([^:\n]+)[:\s-]+([^\n]+)/);
  if (titleMatch && titleMatch[2]) {
    topicTitle = titleMatch[2].trim().replace(/^[*_#\s]+|[*_#\s]+$/g, "");
  } else {
    const firstLine = source.split("\n")[0].trim().replace(/^[#*-\s]+/, "").trim();
    if (firstLine.length > 3 && firstLine.length < 80 && !firstLine.endsWith(".")) {
      topicTitle = firstLine;
    } else {
      const words = source.split(/\s+/).filter(Boolean);
      topicTitle = words.slice(0, Math.min(6, words.length)).join(" ").replace(/[,;:.]$/, "");
    }
  }

  if (isTamil && !/[\u0B80-\u0BFF]/.test(topicTitle)) {
    try {
      const translatedTitle = await fetchTranslateChunk(topicTitle);
      topicTitle = purifyToPureTamil(translatedTitle);
    } catch (e) {
      topicTitle = "கல்விப் பாடத் தலைப்பு";
    }
  }

  if (!topicTitle) {
    topicTitle = isTamil ? "வழங்கப்பட்ட கல்விப் பாடம்" : "Given Educational Topic";
  }

  // 2. Extract Essential Meaning / Overview
  let meaning = "";
  const meaningMatch = source.match(/####\s*[💡📝⚡][^\n]*\n([\s\S]*?)(?=####|$)/);
  if (meaningMatch) {
    meaning = meaningMatch[1].replace(/^[*-•\s]+/, "").trim().split("\n")[0].trim();
  }
  if (!meaning) {
    const sents = source.replace(/###[^\n]+/g, "").split(/(?<=[.?!])\s+/).filter((s) => s.trim().length > 15);
    meaning = (sents[0] || source.slice(0, 150)).trim();
  }
  meaning = meaning.replace(/\*\*/g, "").trim();

  // 3. Extract Definitions
  const definitions = [];
  const defMatch = source.match(/####\s*📖[^\n]*\n([\s\S]*?)(?=####|$)/);
  if (defMatch) {
    const bullets = defMatch[1].split("\n").filter((l) => l.trim().startsWith("-"));
    bullets.forEach((b) => {
      const line = b.replace(/^-\s*/, "").trim();
      const parts = line.match(/^\*{0,2}([^*:]+)\*{0,2}\s*:\s*(.*)$/);
      if (parts) {
        const term = parts[1].replace(/\*/g, "").trim();
        const desc = parts[2].replace(/\*/g, "").trim();
        if (term && desc) {
          definitions.push({ term, desc });
        }
      } else {
        const simpleParts = line.split(":");
        if (simpleParts.length >= 2) {
          const term = simpleParts[0].replace(/\*/g, "").trim();
          const desc = simpleParts.slice(1).join(":").replace(/\*/g, "").trim();
          if (term && desc) {
            definitions.push({ term, desc });
          }
        }
      }
    });
  }

  // 4. Extract Equations
  const equations = [];
  const eqMatch = source.match(/####\s*➗[^\n]*\n([\s\S]*?)(?=####|$)/);
  if (eqMatch) {
    const bullets = eqMatch[1].split("\n").filter((l) => l.trim().length > 3);
    bullets.forEach((b) => {
      const codeMatch = b.match(/`([^`]+)`/);
      if (codeMatch) {
        const exp = b.replace(/`[^`]+`/, "").replace(/^[-\s➔*:]+/, "").replace(/\*/g, "").trim();
        equations.push({ equation: codeMatch[1].trim(), explanation: exp });
      }
    });
  }

  // 5. Extract Relationships
  const relationships = [];
  const relMatch = source.match(/####\s*🔄[^\n]*\n([\s\S]*?)(?=####|$)/);
  if (relMatch) {
    const bullets = relMatch[1].split("\n").filter((l) => l.trim().length > 3);
    bullets.forEach((b) => {
      const cleaned = b.replace(/^[-\d.*•\s]+/, "").replace(/^\*\*[^*]+\*\*:\s*/, "").replace(/\*/g, "").trim();
      if (cleaned.length > 10) {
        relationships.push(cleaned);
      }
    });
  }

  // 6. Extract Takeaway
  let takeaway = "";
  const takeMatch = source.match(/####\s*🎯[^\n]*\n([\s\S]*?)(?=####|$)/);
  if (takeMatch) {
    takeaway = takeMatch[1].trim().split("\n")[0].trim();
  }
  if (!takeaway) {
    const sents = source.replace(/###[^\n]+/g, "").split(/(?<=[.?!])\s+/).filter((s) => s.trim().length > 15);
    takeaway = sents[sents.length - 1] || meaning;
  }
  takeaway = takeaway.replace(/\*/g, "").trim();

  // 7. Construct Topic-Grounded FAQs
  const faqs = [];

  if (isTamil) {
    const cleanTopic = purifyToPureTamil(topicTitle);

    // FAQ 1: Core Definition
    faqs.push({
      category: "💡 அடிப்படைக் கல்விப் பொருள்",
      q: `${cleanTopic} என்பதன் முதன்மையான அறிவியல் வரையறை என்ன?`,
      a: purifyToPureTamil(`${meaning} இது பாடப்பகுதியின் அடிப்படைக் கோட்பாட்டைத் தெளிவாக விளக்குகிறது.`)
    });

    // FAQ 2: Key Definitions
    if (definitions.length > 0) {
      const d1 = definitions[0];
      faqs.push({
        category: "📖 பாதுகாக்கப்பட்ட வரையறை",
        q: `${purifyToPureTamil(d1.term)} என்பது பாடப்பகுதியில் எவ்வாறு வரையறுக்கப்பட்டுள்ளது?`,
        a: purifyToPureTamil(`${d1.desc} இது இப்பாடத்தின் மிக இன்றியமையாத முதன்மைக் கலைச்சொல் விளக்கமாகும்.`)
      });
    }

    if (definitions.length > 1) {
      const d2 = definitions[1];
      faqs.push({
        category: "🔍 நுட்பக் கலைச்சொல்",
        q: `${purifyToPureTamil(d2.term)} என்பதன் முக்கிய பொருள் மற்றும் பங்கு என்ன?`,
        a: purifyToPureTamil(`${d2.desc}`)
      });
    }

    // FAQ 3: Equations (if any)
    if (equations.length > 0) {
      const eq = equations[0];
      faqs.push({
        category: "➗ அறிவியல் சமன்பாடு",
        q: `${cleanTopic} பாடத்தில் உள்ள \`${eq.equation}\` சமன்பாட்டின் அறிவியல் முக்கியத்துவம் யாது?`,
        a: purifyToPureTamil(`\`${eq.equation}\` சமன்பாடு மூலப் பாடத்திலிருந்து முழுமையான துல்லியத்துடன் பாதுகாக்கப்பட்டுள்ளது. ${eq.explanation || "இது பாடத்தின் மாறிகளுக்கு இடையிலான சரியான அளவை விவரிக்கிறது."}`)
      });
    }

    // FAQ 4: Relationships
    if (relationships.length > 0) {
      faqs.push({
        category: "🔄 காரணம் மற்றும் விளைவு",
        q: `${cleanTopic} பாடத்தில் நிகழும் முக்கிய இயக்கத் தொடர்பு மற்றும் படிநிலைகள் யாவை?`,
        a: purifyToPureTamil(`${relationships[0]}`)
      });
    }

    // FAQ 5: Key Takeaway
    faqs.push({
      category: "🎯 முக்கிய கற்றல் முடிவு",
      q: `${cleanTopic} பாடத்திலிருந்து மாணவர்கள் நினைவில் கொள்ள வேண்டிய முதன்மை முடிவு என்ன?`,
      a: purifyToPureTamil(`${takeaway}`)
    });
  } else {
    // English FAQs
    // FAQ 1: Core Definition
    faqs.push({
      category: "💡 Essential Meaning",
      q: `What is the foundational definition and core idea of ${topicTitle}?`,
      a: `${meaning} This establishes the foundational scope and educational meaning of the topic.`
    });

    // FAQ 2: First Definition
    if (definitions.length > 0) {
      const d1 = definitions[0];
      faqs.push({
        category: "📖 Preserved Definition",
        q: `How is "${d1.term}" defined in this material?`,
        a: `${d1.desc} This represents a critical defined construct within this lesson.`
      });
    }

    // FAQ 3: Second Definition
    if (definitions.length > 1) {
      const d2 = definitions[1];
      faqs.push({
        category: "🔍 Technical Terminology",
        q: `What is the significance and role of "${d2.term}" in this lesson?`,
        a: `${d2.desc}`
      });
    }

    // FAQ 4: Equation
    if (equations.length > 0) {
      const eq = equations[0];
      faqs.push({
        category: "➗ Preserved Equation",
        q: `What is the quantitative meaning and importance of equation \`${eq.equation}\`?`,
        a: `The equation \`${eq.equation}\` is preserved verbatim from the source material. ${eq.explanation || "All mathematical variables and relational constants are maintained intact."}`
      });
    }

    // FAQ 5: Relationship
    if (relationships.length > 0) {
      faqs.push({
        category: "🔄 Cause-and-Effect",
        q: `What key cause-and-effect progression or mechanism is highlighted in ${topicTitle}?`,
        a: `${relationships[0]} This explains how the core components interact to produce the observed outcome.`
      });
    }

    // FAQ 6: Takeaway
    faqs.push({
      category: "🎯 Key Takeaway",
      q: `What is the most critical conclusion or takeaway from ${topicTitle}?`,
      a: `${takeaway} Remembering this takeaway ensures full retention of the lesson's essential meaning.`
    });
  }

  return {
    topic_title: topicTitle,
    faqs
  };
}
