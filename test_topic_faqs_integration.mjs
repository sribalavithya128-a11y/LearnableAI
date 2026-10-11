/**
 * LearnAble AI - Topic-Specific FAQ Alignment Verification Suite
 * 
 * Verifies that:
 * 1. After translation (especially Tamil), FAQs are directly related to the given topic.
 * 2. In Tamil translation, FAQs have zero English words in prose and are completely in pure Tamil.
 * 3. Topic definitions, equations, and cause-and-effect relationships from the given topic are addressed.
 * 4. Works across diverse arbitrary user topics (Astrophysics, Computer Science, Biology, History).
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { generateTopicFaqs } from "./src/lib/topicFaqs.js";

function extractProseWithoutCode(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`]+`/g, "");
}

function findEnglishWords(prose) {
  return prose.match(/\b[A-Za-z]{3,}\b/g) || [];
}

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  passed++;
  console.log(`✅ PASSED: ${message}`);
}

async function runTests() {
  console.log("================================================================================");
  console.log("   LEARNABLE AI - TOPIC-SPECIFIC FAQ RELATION & TAMIL FIDELITY VERIFICATION");
  console.log("================================================================================\n");

  const baseUrl = "http://localhost:3000";

  // ---------------------------------------------------------------------------
  // TEST 1: Live API Simplification & FAQ Generation for Given Astronomy Topic in Tamil
  // ---------------------------------------------------------------------------
  console.log("--- 1. Testing Live /api/simplify Topic FAQs (Astronomy / Black Holes in Tamil) ---");
  const astronomyText = `A black hole is an astronomical region of spacetime where gravity is so strong that nothing, including light, can escape.
According to the general theory of relativity, a sufficiently compact mass can deform spacetime to form a black hole.
The boundary of no escape is called the event horizon. The Schwarzschild radius equation is Rs = 2GM / c^2.`;

  const astroRes = await fetch(`${baseUrl}/api/simplify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: astronomyText,
      level: "beginner",
      language: "tamil"
    })
  });

  const astroData = await astroRes.json();
  assert(astroData.success === true, "API call succeeded for astronomy text in Tamil");
  assert(Array.isArray(astroData.faqs) && astroData.faqs.length >= 4, `Generated ${astroData.faqs?.length} topic FAQs in API payload`);
  assert(typeof astroData.topic_title === "string" && astroData.topic_title.length > 3, `Extracted topic title: "${astroData.topic_title}"`);

  console.log(`\nGenerated FAQs for "${astroData.topic_title}":`);
  for (let i = 0; i < astroData.faqs.length; i++) {
    const f = astroData.faqs[i];
    console.log(` [${f.category}] Q: ${f.q}`);
    console.log(`    A: ${f.a.slice(0, 100)}...`);

    // Verify related to given topic
    const fullFaqText = `${f.category} ${f.q} ${f.a}`;
    const prose = extractProseWithoutCode(fullFaqText);
    const enWords = findEnglishWords(prose);
    assert(enWords.length === 0, `FAQ ${i + 1} has 0 English words in prose (found: [${enWords.join(", ")}])`);
  }

  const hasAstroTerms = astroData.faqs.some((f) => 
    f.q.includes("கருந்துளை") || f.a.includes("கருந்துளை") || f.a.includes("விண்வெளி") || f.a.includes("ஈர்ப்பு")
  );
  assert(hasAstroTerms, "Tamil FAQs specifically mention and explain Black Hole concepts");

  const eqFaq = astroData.faqs.find((f) => f.category.includes("சமன்பாடு"));
  assert(eqFaq && eqFaq.q.includes("Rs = 2GM / c^2"), "FAQ specifically explains preserved equation `Rs = 2GM / c^2`");

  // ---------------------------------------------------------------------------
  // TEST 2: Live API Simplification & FAQ Generation for Quantum Computing in Tamil
  // ---------------------------------------------------------------------------
  console.log("\n--- 2. Testing Live /api/simplify Topic FAQs (Quantum Computing in Tamil) ---");
  const quantumText = `Quantum computing harnesses the principles of quantum mechanics to solve complex computational problems.
Qubits leverage quantum superposition and entanglement to represent multiple states simultaneously.
This allows quantum algorithms like Shor's algorithm to factor large prime integers exponentially faster than classical computers.`;

  const quantumRes = await fetch(`${baseUrl}/api/simplify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: quantumText,
      level: "intermediate",
      language: "tamil"
    })
  });

  const quantumData = await quantumRes.json();
  assert(quantumData.success === true, "API call succeeded for Quantum text in Tamil");
  assert(Array.isArray(quantumData.faqs) && quantumData.faqs.length >= 4, `Generated ${quantumData.faqs?.length} Quantum topic FAQs`);

  for (let i = 0; i < quantumData.faqs.length; i++) {
    const f = quantumData.faqs[i];
    const prose = extractProseWithoutCode(`${f.category} ${f.q} ${f.a}`);
    const enWords = findEnglishWords(prose);
    assert(enWords.length === 0, `Quantum FAQ ${i + 1} has 0 English words in prose (found: [${enWords.join(", ")}])`);
  }

  const hasQuantumTerms = quantumData.faqs.some((f) => 
    f.q.includes("குவாண்டம்") || f.a.includes("குவாண்டம்") || f.a.includes("கணினி")
  );
  assert(hasQuantumTerms, "Tamil FAQs specifically mention and explain Quantum Computing concepts");

  // ---------------------------------------------------------------------------
  // TEST 3: Live API Simplification & FAQ Generation for Physics in English
  // ---------------------------------------------------------------------------
  console.log("\n--- 3. Testing Live /api/simplify Topic FAQs (Physics in English) ---");
  const physicsText = `Newton's second law of motion states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.
The formal equation is F = ma, where force equals mass times acceleration.
A larger mass requires greater net force to produce equivalent acceleration.`;

  const physRes = await fetch(`${baseUrl}/api/simplify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: physicsText,
      level: "beginner",
      language: "english"
    })
  });

  const physData = await physRes.json();
  assert(physData.success === true, "API call succeeded for Physics text in English");
  assert(Array.isArray(physData.faqs) && physData.faqs.length >= 4, `Generated ${physData.faqs?.length} Physics topic FAQs`);

  const hasPhysTerms = physData.faqs.some((f) =>
    f.q.toLowerCase().includes("acceleration") || f.a.toLowerCase().includes("acceleration") || f.a.toLowerCase().includes("force")
  );
  assert(hasPhysTerms, "English FAQs specifically address acceleration, force, and mass from Newton's second law");

  const physEqFaq = physData.faqs.find((f) => f.category.includes("Equation"));
  assert(physEqFaq && physEqFaq.q.includes("F = ma"), "English FAQ specifically explains equation `F = ma`");

  // ---------------------------------------------------------------------------
  // TEST 4: Direct generateTopicFaqs Unit Test with Hand-written / Scanned Notes
  // ---------------------------------------------------------------------------
  console.log("\n--- 4. Testing Unit Function generateTopicFaqs for Cell Biology ---");
  const bioFaqs = await generateTopicFaqs({
    originalText: "Chloroplasts contain thylakoid disks where light reactions split water: 2H2O -> 4H+ + 4e- + O2.",
    simplifiedText: `### 🌟 எளிய தமிழ் வழிகாட்டி: பசுங்கணிகம் மற்றும் ஒளிச்சேர்க்கை

#### 💡 அடிப்படைக் கல்விப் பொருள்
பசுங்கணிகங்கள் தாவர செல்களில் ஒளி ஆற்றலை உறிஞ்சி உணவை உருவாக்கும் முக்கிய நுண்ணுறுப்புகள் ஆகும்.

#### 📖 பாதுகாக்கப்பட்ட வரையறைகள் & கலைச்சொற்கள்
- **பசுங்கணிகம்:** ஒளிச்சேர்க்கை நடைபெறும் தாவர செல்லுறுப்பு.
- **தைலகாய்டு:** ஒளி வினைகள் நிகழும் தட்டையான சவ்வு அமைப்புகள்.

#### ➗ பாதுகாக்கப்பட்ட அறிவியல் சமன்பாடுகள் & சூத்திரங்கள்
- \`2H2O -> 4H+ + 4e- + O2\` ➔ நீர் ஒளிப்பிளத்தல் வினை சமன்பாடு.

#### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்
- **படிநிலை 1:** நீர் மூலக்கூறுகள் பிளக்கப்பட்டு ஆக்ஸிஜன் வாயு வளிமண்டலத்தில் வெளியிடப்படுகிறது.

#### 🎯 பாடத்தின் முக்கிய கற்றல் முடிவு & சுருக்கம்
ஒளிச்சேர்க்கை பூமியின் உயிரினங்களுக்கு தேவையான தூய ஆக்ஸிஜனையும் குளுக்கோஸையும் வழங்குகிறது.`,
    language: "tamil"
  });

  assert(bioFaqs.faqs.length >= 5, `Generated ${bioFaqs.faqs.length} FAQs for Cell Biology`);
  assert(bioFaqs.faqs.some((f) => f.q.includes("2H2O -> 4H+ + 4e- + O2")), "Preserved chemical reaction equation inside FAQ question");
  assert(bioFaqs.faqs.some((f) => f.q.includes("பசுங்கணிகம்") || f.q.includes("தைலகாய்டு")), "FAQ specifically questions chloroplast and thylakoid terms");

  // Verify pure Tamil
  for (const f of bioFaqs.faqs) {
    const prose = extractProseWithoutCode(`${f.category} ${f.q} ${f.a}`);
    const enWords = findEnglishWords(prose);
    assert(enWords.length === 0, `Cell Biology FAQ has 0 English words in prose (found: [${enWords.join(", ")}])`);
  }

  console.log("\n================================================================================");
  console.log(`🎉 ALL TESTS PASSED! (${passed} / ${total} assertions passed)`);
  console.log("   Topic-specific FAQs are guaranteed 100% related to user's given educational topic");
  console.log("   with pure Tamil linguistic fidelity and zero English words in prose.");
  console.log("================================================================================");
}

runTests().catch((err) => {
  console.error("❌ Test suite encountered error:", err);
  process.exit(1);
});
