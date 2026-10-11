/**
 * Test Suite for Explainable AI (XAI) & Document Grounding
 */

const BASE_URL = "http://localhost:3000";

async function runExplainableTests() {
  console.log("\n" + "=".repeat(65));
  console.log("  RUNNING EXPLAINABLE AI & DOCUMENT GROUNDING TEST SUITE");
  console.log("=".repeat(65));

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

  // 1. Test Science Sample Simplification with Grounded Anchors
  const scienceText =
    "Photosynthesis is a vital biochemical process executed by photoautotrophic organisms including green plants, phytoplankton, and cyanobacteria. Located primarily within the thylakoid membranes of chloroplasts, specialized pigment assemblies known as Photosystems I and II absorb photons in the blue and red regions of the electromagnetic spectrum. The harvested photon energy excites electrons within the P680 reaction center, initiating a non-cyclic electron transport cascade. Simultaneously, the oxygen-evolving complex catalyzes the photolysis of water molecules (2H2O -> 4H+ + 4e- + O2), releasing molecular oxygen as a byproduct into the atmosphere. The electrochemical proton gradient established across the thylakoid lumen drives chemiosmotic photophosphorylation via ATP synthase, synthesizing adenosine triphosphate (ATP) and reducing NADP+ to NADPH. In the surrounding stroma, the light-independent Calvin cycle utilizes RuBisCO enzymes to assimilate atmospheric carbon dioxide through carbon fixation, producing glyceraldehyde-3-phosphate which is subsequently converted into glucose (C6H12O6) for metabolic sustenance.";

  try {
    const res = await fetch(`${BASE_URL}/api/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: scienceText, level: "beginner", language: "english" }),
    });
    const data = await res.json();

    assert(
      res.status === 200 && data.success,
      "API /api/simplify returns HTTP 200 and success: true"
    );

    assert(
      typeof data.overall_confidence === "number" && data.overall_confidence > 95,
      `Overall confidence score present and >= 95% (${data.overall_confidence}%)`
    );

    assert(
      typeof data.factual_alignment_score === "number" && data.factual_alignment_score > 98,
      `Factual alignment score present and >= 98% (${data.factual_alignment_score}%)`
    );

    assert(
      data.equation_fidelity_score === 100,
      `Equation fidelity score is 100% strict invariant (${data.equation_fidelity_score}%)`
    );

    assert(
      Array.isArray(data.explainable_alignment) && data.explainable_alignment.length >= 4,
      `Explainable alignment returns ${data.explainable_alignment?.length} grounded anchors`
    );

    // Verify Anchor Structure
    const firstAnchor = data.explainable_alignment[0];
    const hasBbox =
      firstAnchor &&
      firstAnchor.bbox &&
      typeof firstAnchor.bbox.x === "number" &&
      typeof firstAnchor.bbox.y === "number" &&
      typeof firstAnchor.bbox.width === "number" &&
      typeof firstAnchor.bbox.height === "number";

    assert(
      hasBbox,
      `Anchor has spatial bounding box: [x:${firstAnchor?.bbox?.x}%, y:${firstAnchor?.bbox?.y}%, w:${firstAnchor?.bbox?.width}%, h:${firstAnchor?.bbox?.height}%]`
    );

    const hasFields =
      firstAnchor.id &&
      firstAnchor.region &&
      firstAnchor.confidence &&
      firstAnchor.preservation_type &&
      firstAnchor.source_chunk &&
      firstAnchor.simplified_chunk &&
      firstAnchor.rationale;

    assert(
      hasFields,
      "Anchor contains id, region, confidence, preservation_type, source_chunk, simplified_chunk, and rationale"
    );

    // Verify Equation Anchor
    const eqAnchor = data.explainable_alignment.find((a) => a.preservation_type === "equation");
    assert(
      eqAnchor && eqAnchor.source_chunk.includes("2H2O -> 4H+ + 4e- + O2"),
      "Water photolysis equation anchor is correctly tagged and preserved"
    );
  } catch (err) {
    assert(false, "Science Sample Simplification", err.message);
  }

  // 2. Test Arbitrary / Custom User Physics Text Dynamic Grounding
  const physicsText =
    "Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. Mathematically, this fundamental mechanical relationship is formulated as F = ma, where F denotes the vector net force in Newtons, m represents inertial mass in kilograms, and a signifies instantaneous acceleration. When an unbalanced external force acts on an object, it triggers a proportional change in velocity over elapsed time.";

  try {
    const resPhys = await fetch(`${BASE_URL}/api/simplify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: physicsText, level: "intermediate", language: "english" }),
    });
    const dataPhys = await resPhys.json();

    assert(
      resPhys.status === 200 && dataPhys.success,
      "Custom Physics Material simplified successfully"
    );

    assert(
      Array.isArray(dataPhys.explainable_alignment) && dataPhys.explainable_alignment.length >= 2,
      `Custom Physics Material generated ${dataPhys.explainable_alignment?.length} dynamic anchors`
    );

    const hasEquation = dataPhys.explainable_alignment.some((a) => a.preservation_type === "equation");
    assert(
      hasEquation,
      "Dynamic engine detected equation F = ma in custom physics text"
    );

    const hasRationale = dataPhys.explainable_alignment.every((a) => a.rationale && a.rationale.length > 20);
    assert(
      hasRationale,
      "Dynamic engine generated pedagogical rationales for all custom chunks"
    );
  } catch (err) {
    assert(false, "Custom Physics Dynamic Grounding", err.message);
  }

  console.log("\n" + "=".repeat(65));
  console.log(`  EXPLAINABLE AI TEST RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log("=".repeat(65) + "\n");

  if (passed !== total) {
    process.exit(1);
  }
}

runExplainableTests();
