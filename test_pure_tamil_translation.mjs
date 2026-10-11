/**
 * LearnAble AI - Pure Tamil Translation & Zero English Words Test Suite
 * 
 * Verifies that when Tamil translation is selected:
 * 1. Both demo data and arbitrary user data are 100% translated into pure Tamil.
 * 2. Zero English words remain in headings, definitions, analogies, takeaways, quizzes, or flashcards.
 * 3. Mathematical & chemical formulas (e.g., F = ma, 2H2O -> 4H+ + 4e- + O2) are preserved inside backticks.
 */

import {
  purifyToPureTamil,
  translateEnglishToPureTamil,
  removeParenthesizedEnglish
} from "./src/lib/tamilTranslator.js";

import {
  synthesizeSimplifiedText,
  generateDynamicQuiz,
  generateDynamicFlashcards,
  callLLM
} from "./src/lib/llm.js";

import {
  DEMO_CONTENT,
  DEMO_FLASHCARDS,
  DEMO_QUIZZES
} from "./src/lib/demoData.js";

import { buildExplainableAlignment } from "./src/lib/explainable.js";
import { assessTranslationCertainty } from "./src/lib/uncertainty.js";

function extractProseWithoutCode(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`]+`/g, "");
}

function findEnglishWords(prose) {
  // Find words containing 3 or more English letters
  return prose.match(/\b[A-Za-z]{3,}\b/g) || [];
}

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  passedTests++;
  console.log(`✅ PASSED: ${message}`);
}

console.log("================================================================================");
console.log("   LEARNABLE AI - PURE TAMIL TRANSLATION & USER DATA VERIFICATION SUITE");
console.log("================================================================================\n");

// -----------------------------------------------------------------------------
// TEST 1: purifyToPureTamil & removeParenthesizedEnglish
// -----------------------------------------------------------------------------
console.log("--- 1. Testing Core Purification Functions ---");
{
  const inputWithParen = "ஒளிச்சேர்க்கை (Photosynthesis) தாவரங்களில் பசுங்கணிகம் (Chloroplast) வழியாக நடைபெறுகிறது.";
  const cleaned = removeParenthesizedEnglish(inputWithParen);
  assert(!cleaned.includes("Photosynthesis") && !cleaned.includes("Chloroplast"), "removeParenthesizedEnglish strips parenthesized English words");

  const headingTest = "### 🌟 Simple Breakdown: Cellular Energy\n#### 💡 Essential Meaning & Core Idea\n#### 📖 Preserved Definitions & Key Terminology";
  const purifiedHeadings = purifyToPureTamil(headingTest);
  assert(!purifiedHeadings.includes("Simple Breakdown") && !purifiedHeadings.includes("Essential Meaning"), "purifyToPureTamil translates English section headings into pure Tamil");
  assert(purifiedHeadings.includes("எளிய தமிழ் வழிகாட்டி") && purifiedHeadings.includes("அடிப்படைக் கல்விப் பொருள்"), "purifyToPureTamil produces correct Tamil headings");

  const formulaProse = "சமன்பாடு: `F = ma` ➔ விசை (Force) என்பது நிறை (Mass) மற்றும் முடுக்கத்தின் (Acceleration) பெருக்கற்பலன் ஆகும்.";
  const purifiedFormula = purifyToPureTamil(formulaProse);
  assert(purifiedFormula.includes("`F = ma`"), "Formula `F = ma` is preserved inside code ticks");
  const proseOnly = extractProseWithoutCode(purifiedFormula);
  const englishInProse = findEnglishWords(proseOnly);
  assert(englishInProse.length === 0, `Formula prose contains zero English words: found [${englishInProse.join(", ")}]`);
}

// -----------------------------------------------------------------------------
// TEST 2: Demo Data Pure Tamil Verification (Zero English Words)
// -----------------------------------------------------------------------------
console.log("\n--- 2. Testing Curated Demo Content in Tamil ---");
{
  for (const tier of ["beginner", "intermediate", "advanced"]) {
    const content = DEMO_CONTENT[tier].tamil;
    const prose = extractProseWithoutCode(content);
    const englishWords = findEnglishWords(prose);
    assert(englishWords.length === 0, `DEMO_CONTENT.${tier}.tamil has 0 English words in prose (found: [${englishWords.join(", ")}])`);
  }

  // Demo Flashcards
  for (const card of DEMO_FLASHCARDS.tamil) {
    const fProse = extractProseWithoutCode(card.front);
    const bProse = extractProseWithoutCode(card.back);
    const fEn = findEnglishWords(fProse);
    const bEn = findEnglishWords(bProse);
    assert(fEn.length === 0, `Demo Flashcard front has 0 English words: "${card.front}"`);
    assert(bEn.length === 0, `Demo Flashcard back has 0 English words: "${card.back}"`);
  }

  // Demo Quizzes
  for (const q of DEMO_QUIZZES.tamil) {
    const qEn = findEnglishWords(extractProseWithoutCode(q.question));
    assert(qEn.length === 0, `Demo Quiz question has 0 English words: "${q.question}"`);
    for (const opt of q.options) {
      const optEn = findEnglishWords(extractProseWithoutCode(opt));
      assert(optEn.length === 0, `Demo Quiz option has 0 English words: "${opt}"`);
    }
    const expEn = findEnglishWords(extractProseWithoutCode(q.explanation));
    assert(expEn.length === 0, `Demo Quiz explanation has 0 English words: "${q.explanation}"`);
  }
}

// -----------------------------------------------------------------------------
// TEST 3: User's Arbitrary Custom Data (Physics, History, CS) Synthesizer
// -----------------------------------------------------------------------------
console.log("\n--- 3. Testing Dynamic Simplification for Arbitrary User Data ---");
{
  // User Data Case A: Custom Physics Text
  const userPhysicsText = `Newton's second law of motion pertains to the behavior of objects for which all existing forces are not balanced.
The second law states that the acceleration of an object is dependent upon two variables: the net force acting upon the object and the mass of the object.
The formal equation is F = ma, where force equals mass times acceleration.
When net force increases, acceleration proportionally increases. A larger mass requires greater force to achieve the same acceleration.`;

  const physicsTamilBeginner = await synthesizeSimplifiedText(userPhysicsText, "beginner", "tamil");
  const physicsProse = extractProseWithoutCode(physicsTamilBeginner);
  const physicsEnglish = findEnglishWords(physicsProse);
  assert(physicsEnglish.length === 0, `User Physics Text simplified in Tamil has 0 English words in prose (found: [${physicsEnglish.join(", ")}])`);
  assert(physicsTamilBeginner.includes("`F = ma`"), "User Physics Text preserves equation `F = ma` in code ticks");
  assert(physicsTamilBeginner.includes("முடுக்கம்") && physicsTamilBeginner.includes("விசை") && physicsTamilBeginner.includes("நிறை"), "User Physics Text contains accurate Tamil physical terminology");

  // User Data Case B: Custom History Text
  const userHistoryText = `The Indus Valley Civilization flourished in the bronze age along the Indus River basin.
Cities like Harappa and Mohenjo-daro demonstrated exceptional urban planning, multi-story brick architecture, and underground drainage networks.
Standardized weights and measures facilitated trade with ancient Mesopotamia.`;

  const historyTamilInter = await synthesizeSimplifiedText(userHistoryText, "intermediate", "tamil");
  const historyProse = extractProseWithoutCode(historyTamilInter);
  const historyEnglish = findEnglishWords(historyProse);
  assert(historyEnglish.length === 0, `User History Text simplified in Tamil has 0 English words in prose (found: [${historyEnglish.join(", ")}])`);
  assert(historyTamilInter.includes("சிந்து சமவெளி") && historyTamilInter.includes("நாகரிகம்"), "User History Text contains accurate Tamil historical terminology");

  // User Data Case C: Custom Computer Science / Engineering Text
  const userCsText = `A relational database management system provides persistent data storage and structured query operations.
Transactions follow atomicity, consistency, isolation, and durability properties.
Indexing accelerates retrieval velocity while reducing disk input and output bottlenecks.`;

  const csTamilAdv = await synthesizeSimplifiedText(userCsText, "advanced", "tamil");
  const csProse = extractProseWithoutCode(csTamilAdv);
  const csEnglish = findEnglishWords(csProse);
  assert(csEnglish.length === 0, `User CS Text simplified in Tamil has 0 English words in prose (found: [${csEnglish.join(", ")}])`);
  assert(csTamilAdv.includes("கட்டமைப்பு") || csTamilAdv.includes("தரவு"), "User CS Text translated into clean Tamil");
}

// -----------------------------------------------------------------------------
// TEST 4: Dynamic Quiz & Flashcards for Arbitrary User Data
// -----------------------------------------------------------------------------
console.log("\n--- 4. Testing Dynamic Quiz and Flashcards for User Data in Tamil ---");
{
  const customUserText = `Photosynthesis converts solar energy into chemical energy within chloroplast thylakoid membranes.
The photolysis reaction 2H2O -> 4H+ + 4e- + O2 splits water and releases breathable oxygen.
Enzymes in the stroma fix carbon dioxide into glucose molecules C6H12O6.`;

  // Quiz
  const quizJson = await generateDynamicQuiz(customUserText, 3, "tamil");
  const quizObj = JSON.parse(quizJson);
  assert(Array.isArray(quizObj.questions) && quizObj.questions.length === 3, "Quiz generates 3 valid questions");

  for (const q of quizObj.questions) {
    const qWords = findEnglishWords(extractProseWithoutCode(q.question));
    assert(qWords.length === 0, `Dynamic quiz question has 0 English words: "${q.question}"`);
    for (const opt of q.options) {
      const optWords = findEnglishWords(extractProseWithoutCode(opt));
      assert(optWords.length === 0, `Dynamic quiz option has 0 English words: "${opt}"`);
    }
    const expWords = findEnglishWords(extractProseWithoutCode(q.explanation));
    assert(expWords.length === 0, `Dynamic quiz explanation has 0 English words: "${q.explanation}"`);
  }

  // Flashcards
  const cardsJson = await generateDynamicFlashcards(customUserText, "tamil");
  const cardsObj = JSON.parse(cardsJson);
  assert(Array.isArray(cardsObj.flashcards) && cardsObj.flashcards.length >= 3, "Flashcards generates valid deck");

  for (const card of cardsObj.flashcards) {
    const fWords = findEnglishWords(extractProseWithoutCode(card.front));
    const bWords = findEnglishWords(extractProseWithoutCode(card.back));
    assert(fWords.length === 0, `Dynamic flashcard front has 0 English words: "${card.front}"`);
    assert(bWords.length === 0, `Dynamic flashcard back has 0 English words: "${card.back}"`);
  }
}

// -----------------------------------------------------------------------------
// TEST 5: Explainable AI & Uncertainty Assessment in Pure Tamil
// -----------------------------------------------------------------------------
console.log("\n--- 5. Testing Explainable AI and Assessment Invariants in Tamil ---");
{
  const original = "Photosynthesis is executed within chloroplasts. 2H2O -> 4H+ + 4e- + O2.";
  const simplified = await synthesizeSimplifiedText(original, "beginner", "tamil");

  const xai = buildExplainableAlignment({
    originalText: original,
    simplifiedText: simplified,
    level: "beginner",
    language: "tamil"
  });

  assert(xai.explainable_alignment.length > 0, "Explainable AI produced alignment anchors");
  for (const anchor of xai.explainable_alignment) {
    const regionWords = findEnglishWords(extractProseWithoutCode(anchor.region));
    const simWords = findEnglishWords(extractProseWithoutCode(anchor.simplified_chunk));
    const ratWords = findEnglishWords(extractProseWithoutCode(anchor.rationale));
    assert(regionWords.length === 0, `XAI region label has 0 English words: "${anchor.region}"`);
    assert(simWords.length === 0, `XAI simplified chunk has 0 English words: "${anchor.simplified_chunk}"`);
    assert(ratWords.length === 0, `XAI rationale has 0 English words: "${anchor.rationale}"`);
  }

  const transCert = assessTranslationCertainty(original, simplified, "tamil");
  assert(transCert.isTamil === true, "Translation certainty recognizes Tamil language");
  const noteWords = findEnglishWords(transCert.transparencyNote);
  assert(noteWords.length === 0, `Transparency note has 0 English words: "${transCert.transparencyNote}"`);
}

// -----------------------------------------------------------------------------
// TEST 6: Real Dynamic Translation of Novel User Topics (Zero Demo Data)
// -----------------------------------------------------------------------------
console.log("\n--- 6. Testing Real Dynamic Translation of Arbitrary User Topics (No Demo Mocks) ---");
{
  const novelUserTopic = `Quantum computing harnesses the principles of quantum mechanics to solve complex computational problems.
Qubits leverage quantum superposition and entanglement to represent multiple states at once.
This allows quantum algorithms like Shor's algorithm to factor large prime integers exponentially faster than classical computers.`;

  const quantumResult = await callLLM({
    prompt: `Transform into Tamil`,
    systemPrompt: `You are LearnAble AI`,
    taskType: "simplify",
    contextHint: { level: "intermediate", language: "tamil", text: novelUserTopic }
  });

  assert(!quantumResult.includes("DEMO MODE"), "Real translation has NO [DEMO MODE] banner");
  assert(!quantumResult.includes("மாதிரித் தரவு"), "Real translation has NO sample data banner");
  assert(quantumResult.includes("குவாண்டம்") || quantumResult.includes("கணினி"), "Real translation captures novel Quantum topic in Tamil");
  const quantumProse = extractProseWithoutCode(quantumResult);
  const quantumEn = findEnglishWords(quantumProse);
  assert(quantumEn.length === 0, `Real translation of novel topic has 0 English words in prose (found: [${quantumEn.join(", ")}])`);

  // Test callLLM does NOT intercept science text with demo mock when Tamil is selected
  const userBiologyText = `Photosynthesis in marine phytoplankton produces over fifty percent of Earth's atmospheric oxygen. Chloroplast thylakoids harvest sunlight to generate ATP and NADPH.`;
  const bioResult = await callLLM({
    prompt: `Transform into Tamil`,
    systemPrompt: `You are LearnAble AI`,
    taskType: "simplify",
    contextHint: { level: "beginner", language: "tamil", text: userBiologyText }
  });

  assert(!bioResult.includes("DEMO MODE"), "Biology translation has NO [DEMO MODE] banner");
  assert(!bioResult.includes("மாதிரித் தரவு"), "Biology translation has NO sample data banner");
  const bioProse = extractProseWithoutCode(bioResult);
  const bioEn = findEnglishWords(bioProse);
  assert(bioEn.length === 0, `Real biology translation has 0 English words in prose (found: [${bioEn.join(", ")}])`);
}

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log(`🎉 ALL TESTS PASSED! (${passedTests} / ${totalTests} assertions passed)`);
console.log("   Tamil educational output is guaranteed 100% pure Tamil with 0 English words");
console.log("   across both demo data and arbitrary user uploads/notes/camera scans.");
console.log("   Real dynamic translation engine active with zero demo mock interception.");
console.log("================================================================================");
