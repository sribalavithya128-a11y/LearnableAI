process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { purifyToPureTamil, TAMIL_GLOSSARY } from "./src/lib/tamilTranslator.js";

async function fetchTranslateChunk(text) {
  if (!text || !text.trim()) return "";
  if (/[\u0B80-\u0BFF]/.test(text) && !/[a-zA-Z]{3,}/.test(text)) return text;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ta&dt=t&q=${encodeURIComponent(text.trim())}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0].map((x) => (x && x[0]) ? x[0] : "").join("");
    }
    return text;
  } catch (err) {
    return text;
  }
}

async function testFull() {
  const text = `The solar system formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.
The vast majority of the system's mass is in the Sun, with the remainder contained in the eight planets.
The four inner planets are terrestrial planets, composed primarily of rock and metal.
Gravity governs the orbital mechanics of all celestial bodies.`;

  console.log("Original input:\n", text);

  const translatedTitle = purifyToPureTamil(await fetchTranslateChunk("The Solar System and Planetary Formation"));
  const translatedMeaning = purifyToPureTamil(await fetchTranslateChunk(text.split("\n")[0]));
  const translatedSentences = await Promise.all(text.split("\n").map(async (s) => purifyToPureTamil(await fetchTranslateChunk(s))));

  console.log("\nTranslated Title:", translatedTitle);
  console.log("Translated Meaning:", translatedMeaning);
  console.log("Translated Sentences:\n", translatedSentences.join("\n"));
}

testFull();
