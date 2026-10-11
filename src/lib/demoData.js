/**
 * LearnAble AI - Demo Mode Mock Content & Curriculum Data
 * Used when DEMO_MODE=true or when offline/testing without an Anthropic API key.
 * Every response is clearly marked with the DEMO banner.
 */

export const DEMO_BANNER = "[DEMO MODE - not generated from your text]";
export const DEMO_BANNER_TAMIL = "[மாதிரித் தரவு முறை]";

export const DEMO_MULTIMODAL = {
  flowchart: {
    visualType: "Flowchart / Process Map",
    title: "The Scientific Method & Experimental Logic Flowchart",
    structureSummary: "Sequential logic with hypothesis testing, conditional feedback loops, and conclusion states.",
    text: `### 🔀 Identified Visual: Sequential Decision Flowchart
**Title:** The Scientific Method & Experimental Verification

#### 1. Step-by-Step Execution Sequence
- **Step 1 [Start]:** Make an Observation & Formulate a Question (e.g., Why do plant leaves turn towards sunlight?).
- **Step 2 [Research]:** Conduct Background Literature Review & Gather Existing Domain Knowledge.
- **Step 3 [Hypothesis]:** Formulate Testable Hypothesis (If light intensity increases, then phototropism rate will accelerate).
- **Step 4 [Experimentation]:** Design Controlled Experiment with Independent, Dependent, and Controlled Variables.
- **Step 5 [Decision Diamond]:** Does data support hypothesis?
  - ➔ **Branch A [NO]:** Analyze experimental errors ➔ Refine hypothesis ➔ Return to Step 3.
  - ➔ **Branch B [YES]:** Verify reproducibility across multiple sample trials ➔ Proceed to Step 6.
- **Step 6 [Conclusion & Publishing]:** Document quantitative findings and present peer-reviewed results.

#### 2. Accessible Visual Description
A top-to-bottom flowchart featuring rectangular procedure blocks, a central decision diamond for hypothesis validation with a feedback loop returning to the hypothesis stage, and a final oval terminal indicating conclusion.`
  },

  chart: {
    visualType: "Chart / Data Graph",
    title: "Global Renewable Energy Growth by Source (2015 - 2025)",
    structureSummary: "Multi-series comparative bar and line graph showing solar, wind, and hydro gigawatt capacity.",
    text: `### 📊 Identified Visual: Multi-Series Comparative Data Chart
**Title:** Global Renewable Energy Capacity (2015–2025)

#### 1. Axes & Metadata
- **X-Axis:** Timeline in Years (2015, 2018, 2021, 2024, 2025 Projected).
- **Y-Axis:** Total Installed Electric Capacity in Gigawatts (GW), ranging from 0 to 2,500 GW.
- **Legend:** Solar Photovoltaic (Yellow), Wind Energy (Cyan), Hydroelectric (Deep Blue).

#### 2. Quantitative Data Breakdown
- **2015 Baseline:** Solar (230 GW) | Wind (430 GW) | Hydro (1,060 GW)
- **2021 Midpoint:** Solar (850 GW) | Wind (830 GW) | Hydro (1,230 GW)
- **2025 Target:** Solar (2,100 GW) | Wind (1,450 GW) | Hydro (1,380 GW)

#### 3. Analytical Trends & Key Takeaways
1. **Exponential Solar Acceleration:** Solar PV grew by nearly **900%**, surpassing both wind and hydro to become the largest renewable capacity source by 2024.
2. **Stable Baseline Hydro:** Hydroelectric capacity increased modestly with steady linear maintenance.
3. **Core Conclusion:** Global clean energy installation pace accelerated three-fold between 2020 and 2025, driven by declining photovoltaic manufacturing costs.`
  },

  diagram: {
    visualType: "Scientific Anatomy Diagram",
    title: "Cross-Section Anatomy of the Plant Chloroplast & Thylakoid Organelle",
    structureSummary: "Detailed botanical diagram with labeled callout lines, concentric membranes, and metabolic compartments.",
    text: `### 🔬 Identified Visual: Cellular Organelle Cross-Section Diagram
**Title:** Ultrastructure of the Plant Chloroplast

#### 1. Labeled Anatomical Components & Spatial Layout
- **Outer Membrane:** Smooth, permeable semi-rigid bilayer enclosing the organelle.
- **Intermembrane Space:** Narrow fluid gap maintaining chemical separation.
- **Inner Membrane:** Highly selective transporter membrane regulating metabolite movement.
- **Stroma:** Dense aqueous enzymatic fluid surrounding thylakoids (site of the Dark Reactions / Calvin Cycle).
- **Thylakoid Disk:** Flattened membrane sac containing chlorophyll pigment complexes (site of Light Reactions).
- **Granum (Plural: Grana):** Stacked columnar piles of thylakoid disks resembling coin towers.
- **Stroma Lamellae:** Tubular connective bridges interconnecting distinct grana stacks.
- **Plastid DNA & Ribosomes:** Circular genetic plasmids suspended within stroma for independent protein synthesis.

#### 2. Accessible Alt-Text / Description
An oval cross-sectional illustration revealing an emerald-green interior filled with interconnected coin-like stacks (grana) floating in a pale fluid (stroma), with distinct pointer lines identifying each biochemical compartment.`
  },

  handwritten: {
    visualType: "Handwritten Notes & System Architecture Diagram",
    title: "Handwritten Engineering Lecture Notes & Architecture Flowchart",
    structureSummary: "Transcribed handwritten notes with recognized architectural block diagram, ingestion pipeline, and decision nodes.",
    text: `### 📝 Identified Visual: Handwritten Notes & System Architecture Diagram
**Document Type:** Handwritten Notes & Drawn System Flowchart

#### 1. Transcribed Handwritten Notes
- **Problem Statement & Core Objective:** Systematic data ingestion, feature classification, and automated recommendation pipeline.
- **Ingestion Layer:** Raw input signals, camera images, and student notes are validated through edge ingestion filters.
- **Key Pipeline Stages:**
  1. **User Capture & Ingestion:** Acquires input documents, camera photos, and handwritten pages.
  2. **Preprocessing & Noise Filter:** Removes scanning blur, normalizes contrast, and isolates structural regions.
  3. **Core Intelligent Processing Engine:** Evaluates visual features, applies cognitive simplification rules, and classifies content.
  4. **State Persistence & Database:** Stores verified concept maps, question banks, and progress analytics.
  5. **Accessible User Interface:** Renders multi-tiered pedagogical breakdowns, audio speech, and interactive flashcards.

#### 2. Transcribed Diagram Architecture & Data Flow
\`\`\`text
[ Client Capture / Mobile Photo ]
                │
                ▼
[ Ingestion & Noise Filter ]
                │
                ▼
[ Intelligent Model & Classifier ] ────► [ Persistent Database / State ]
                │
                ▼
[ Multi-Tier Simplified Output & Audio Reader ]
\`\`\`

#### 3. Accessible Alt-Text & Visual Description
A photograph of a handwritten paper page featuring lecture notes written in blue ink, followed by a hand-drawn 4-stage architectural block diagram with arrows showing data flow from ingestion to final accessible output.`
  }
};

export const DEMO_CONTENT = {
  beginner: {
    english: `${DEMO_BANNER}

### 🌟 Photosynthesis: How Plants Make Food & Oxygen

#### 💡 Essential Meaning & Core Idea
Photosynthesis is how plants use sunlight, water, and air to make their own food (sugar) while releasing clean oxygen for all living beings to breathe.

#### 📖 Preserved Definitions & Key Terminology
- **Photosynthesis:** The vital biological process where green plants turn light into food.
- **Chloroplasts:** The tiny green food factories inside plant leaves.
- **Thylakoid Membranes:** Flat sacs inside chloroplasts holding light-absorbing pigment machines (Photosystems I and II).
- **Calvin Cycle:** The food-making stage in the stroma that uses enzymes to build glucose.

#### ➗ Preserved Equations & Formulas
- \`2H2O -> 4H+ + 4e- + O2\` ➔ **Water Photolysis:** 2 water molecules split into hydrogen ions, electrons, and breathable oxygen gas.
- \`C6H12O6\` ➔ **Glucose:** The energy-rich sugar molecule made by plants for survival.

#### 🔄 Preserved Relationships & Step-by-Step Flow
- **1. Sunlight Absorption ➔ Electron Excitation:** Chlorophyll catches light photons, energizing electrons in reaction center P680.
- **2. Water Splitting ➔ Oxygen Release:** Water splits to replenish electrons, releasing oxygen ($O_2$) into our atmosphere.
- **3. Proton Flow ➔ ATP Energy Synthesis:** Hydrogen ions build up and flow through ATP synthase to make cellular energy ($ATP$).
- **4. Carbon Fixation ➔ Sugar Building:** The Calvin cycle uses RuBisCO to capture $CO_2$ and convert it into glucose ($C_6H_{12}O_6$).

#### 🧩 Helpful Analogy
Think of a plant leaf like a clean, solar-powered kitchen: sunlight powers the blender, water and air provide the ingredients, and the final dish is sweet plant food with fresh oxygen as a healthy bonus!

#### 🎯 Key Takeaway
Without plants splitting water and capturing carbon dioxide, Earth would have no food chain and no oxygen to breathe!`,

    tamil: `${DEMO_BANNER_TAMIL}

### 🌟 ஒளிச்சேர்க்கை: தாவரங்களின் உணவு தயாரிப்பு முறை

#### 💡 அடிப்படைக் கல்விப் பொருள்
ஒளிச்சேர்க்கை என்பது தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் காற்றைப் பயன்படுத்தி தங்களுக்குத் தேவையான சர்க்கரை உணவை தாங்களே தயாரித்துக் கொண்டு, அனைத்து உயிரினங்களுக்கும் தேவையான தூய ஆக்ஸிஜனை வெளியிடும் மகத்தான இயற்கை நிகழ்வாகும்.

#### 📖 பாதுகாக்கப்பட்ட வரையறைகள் & கலைச்சொற்கள்
- **ஒளிச்சேர்க்கை:** தாவரங்கள் ஒளி ஆற்றலை வேதியியல் ஆற்றலாக மாற்றும் தொடர் நிகழ்வு.
- **பசுங்கணிகம்:** தாவர இலைகளில் ஒளிச்சேர்க்கை நடைபெறும் பச்சைய செல்கள்.
- **தைலகாய்டு சவ்வு:** சூரிய ஒளியை ஏற்கும் நிறமிகள் கொண்ட தட்டு வடிவிலான அடுக்குகள்.
- **கால்வின் சுழற்சி:** கார்பன் டை ஆக்சைடை குளுக்கோஸாக மாற்றும் இருள் வினை சுழற்சி.

#### ➗ பாதுகாக்கப்பட்ட வேதியியல் சமன்பாடுகள்
- \`2H2O -> 4H+ + 4e- + O2\` ➔ **நீரின் ஒளிச்சிதைவு:** நீர் மூலக்கூறுகள் பிளக்கப்பட்டு நாம் சுவாசிக்கும் தூய ஆக்ஸிஜன் வாயு வெளியாகிறது.
- \`C6H12O6\` ➔ **குளுக்கோஸ்:** தாவரங்கள் தயாரிக்கும் முதன்மை ஊட்டச்சத்து சர்க்கரை.

#### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்
- **1. சூரிய ஒளி உறிஞ்சுதல் ➔ எலக்ட்ரான் கிளர்ச்சி:** பச்சையம் சூரிய ஒளியை உறிஞ்சி எலக்ட்ரான்களை இயக்குகிறது.
- **2. நீர் பிளத்தல் ➔ ஆக்ஸிஜன் வெளியீடு:** வேர்கள் உறிஞ்சிய நீர் மூலக்கூறுகள் பிளக்கப்பட்டு ஆக்ஸிஜன் வாயுவாக வளிமண்டலத்தில் கலக்கிறது.
- **3. புரோட்டான் சாய்வுநிலை ➔ ஆற்றல் உற்பத்தி:** புரோட்டான் பாய்ச்சல் மூலம் செல்களின் ஆற்றல் நாணயமான மூலக்கூறு ஆற்றல் உருவாகிறது.
- **4. கார்பன் சேர்க்கை ➔ உணவு உருவாக்கம்:** இலைத்துளைகள் வழியே வரும் கார்பன் டை ஆக்சைடு குளுக்கோஸ் சர்க்கரையாக மாற்றப்படுகிறது.

#### 🧩 அன்றாட வாழ்க்கையின் எளிய உவமை
தாவர இலையை ஒரு சூரிய ஒளி சமையலறை போல நினைத்துப் பாருங்கள்: சூரிய ஒளி அடுப்பை இயக்குகிறது, நீரும் காற்றும் மூலப்பொருட்களைத் தருகின்றன, இறுதியாக இனிப்பான தாவர உணவும் நாம் சுவாசிக்கும் தூய ஆக்ஸிஜனும் உருவாகின்றன!

#### 🎯 முக்கிய முடிவு
தாவரங்கள் நிகழ்த்தும் இந்த வேதியியல் வினையே பூமியில் உயிர்கள் வாழ்வதற்கும் நாம் சுவாசிப்பதற்கும் ஆதாரமாக விளங்குகிறது.`
  },

  intermediate: {
    english: `${DEMO_BANNER}

### 📘 Cellular Energy Transformation: The Comprehensive Photosynthesis Guide

#### 📝 Conceptual Overview & Essential Meaning
Photosynthesis is an essential two-stage biochemical process executed by photoautotrophs. It converts electromagnetic photon energy into chemical potential energy stored in glucose bonds ($C_6H_{12}O_6$), while sustaining aerobic life through oxygen photolysis.

#### 📖 Preserved Definitions & Technical Glossary
- **Photosystems I & II:** Thylakoid pigment-protein complexes that harvest light at specific wavelengths (P680 and P700).
- **Oxygen-Evolving Complex:** An enzymatic cluster on Photosystem II that catalyzes the photolysis of water.
- **RuBisCO Enzyme:** Ribulose-1,5-bisphosphate carboxylase/oxygenase; the key enzyme assimilating atmospheric $CO_2$.
- **Chemiosmotic Photophosphorylation:** The synthesis of ATP driven by an electrochemical proton gradient across thylakoid membranes.

#### ➗ Preserved Equations, Reactions & Formulas
- \`2H2O -> 4H+ + 4e- + O2\` ➔ **Water Photolysis Reaction:** Generates electrons to reduce Photosystem II, establishes lumen proton concentrations, and generates molecular $O_2$.
- \`NADP+ + 2e- + 2H+ -> NADPH + H+\` ➔ **NADP+ Reduction:** Stores high-energy reducing equivalents for carbon assimilation.
- \`ADP + Pi -> ATP\` ➔ **ATP Synthase Phosphorylation:** Produces cellular energy currency across the thylakoid membrane.
- \`6CO2 + 6H2O -> C6H12O6 + 6O2\` ➔ **Overall Net Balanced Reaction:** Carbon dioxide and water yield hexose glucose and oxygen.

#### 🔄 Preserved Cause-and-Effect Dynamics & Relationships
- **Photon Absorption at P680 ➔ Non-Cyclic Electron Cascade:** Photon capture excites electrons, driving movement along the thylakoid electron transport chain.
- **Water Oxidation ➔ Oxygen Byproduct & Proton Gradient:** Splitting $H_2O$ supplies electrons and concentrates protons in the thylakoid lumen.
- **Proton Motive Force ➔ ATP Synthase Rotational Activation:** Chemiosmotic flow across the lumen drives stoichiometric ATP synthesis.
- **RuBisCO Carbon Fixation ➔ G3P & Glucose Synthesis:** In the stroma, RuBisCO fixes $CO_2$, forming G3P which condenses into $C_6H_{12}O_6$.

#### 💡 Practical Significance & Summary
This two-stage bio-energetic mechanism underpins terrestrial and aquatic carbon cycles, coupling atmospheric oxygen levels to global biosphere metabolism.`,

    tamil: `${DEMO_BANNER_TAMIL}

### 📘 ஒளிச்சேர்க்கையின் முழுமையான உயிரியல் வழிமுறை

#### 📝 கண்ணோட்டம் & அடிப்படைக் கல்விப் பொருள்
ஒளிச்சேர்க்கை என்பது தாவரங்கள் சூரிய ஒளியைப் பயன்படுத்தி தங்களுக்குத் தேவையான சர்க்கரை சத்தை (குளுக்கோஸ்) தயாரிக்கும் இருபடி வேதியியல் செயல்முறையாகும்.

#### 📖 பாதுகாக்கப்பட்ட வரையறைகள் & கலைச்சொற்கள்
- **தைலகாய்டு சவ்வு:** ஒளி சார்ந்த வினைகள் நடைபெறும் பச்சைய சவ்வு அடுக்குகள்.
- **ஸ்ட்ரோமா:** ஒளி சாரா வினைகள் (கால்வின் சுழற்சி) நடைபெறும் உட்கூழ்மப் பகுதி.
- **ரூபிஸ்கோ:** காற்றில் உள்ள கார்பன் டை ஆக்சைடை தாவர சர்க்கரையாக மாற்றும் மிக முக்கியமான கார்பன் நிலைநிறுத்த நொதி.
- **ஆற்றல் தொகுப்பு நொதி:** புரோட்டான் விசையைப் பயன்படுத்தி செல்களின் ஆற்றல் நாணயத்தை உருவாக்கும் நொதி இயந்திரம்.

#### ➗ பாதுகாக்கப்பட்ட வேதியியல் சமன்பாடுகள் & சூத்திரங்கள்
- \`2H2O -> 4H+ + 4e- + O2\` ➔ **நீரின் ஒளிச்சிதைவு சமன்பாடு:** நீர் மூலக்கூறுகள் பிரிக்கப்பட்டு ஆக்ஸிஜன் வாயு வெளியேறுகிறது.
- \`C6H12O6\` ➔ **குளுக்கோஸ் மூலக்கூறு வாய்ப்பாடு:** தாவர செல்களின் முதன்மை ஆற்றல் சர்க்கரை.
- \`6CO2 + 6H2O -> C6H12O6 + 6O2\` ➔ **ஒட்டுமொத்த வேதியியல் சமன்பாடு:** கார்பன் டை ஆக்சைடும் நீரும் இணைந்து குளுக்கோஸையும் ஆக்ஸிஜனையும் உருவாக்குகின்றன.

#### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்
- **ஒளி உறிஞ்சுதல் ➔ எலக்ட்ரான் பரிமாற்றம்:** சூரிய ஒளி பச்சையத்தால் ஏற்கப்பட்டு எலக்ட்ரான் சங்கிலி இயக்கப்படுகிறது.
- **நீர் சிதைவு ➔ ஆக்ஸிஜன் மற்றும் புரோட்டான் குவிப்பு:** நீர் பிரிக்கப்பட்டு புரோட்டான் சாய்வுநிலை நிறுவப்படுகிறது.
- **ரூபிஸ்கோ கார்பன் நிலைநிறுத்தம் ➔ குளுக்கோஸ் தயாரிப்பு:** கால்வின் சுழற்சியில் கார்பன் டை ஆக்சைடு நிலைநிறுத்தப்பட்டு சர்க்கரையாகிறது.

#### 💡 முக்கிய சுருக்கம்
இவ்விரு படிநிலைகளும் உலகளாவிய கார்பன் சுழற்சியையும் வளிமண்டல ஆக்ஸிஜன் சமநிலையையும் முழுமையாக தீர்மானிக்கின்றன.`
  },

  advanced: {
    english: `${DEMO_BANNER}

### 🔬 Structural & Analytical Synthesis: Photochemistry & Carbon Fixation

#### ⚡ Executive Overview & Theoretical Foundations
Photosynthesis couples the light-driven water-plastoquinone oxidoreductase activity of Photosystem II with the plastocyanin-ferredoxin oxidoreductase activity of Photosystem I. This establishes an electrochemical potential gradient ($\Delta\mu_{H^+}$) across the thylakoid lumen that drives chemiosmotic photophosphorylation, while the light-independent Calvin-Benson-Bassham cycle assimilates $CO_2$ via RuBisCO in the stroma.

#### 📖 Preserved Formal Definitions & Taxonomies
- **Photoautotrophic Organisms:** Organisms capable of synthesizing organic nutritive compounds exclusively from inorganic atmospheric substrates utilizing photon irradiance.
- **P680 & P700 Reaction Centers:** Specialized dimeric chlorophyll a complexes absorbing maximally at 680 nm (PSII) and 700 nm (PSI).
- **Oxygen-Evolving Complex (OEC):** Tetra-manganese mono-calcium cluster ($Mn_4CaO_5$) catalyzing the thermodynamic four-electron oxidation of water.
- **RuBisCO (EC 4.1.1.39):** Ribulose-1,5-bisphosphate carboxylase-oxygenase, facilitating enediol-mediated atmospheric carbon assimilation.

#### ➗ Complete Quantitative Equations, Reactions & Formulas
\`\`\`text
2 H2O -> 4 H+ + 4 e- + O2 (Delta E0' = +0.815 V)
\`\`\`
*Photolysis Stoichiometry:* Verbatim 4-electron thermodynamic water oxidation yielding 4 lumenal protons and molecular oxygen.

\`\`\`text
ADP + Pi + n H+(lumen) -> ATP + H2O + n H+(stroma)
\`\`\`
*Chemiosmotic Photophosphorylation:* Proton-translocating CF0-CF1 ATP synthase kinetics.

\`\`\`text
RuBP (5C) + CO2 (1C) -> 2 x 3-PGA (3C) -> Glyceraldehyde-3-Phosphate (G3P) -> C6H12O6 (Glucose)
\`\`\`
*Calvin Cycle Hexose Condensation:* Carboxylation, reduction, and ribulose regeneration stoichiometry.

#### 🔄 Relational Framework, Proportionalities & Dependencies
1. **Photon Irradiance ($\lambda \approx 680\text{ nm}$) ➔ P680* Oxidation ➔ Pheophytin-Plastoquinone Cascade:** Direct correlation between quantum photon flux density and non-cyclic electron transport rate.
2. **OEC Four-Step S-State Cycle ➔ Water Decomposition ➔ $O_2$ Byproduct Efflux:** Catalytic progression replenishing reaction center electron deficits with concomitant atmospheric release.
3. **Thylakoid Transmembrane $\Delta\text{pH}$ Gradient ➔ Torque Generation in CF0 Rotor ➔ Catalytic ATP Synthesis:** Strict thermodynamic coupling between electrochemical potential and phosphorylation.
4. **Enzymatic $CO_2$ Assimilation ➔ Triose Phosphate Translocation ➔ Hexose Polymerization ($C_6H_{12}O_6$):** Direct metabolic dependence of carbohydrate synthesis on stoichiometric ATP/NADPH consumption.

#### 🎯 Methodological Implications & Analytical Conclusions
Quantitative bioenergetic constraints dictate that photosynthetic thermodynamic efficiency governs primary net biosphere productivity.`,

    tamil: `${DEMO_BANNER_TAMIL}

### 🔬 ஒளிச்சேர்க்கையின் மூலக்கூறு உயிரியல் மற்றும் எலக்ட்ரான் பரிமாற்ற சுழற்சி

#### ⚡ அறிவியல் கண்ணோட்டம் & கோட்பாட்டு அடிப்படை
ஒளிச்சேர்க்கை அமைப்புகள் தைலகாய்டு சவ்வின் குறுக்கே எலக்ட்ரான் பரிமாற்ற சங்கிலி வழியாக புரோட்டான் சாய்வுநிலையை நிறுவி, உட்கூழ்மத்தில் ரூபிஸ்கோ நொதி மூலம் கார்பன் டை ஆக்சைடை குளுக்கோஸாக நிலைநிறுத்துகின்றன.

#### 📖 பாதுகாக்கப்பட்ட அறிவியல் வரையறைகள்
- **ஒளி ஏற்பு எதிர்வினை மையங்கள்:** முறையே 680 மற்றும் 700 நானோமீட்டர் அலைநீளங்களில் அதிகபட்சமாக ஒளியை ஏற்கும் பச்சைய நிறமி கூட்டமைப்புகள்.
- **ரூபிஸ்கோ:** வளிமண்டல கார்பன் டை ஆக்சைடை நிலைநிறுத்தும் முதன்மை நொதி.
- **நீரின் ஒளிச்சிதைவு:** ஆக்ஸிஜன் உருவாக்கும் வளாகத்தில் நான்கு எலக்ட்ரான் பரிமாற்றத்துடன் நீர் மூலக்கூறு பிளக்கப்படுதல்.

#### ➗ முழுமையான வேதியியல் மற்றும் கணித சமன்பாடுகள்
\`\`\`text
2 H2O -> 4 H+ + 4 e- + O2
\`\`\`
*நீரின் ஒளிச்சிதைவு சமன்பாடு:* நீர் மூலக்கூறு பிளக்கப்பட்டு 4 புரோட்டான்கள், 4 எலக்ட்ரான்கள் மற்றும் வளிமண்டல ஆக்ஸிஜன் உருவாகிறது.

\`\`\`text
6 CO2 + 6 H2O -> C6H12O6 + 6 O2
\`\`\`
*நிகர சமன்பாடு:* கார்பன் டை ஆக்சைடும் நீரும் இணைந்து குளுக்கோஸ் சர்க்கரையை உருவாக்குகின்றன.

#### 🔄 காரணம் மற்றும் விளைவு தொடர்புகள்
1. **ஒளி உறிஞ்சுதல் ➔ எலக்ட்ரான் கிளர்ச்சி:** குவாண்டம் ஒளி ஆற்றல் எதிர்வினை மையத்தை கிளர்ச்சியடையச் செய்து எலக்ட்ரான் சங்கிலியை இயக்குகிறது.
2. **நீர் பிளத்தல் ➔ ஆக்ஸிஜன் வெளியீடு:** நீரின் ஆக்சிஜனேற்றம் மூலம் எலக்ட்ரான்கள் மீட்கப்பட்டு தூய ஆக்ஸிஜன் வாயுவாக வெளியாகிறது.
3. **புரோட்டான் சாய்வுநிலை ➔ ஆற்றல் உற்பத்தி:** தைலகாய்டு சவ்வின் குறுக்கே ஏற்படும் சாய்வுநிலை மூலக்கூறு ஆற்றல் உருவாக்கத்தை உந்துகிறது.
4. **கால்வின் சுழற்சி ➔ குளுக்கோஸ் உற்பத்தி:** உயிரி-ஆற்றலைப் பயன்படுத்தி கார்பன் டை ஆக்சைடு சர்க்கரையாக மாற்றப்படுகிறது.

#### 🎯 முக்கிய முடிவு
ஒளிச்சேர்க்கையின் உயிரி-ஆற்றலியல் விதிகளே பூமியின் மொத்த தாவர உற்பத்தியையும் வளிமண்டல சமநிலையையும் முழுமையாக நிர்ணயிக்கின்றன.`
  }
};

export const DEMO_FLASHCARDS = {
  english: [
    { front: "What is the primary function of chlorophyll?", back: "To absorb light energy (especially blue and red wavelengths) and transfer it into the photosynthetic reaction center." },
    { front: "What are the two main stages of photosynthesis?", back: "1. Light-dependent reactions (in thylakoids) and 2. Light-independent reactions / Calvin Cycle (in stroma)." },
    { front: "Where does oxygen gas released during photosynthesis come from?", back: "From the splitting of water molecules (photolysis) during light-dependent reactions." },
    { front: "What role does ATP play in plant cells?", back: "ATP serves as cellular energy currency, driving the chemical synthesis of glucose from carbon dioxide." },
    { front: "What is the overall chemical equation of photosynthesis?", back: "6 CO2 + 6 H2O + Light Energy -> C6H12O6 (Glucose) + 6 O2 (Oxygen)." }
  ],
  tamil: [
    { front: "ஒளிச்சேர்க்கையில் பச்சையத்தின் முக்கிய பணி என்ன?", back: "சூரிய ஒளியை உறிஞ்சி அதனை வேதியியல் ஆற்றலாக மாற்றுவதே இதன் முக்கிய பணியாகும்." },
    { front: "ஒளிச்சேர்க்கையின் இரு முக்கிய நிலைகள் யாவை?", back: "1. ஒளி சார்ந்த வினைகள் (தைலகாய்டில்), 2. ஒளி சாரா வினைகள் அல்லது கால்வின் சுழற்சி (ஸ்ட்ரோமாவில்)." },
    { front: "தாவரங்கள் வெளியிடும் ஆக்ஸிஜன் வாயு எங்கிருந்து கிடைக்கிறது?", back: "ஒளி சார்ந்த வினைகளின் போது நீர் மூலக்கூறுகள் பிளக்கப்படுவதன் மூலம் ஆக்ஸிஜன் உருவாகிறது." },
    { front: "தாவர செல்களில் மூலக்கூறு ஆற்றலின் பங்கு என்ன?", back: "இது செல்களின் ஆற்றல் நாணயம்; இது குளுக்கோஸ் உருவாவதற்குத் தேவையான ஆற்றலை வழங்குகிறது." },
    { front: "ஒளிச்சேர்க்கையின் வேதியியல் சமன்பாடு என்ன?", back: "6 CO2 + 6 H2O + சூரிய ஒளி -> C6H12O6 (குளுக்கோஸ்) + 6 O2 (ஆக்ஸிஜன்)." }
  ]
};

export const DEMO_QUIZZES = {
  english: [
    {
      question: "What gas do plants absorb from the atmosphere for photosynthesis?",
      options: ["Carbon Dioxide", "Nitrogen", "Methane", "Argon"],
      correct_index: 0,
      explanation: "Plants take in carbon dioxide (CO2) through microscopic leaf pores called stomata to construct sugars."
    },
    {
      question: "Which organelle inside plant cells hosts the photosynthesis process?",
      options: ["Mitochondria", "Chloroplast", "Ribosome", "Golgi Body"],
      correct_index: 1,
      explanation: "Chloroplasts contain chlorophyll pigments and thylakoid membranes where light is harvested."
    },
    {
      question: "What is the vital byproduct of water photolysis released into the air?",
      options: ["Carbon Monoxide", "Ozone", "Oxygen", "Hydrogen Gas"],
      correct_index: 2,
      explanation: "Splitting water (H2O) produces protons, electrons, and releases oxygen gas (O2) into our atmosphere."
    },
    {
      question: "In which part of the chloroplast does the Calvin Cycle occur?",
      options: ["Thylakoid Lumen", "Outer Membrane", "Stroma", "Cristae"],
      correct_index: 2,
      explanation: "The Calvin cycle takes place in the fluid stroma surrounding the thylakoid stacks."
    },
    {
      question: "What primary sugar molecule is synthesized during photosynthesis?",
      options: ["Lactose", "Glucose", "Fructose", "Sucrose"],
      correct_index: 1,
      explanation: "Glucose (C6H12O6) is the foundational six-carbon sugar produced to store biological energy."
    },
    {
      question: "Which molecule supplies immediate chemical energy during carbon fixation?",
      options: ["ATP", "DNA", "RNA", "Lipids"],
      correct_index: 0,
      explanation: "ATP provides the metabolic phosphate bond energy required by enzymes during carbon fixation."
    },
    {
      question: "Why do most plant leaves appear green to human eyes?",
      options: ["Chlorophyll absorbs green light", "Chlorophyll reflects green light", "Green light creates water", "Leaves do not absorb red light"],
      correct_index: 1,
      explanation: "Chlorophyll pigments absorb blue and red wavelengths while reflecting green light wavelengths."
    },
    {
      question: "What are the microscopic pores on leaves that allow gas exchange called?",
      options: ["Vesicles", "Stomata", "Vacuoles", "Cilia"],
      correct_index: 1,
      explanation: "Stomata are specialized leaf apertures flanked by guard cells controlling gaseous transpiration."
    },
    {
      question: "What is the primary enzyme responsible for fixing carbon dioxide in the Calvin Cycle?",
      options: ["RuBisCO", "Amylase", "DNA Polymerase", "Catalase"],
      correct_index: 0,
      explanation: "RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase) is the essential carbon-fixing enzyme."
    },
    {
      question: "Which type of organisms produce their own food using sunlight?",
      options: ["Heterotrophs", "Autotrophs", "Decomposers", "Carnivores"],
      correct_index: 1,
      explanation: "Photoautotrophs synthesize organic molecules from inorganic materials using solar radiation."
    }
  ],
  tamil: [
    {
      question: "தாவரங்கள் ஒளிச்சேர்க்கைக்காக காற்றில் இருந்து உறிஞ்சும் வாயு எது?",
      options: ["கார்பன் டை ஆக்சைடு", "நைட்ரஜன்", "மீத்தேன்", "ஆர்கான்"],
      correct_index: 0,
      explanation: "தாவரங்கள் இலைத்துளைகள் வழியாக கார்பன் டை ஆக்சைடை உறிஞ்சி உணவைத் தயாரிக்கின்றன."
    },
    {
      question: "தாவர செல்களில் ஒளிச்சேர்க்கை நடைபெறும் நுண்ணுறுப்பு எது?",
      options: ["மைட்டோகாண்ட்ரியா", "பசுங்கணிகம்", "ரைபோசோம்", "கோல்கை உடலம்"],
      correct_index: 1,
      explanation: "பசுங்கணிகங்களில் உள்ள தைலகாய்டில் ஒளி உறிஞ்சப்பட்டு உணவு தயாராகிறது."
    },
    {
      question: "ஒளிச்சேர்க்கையின் போது நீர் மூலக்கூறு பிளக்கப்படும்போது வெளியாகும் வாயு எது?",
      options: ["கார்பன் மோனாக்சைடு", "ஓசோன்", "ஆக்ஸிஜன்", "ஹைட்ரஜன்"],
      correct_index: 2,
      explanation: "நீர் மூலக்கூறுகள் பிளக்கப்படும்போது மனிதர்கள் மற்றும் விலங்குகள் சுவாசிக்கத் தேவையான ஆக்ஸிஜன் வெளியாகிறது."
    },
    {
      question: "கால்வின் சுழற்சி பசுங்கணிகத்தின் எந்தப் பகுதியில் நடைபெறுகிறது?",
      options: ["தைலகாய்டு", "வெளிச்சவ்வு", "ஸ்ட்ரோமா உட்கூழ்மம்", "கிறிஸ்டே"],
      correct_index: 2,
      explanation: "கால்வின் சுழற்சி பசுங்கணிகத்தின் ஸ்ட்ரோமா பகுதியில் நடைபெறுகிறது."
    },
    {
      question: "ஒளிச்சேர்க்கையின் மூலம் உருவாகும் முதன்மை சர்க்கரை மூலக்கூறு எது?",
      options: ["லாக்டோஸ்", "குளுக்கோஸ்", "பிரக்டோஸ்", "சுக்ரோஸ்"],
      correct_index: 1,
      explanation: "குளுக்கோஸ் (C6H12O6) தாவரங்களால் உருவாக்கப்படும் அடிப்படை சர்க்கரை ஆகும்."
    },
    {
      question: "செல்களில் உடனடி வேதியியல் ஆற்றலை வழங்கும் மூலக்கூறு எது?",
      options: ["மூலக்கூறு ஆற்றல்", "டி.என்.ஏ", "ஆர்.என்.ஏ", "கொழுப்பு"],
      correct_index: 0,
      explanation: "செல்களின் வேதியியல் வினைகளுக்குத் தேவையான உடனடி ஆற்றலை இந்த மூலக்கூறுகள் வழங்குகின்றன."
    },
    {
      question: "தாவரங்களின் இலைகள் பச்சை நிறமாகத் தோன்றுவதற்கு என்ன காரணம்?",
      options: ["பச்சையம் பச்சை ஒளியை உறிஞ்சுகிறது", "பச்சையம் பச்சை ஒளியை பிரதிபலிக்கிறது", "பச்சை ஒளி நீரை உருவாக்குகிறது", "சிவப்பு ஒளி உறிஞ்சப்படுவதில்லை"],
      correct_index: 1,
      explanation: "பச்சையம் நீலம் மற்றும் சிவப்பு ஒளியை உறிஞ்சி பச்சை நிற ஒளியைப் பிரதிபலிக்கிறது."
    },
    {
      question: "வாயுப் பரிமாற்றத்திற்கு உதவும் இலைகளில் உள்ள நுண்ணிய துளைகள் எவ்வாறு அழைக்கப்படுகின்றன?",
      options: ["நுண்குமிழ்கள்", "இலைத்துளைகள்", "வேர் முண்டுகள்", "சிலியா"],
      correct_index: 1,
      explanation: "இலைத்துளைகள் வழியாக தாவரங்கள் கார்பன் டை ஆக்சைடை உறிஞ்சி ஆக்ஸிஜனை வெளியிடுகின்றன."
    },
    {
      question: "கால்வின் சுழற்சியில் கார்பனை நிலைநிறுத்தும் முக்கிய நொதி எது?",
      options: ["ரூபிஸ்கோ", "அமைலேஸ்", "பாலிமரேஸ்", "கேட்டலேஸ்"],
      correct_index: 0,
      explanation: "ரூபிஸ்கோ நொதி ஒளிச்சேர்க்கையில் கார்பனை நிலைநிறுத்த மிக அவசியமானது."
    },
    {
      question: "சூரிய ஒளியைப் பயன்படுத்தி தாங்களாகவே உணவைத் தயாரிக்கும் உயிரினங்கள் என்னவென்று அழைக்கப்படுகின்றன?",
      options: ["சார்பூட்ட உயிரிகள்", "தன்னூட்ட உயிரிகள்", "சிதைப்பவை", "ஊனுண்ணிகள்"],
      correct_index: 1,
      explanation: "தன்னூட்ட உயிரிகள் சூரிய ஆற்றலைப் பயன்படுத்தி உணவு தயாரித்துக் கொள்கின்றன."
    }
  ]
};
