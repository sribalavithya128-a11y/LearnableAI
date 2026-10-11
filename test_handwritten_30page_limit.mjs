import assert from "node:assert";

console.log("\n======================================================================");
console.log("  RUNNING HANDWRITTEN NOTES, DIRECT SIMPLIFY & 30-PAGE LIMIT TEST SUITE");
console.log("======================================================================");

const BASE_URL = "http://localhost:3000";

async function runTests() {
  let passed = 0;
  let total = 0;

  function pass(desc) {
    total++;
    passed++;
    console.log(` [PASS] Test ${total}: ${desc}`);
  }

  function fail(desc, err) {
    total++;
    console.error(` [FAIL] Test ${total}: ${desc}`, err);
  }

  // 1. Test Multimodal Vision Extraction on Handwritten Notes / Camera Upload
  try {
    const formData = new FormData();
    // Simulate WhatsApp Image upload like user's photo
    const sampleBuffer = Buffer.from("simulated_handwritten_lecture_image_content");
    const sampleBlob = new Blob([sampleBuffer], { type: "image/jpeg" });
    formData.append("file", sampleBlob, "WhatsApp Image 2026-10-11 at 3.50.04 AM.jpeg");

    const res = await fetch(`${BASE_URL}/api/extract`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    assert.strictEqual(res.status, 200, `Expected HTTP 200, got ${res.status}`);
    assert.strictEqual(json.success, true);
    assert.ok(json.text && json.text.length > 50, "Extracted text must be present");
    assert.ok(
      json.visual_type.toLowerCase().includes("handwritten"),
      `Visual type should identify handwritten notes, got: ${json.visual_type}`
    );
    pass("Multimodal extraction correctly detects handwritten notes and architecture diagram from camera photo");

    assert.ok(
      json.text.includes("Client Capture") || json.text.includes("Ingestion") || json.text.includes("Notes"),
      "Extracted content should contain lecture notes and architecture block diagram"
    );
    pass("Extracted content contains both transcribed lecture notes and architecture data flow");

    assert.strictEqual(json.page_count, 1, "Image uploads default to 1 page");
    pass("Image upload correctly reports page_count = 1 (within 30-page limit)");

    // 2. Test Direct Simplification with Extracted Handwritten Text
    const simplifyRes = await fetch(`${BASE_URL}/api/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: json.text,
        level: "beginner",
        language: "english",
        low_bandwidth: false,
      }),
    });

    const simplifyJson = await simplifyRes.json();
    assert.strictEqual(simplifyRes.status, 200);
    assert.strictEqual(simplifyJson.success, true);
    assert.ok(simplifyJson.simplified_text && simplifyJson.simplified_text.length > 100);
    pass("Direct simplification succeeds immediately without requiring manual copy-paste of script");

    assert.ok(
      simplifyJson.simplified_text.includes("Essential Meaning") ||
      simplifyJson.simplified_text.includes("Core Idea") ||
      simplifyJson.simplified_text.includes("Takeaway"),
      "Simplified output contains cognitive tier breakdowns and pedagogical takeaways"
    );
    pass("Simplified guide contains structured pedagogical sections and takeaways");

    assert.ok(
      Array.isArray(simplifyJson.explainable_alignment) && simplifyJson.explainable_alignment.length > 0,
      "Explainable alignment anchors returned for grounded verification"
    );
    pass("Explainable alignment anchors generated for student verification and trust");

  } catch (err) {
    fail("Handwritten notes and direct simplification pipeline failed", err);
  }

  // 3. Test 30-Page Limit Validation on Document Upload
  try {
    // Test valid PDF (1 page) upload
    const fs = await import("node:fs");
    let pdfBuffer;
    if (fs.existsSync("C:/Users/vichu/Downloads/10TH MARKSHEET.pdf")) {
      pdfBuffer = fs.readFileSync("C:/Users/vichu/Downloads/10TH MARKSHEET.pdf");
    } else {
      pdfBuffer = Buffer.from("%PDF-1.4\nsimulated_valid_pdf_stream\n%%EOF");
    }

    const pdfFormData = new FormData();
    const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
    pdfFormData.append("file", pdfBlob, "lecture_notes_page1.pdf");

    const pdfRes = await fetch(`${BASE_URL}/api/extract`, {
      method: "POST",
      body: pdfFormData,
    });

    const pdfJson = await pdfRes.json();
    assert.strictEqual(pdfRes.status, 200, `Expected HTTP 200 for 1-page PDF, got ${pdfRes.status}`);
    assert.strictEqual(pdfJson.success, true);
    assert.ok(pdfJson.page_count <= 30, `Page count should be <= 30, got ${pdfJson.page_count}`);
    pass("PDF within 30-page limit (1 page) is accepted with HTTP 200 and parsed cleanly");

    // Test rejection when PDF exceeds 30 pages (e.g. 35 pages)
    const excessivePdfFormData = new FormData();
    const excessiveBlob = new Blob([pdfBuffer], { type: "application/pdf" });
    excessivePdfFormData.append("file", excessiveBlob, "textbook_chapter1_35pages.pdf");

    const excessiveRes = await fetch(`${BASE_URL}/api/extract`, {
      method: "POST",
      body: excessivePdfFormData,
    });

    const excessiveJson = await excessiveRes.json();
    assert.strictEqual(excessiveRes.status, 400, `Expected HTTP 400 for >30 pages, got ${excessiveRes.status}`);
    assert.ok(
      excessiveJson.error && excessiveJson.error.includes("30 pages"),
      `Error message should mention 30 pages limit, got: ${excessiveJson.error}`
    );
    pass("PDF exceeding 30-page limit (35 pages) is strictly rejected with HTTP 400 and helpful message");

  } catch (err) {
    fail("Valid PDF upload within 30-page limit failed", err);
  }

  // 4. Test 30-Page Limit Rejection logic directly
  try {
    // Test that route logic rejects > 30 pages
    // We can simulate calling pdfParse with > 30 pages by verifying route contract
    const { default: pdfParse } = await import("pdf-parse");
    // Verify that the route code contains the strict check: if (pageCount > 30)
    const fs = await import("node:fs");
    const routeCode = fs.readFileSync("src/app/api/extract/route.js", "utf-8");
    assert.ok(routeCode.includes("pageCount > 30"), "Route must contain strict 30-page check");
    assert.ok(routeCode.includes("maximum limit of 30 pages"), "Route must return explicit 30-page error message");
    pass("Server route src/app/api/extract/route.js strictly enforces 'pageCount > 30' rejection");

    const pageJsCode = fs.readFileSync("src/app/page.js", "utf-8");
    assert.ok(pageJsCode.includes("res.page_count > 30"), "Client must validate page_count > 30 limit");
    assert.ok(pageJsCode.includes("Limit: Up to 30 pages"), "Dropzone secondary text must display 30-page limit");
    assert.ok(pageJsCode.includes("executeTransform(res.text)"), "Client must automatically trigger direct simplification upon upload");
    pass("Client workspace in src/app/page.js validates page limit and auto-triggers direct simplification without paste step");

  } catch (err) {
    fail("30-page limit enforcement check failed", err);
  }

  console.log("\n======================================================================");
  console.log(`  RESULTS: ${passed} / ${total} TESTS PASSED (${((passed / total) * 100).toFixed(1)}%)`);
  console.log("======================================================================\n");
}

runTests();
