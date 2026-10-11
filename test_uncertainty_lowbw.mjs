// test_uncertainty_lowbw.mjs
// Comprehensive test suite for Low-Bandwidth access and Graceful Handling of OCR, Translation, and Multimodal Extraction Uncertainty

import {
  assessOcrUncertainty,
  assessTranslationCertainty,
  assessMultimodalCertainty,
  VERIFIED_BILINGUAL_GLOSSARY
} from './src/lib/uncertainty.js';

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(` [PASS] Test ${total}: ${message}`);
    passed++;
  } else {
    console.error(` [FAIL] Test ${total}: ${message}`);
    process.exitCode = 1;
  }
}

console.log("\n======================================================================");
console.log("  RUNNING LOW-BANDWIDTH & UNCERTAINTY HANDLING TEST SUITE");
console.log("======================================================================\n");

// ----------------------------------------------------------------------
// 1. OCR Uncertainty Assessment Tests
// ----------------------------------------------------------------------
console.log("--- 1. Optical Character Recognition (OCR) Uncertainty ---");

// Test clean text
const cleanText = "Photosynthesis is the biological process by which green plants synthesize nutrients from carbon dioxide and water.";
const cleanOcr = assessOcrUncertainty(cleanText, 98);
assert(cleanOcr.confidenceScore >= 95, `Clean text yields high confidence (${cleanOcr.confidenceScore}%)`);
assert(!cleanOcr.isUncertain, `Clean text is flagged as certain (isUncertain === false)`);
assert(cleanOcr.uncertainWordCount === 0, `Clean text has 0 ambiguous words`);

// Test noisy/blurred scan text with common OCR character confusions (e.g. "0" for "O", "rn" for "m", "vv" for "w")
const noisyText = "Ph0tosynthesis is the bi0l0gical pr0cess in ch1oroplasts where vvater and C02 react to make g1ucose.";
const noisyOcr = assessOcrUncertainty(noisyText, 80);
assert(noisyOcr.isUncertain === true, `Noisy text correctly triggers uncertainty flag (isUncertain === true)`);
assert(noisyOcr.uncertainWords.length > 0, `Noisy text identifies optical confusions (${noisyOcr.uncertainWords.length} found)`);
const hasSuggestion = noisyOcr.uncertainWords.some(w => w.suggestion && w.suggestion !== w.word);
assert(hasSuggestion, `Context heuristics provide auto-repair suggestions for noisy tokens`);
assert(noisyOcr.remediationGuidance.length > 10, `Transparent remediation guidance is provided to the user`);

// ----------------------------------------------------------------------
// 2. Translation & Bilingual Fidelity Tests
// ----------------------------------------------------------------------
console.log("\n--- 2. Translation & Bilingual Terminology Fidelity ---");

const englishText = "Photosynthesis takes place in chloroplasts where water and carbon dioxide produce glucose and oxygen: 6CO2 + 6H2O -> C6H12O6 + 6O2.";
const tamilSimplifiedText = "ஒளிச்சேர்க்கை (Photosynthesis) பசுங்கணிகத்தில் (chloroplast) நடைபெறுகிறது. நீர் மற்றும் கார்பன் டை ஆக்சைடு இணைந்து குளுக்கோஸ் (Glucose) மற்றும் ஆக்சிஜனை உருவாக்குகின்றன: 6CO2 + 6H2O -> C6H12O6 + 6O2.";

const transCertainty = assessTranslationCertainty(englishText, tamilSimplifiedText, "tamil");
assert(transCertainty.curriculumFidelityScore >= 90, `Bilingual curriculum fidelity score is high (${transCertainty.curriculumFidelityScore}%)`);
assert(transCertainty.verifiedGlosses.length >= 2, `Verified glosses identify preserved English terms alongside Tamil`);
assert(transCertainty.equationFidelityScore === 100, `Strict scientific equation fidelity preserved verbatim (100%)`);
assert(transCertainty.verifiedGlosses.some(g => g.term_ta.includes("ஒளிச்சேர்க்கை")), `Core terminology mapped to verified bilingual glossary`);

// ----------------------------------------------------------------------
// 3. Multimodal Extraction Uncertainty Tests
// ----------------------------------------------------------------------
console.log("\n--- 3. Multimodal Visual Extraction Certainty & Graceful Fallback ---");

const flowchartText = "Start Process -> Step 1: Ingestion -> Decision Point [Is Valid?] -> Output Result -> End";
const chartText = "X-axis: Year (2018-2024), Y-axis: Global Energy Consumption in TWh. Linear upward trend from 22,000 to 26,500 TWh.";

const flowchartCertainty = assessMultimodalCertainty("Flowchart", flowchartText, "process_diagram.png");
assert(flowchartCertainty.diagramCompletenessScore >= 85, `Flowchart diagram completeness score is high (${flowchartCertainty.diagramCompletenessScore}%)`);
assert(flowchartCertainty.verifiedNodesCount >= 4, `Identified sequential flowchart decision nodes (${flowchartCertainty.verifiedNodesCount} nodes)`);
assert(!flowchartCertainty.isDegraded, `Complete flowchart extraction avoids degraded flag`);

const degradedCertainty = assessMultimodalCertainty("Diagram", "Low quality image", "blurry_scan.jpg");
assert(degradedCertainty.isDegraded === true, `Low-context visual extraction gracefully marks degraded status without 422 crash`);
assert(degradedCertainty.remediationGuidance.includes("degraded") || degradedCertainty.remediationGuidance.includes("low-contrast") || degradedCertainty.remediationGuidance.includes("partial"), `Provides actionable feedback for degraded multimodal scans`);

// ----------------------------------------------------------------------
// 4. End-to-End API Integration Tests (API /api/simplify with low_bandwidth)
// ----------------------------------------------------------------------
console.log("\n--- 4. End-to-End API Integration & Bandwidth Payload ---");

try {
  const simplifyRes = await fetch("http://localhost:3000/api/simplify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: englishText,
      level: "beginner",
      language: "tamil",
      low_bandwidth: true
    }),
  });
  const data = await simplifyRes.json();
  assert(simplifyRes.status === 200 && data.success, `API /api/simplify responds HTTP 200 with low_bandwidth: true`);
  assert(data.translation_assessment !== undefined, `API returns translation_assessment in response payload`);
  assert(data.translation_assessment.curriculumFidelityScore >= 90, `API payload includes verified curriculum fidelity score (${data.translation_assessment.curriculumFidelityScore}%)`);
} catch (e) {
  assert(false, `API test failed with error: ${e.message}`);
}

console.log("\n======================================================================");
console.log(`  LOW-BANDWIDTH & UNCERTAINTY TEST RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
console.log("======================================================================\n");

if (passed !== total) {
  process.exit(1);
}
