import React, { useState } from "react";
import { 
  Zap, Calculator, Activity, HelpCircle, CheckCircle2, 
  XCircle, Award, RotateCcw, Heart, ShieldAlert, Sparkles, BookOpen 
} from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "../utils/audio";

// High-Yield Dental Morphology & Odontogram Database
const TOOTH_DRILLS = [
  {
    id: "t-1",
    stem: "Universal System Tooth #14 corresponds to which tooth and what is its FDI (Two-Digit) designation?",
    options: [
      "Maxillary Left 1st Molar — FDI: 26",
      "Maxillary Right 1st Molar — FDI: 16",
      "Mandibular Left 1st Molar — FDI: 36",
      "Maxillary Left 2nd Premolar — FDI: 25"
    ],
    correctIndex: 0,
    rationale: "Universal #14 is the permanent Maxillary Left 1st Molar. In the FDI system, Quadrant 2 is Maxillary Left, and tooth 6 from midline is the 1st molar, designating it as Tooth 26."
  },
  {
    id: "t-2",
    stem: "Which tooth is notorious for having 2 roots (buccal & lingual) and 2 canals in approximately 85% of clinical cases?",
    options: [
      "Maxillary 1st Premolar (Universal #5 & #12)",
      "Mandibular 1st Premolar (Universal #21 & #28)",
      "Maxillary 2nd Premolar (Universal #4 & #13)",
      "Mandibular 2nd Premolar (Universal #20 & #29)"
    ],
    correctIndex: 0,
    rationale: "The permanent Maxillary 1st Premolar is the ONLY premolar that consistently features two distinct roots (buccal and lingual) and two pulp canals in >85% of cases. It also features a distinct mesial marginal developmental groove."
  },
  {
    id: "t-3",
    stem: "The supplemental non-functional 'Cusp of Carabelli' is an anatomical hallmark situated on which cusp?",
    options: [
      "Mesiolingual cusp of Maxillary 1st Molar",
      "Mesiobuccal cusp of Maxillary 1st Molar",
      "Distolingual cusp of Mandibular 1st Molar",
      "Mesiolingual cusp of Mandibular 2nd Molar"
    ],
    correctIndex: 0,
    rationale: "The Cusp of Carabelli (tubercle of Carabelli) is situated on the lingual surface of the mesiolingual (ML) cusp of permanent Maxillary 1st Molars (and primary maxillary 2nd molars)."
  },
  {
    id: "t-4",
    stem: "Which tooth possesses the longest total root length in the human dentition, earning it the title 'Cornerstone of the Dental Arch'?",
    options: [
      "Maxillary Canine (Universal #6 & #11)",
      "Mandibular Canine (Universal #22 & #27)",
      "Maxillary Central Incisor (Universal #8 & #9)",
      "Mandibular 1st Molar (Universal #19 & #30)"
    ],
    correctIndex: 0,
    rationale: "The Maxillary Canine has the longest overall length (average ~27 mm) and root in the mouth, embedded in the prominent canine eminence of the maxilla."
  },
  {
    id: "t-5",
    stem: "In the Universal System, primary tooth 'Letter K' designates which tooth?",
    options: [
      "Mandibular Left 2nd Primary Molar (FDI: 75)",
      "Mandibular Right 2nd Primary Molar (FDI: 85)",
      "Maxillary Left 2nd Primary Molar (FDI: 65)",
      "Mandibular Left 1st Primary Molar (FDI: 74)"
    ],
    correctIndex: 0,
    rationale: "Universal primary system runs A to T (A = Maxillary Right 2nd molar, J = Maxillary Left 2nd molar, K = Mandibular Left 2nd molar, T = Mandibular Right 2nd molar). Thus, Tooth K is the Mandibular Left 2nd Primary Molar (FDI: 75)."
  },
  {
    id: "t-6",
    stem: "Which tooth has the smallest mesiodistal crown diameter of all permanent teeth in the human dentition?",
    options: [
      "Mandibular Central Incisor (Universal #24 & #25)",
      "Mandibular Lateral Incisor (Universal #23 & #26)",
      "Maxillary Lateral Incisor (Universal #7 & #10)",
      "Mandibular 1st Premolar (Universal #21 & #28)"
    ],
    correctIndex: 0,
    rationale: "The permanent Mandibular Central Incisor (#24, #25) is the smallest tooth in the entire human dentition (crown width ~5.0 mm), featuring bilaterally symmetrical proximal line angles."
  },
  {
    id: "t-7",
    stem: "What is the primary deciduous tooth eruption sequence in infants?",
    options: [
      "Central Incisors (A) -> Lateral Incisors (B) -> 1st Molars (D) -> Canines (C) -> 2nd Molars (E)",
      "Central Incisors (A) -> Lateral Incisors (B) -> Canines (C) -> 1st Molars (D) -> 2nd Molars (E)",
      "1st Molars (D) -> Central Incisors (A) -> Lateral Incisors (B) -> Canines (C) -> 2nd Molars (E)",
      "Central Incisors (A) -> Canines (C) -> Lateral Incisors (B) -> 1st Molars (D) -> 2nd Molars (E)"
    ],
    correctIndex: 0,
    rationale: "Primary tooth eruption follows the famous rule: A - B - D - C - E (Centrals ~6-10 mo -> Laterals ~10-16 mo -> 1st Molars ~14-18 mo -> Canines ~16-23 mo -> 2nd Molars ~23-31 mo). Notice Canines erupt AFTER 1st molars!"
  }
];

// Anesthesia Scenarios
const ANESTHESIA_SCENARIOS = [
  {
    id: "anes-1",
    patient: "Maria, a 50 kg healthy 22-year-old female (ASA I)",
    drug: "Lidocaine 2% with 1:100,000 Epinephrine",
    mrdMgPerKg: 7.0, // or 4.4 standard
    mrdAbsolute: 500, // mg max absolute
    mgPerCartridge: 36, // 1.8 mL * 20 mg/mL
    epiPerCartridge: 0.018, // 1.8 mL * 0.01 mg/mL
    isCardiac: false,
    question: "Under standard Malamed / Philippine DLE guidelines, what is the maximum number of standard 1.8 mL cartridges of Lidocaine 2% (1:100,000 epi) that can be safely administered to this 50 kg healthy patient?",
    options: [
      "6 to 7 cartridges (limiting factor: Lidocaine MRD ~220-300 mg)",
      "2 cartridges (limiting factor: Epinephrine)",
      "11 cartridges (limiting factor: Epinephrine 0.2 mg)",
      "14 cartridges (limiting factor: Absolute 500 mg)"
    ],
    correctIndex: 0,
    calculationSteps: [
      "1. Patient Weight = 50 kg.",
      "2. Lidocaine 2% = 20 mg/mL. Standard cartridge = 1.8 mL -> 1.8 x 20 = 36 mg Lidocaine per carpule.",
      "3. Malamed conservative MRD = 4.4 to 7.0 mg/kg -> 50 kg x 4.4 mg/kg = 220 mg (or 50 x 7.0 = 350 mg, max 500 mg).",
      "4. Cartridges by Anesthetic = 220 mg / 36 mg ≈ 6.1 cartridges (or up to 7 cartridges).",
      "5. Vasoconstrictor check: Healthy patient max Epi = 0.2 mg. Cartridges by Epi = 0.2 mg / 0.018 mg = 11.1 cartridges.",
      "6. Conclusion: The local anesthetic dose (6 to 7 cartridges) is the strict limiting factor!"
    ]
  },
  {
    id: "anes-2",
    patient: "Mr. Tan, a 70 kg male with ischemic heart disease & recent stent (ASA III Cardiac)",
    drug: "Lidocaine 2% with 1:100,000 Epinephrine",
    isCardiac: true,
    question: "For this cardiac patient (ASA III), what is the maximum safe cartridge limit of 1:100,000 epinephrine local anesthetic?",
    options: [
      "Strict 2 cartridges (Epi limit = 0.04 mg)",
      "4 cartridges (Epi limit = 0.08 mg)",
      "6 cartridges (Weight-based Lido calculation)",
      "0 cartridges (Epinephrine is strictly contraindicated in all heart patients)"
    ],
    correctIndex: 0,
    calculationSteps: [
      "1. Medical History: Patient has ischemic heart disease (ASA III).",
      "2. Maximum Recommended Dose of Epinephrine for Cardiac Patients is strictly 0.04 mg (compared to 0.2 mg for healthy patients).",
      "3. 1:100,000 Epinephrine concentration = 0.01 mg/mL -> 1.8 mL cartridge contains 0.018 mg epinephrine.",
      "4. Cartridge calculation = 0.04 mg / 0.018 mg = 2.22 cartridges.",
      "5. Clinical Rule: Round DOWN to 2 cartridges maximum! (Or switch to 3% Mepivacaine Plain without vasoconstrictor)."
    ]
  },
  {
    id: "anes-3",
    patient: "Elena, a 60 kg adult female undergoing mandibular third molar extraction",
    drug: "Articaine 4% with 1:100,000 Epinephrine (Septocaine)",
    isCardiac: false,
    question: "Why is Articaine 4% unique among dental amide anesthetics, and how is it primarily metabolized in the body?",
    options: [
      "It contains a thiophene ring and ester linkage; 90% is metabolized in blood plasma by pseudocholinesterase.",
      "It is purely metabolized in the liver by cytochrome P450 enzymes with a half-life of 90 minutes.",
      "It is metabolized exclusively in the kidneys and excreted unchanged in urine.",
      "It contains no ester links and cannot be used in patients with pseudocholinesterase deficiency."
    ],
    correctIndex: 0,
    calculationSteps: [
      "1. Articaine (Septocaine) 4% is an amide local anesthetic, but uniquely contains a thiophene ring (instead of benzene) and an additional ester linkage.",
      "2. Metabolism: ~90% is rapidly hydrolyzed in the bloodstream by plasma pseudocholinesterase into the inactive metabolite articainic acid.",
      "3. Elimination half-life: Only ~20 minutes (compared to ~90 minutes for Lidocaine), making repeated injections safer."
    ]
  },
  {
    id: "anes-4",
    patient: "A 45-year-old cardiac patient where all exogenous epinephrine/vasoconstrictors are strictly contraindicated",
    drug: "Mepivacaine 3% Plain (Carbocaine)",
    isCardiac: true,
    question: "What makes Mepivacaine 3% Plain the primary drug of choice when vasoconstrictor is contraindicated?",
    options: [
      "It causes the least vasodilation among dental amides, maintaining effective pulpal anesthesia without epinephrine.",
      "It has a higher epinephrine ratio than Lidocaine.",
      "It is metabolized by the lungs rather than the liver.",
      "It provides 8 hours of soft tissue anesthesia without any cardiovascular effect."
    ],
    correctIndex: 0,
    calculationSteps: [
      "1. Most local anesthetics (like Procaine and Lidocaine) are potent vasodilators that rapidly wash out into bloodstream unless combined with epinephrine.",
      "2. Mepivacaine produces the least vasodilation of all dental amides.",
      "3. Therefore, 3% Plain Mepivacaine can achieve reliable pulpal anesthesia (~20-40 mins) without adding any vasoconstrictor!"
    ]
  }
];

export function QuickDrills({ girlfriendName = "Leane" }) {
  const [activeTab, setActiveTab] = useState("tooth"); // 'tooth' | 'anesthesia'
  const [drillIndex, setDrillIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);

  // Active items based on tab
  const items = activeTab === "tooth" ? TOOTH_DRILLS : ANESTHESIA_SCENARIOS;
  const currentItem = items[drillIndex % items.length];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentItem.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      setScore(s => s + 1);
      setStreakCount(c => c + 1);
      if (streakCount + 1 >= 3) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      sound.playIncorrect();
      setStreakCount(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setDrillIndex(prev => prev + 1);
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setDrillIndex(0);
    setScore(0);
    setStreakCount(0);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem" }}>
      {/* Header banner */}
      <div className="glass-panel" style={{
        padding: "1.5rem 2rem",
        marginBottom: "1.5rem",
        border: "1px solid rgba(168, 85, 247, 0.35)",
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(236, 72, 153, 0.12))",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)"
          }}>
            ⚡
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>High-Yield Board Quick Drills 🦷⚡</h2>
              <Sparkles size={18} color="#c084fc" />
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Rapid tooth spotter & anesthesia calculation mastery for Dr. {girlfriendName}!
            </p>
          </div>
        </div>

        {/* Score & Streak Widget */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <div style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            padding: "0.45rem 0.9rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            <Award size={16} />
            <span>Score: {score}</span>
          </div>

          <div style={{
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            padding: "0.45rem 0.9rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#f59e0b",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            <span>🔥 {streakCount} Combo</span>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1.25rem",
        background: "var(--option-bg)",
        padding: "0.35rem",
        borderRadius: "14px",
        border: "1px solid var(--border-color)",
        width: "fit-content"
      }}>
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab("tooth");
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          style={{
            padding: "0.55rem 1.25rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.875rem",
            background: activeTab === "tooth" ? "var(--gradient-love)" : "transparent",
            color: activeTab === "tooth" ? "#fff" : "var(--text-secondary)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem"
          }}
        >
          <span>🦷</span>
          <span>Odontogram & Tooth Spotter</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab("anesthesia");
            setSelectedOption(null);
            setIsAnswered(false);
          }}
          style={{
            padding: "0.55rem 1.25rem",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.875rem",
            background: activeTab === "anesthesia" ? "var(--gradient-love)" : "transparent",
            color: activeTab === "anesthesia" ? "#fff" : "var(--text-secondary)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem"
          }}
        >
          <Calculator size={16} />
          <span>Anesthesia & MRD Calculator</span>
        </button>
      </div>

      {/* Drill Content Card */}
      <div className="glass-panel" style={{
        padding: "2rem",
        border: "1px solid var(--border-color)",
        borderRadius: "16px",
        marginBottom: "1.5rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "var(--accent-purple)",
            background: "rgba(168, 85, 247, 0.12)",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px"
          }}>
            {activeTab === "tooth" ? "Dental Anatomy & Eruption Rule" : "DLE Pharmacology & MRD Calculation"}
          </span>

          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Drill #{drillIndex + 1}
          </span>
        </div>

        {/* Patient / Scenario Profile if Anesthesia */}
        {activeTab === "anesthesia" && currentItem.patient && (
          <div style={{
            background: currentItem.isCardiac ? "rgba(239, 68, 68, 0.08)" : "rgba(16, 185, 129, 0.08)",
            border: currentItem.isCardiac ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(16, 185, 129, 0.3)",
            padding: "0.85rem 1.1rem",
            borderRadius: "10px",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            {currentItem.isCardiac ? <ShieldAlert size={22} color="#ef4444" /> : <Activity size={22} color="#10b981" />}
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: currentItem.isCardiac ? "#f87171" : "#34d399" }}>
                Patient: {currentItem.patient}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                Agent: <strong>{currentItem.drug}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Question Stem */}
        <h3 style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          lineHeight: 1.5,
          color: "var(--text-primary)",
          marginBottom: "1.5rem"
        }}>
          {activeTab === "tooth" ? currentItem.stem : currentItem.question}
        </h3>

        {/* Multiple Choice Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {currentItem.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentItem.correctIndex;

            let bg = "var(--option-bg)";
            let border = "1px solid var(--border-color)";
            let textColor = "var(--text-primary)";

            if (isAnswered) {
              if (isCorrect) {
                bg = "rgba(16, 185, 129, 0.2)";
                border = "1px solid #10b981";
                textColor = "#10b981";
              } else if (isSelected) {
                bg = "rgba(239, 68, 68, 0.2)";
                border = "1px solid #ef4444";
                textColor = "#ef4444";
              }
            } else if (isSelected) {
              bg = "rgba(168, 85, 247, 0.2)";
              border = "1px solid var(--accent-purple)";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "12px",
                  background: bg,
                  border: border,
                  color: textColor,
                  textAlign: "left",
                  fontSize: "0.925rem",
                  cursor: isAnswered ? "default" : "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.15s ease"
                }}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
              </button>
            );
          })}
        </div>

        {/* Step-by-Step Calculation & Rationale */}
        {isAnswered && (
          <div style={{
            background: "rgba(168, 85, 247, 0.08)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            borderRadius: "12px",
            padding: "1.25rem",
            marginBottom: "1.5rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.6rem" }}>
              <BookOpen size={18} color="#c084fc" />
              <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--accent-purple)" }}>
                Clinical Rationale & Calculation Breakdown:
              </h4>
            </div>

            {activeTab === "tooth" ? (
              <p style={{ fontSize: "0.875rem", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                {currentItem.rationale}
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {currentItem.calculationSteps.map((step, sIdx) => (
                  <div key={sIdx} style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={handleReset}
            className="btn btn-outline"
            style={{ fontSize: "0.8rem", padding: "0.5rem 0.85rem" }}
          >
            <RotateCcw size={14} /> Restart Drills
          </button>

          {isAnswered && (
            <button
              onClick={handleNext}
              className="btn btn-primary"
              style={{
                fontSize: "0.875rem",
                padding: "0.6rem 1.4rem",
                background: "var(--gradient-love)"
              }}
            >
              Next Challenge ⚡
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

