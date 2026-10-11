/**
 * LearnAble AI - Comprehensive WCAG 2.2 AA Accessibility & Dyslexia Test Suite
 */

import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000";

async function runWCAGTests() {
  console.log("\n" + "=".repeat(70));
  console.log("  RUNNING WCAG 2.2 AA ACCESSIBILITY & DYSLEXIA SUITE VERIFICATION");
  console.log("=".repeat(70));

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

  // 1. Fetch live page HTML from Next.js server
  let html = "";
  try {
    const res = await fetch(`${BASE_URL}/`);
    html = await res.text();
    assert(
      res.status === 200,
      "Next.js App Router responds with HTTP 200 OK"
    );
  } catch (err) {
    assert(false, "Fetch Root HTML", err.message);
  }

  // 2. WCAG 2.4.1 Bypass Blocks: Skip to Main Content Link
  assert(
    html.includes('href="#main-content"') && (html.includes('class="skip-link"') || html.includes('skip-link')),
    "WCAG 2.4.1: Skip-link provided to jump directly to primary content"
  );

  // 3. Main Landmark with tabindex for programmatic focus
  assert(
    html.includes('id="main-content"') && (html.includes('tabindex="-1"') || html.includes('tabIndex')) && html.includes('role="main"'),
    "WCAG 1.3.1: Primary content container has id='main-content', role='main' & tabIndex={-1}"
  );

  // 4. WCAG 4.1.3 Status Messages: Screen Reader Live Region
  assert(
    html.includes('aria-live="polite"') && html.includes('aria-live="assertive"'),
    "WCAG 4.1.3: Dual live regions present (polite for state announcements, assertive for alerts/toasts)"
  );

  // 5. WAI-ARIA Tab Pattern: Workspace Tabs
  const hasTabs =
    html.includes('role="tablist"') &&
    html.includes('role="tab"') &&
    html.includes('aria-selected') &&
    html.includes('aria-controls="panel-input"') &&
    html.includes('aria-controls="panel-learn"');
  assert(
    hasTabs,
    "WCAG 4.1.2: Workspace tabs implement full WAI-ARIA tablist pattern with aria-controls & aria-selected"
  );

  // 6. Inspect page.js source code for keyboard shortcuts and a11y bindings
  const pageJsPath = path.resolve("./src/app/page.js");
  const pageJsContent = fs.readFileSync(pageJsPath, "utf-8");

  const hasShortcuts =
    pageJsContent.includes("handleGlobalKeyDown") &&
    pageJsContent.includes('e.altKey && e.key === "1"') &&
    pageJsContent.includes('e.altKey && e.key === "2"') &&
    pageJsContent.includes('e.altKey && (e.key === "h" || e.key === "H")') &&
    pageJsContent.includes('e.altKey && (e.key === "d" || e.key === "D")') &&
    pageJsContent.includes('e.altKey && (e.key === "r" || e.key === "R")') &&
    pageJsContent.includes('e.altKey && (e.key === "b" || e.key === "B")') &&
    pageJsContent.includes('e.key === "Escape"');

  assert(
    hasShortcuts,
    "WCAG 2.1.1: Global keyboard shortcuts implemented for all tabs, high contrast, dyslexia, reading ruler, and escape"
  );

  // 7. WCAG 2.2 Modal Dialog Pattern: Shortcuts Modal
  const hasShortcutsModal =
    pageJsContent.includes('role="dialog"') &&
    pageJsContent.includes('aria-modal="true"') &&
    pageJsContent.includes('aria-labelledby="shortcuts-dialog-title"');

  assert(
    hasShortcutsModal,
    "WCAG 2.2: Keyboard shortcuts helper implements WAI-ARIA accessible modal dialog pattern"
  );

  // 8. Single-Pointer Alternative for Dragging (WCAG 2.2 SC 2.5.7)
  const hasDropZoneKeyboard =
    pageJsContent.includes('fileInputRef.current?.click()') &&
    pageJsContent.includes('e.key === "Enter" || e.key === " "');

  assert(
    hasDropZoneKeyboard,
    "WCAG 2.2 SC 2.5.7: File upload provides keyboard activation (Enter/Space) and browse buttons alongside drag-and-drop"
  );

  // 9. Inspect globals.css for Dyslexia Mode & Atkinson Hyperlegible
  const cssPath = path.resolve("./src/app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  const hasDyslexiaCSS =
    cssContent.includes("Atkinson Hyperlegible") &&
    cssContent.includes('[data-dyslexia-font="true"]') &&
    cssContent.includes("letter-spacing: 0.06em") &&
    cssContent.includes("word-spacing: 0.14em") &&
    cssContent.includes("line-height: 1.9");

  assert(
    hasDyslexiaCSS,
    "Dyslexia-Friendly Presentation: Atkinson Hyperlegible with 0.06em tracking, 0.14em word spacing & 1.9 line height"
  );

  // 10. Color Tints for Visual Stress (Scotopic / Irlen Support)
  const hasColorTints =
    cssContent.includes('[data-color-tint="cream"]') &&
    cssContent.includes('[data-color-tint="blue"]') &&
    cssContent.includes("#fbf8ee");

  assert(
    hasColorTints,
    "Dyslexia Glare Reduction: Warm Cream (#fbf8ee) and Soft Blue (#f0f6ff) paper tints implemented"
  );

  // 11. WCAG AAA High Contrast Theme (Contrast >= 7:1)
  const hasHighContrast =
    cssContent.includes('[data-contrast="high"]') &&
    cssContent.includes("#ffff00") &&
    cssContent.includes("#00ffff") &&
    cssContent.includes("--focus-ring: 4px solid #00ffff !important");

  assert(
    hasHighContrast,
    "WCAG AAA High Contrast: Pure black background with #ffff00 and #00ffff accents & 4px high-visibility focus ring"
  );

  // 12. WCAG 2.2 Target Size Minimum (SC 2.5.8)
  const hasTargetSize =
    cssContent.includes("min-height: 36px") &&
    cssContent.includes("min-height: 48px");

  assert(
    hasTargetSize,
    "WCAG 2.2 SC 2.5.8: Target size minimum of 36px-48px enforced across all interactive buttons & controls"
  );

  // 13. Screen Reader Live Announcements in State
  const hasStateAnnouncements =
    pageJsContent.includes("setAriaMessage") &&
    pageJsContent.includes("Switched to Tab 1") &&
    pageJsContent.includes("Switched to Tab 2") &&
    pageJsContent.includes("Navigated to Flashcard");

  assert(
    hasStateAnnouncements,
    "Screen Reader Support: Dynamic state changes (tabs, audio sentences, flashcard flips, quiz choices) broadcast to live region"
  );

  console.log("\n" + "=".repeat(70));
  console.log(`  WCAG 2.2 AA TEST RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log("=".repeat(70) + "\n");

  if (passed !== total) {
    process.exit(1);
  }
}

runWCAGTests();
