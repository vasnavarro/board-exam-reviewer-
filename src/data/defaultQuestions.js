export const defaultQuestions = [
  {
    id: "q-1",
    category: "Diagnostic & Clinical Thinking",
    question: "When evaluating multiple clients in an urgent setting, which individual requires immediate intervention first based on the ABC (Airway, Breathing, Circulation) priority framework?",
    options: [
      "A client reporting acute 8/10 localized incisional pain following surgery",
      "A client exhibiting stridor, restlessness, and intercostal retractions",
      "A client with a blood glucose reading of 195 mg/dL requesting medication",
      "A client with a fractured extremity showing intact distal pulses and capillary refill"
    ],
    correctIndex: 1,
    explanation: "Stridor and intercostal retractions signify acute upper airway obstruction, which is an immediate life-threatening emergency (Airway priority). Pain, moderate hyperglycemia, and stable limb fractures can be addressed after airway patency is secured.",
    keyTakeaway: "Always prioritize acute Airway obstruction over Breathing, Circulation, or non-life-threatening complaints.",
    difficulty: "Medium"
  },
  {
    id: "q-2",
    category: "Core Sciences & Principles",
    question: "What primary physiological mechanism prevents the backflow of blood from the ventricles into the atria during ventricular systole?",
    options: [
      "Contraction of the aortic and pulmonary semilunar valves",
      "Closure of the atrioventricular (tricuspid and bicuspid/mitral) valves anchored by chordae tendineae",
      "Passive relaxation of the coronary sinus sphincter",
      "Pressure drop inside the thoracic cavity during expiration"
    ],
    correctIndex: 1,
    explanation: "During ventricular systole, high ventricular pressure pushes the AV valves shut. The papillary muscles and chordae tendineae prevent valve leaflet eversion into the atria, ensuring forward unidirectional blood flow.",
    keyTakeaway: "AV valves (Tricuspid & Mitral) close during systole (producing S1 heart sound) to prevent atrial regurgitation.",
    difficulty: "Easy"
  },
  {
    id: "q-3",
    category: "Professional Ethics & Law",
    question: "A competent adult client decides to refuse a life-sustaining treatment after receiving comprehensive disclosure of risks, benefits, and alternatives. Which core ethical principle guides the professional to honor this decision?",
    options: [
      "Beneficence (acting in the client's best medical interest)",
      "Non-maleficence (doing no harm)",
      "Autonomy (the right of self-determination)",
      "Distributive Justice (fair allocation of healthcare resources)"
    ],
    correctIndex: 2,
    explanation: "Autonomy upholds the individual's fundamental right to make decisions regarding their own body and medical treatment, including the right of a competent adult to decline intervention after informed consent.",
    keyTakeaway: "Autonomy supersedes professional paternalism when the client possesses decision-making capacity.",
    difficulty: "Easy"
  },
  {
    id: "q-4",
    category: "Scenario & Applied Practice",
    question: "Prior to administering a high-alert medication, which action is mandatory to ensure patient safety and minimize adverse drug events?",
    options: [
      "Confirming the dosage verbally with the pharmacy clerk",
      "Conducting an independent double-check with another licensed colleague using the five rights",
      "Administering half the calculated dose first to test for allergy",
      "Documenting administration before entering the patient's room"
    ],
    correctIndex: 1,
    explanation: "An independent double-check by two qualified licensed clinicians is the evidence-based standard for high-alert medications (e.g., insulin, heparin, concentrated electrolytes) to intercept calculation and identity errors.",
    keyTakeaway: "Independent double-checks catch over 95% of high-alert drug calculation mistakes.",
    difficulty: "Medium"
  },
  {
    id: "q-5",
    category: "Calculations & Analytics",
    question: "A physician orders an intravenous infusion of 1,000 mL normal saline to run over 8 hours. The administration set has a drop factor of 15 drops/mL (gtt/mL). What is the calculated flow rate in drops per minute (gtt/min)?",
    options: [
      "21 gtt/min",
      "31 gtt/min",
      "42 gtt/min",
      "63 gtt/min"
    ],
    correctIndex: 1,
    explanation: "Formula: Flow rate (gtt/min) = (Total Volume in mL × Drop Factor) / Time in minutes. (1000 mL × 15 gtt/mL) / (8 × 60 min) = 15,000 / 480 = 31.25 ≈ 31 gtt/min.",
    keyTakeaway: "Rate (gtt/min) = (Volume in mL × drop factor) / Total minutes.",
    difficulty: "Medium"
  },
  {
    id: "q-6",
    category: "Diagnostic & Clinical Thinking",
    question: "A patient presents with sudden severe headache described as 'the worst headache of my life' (thunderclap), accompanied by nuchal rigidity and photophobia. What acute pathology should be suspected first?",
    options: [
      "Classic migraine with aura",
      "Subarachnoid hemorrhage (ruptured aneurysm)",
      "Tension-type cranial spasm",
      "Cluster headache episode"
    ],
    correctIndex: 1,
    explanation: "A sudden 'thunderclap' headache with meningismus (nuchal rigidity, photophobia) is classic for a subarachnoid hemorrhage (SAH) and mandates emergent non-contrast head CT.",
    keyTakeaway: "'Worst headache of life' + stiff neck = Subarachnoid Hemorrhage until proven otherwise.",
    difficulty: "Hard"
  },
  {
    id: "q-7",
    category: "Core Sciences & Principles",
    question: "Which cellular organelle is responsible for post-translational modification, sorting, and packaging of proteins destined for secretion or lysosomal delivery?",
    options: [
      "Smooth Endoplasmic Reticulum",
      "Golgi Apparatus",
      "Peroxisome",
      "Ribosomal subunit 40S"
    ],
    correctIndex: 1,
    explanation: "The Golgi apparatus receives proteins from the rough ER, adds carbohydrate/phosphate tags (glycosylation), and packages them into vesicles for target destinations.",
    keyTakeaway: "Golgi Apparatus = The post office and packaging center of the cell.",
    difficulty: "Easy"
  },
  {
    id: "q-8",
    category: "Professional Ethics & Law",
    question: "Which of the following scenarios constitutes a breach of professional confidentiality under privacy laws?",
    options: [
      "Discussing a patient's lab values with the attending physician in a private conference room",
      "Discussing an identifiable patient case in a crowded hospital elevator or cafeteria",
      "Submitting mandatory reporting of suspected child abuse to child welfare authorities",
      "Providing emergency status updates to a designated healthcare surrogate proxy"
    ],
    correctIndex: 1,
    explanation: "Conversations in public areas (elevators, hallways, cafeterias) where unauthorized visitors or staff can overhear identifiable health information represent a clear confidentiality breach.",
    keyTakeaway: "Never discuss identifiable clinical information in public spaces.",
    difficulty: "Easy"
  },
  {
    id: "q-9",
    category: "Scenario & Applied Practice",
    question: "During a routine inspection of an electrical device in a client's room, you observe frayed wiring and a slight burning smell. What is the immediate first action?",
    options: [
      "Call the maintenance department and leave the device running",
      "Remove the client from immediate hazard and disconnect the power supply safely if possible",
      "Wrap insulating tape around the exposed cord",
      "Document the finding in the shift handover notes"
    ],
    correctIndex: 1,
    explanation: "Using the RACE protocol (Rescue, Alarm, Contain, Extinguish/Evacuate), the primary priority is to rescue/remove individuals from the immediate danger zone.",
    keyTakeaway: "RACE protocol: Rescue clients first before containing or reporting hazards.",
    difficulty: "Easy"
  },
  {
    id: "q-10",
    category: "Calculations & Analytics",
    question: "A client weighing 70 kg is prescribed a medication at 5 mcg/kg/min. How many milligrams (mg) will the client receive over a 2-hour infusion period?",
    options: [
      "21 mg",
      "42 mg",
      "70 mg",
      "84 mg"
    ],
    correctIndex: 1,
    explanation: "Rate = 70 kg × 5 mcg/kg/min = 350 mcg/min. Total time = 2 hours × 60 min = 120 min. Total dose = 350 mcg/min × 120 min = 42,000 mcg. Convert to mg: 42,000 mcg / 1,000 = 42 mg.",
    keyTakeaway: "Always watch unit conversions: 1,000 mcg = 1 mg, and remember to multiply by total minutes.",
    difficulty: "Hard"
  },
  {
    id: "q-11",
    category: "Diagnostic & Clinical Thinking",
    question: "An arterial blood gas (ABG) report shows: pH 7.28, PaCO2 55 mmHg, and HCO3- 24 mEq/L. How is this acid-base imbalance interpreted?",
    options: [
      "Uncompensated Metabolic Acidosis",
      "Uncompensated Respiratory Acidosis",
      "Partially Compensated Respiratory Alkalosis",
      "Fully Compensated Metabolic Alkalosis"
    ],
    correctIndex: 1,
    explanation: "pH 7.28 is acidic (< 7.35). PaCO2 is elevated (> 45 mmHg), which is acidic. HCO3- is within normal limits (22-26 mEq/L), indicating no renal compensation yet. Hence, Uncompensated Respiratory Acidosis (ROME method: Respiratory Opposite, Metabolic Equal).",
    keyTakeaway: "pH low + PaCO2 high + normal HCO3 = Acute Uncompensated Respiratory Acidosis.",
    difficulty: "Medium"
  },
  {
    id: "q-12",
    category: "Core Sciences & Principles",
    question: "In pharmacology, what is the term used to describe the fraction of an administered drug dose that reaches the systemic circulation in an active, unchanged state?",
    options: [
      "Volume of distribution (Vd)",
      "Bioavailability (F)",
      "Clearance rate (Cl)",
      "Therapeutic Index (TI)"
    ],
    correctIndex: 1,
    explanation: "Bioavailability represents the percentage/fraction of administered drug reaching systemic circulation. Intravenous administration yields 100% bioavailability (F = 1.0).",
    keyTakeaway: "Bioavailability = Fraction of drug absorbed into systemic circulation.",
    difficulty: "Easy"
  },
  {
    id: "q-13",
    category: "Professional Ethics & Law",
    question: "Which legal tort is committed when a practitioner physically restrains a competent client without a legal order, consent, or emergency clinical justification?",
    options: [
      "Invasion of privacy",
      "False imprisonment",
      "Defamation per se",
      "Breach of warranty"
    ],
    correctIndex: 1,
    explanation: "False imprisonment is the unlawful intentional confinement or restraint of an individual within specified boundaries without consent or legal authorization.",
    keyTakeaway: "Confining an individual without authorization or imminent safety justification = False Imprisonment.",
    difficulty: "Medium"
  },
  {
    id: "q-14",
    category: "Scenario & Applied Practice",
    question: "While preparing a client for a sterile procedure, the edge of the sterile drape touches an unsterile tabletop. What is the correct corrective action?",
    options: [
      "Wipe the contaminated edge with 70% isopropyl alcohol",
      "Discard the contaminated drape and start again with a new sterile drape",
      "Fold the contaminated section underneath and proceed",
      "Sprinkle sterile water over the touched area"
    ],
    correctIndex: 1,
    explanation: "A sterile field that touches any non-sterile object is deemed contaminated. A sterile barrier cannot be wiped or folded to regain sterility; it must be discarded and replaced.",
    keyTakeaway: "When in doubt, consider it contaminated. Discard and replace immediately.",
    difficulty: "Easy"
  },
  {
    id: "q-15",
    category: "Calculations & Analytics",
    question: "A stock vial contains 250 mg of powder. The instructions state to reconstitute with 4.6 mL of diluent to yield a concentration of 50 mg/mL. To administer a prescribed dose of 125 mg, how many milliliters should be drawn up?",
    options: [
      "1.5 mL",
      "2.0 mL",
      "2.5 mL",
      "3.0 mL"
    ],
    correctIndex: 2,
    explanation: "Formula: Desired / Have × Volume. 125 mg / 50 mg/mL = 2.5 mL.",
    keyTakeaway: "Dose to give = Prescribed Dose (125 mg) ÷ Final Concentration (50 mg/mL) = 2.5 mL.",
    difficulty: "Easy"
  },
  {
    id: "q-16",
    category: "Diagnostic & Clinical Thinking",
    question: "Which of the following signs is an early sensitive indicator of hypovolemic shock before arterial blood pressure drops significantly?",
    options: [
      "Severe bradycardia and warm flushed skin",
      "Tachycardia, mild tachypnea, and delayed capillary refill",
      "Marked bounding pulse and wide pulse pressure",
      "Profuse polyuria and hyperactive reflexes"
    ],
    correctIndex: 1,
    explanation: "Compensatory mechanisms (sympathetic activation) elevate heart rate (tachycardia) and cause peripheral vasoconstriction (delayed capillary refill, pale skin) to maintain blood pressure early in shock.",
    keyTakeaway: "Hypotension is a late sign of shock; tachycardia and poor peripheral perfusion are early compensatory signs.",
    difficulty: "Medium"
  },
  {
    id: "q-17",
    category: "Core Sciences & Principles",
    question: "Which type of immunity is acquired when an infant receives pre-formed maternal antibodies across the placenta and through breast milk?",
    options: [
      "Naturally acquired active immunity",
      "Naturally acquired passive immunity",
      "Artificially acquired active immunity",
      "Artificially acquired passive immunity"
    ],
    correctIndex: 1,
    explanation: "Transfer of maternal antibodies (IgG via placenta, IgA via colostrum) provides natural passive immunity. It offers immediate protection but is temporary because the recipient does not synthesize their own memory cells.",
    keyTakeaway: "Mother to baby = Natural Passive Immunity (immediate, temporary protection).",
    difficulty: "Easy"
  },
  {
    id: "q-18",
    category: "Professional Ethics & Law",
    question: "What is the primary objective of a 'Root Cause Analysis' (RCA) conducted following a sentinel event or medical error?",
    options: [
      "To assign individual fault and punitive sanctions to the staff involved",
      "To identify latent system vulnerabilities and procedural gaps to prevent recurrence",
      "To prepare legal defenses against future civil litigation",
      "To avoid reporting the incident to regulatory licensing boards"
    ],
    correctIndex: 1,
    explanation: "RCA focuses on systemic processes, design failures, and human factor vulnerabilities rather than individual blame, establishing safeguards that prevent recurrence.",
    keyTakeaway: "Root Cause Analysis (RCA) fixes broken systems, not individual blame.",
    difficulty: "Medium"
  },
  {
    id: "q-19",
    category: "Scenario & Applied Practice",
    question: "When teaching a client with chronic hypertension about lifestyle modifications, which dietary strategy is proven to yield significant reductions in systolic pressure?",
    options: [
      "The Atkins low-carbohydrate high-saturated-fat regimen",
      "The Dietary Approaches to Stop Hypertension (DASH) eating plan",
      "High-sodium low-potassium intake with increased caffeine",
      "Complete avoidance of all dietary fiber and dairy products"
    ],
    correctIndex: 1,
    explanation: "The DASH diet (rich in fruits, vegetables, whole grains, and low-fat dairy with reduced sodium and saturated fat) is clinically proven to lower systolic pressure by 8-14 mmHg.",
    keyTakeaway: "DASH Diet = High potassium, magnesium, calcium; low sodium & saturated fat.",
    difficulty: "Easy"
  },
  {
    id: "q-20",
    category: "Calculations & Analytics",
    question: "In a diagnostic test study, 90 out of 100 individuals with confirmed disease test positive, and 95 out of 100 healthy individuals test negative. What is the sensitivity of this diagnostic test?",
    options: [
      "95%",
      "90%",
      "85%",
      "92.5%"
    ],
    correctIndex: 1,
    explanation: "Sensitivity = True Positives / (True Positives + False Negatives) = (Those with disease who test positive) / (Total with disease) = 90 / 100 = 90%. (95% is the test's Specificity).",
    keyTakeaway: "Sensitivity = Ability to correctly identify those WITH the disease (True Positive Rate).",
    difficulty: "Medium"
  }
];
