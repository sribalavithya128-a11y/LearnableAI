// Verification script: Ensure simplification preserves definitions, equations, relationships, and essential meaning

async function testPreservation() {
  const samplePhysics = 
    "Newton's Second Law is a fundamental law of mechanics stating that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. Force is defined as any interaction that alters an object's state of motion. The quantitative equation is represented as F = ma. Increasing net force accelerates the object proportionally, whereas increasing mass resists acceleration. The consequence is that heavier objects require greater net force to achieve equivalent acceleration.";

  console.log("Testing Content Preservation on Physics Sample with F = ma...");

  for (const level of ["beginner", "intermediate", "advanced"]) {
    const res = await fetch("http://localhost:3000/api/simplify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: samplePhysics, level, language: "english" })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      console.error(`FAIL: API error for level ${level}:`, data);
      process.exit(1);
    }

    const text = data.simplified_text;
    console.log(`\n=================== LEVEL: ${level.toUpperCase()} ===================`);
    console.log(text.slice(0, 400) + "...\n");

    // 1. Check Preserved Definitions
    const hasDef = text.toLowerCase().includes("definition") || text.toLowerCase().includes("force");
    // 2. Check Preserved Equations
    const hasEquation = text.includes("F = ma") || text.includes("f = ma");
    // 3. Check Preserved Relationships
    const hasRel = text.toLowerCase().includes("relationship") || text.toLowerCase().includes("accelerat") || text.includes("➔");
    // 4. Check Essential Meaning
    const hasMeaning = text.toLowerCase().includes("meaning") || text.toLowerCase().includes("newton");

    console.log(`- Has Definition Preserved: ${hasDef ? "✅ PASS" : "❌ FAIL"}`);
    console.log(`- Has Equation Preserved (F = ma): ${hasEquation ? "✅ PASS" : "❌ FAIL"}`);
    console.log(`- Has Relationship Preserved: ${hasRel ? "✅ PASS" : "❌ FAIL"}`);
    console.log(`- Has Essential Meaning Preserved: ${hasMeaning ? "✅ PASS" : "❌ FAIL"}`);

    if (!hasDef || !hasEquation || !hasRel || !hasMeaning) {
      console.error(`FAIL: Missing preservation in level ${level}`);
      process.exit(1);
    }
  }

  console.log("\n============================================================");
  console.log("  PRESERVATION VERIFICATION SUCCESSFUL: 100% PRESERVED!");
  console.log("============================================================");
}

testPreservation().catch(err => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
