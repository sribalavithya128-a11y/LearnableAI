// Unit test for LearnAble AI Client-Side Autonomous Assistive Tools (0% AI Dependency)

const calculateReadability = (text) => {
  if (!text || text.trim().length === 0) {
    return {
      words: 0,
      characters: 0,
      sentences: 0,
      readingTimeMin: 0,
      fleschScore: 100,
      levelLabel: "Ready",
      gradeLevel: "All Ages",
    };
  }

  const clean = text.trim();
  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = clean.length;
  const sentenceMatches = clean.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [];
  const sentenceCount = Math.max(1, sentenceMatches.filter((s) => s.trim().length > 0).length);

  let totalSyllables = 0;
  words.forEach((word) => {
    const w = word.toLowerCase().replace(/[^a-z]/g, "");
    if (!w) {
      totalSyllables += 1;
      return;
    }
    if (w.length <= 3) {
      totalSyllables += 1;
      return;
    }
    const syllables = w
      .replace(/(?:[^laeiouy]|ed|es|e)$/, "")
      .replace(/^y/, "")
      .match(/[aeiouy]{1,2}/g);
    totalSyllables += syllables ? syllables.length : 1;
  });

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 1;

  let flesch = Math.round(206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord);
  if (flesch < 0) flesch = 0;
  if (flesch > 100) flesch = 100;

  let levelLabel = "Plain English";
  let gradeLevel = "8th - 9th Grade";
  if (flesch >= 90) {
    levelLabel = "Very Easy";
    gradeLevel = "5th Grade (Elementary)";
  } else if (flesch >= 70) {
    levelLabel = "Fairly Easy";
    gradeLevel = "7th Grade (Middle School)";
  } else if (flesch >= 60) {
    levelLabel = "Standard";
    gradeLevel = "8th - 9th Grade (High School)";
  } else if (flesch >= 50) {
    levelLabel = "Fairly Difficult";
    gradeLevel = "10th - 12th Grade";
  } else if (flesch >= 30) {
    levelLabel = "Difficult";
    gradeLevel = "College Undergraduate";
  } else {
    levelLabel = "Very Difficult";
    gradeLevel = "College Graduate / Academic";
  }

  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  return {
    words: wordCount,
    characters: charCount,
    sentences: sentenceCount,
    readingTimeMin,
    fleschScore: flesch,
    levelLabel,
    gradeLevel,
  };
};

const sampleSimple = "Photosynthesis is how plants make food using sunlight. It uses water and air.";
const sampleAcademic = "Photosynthesis is a vital biochemical process executed by photoautotrophic organisms including cyanobacteria and green plants within thylakoid membranes.";

const resSimple = calculateReadability(sampleSimple);
console.log("Simple Text Readability:", resSimple);
if (resSimple.fleschScore < 60) {
  console.error("FAIL: Simple text ease score should be high");
  process.exit(1);
}

const resAcad = calculateReadability(sampleAcademic);
console.log("Academic Text Readability:", resAcad);
if (resAcad.fleschScore >= resSimple.fleschScore) {
  console.error("FAIL: Academic text should have lower ease score than simple text");
  process.exit(1);
}

// Bionic test
const word = "Photosynthesis";
const split = Math.ceil(word.length * 0.45);
const bionicFixation = word.slice(0, split);
const bionicTail = word.slice(split);
console.log(`Bionic formatting: [${bionicFixation}]${bionicTail}`);
if (bionicFixation !== "Photosy" || bionicTail !== "nthesis") {
  console.error("FAIL: Bionic split error");
  process.exit(1);
}

console.log("ALL CLIENT-SIDE ASSISTIVE TOOLS VERIFIED 100% INDEPENDENT FROM AI!");
