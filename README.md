# LearnAble AI 🌟
### AI-Based Accessible Learning Content Transformation Platform
*Universal Design for Learning (UDL) &bull; Next.js 14 &bull; Node.js &bull; Bilingual English &amp; Tamil*

---

## 📖 Table of Contents
1. [Overview & Problem Statement](#overview--problem-statement)
2. [What Makes LearnAble AI Different](#what-makes-learnable-ai-different)
3. [Architecture for Beginners](#architecture-for-beginners)
4. [Windows Step-by-Step Setup Guide](#windows-step-by-step-setup-guide)
5. [Feature-by-Feature Testing Checklist](#feature-by-feature-testing-checklist)
6. [Common Errors and Fixes](#common-errors-and-fixes)
7. [3-Minute Hackathon Presentation Script](#3-minute-hackathon-presentation-script)
8. [Project File Structure](#project-file-structure)

---

## 🎯 Overview & Problem Statement

Over 15% of students worldwide have learning differences such as dyslexia, ADHD, or cognitive processing barriers. Millions of non-native students also struggle with dense English educational materials.

**LearnAble AI** transforms complex educational documents (PDFs, scans, photos, diagrams, charts, flowcharts, or raw text) into an **accessible, multimodal learning experience**:
- 👁️ **Multimodal Vision & Structural Extraction:** Extracts structured logic, decision branches, coordinate axes, and anatomical callouts from **diagrams, flowcharts, charts, scans, and PDFs** using Claude 3.5 Sonnet Vision and Tesseract OCR.
- 🧠 **Cognitive Simplification:** Beginner, Intermediate, and Advanced tiers that preserve factual accuracy and explain technical jargon.
- 🌐 **Multilingual Support:** High-quality translation and simplification in **English** and **Tamil (தமிழ்)**.
- 🔊 **Read-Aloud Audio Reader:** Free browser Web Speech API with sentence-by-sentence reading and speed controls that prevent browser audio timeouts.
- 📝 **Comprehension Quizzes:** Auto-generated 4-option interactive multiple-choice questions with real-time feedback and explanations.
- 🗂️ **Active Recall Flashcards:** 3D animated flip cards with keyboard navigation for spaced repetition.
- 👁️ **Accessibility-First Design:** Atkinson Hyperlegible typography, WCAG AAA high contrast, dark mode, customizable line/letter spacing, and screen-reader live regions.
- 💾 **Exportable Study Notes:** Downloadable `.txt` study guides encoded with **UTF-8 BOM** so Tamil script renders flawlessly in native Windows Notepad.

---

## 💎 What Makes LearnAble AI Different

| Feature | Standard AI Summarizers | **LearnAble AI** |
| :--- | :--- | :--- |
| **Tech Stack** | Python script / basic template | **Unified Next.js 14 + Node.js full-stack platform with zero compilation overhead** |
| **Multimodal Extraction** | Plain text only; fails on visual graphics | **Multimodal Vision & OCR: Extracts structure & data from flowcharts, charts, diagrams, and scans** |
| **All-in-One Transformation** | Generates only a summary paragraph | **One upload generates visual synthesis, simplified text, Tamil/English, audio, flashcards, and an interactive quiz** |
| **Accessibility Built-in** | Generic text box, poor contrast | **Atkinson Hyperlegible font, High-Contrast AAA mode, font scale, line/letter spacing controls** |
| **Privacy & Security** | Stores student documents on servers/databases | **100% In-Memory Processing: No files or personal data are ever written to disk or database** |
| **Cost & Reliability** | Requires expensive paid ElevenLabs/TTS APIs | **Uses Free Browser Web Speech API** with smart sentence splitting to prevent browser timeout truncation |
| **Windows Native Support** | Text files often open corrupted in Notepad | **Includes UTF-8 BOM** so Tamil and English notes open cleanly in native Windows Notepad |
| **Zero-Configuration Demo** | Crashes if no API key is provided | **Built-in Demo Mode (`DEMO_MODE=true`)** allowing judges and reviewers to test immediately |

---

## 🏗️ Architecture for Beginners

```
+-----------------------------------------------------------------------------------+
|                            NEXT.JS 14 FRONTEND                                    |
|   React Client Components + Atkinson Hyperlegible Font + Web Speech Audio API    |
|   Interactive Views: Multimodal Upload, Learn & Listen, Quizzes, 3D Flashcards    |
+----------------------------------------+------------------------------------------+
                                         | HTTP Requests (JSON & FormData)
                                         v
+----------------------------------------+------------------------------------------+
|                            NODE.JS API ROUTE HANDLERS                             |
|   /api/status      -> Live environment health check                               |
|   /api/extract     -> In-memory PDF parser, Claude Vision & Tesseract.js OCR      |
|   /api/simplify    -> Cognitive accessibility simplification tiers                |
|   /api/quiz        -> 4-option MCQs with explanations                            |
|   /api/flashcards  -> Active-recall front/back study cards                       |
+----------------------------------------+------------------------------------------+
                                         |
                   +---------------------+---------------------+
                   v                                           v
+------------------------------------+       +------------------------------------+
|    ANTHROPIC CLAUDE 3.5 VISION     |       |         DEMO MODE ENGINE           |
|  - Multimodal Vision Understanding |       |  Curated structures for flowcharts,|
|  - Cognitive Simplification        |       |  charts, diagrams, science & Tamil |
|  - Bilingual English/Tamil Quizzes |       |  for offline instant testing       |
```

1. **Frontend (Next.js & React):** Modern, responsive, accessible interface with keyboard controls, dark mode, high-contrast theme, and audio playback.
2. **Backend (Node.js Route Handlers):** Next.js App Router API handlers running on Node.js runtime. Processes documents in memory without saving files to disk.
3. **AI Helper Gateway (`src/lib/llm.js`):** Unified helper function `callLLM()` wrapping Anthropic Claude SDK with automatic fallback to offline Demo Mode.

---

## 🪟 Windows Step-by-Step Setup Guide

### 1. Prerequisites Check
Ensure Node.js (v18+) is installed:
```powershell
node -v
npm -v
```

### 2. Install Dependencies
Open your PowerShell terminal in the project directory:
```powershell
cd C:\Users\vichu\OneDrive\Desktop\LearnAbleAI
npm install
```

### 3. Configure Environment Variables
Open the `.env` file in VS Code:
```env
# Set to 'true' to run immediately in hackathon demo mode (no API key needed!)
DEMO_MODE=true

# To use real Claude 3.5 Sonnet, paste your Anthropic API key here and set DEMO_MODE=false
ANTHROPIC_API_KEY=your_anthropic_api_key_here
LLM_MODEL=claude-sonnet-5-5

PORT=3000
```

### 4. Run the Application
Start the development server with one command:
```powershell
npm run dev
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## ✅ Feature-by-Feature Testing Checklist

- [ ] **1. System Health Check (`/api/status`):**
  - Verify that the status banner shows:
    - "Demo Mode Active (Ready to test)" or "Claude AI Active"
    - "Claude 3.5 Sonnet"
    - "OCR: Tesseract.js Ready"
    - "Stack: Next.js + Node.js"
- [ ] **2. Quick Sample & Multimodal Visual Tests:**
  - Click **"🔬 Science"**: Populates photosynthesis academic text.
  - Click **"🏛️ History"**: Populates Indus Valley Civilization text.
  - Click **"🇮🇳 தமிழ்"**: Populates Tamil text and switches language to Tamil.
  - Click **"🔀 Flowchart"**: Simulates extracted scientific process logic with 6 sequential steps and decision branches.
  - Click **"📊 Chart / Graph"**: Simulates extracted multi-series renewable energy trends (Solar, Wind, Hydro 2015-2025).
  - Click **"🧬 Diagram"**: Simulates extracted cellular chloroplast cross-section with anatomical callouts.
- [ ] **3. Multimodal Document Upload & Vision Extraction:**
  - Drag and drop or browse for a PDF, scan, flowchart, chart, or scientific diagram image.
  - Verify the upload progress indicator: "Extracting text & visual structure via Multimodal Vision & OCR...".
  - Verify the **Visual Classification Badge** (e.g. `👁️ Flowchart / Process Map` or `👁️ Chart / Data Graph`) and the **Structural Overview** summary banner.
- [ ] **4. Content Simplification (Tiers & Languages):**
  - Select **Beginner**, **Intermediate**, or **Advanced**.
  - Choose **English** or **Tamil**.
  - Click **"⚡ Transform Content"**.
  - View the side-by-side comparison between original and simplified text.
- [ ] **5. Read-Aloud Audio Reader:**
  - In Tab 2, click **"▶ Play"**.
  - Observe the sentence tracker ("Sentence 1 of 8").
  - Test **Pause**, **Resume**, and **Stop**.
  - Change playback speed (0.75x, 1.25x, 1.5x, 2.0x).
- [ ] **6. Interactive Self-Assessment Quiz:**
  - Switch to Tab 3 ("Interactive Quiz").
  - Select question count (3, 5, 8, 10) and click **"Generate Quiz"**.
  - Answer each question:
    - Click an option &bull; correct answers turn **green**, incorrect turn **red**.
    - Verify the explanation reveals why that answer is correct.
    - Check the live score tracker.
  - View the final score summary card and test **"🔄 Retry This Quiz"**.
- [ ] **7. Active Recall Flashcards:**
  - Switch to Tab 4 ("Smart Flashcards") and click **"Generate Flashcards"**.
  - Click the card or press <kbd>Space</kbd> / <kbd>Enter</kbd> to flip between question and answer.
  - Use <kbd>&larr;</kbd> and <kbd>&rarr;</kbd> arrow keys to navigate between cards.
  - Check the counter ("Card 1 of 5").
- [ ] **8. Accessibility (A11y) Modes:**
  - Click **A-**, **A**, **A+**, **A++** to verify font scaling.
  - Test **Normal**, **Relaxed**, and **Expanded** spacing.
  - Click **🌙 Dark Mode** to toggle dark theme.
  - Click **⚡ High Contrast** to test high-contrast yellow/black WCAG AAA mode.
  - Click **⏸ Reduced Motion** to pause animations.
  - Refresh the browser &bull; preferences persist via `localStorage`!
  - Test keyboard navigation using <kbd>Tab</kbd> and verify visible focus outlines.
  - Test the **"Skip to main content"** link.
- [ ] **9. Download Notes (.txt with UTF-8 BOM):**
  - In Tab 2, click **"💾 Download Notes (.txt)"**.
  - Open the file in Windows Notepad.
  - Verify that Tamil text renders perfectly without corrupted question marks.

---

## 🛠️ Common Errors and Fixes

| Issue / Error | Cause | Quick Fix |
| :--- | :--- | :--- |
| **`UNABLE_TO_VERIFY_LEAF_SIGNATURE` during `npm install`** | Local Windows SSL certificate chain mismatch | Run `npm install --strict-ssl=false` in PowerShell. |
| **Port 3000 in use** | Another Next.js or React app is running on port 3000 | In PowerShell, run: `Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force`, or Next.js will automatically offer port 3001. |
| **Tamil voice sounds robotic or unavailable** | Missing Tamil Speech Voice Pack on Windows | Open Windows Settings &rarr; **Time & Language** &rarr; **Speech** &rarr; **Add voices** &rarr; Install **"Tamil (India)"**, then restart your browser. |
| **Authentication Error with Anthropic** | Invalid or missing API key when demo mode is off | Check your key in `.env`. Alternatively, keep `DEMO_MODE=true` to test all features with curated offline sample data. |

---

## 🎤 3-Minute Hackathon Presentation Script

**[0:00 - 0:30] The Hook & Problem**
> *"Judges, over 15% of students worldwide face learning disabilities such as dyslexia, ADHD, or cognitive processing barriers. Additionally, millions of non-native students struggle with dense English textbooks. When presented with 10 pages of academic jargon, these students don't fail because they lack intelligence—they fail because traditional educational materials lack accessibility. Today, we introduce **LearnAble AI**."*

**[0:30 - 1:15] The Next.js & Node.js Solution**
> *"LearnAble AI is an AI-powered Accessible Content Transformation platform built on modern Next.js 14 and Node.js. With a single upload—whether it's a PDF, a textbook photo, or raw lecture notes—LearnAble AI extracts the text securely in memory without ever storing student files. In seconds, it produces three cognitive simplification tiers: Beginner, Intermediate, and Advanced, in both English and Tamil."*

**[1:15 - 2:00] Multimodal Learning & Free Audio**
> *"Accessibility isn't just about text. We integrated a zero-cost browser audio reader using the Web Speech API. Notice our custom sentence-chunking engine: it splits paragraphs into atomic sentences, completely eliminating the common browser bug where audio cuts off after 15 seconds. For visual and cognitive accessibility, students can switch between standard Atkinson Hyperlegible typography, WCAG AAA high-contrast black & yellow mode, custom line spacing, and dark mode."*

**[2:00 - 2:35] Active Recall: Quizzes & Flashcards**
> *"Reading alone doesn't guarantee learning. LearnAble AI automatically generates interactive 4-option multiple choice quizzes with instant pedagogical feedback and explanations, alongside 3D active-recall flashcards that flip with a keystroke. Finally, students can download their complete study guide as a text file equipped with UTF-8 BOM, ensuring that languages like Tamil display perfectly even in basic Windows Notepad."*

**[2:35 - 3:00] Impact & Conclusion**
> *"LearnAble AI is privacy-friendly, zero-database, runs offline in Demo Mode, and works with a single `npm run dev` command. It bridges the gap between complex academia and inclusive education. Thank you, and we welcome your questions!"*

---

## 📁 Project File Structure

```
LearnAbleAI/
├── package.json          # Next.js & Node.js dependencies
├── next.config.mjs       # Next.js configuration
├── .env.example          # Environment variables template
├── .env                  # Active environment settings
├── .gitignore            # Git exclusion rules
├── README.md             # Complete documentation and hackathon guide
└── src/
    ├── app/
    │   ├── layout.js     # Root layout with Atkinson Hyperlegible & Tamil fonts
    │   ├── page.js       # Main interactive dashboard component
    │   ├── globals.css   # Full UDL stylesheet & high-contrast theme
    │   └── api/          # Node.js backend route handlers
    │       ├── status/route.js
    │       ├── extract/route.js
    │       ├── simplify/route.js
    │       ├── quiz/route.js
    │       └── flashcards/route.js
    └── lib/
        ├── llm.js        # Centralized LLM gateway (Anthropic Claude + Demo mode)
        └── demoData.js   # High-quality bilingual curriculum samples
```

---

*Built with ❤️ for accessible, inclusive education.*
