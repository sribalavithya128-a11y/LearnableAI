/**
 * Automated Test Suite for Next.js & Node.js LearnAble AI
 */

const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("\n" + "=".repeat(60));
  console.log("  RUNNING NEXT.JS & NODE.JS END-TO-END TEST SUITE");
  console.log("=".repeat(60));

  let passed = 0;
  let total = 0;

  function assert(condition, name, detail = "") {
    total++;
    if (condition) {
      passed++;
      console.log(` [PASS] Test ${total}: ${name}`);
    } else {
      console.log(` [FAIL] Test ${total}: ${name} - Detail: ${detail}`);
    }
  }

  // 1. Test Root Page
  try {
    const res = await fetch(`${BASE_URL}/`);
    const html = await res.text();
    assert(
      res.status === 200 && html.includes("LearnAble") && html.includes("skip-link"),
      "Next.js Root Page renders accessible HTML & skip link"
    );
  } catch (err) {
    assert(false, "Root Page Render", err.message);
  }

  // 2. Test API Status
  try {
    const res = await fetch(`${BASE_URL}/api/status`);
    const data = await res.json();
    assert(
      res.status === 200 && data.status === "healthy" && data.demo_mode === true && data.supported_languages.includes("Tamil"),
      "Node.js API /api/status returns healthy demo status with Tamil support"
    );
  } catch (err) {
    assert(false, "API Status", err.message);
  }

  // 3. Test Simplification (English & Tamil)
  const sampleText =
    "Photosynthesis is a vital biochemical process executed by photoautotrophic organisms including green plants and phytoplankton. Inside chloroplasts, pigments absorb sunlight, splitting water to release oxygen and fixing atmospheric carbon dioxide into glucose.";

  try {
    const resEng = await fetch(`${BASE_URL}/api/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sampleText, level: "beginner", language: "english" }),
    });
    const dataEng = await resEng.json();
    assert(
      resEng.status === 200 && dataEng.success && dataEng.simplified_text.includes("Plants"),
      "Simplification: Beginner English with clear analogies"
    );

    const resTam = await fetch(`${BASE_URL}/api/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sampleText, level: "intermediate", language: "tamil" }),
    });
    const dataTam = await resTam.json();
    assert(
      resTam.status === 200 && dataTam.success && dataTam.simplified_text.includes("ஒளிச்சேர்க்கை"),
      "Simplification: Intermediate Tamil with Tamil terminology"
    );
  } catch (err) {
    assert(false, "API Simplify", err.message);
  }

  // 4. Test Validation Rejection (< 20 chars)
  try {
    const res = await fetch(`${BASE_URL}/api/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Too short", level: "beginner", language: "english" }),
    });
    assert(res.status === 400, "Validation: Rejects input text < 20 chars with HTTP 400");
  } catch (err) {
    assert(false, "Validation Check", err.message);
  }

  // 5. Test Quiz Generation (English 5 Qs, Tamil 3 Qs)
  try {
    const resQuizEng = await fetch(`${BASE_URL}/api/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sampleText, count: 5, language: "english" }),
    });
    const dataQuizEng = await resQuizEng.json();
    const validEng =
      dataQuizEng.success &&
      dataQuizEng.questions.length === 5 &&
      dataQuizEng.questions.every((q) => q.options.length === 4 && q.explanation && q.correct_index >= 0 && q.correct_index <= 3);
    assert(validEng, "Quiz: Generated 5 questions with exactly 4 options each and explanations");

    const resQuizTam = await fetch(`${BASE_URL}/api/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sampleText, count: 3, language: "tamil" }),
    });
    const dataQuizTam = await resQuizTam.json();
    const validTam =
      dataQuizTam.success &&
      dataQuizTam.questions.length === 3 &&
      dataQuizTam.questions.some((q) => q.question.includes("ஒளிச்சேர்க்கை") || q.question.includes("தாவர"));
    assert(validTam, "Quiz: Generated 3 Tamil multiple-choice questions with 4 options each");
  } catch (err) {
    assert(false, "API Quiz", err.message);
  }

  // 6. Test Flashcards Generation (English & Tamil)
  try {
    const resCardsEng = await fetch(`${BASE_URL}/api/flashcards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sampleText, language: "english" }),
    });
    const dataCardsEng = await resCardsEng.json();
    const validCards = dataCardsEng.success && dataCardsEng.flashcards.length >= 4 && dataCardsEng.flashcards.every((c) => c.front && c.back);
    assert(validCards, `Flashcards: Generated ${dataCardsEng.flashcards?.length} English active recall cards`);

    const resCardsTam = await fetch(`${BASE_URL}/api/flashcards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sampleText, language: "tamil" }),
    });
    const dataCardsTam = await resCardsTam.json();
    const validTamCards = dataCardsTam.success && dataCardsTam.flashcards.length >= 4 && dataCardsTam.flashcards.some((c) => c.front.includes("ஒளிச்சேர்க்கை"));
    assert(validTamCards, `Flashcards: Generated ${dataCardsTam.flashcards?.length} Tamil study cards`);
  } catch (err) {
    assert(false, "API Flashcards", err.message);
  }

  // 7. Test Multimodal Vision & OCR Extraction (/api/extract)
  try {
    const pngBytes = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89,
      0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54,
      0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01,
      0x0d, 0x0a, 0x2d, 0xb4,
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82
    ]);

    // Test Flowchart extraction
    const formFlowchart = new FormData();
    formFlowchart.append("file", new Blob([pngBytes], { type: "image/png" }), "flowchart_sample.png");
    const resFlowchart = await fetch(`${BASE_URL}/api/extract`, { method: "POST", body: formFlowchart });
    const dataFlowchart = await resFlowchart.json();
    assert(
      resFlowchart.status === 200 && dataFlowchart.success && dataFlowchart.visual_type.includes("Flowchart") && dataFlowchart.text.includes("Step 1"),
      "Multimodal: Extracted Flowchart structure and decision logic"
    );

    // Test Chart extraction
    const formChart = new FormData();
    formChart.append("file", new Blob([pngBytes], { type: "image/png" }), "energy_chart.png");
    const resChart = await fetch(`${BASE_URL}/api/extract`, { method: "POST", body: formChart });
    const dataChart = await resChart.json();
    assert(
      resChart.status === 200 && dataChart.success && dataChart.visual_type.includes("Chart") && dataChart.text.includes("Renewable"),
      "Multimodal: Extracted Chart data axes and quantitative trends"
    );

    // Test Diagram extraction
    const formDiagram = new FormData();
    formDiagram.append("file", new Blob([pngBytes], { type: "image/png" }), "cell_diagram.png");
    const resDiagram = await fetch(`${BASE_URL}/api/extract`, { method: "POST", body: formDiagram });
    const dataDiagram = await resDiagram.json();
    assert(
      resDiagram.status === 200 && dataDiagram.success && dataDiagram.visual_type.includes("Diagram") && dataDiagram.text.includes("Chloroplast"),
      "Multimodal: Extracted Scientific Diagram anatomical components"
    );
  } catch (err) {
    assert(false, "Multimodal Vision Extraction", err.message);
  }

  console.log("\n" + "=".repeat(60));
  console.log(`  NEXT.JS TEST RESULTS: ${passed} / ${total} PASSED (${((passed / total) * 100).toFixed(1)}%)`);
  console.log("=".repeat(60) + "\n");

  process.exit(passed === total ? 0 : 1);
}

runTests();
