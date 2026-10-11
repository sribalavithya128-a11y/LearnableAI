/**
 * Verification test suite for Dynamic Topic Diagram Generation (Flowchart, Graph & Diagram)
 * Ensures zero default demo mocks are used for user topics, and validates pure Tamil translation.
 */

import { generateTopicDiagram, extractTopicMetadata } from "./src/lib/topicDiagram.js";
import { callMultimodalVision } from "./src/lib/llm.js";

async function runTests() {
  console.log("==================================================================");
  console.log("   LEARNABLE AI - TOPIC FLOWCHART, GRAPH & DIAGRAM TEST SUITE     ");
  console.log("==================================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition, testName) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
    }
  }

  // --------------------------------------------------------------------------
  // TEST 1: Topic Metadata Extraction from Custom Physics Content
  // --------------------------------------------------------------------------
  const physicsText = "Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. Mathematically, this fundamental mechanical relationship is formulated as `F = ma`, where F denotes the vector net force in Newtons, m represents inertial mass in kilograms, and a signifies instantaneous acceleration.";
  const meta = extractTopicMetadata(physicsText);
  assert(meta.title.includes("Newton") || meta.title.includes("Second Law"), "Extracts custom physics topic title");
  assert(meta.equations.includes("F = ma"), "Extracts preserved equation `F = ma`");

  // --------------------------------------------------------------------------
  // TEST 2: Dynamic Topic Diagram Generation for Physics (English)
  // --------------------------------------------------------------------------
  const physDiagram = await generateTopicDiagram({
    originalText: physicsText,
    simplifiedText: "Newton's Second Law states that force equals mass times acceleration: `F = ma`.",
    language: "english",
    topicHint: "Newton's Second Law of Motion"
  });

  assert(physDiagram.topic_title.includes("Newton"), "Generated diagram has custom physics topic title");
  assert(physDiagram.flowchart.nodes.length === 5, "Flowchart has 5 sequential stages");
  assert(physDiagram.flowchart.nodes.some(n => n.type === "decision"), "Flowchart contains decision diamond");
  assert(physDiagram.flowchart.nodes.some(n => n.desc.includes("F = ma") || n.label.includes("F = ma")), "Flowchart preserves exact equation `F = ma`");
  
  // Verify ZERO demo defaults
  assert(!physDiagram.flowchart.title.includes("Scientific Method"), "Does not use default 'Scientific Method' flowchart");
  assert(!physDiagram.graph.title.includes("Renewable Energy"), "Does not use default 'Renewable Energy' chart");
  assert(!physDiagram.diagram.title.includes("Chloroplast"), "Does not use default 'Chloroplast' diagram");

  // --------------------------------------------------------------------------
  // TEST 3: Dynamic Topic Diagram Generation for Tamil Content (100% Pure Tamil)
  // --------------------------------------------------------------------------
  const tamilText = "ஒளிச்சேர்க்கை என்பது தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி உணவைத் தயாரிக்கும் நிகழ்வாகும். வேர்கள் மண்ணிலிருந்து நீரையும் தாது உப்புக்களையும் உறிஞ்சுகின்றன. இலைத்துளைகள் காற்றில் உள்ள கார்பன் டை ஆக்சைடை உறிஞ்சுகின்றன.";
  const tamilDiagram = await generateTopicDiagram({
    originalText: tamilText,
    simplifiedText: tamilText,
    language: "tamil",
    topicHint: "ஒளிச்சேர்க்கை"
  });

  assert(tamilDiagram.topic_title.includes("ஒளிச்சேர்க்கை"), "Tamil diagram has pure Tamil topic title");
  assert(tamilDiagram.flowchart.title.includes("விளக்கப்படம்"), "Tamil flowchart title is in Tamil");
  assert(tamilDiagram.flowchart.nodes[0].label.includes("தொடக்கம்"), "Tamil flowchart node 1 has pure Tamil label");
  assert(tamilDiagram.flowchart.nodes[2].type === "decision", "Tamil flowchart node 3 is a decision diamond");
  assert(tamilDiagram.flowchart.nodes[2].branchYes.includes("ஆம்"), "Tamil decision branch 'Yes' is pure Tamil");
  assert(tamilDiagram.flowchart.nodes[2].branchNo.includes("இல்லை"), "Tamil decision branch 'No' is pure Tamil");
  
  // Verify 0 English words in Tamil prose
  const tamilProseSample = [
    tamilDiagram.flowchart.summary,
    tamilDiagram.flowchart.nodes[0].desc,
    tamilDiagram.flowchart.nodes[1].desc,
    tamilDiagram.graph.summary,
    tamilDiagram.diagram.summary
  ].join(" ");

  const hasEnglishProse = /\b(the|is|and|process|flowchart|step|branch|decision|system|result)\b/i.test(tamilProseSample);
  assert(!hasEnglishProse, "Tamil diagram contains ZERO English words in prose");

  // --------------------------------------------------------------------------
  // TEST 4: callMultimodalVision with User Uploaded Topic (Zero Demo Mocks)
  // --------------------------------------------------------------------------
  const customVisionResult = await callMultimodalVision({
    imageBase64: "aW1hZ2VkYXRh",
    filename: "black_hole_event_horizon_scan.jpg",
    givenText: "A black hole is an astronomical region of spacetime where gravity is so strong that nothing, including light, can escape. The boundary around a black hole is called the event horizon.",
    topic: "Black Hole Mechanics",
    visualTypeHint: "flowchart"
  });

  assert(customVisionResult.text.includes("Black Hole Mechanics"), "callMultimodalVision generates flowchart specifically for user topic");
  assert(!customVisionResult.text.includes("[DEMO MODE]"), "callMultimodalVision does NOT output [DEMO MODE] for user content");
  assert(!customVisionResult.text.includes("Scientific Method"), "callMultimodalVision does NOT output default Scientific Method");

  // --------------------------------------------------------------------------
  // TEST 5: callMultimodalVision Preserves Exact Automated Test Fixture Compatibility
  // --------------------------------------------------------------------------
  const mockFixtureResult = await callMultimodalVision({
    imageBase64: "dGVzdGZpeHR1cmU=",
    filename: "flowchart_sample.png",
  });
  assert(mockFixtureResult.text.includes("Scientific Method"), "Test fixture flowchart_sample.png still passes existing mock test");

  console.log("\n==================================================================");
  console.log(`   TEST RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log("==================================================================\n");

  if (passed !== total) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
