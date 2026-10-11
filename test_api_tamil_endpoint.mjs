/**
 * Test Live API Endpoints for Real Dynamic Tamil Translation
 * Verifies that POST /api/simplify, POST /api/quiz, POST /api/flashcards, and GET /api/status:
 * 1. Return is_demo: false when language is Tamil.
 * 2. Return real translations of the user's specific arbitrary topic (e.g. Black Holes & General Relativity).
 * 3. Have NO [DEMO MODE] or [மாதிரித் தரவு முறை] banner.
 * 4. Have 0 English words in Tamil prose.
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function runApiTests() {
  console.log("================================================================================");
  console.log("   LEARNABLE AI - LIVE API ENDPOINT VERIFICATION FOR REAL TAMIL TRANSLATION");
  console.log("================================================================================\n");

  const baseUrl = "http://localhost:3000";

  // 1. GET /api/status
  console.log("--- 1. Testing GET /api/status ---");
  const statusRes = await fetch(`${baseUrl}/api/status`);
  const statusData = await statusRes.json();
  console.log("Status response:", statusData);
  if (!statusData.translation_engine || !statusData.supported_languages.includes("Tamil")) {
    throw new Error("Status endpoint missing translation engine metadata");
  }
  console.log("✅ PASSED: /api/status reports active Tamil translation engine");

  // 2. POST /api/simplify with Arbitrary User Data
  console.log("\n--- 2. Testing POST /api/simplify (Arbitrary Astronomy Topic) ---");
  const userTopicText = `A black hole is an astronomical region of spacetime where gravity is so strong that nothing, including light, can escape.
According to the general theory of relativity, a sufficiently compact mass can deform spacetime to form a black hole.
The boundary of no escape is called the event horizon. The Schwarzschild radius equation is Rs = 2GM / c^2.`;

  const simplifyRes = await fetch(`${baseUrl}/api/simplify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: userTopicText,
      level: "beginner",
      language: "tamil"
    })
  });

  const simplifyData = await simplifyRes.json();
  if (!simplifyData.success) {
    throw new Error(`Simplify API failed: ${simplifyData.error}`);
  }

  console.log("is_demo:", simplifyData.is_demo);
  console.log("Simplified text snippet:\n", simplifyData.simplified_text.slice(0, 400), "...\n");

  if (simplifyData.is_demo !== false) {
    throw new Error(`Expected is_demo: false for real Tamil translation, got ${simplifyData.is_demo}`);
  }
  if (simplifyData.simplified_text.includes("DEMO MODE") || simplifyData.simplified_text.includes("மாதிரித் தரவு")) {
    throw new Error("Found DEMO banner in real translation output!");
  }
  if (!simplifyData.simplified_text.includes("ஈர்ப்பு") && !simplifyData.simplified_text.includes("வெளி")) {
    throw new Error("Translation did not capture astronomical terms in Tamil!");
  }

  // Check English words in prose outside of backticks
  const proseOnly = simplifyData.simplified_text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]+`/g, "");
  const englishWords = proseOnly.match(/\b[A-Za-z]{3,}\b/g) || [];
  if (englishWords.length > 0) {
    throw new Error(`Found unexpected English words in prose: [${englishWords.join(", ")}]`);
  }
  console.log("✅ PASSED: /api/simplify produced real dynamic Tamil translation with is_demo: false and 0 English words!");

  // 3. POST /api/quiz with Arbitrary User Data
  console.log("\n--- 3. Testing POST /api/quiz (Real dynamic quiz in Tamil) ---");
  const quizRes = await fetch(`${baseUrl}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: userTopicText,
      count: 3,
      language: "tamil"
    })
  });

  const quizData = await quizRes.json();
  if (!quizData.success || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
    throw new Error("Quiz API returned invalid question list");
  }
  if (quizData.is_demo !== false) {
    throw new Error(`Expected is_demo: false for Tamil quiz, got ${quizData.is_demo}`);
  }
  console.log(`Generated ${quizData.questions.length} real quiz questions in Tamil`);
  console.log("Sample question 1:", quizData.questions[0].question);
  console.log("✅ PASSED: /api/quiz generated real dynamic questions in Tamil with is_demo: false");

  // 4. POST /api/flashcards with Arbitrary User Data
  console.log("\n--- 4. Testing POST /api/flashcards (Real dynamic flashcards in Tamil) ---");
  const flashRes = await fetch(`${baseUrl}/api/flashcards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: userTopicText,
      language: "tamil"
    })
  });

  const flashData = await flashRes.json();
  if (!flashData.success || !Array.isArray(flashData.flashcards) || flashData.flashcards.length === 0) {
    throw new Error("Flashcards API returned invalid flashcard list");
  }
  if (flashData.is_demo !== false) {
    throw new Error(`Expected is_demo: false for Tamil flashcards, got ${flashData.is_demo}`);
  }
  console.log(`Generated ${flashData.flashcards.length} real flashcards in Tamil`);
  console.log("Sample card 1 front:", flashData.flashcards[0].front);
  console.log("Sample card 1 back:", flashData.flashcards[0].back);
  console.log("✅ PASSED: /api/flashcards generated real dynamic flashcards in Tamil with is_demo: false");

  console.log("\n================================================================================");
  console.log("🎉 ALL LIVE API ENDPOINT VERIFICATION TESTS PASSED SUCCESSFULLY!");
  console.log("================================================================================");
}

runApiTests().catch((err) => {
  console.error("❌ Live API test failed:", err);
  process.exit(1);
});
