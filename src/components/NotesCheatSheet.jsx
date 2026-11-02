import React, { useState, useEffect } from "react";
import { 
  BookOpen, Save, Sparkles, Check, Heart, Search, Copy, 
  ExternalLink, Layers, ShieldAlert, Award, FileText, ChevronRight,
  Calculator, Stethoscope, Pill, Compass
} from "lucide-react";
import { sound } from "../utils/audio";
import { getTodayAngeloNote } from "../data/angeloNotes";

// High-Yield Quick Reference Cards
const CHEAT_SHEET_CARDS = [
  {
    id: "la-malamed",
    subject: "Local Anesthesia",
    badge: "Day 2 • Pharmacology",
    bookPage: 63,
    title: "Malamed Local Anesthetic Maximum Recommended Doses (MRD)",
    pearl: "BOARD EXAM FAVORITE 🚨 Always calculate based on patient weight before starting injection!",
    bullets: [
      "2% Lidocaine with Epi (1:100k): 7.0 mg/kg (3.2 mg/lb), max 500 mg (~13.8 carpules).",
      "3% Mepivacaine Plain: 6.6 mg/kg (3.0 mg/lb), max 400 mg (~7.4 carpules).",
      "4% Articaine with Epi: 7.0 mg/kg (3.2 mg/lb), max 500 mg (~6.9 carpules). Rapid plasma pseudocholinesterase clearance.",
      "0.5% Bupivacaine with Epi: 2.0 mg/kg (0.9 mg/lb), max 90 mg (~10 carpules). Longest duration.",
      "4% Prilocaine: 8.0 mg/kg (3.6 mg/lb), max 600 mg (~8.3 carpules). Risk of methemoglobinemia (reversal: Methylene Blue)."
    ]
  },
  {
    id: "epi-limits",
    subject: "Pharmacology",
    badge: "Day 2 • Vasoconstrictors",
    bookPage: 64,
    title: "Epinephrine Limits & Patient Safety Protocols",
    pearl: "Standard 1.8 mL carpule of 1:100k epi = 0.018 mg epinephrine.",
    bullets: [
      "Healthy ASA I Patient: Max 0.2 mg epinephrine (~11 carpules of 1:100k).",
      "Cardiac ASA III/IV Patient: Max 0.04 mg epinephrine (~2 carpules of 1:100k or ~4 carpules of 1:200k).",
      "Lethal Interaction: Non-selective beta-blockers (Propranolol) + Epi -> severe hypertensive emergency and reflex bradycardia!",
      "Contraindications to Epi: Uncontrolled hypertension, unstable angina, recent MI <6 mo, pheochromocytoma, thyroid storm."
    ]
  },
  {
    id: "antibiotic-prophylaxis",
    subject: "Dental Therapeutics",
    badge: "Day 2 • AHA Guidelines",
    bookPage: 70,
    title: "AHA Infective Endocarditis Antibiotic Prophylaxis",
    pearl: "Take 30–60 minutes BEFORE the dental procedure. Clindamycin is NO LONGER recommended by AHA!",
    bullets: [
      "Standard Regimen: Amoxicillin 2.0 g orally (Children: 50 mg/kg).",
      "Penicillin Allergy (Oral): Cephalexin 2.0 g (if non-anaphylactic) OR Azithromycin/Clarithromycin 500 mg (Children: 15 mg/kg).",
      "Qualifying Cardiac Conditions: Prosthetic heart valves, previous infective endocarditis, unrepaired cyanotic CHD, repaired CHD with prosthesis for first 6 months, cardiac transplant with valvulopathy.",
      "Procedures: Extractions, periodontal scaling, endodontic surgery. NOT required for routine local injections or radiographs!"
    ]
  },
  {
    id: "emergency-antidotes",
    subject: "Medical Emergencies",
    badge: "Day 2 • Emergency Kit",
    bookPage: 80,
    title: "Board Exam Antidotes & Emergency Reversal Drugs",
    pearl: "Memorize these pairs—guaranteed 2-3 questions on board exam Day 2!",
    bullets: [
      "Opioids (Morphine, Codeine, Fentanyl) -> Naloxone (Narcan) 0.4 mg IV/IM.",
      "Benzodiazepines (Midazolam, Diazepam) -> Flumazenil (Romazicon) 0.2 mg IV.",
      "Local Anesthetic Toxicity (LAST) -> 20% Lipid Emulsion (Intralipid).",
      "Acetaminophen (Paracetamol) Hepatotoxicity -> N-Acetylcysteine (NAC / Mucomyst).",
      "Heparin -> Protamine Sulfate.",
      "Warfarin -> Vitamin K1 (Phytonadione) and Fresh Frozen Plasma.",
      "Organophosphate Toxicity / Cholinergic Crisis -> Atropine + Pralidoxime (2-PAM).",
      "Prilocaine Methemoglobinemia -> Methylene Blue (1–2 mg/kg IV)."
    ]
  },
  {
    id: "eruption-milestones",
    subject: "Pediatric Dentistry",
    badge: "Day 3 • Eruption Ages",
    bookPage: 88,
    title: "Universal Tooth Eruption Sequences & Rule of Four",
    pearl: "Mandibular permanent canine erupts BEFORE premolars; Maxillary permanent canine erupts AFTER premolars!",
    bullets: [
      "Primary Eruption Sequence: A - B - D - C - E (Centrals 6-10m -> Laterals 9-13m -> 1st Molars 13-19m -> Canines 16-22m -> 2nd Molars 25-33m).",
      "Mandibular Permanent Sequence: 6 - 1 - 2 - 3 - 4 - 5 - 7 (1st molar 6y, central 6-7y, lateral 7-8y, canine 9-10y, 1st PM 10-12y, 2nd PM 11-12y, 2nd molar 12y).",
      "Maxillary Permanent Sequence: 6 - 1 - 2 - 4 - 5 - 3 - 7 (Canine erupts at 11-12y after 1st and 2nd premolars!).",
      "Rule of Four: By 7 months (4 teeth), 11m (8 teeth), 15m (12 teeth), 19m (16 teeth), 23m (20 teeth complete primary dentition)."
    ]
  },
  {
    id: "leeway-space",
    subject: "Orthodontics",
    badge: "Day 3 • Mixed Dentition",
    bookPage: 89,
    title: "Nance Leeway Space & Mixed Dentition Mechanics",
    pearl: "Mandibular leeway space is GREATER than maxillary, facilitating the Late Mesial Shift into Class I molar relationship!",
    bullets: [
      "Definition: Difference between combined mesiodistal widths of primary C-D-E and permanent 3-4-5.",
      "Mandible: 1.7 to 2.5 mm per quadrant (~3.4 to 4.0 mm total arch).",
      "Maxilla: 0.9 to 1.5 mm per quadrant (~1.8 to 2.0 mm total arch).",
      "Late Mesial Shift: Mandibular permanent 1st molar shifts forward into the extra mandibular leeway space to establish normal Class I occlusion."
    ]
  },
  {
    id: "cephalometrics-steiner",
    subject: "Orthodontics",
    badge: "Day 3 • Cephalometrics",
    bookPage: 98,
    title: "Steiner Cephalometric Landmarks & ANB Angle",
    pearl: "ANB determines skeletal Class! Normal = 2 degrees (0 to 4 degrees).",
    bullets: [
      "SNA (Normal: 82° ± 2°): Maxillary sagittal position relative to cranial base. >84° = Maxillary prognathism.",
      "SNB (Normal: 80° ± 2°): Mandibular sagittal position relative to cranial base. <78° = Mandibular retrognathism.",
      "ANB > 4°: Skeletal Class II Malocclusion (maxillary protrusion or retrognathic mandible).",
      "ANB < 0° (Negative): Skeletal Class III Malocclusion (prognathic mandible or retrognathic maxilla).",
      "Key Landmarks: S (Sella), N (Nasion), A (Subspinale), B (Supramentale), Pog (Pogonion)."
    ]
  },
  {
    id: "growth-theories",
    subject: "Orthodontics",
    badge: "Day 3 • Craniofacial Growth",
    bookPage: 93,
    title: "Theories of Craniofacial Growth & Synchondroses",
    pearl: "Spheno-occipital synchondrosis closes LAST at 15–20 years and is the principal growth center of the cranial base!",
    bullets: [
      "Melvin Moss's Functional Matrix: Bone and cartilage have no intrinsic genetic determinants; skeletal units grow secondarily in response to functional soft tissue matrices (airway, brain, mastication).",
      "Scott's Cartilaginous Theory: Cartilage is the primary pacemaker (nasal septum, cranial base synchondroses).",
      "Sicher's Sutural Theory: Sutures are primary determinants (disproven; sutures are reactive growth sites).",
      "Growth Center vs Site: All growth centers are sites, but condyle is ONLY a growth site, not an independent center!"
    ]
  },
  {
    id: "cranial-nerves-exits",
    subject: "General Anatomy",
    badge: "Day 1 • Cranial Nerves",
    bookPage: 16,
    title: "Cranial Nerve Foramina & Trigeminal Branches",
    pearl: "Standing Room Only (SRO) mnemonic for Trigeminal: V1 Superior Orbital, V2 Rotundum, V3 Ovale!",
    bullets: [
      "CN V1 (Ophthalmic): Superior Orbital Fissure (Sensory only).",
      "CN V2 (Maxillary): Foramen Rotundum (Sensory only).",
      "CN V3 (Mandibular): Foramen Ovale (Sensory AND Motor).",
      "Middle Meningeal Artery: Passes through Foramen Spinosum adjacent to foramen ovale.",
      "CN VII (Facial): Internal acoustic meatus -> Stylomastoid foramen (Motor to facial expression).",
      "CN IX, X, XI: Jugular Foramen.",
      "CN XII (Hypoglossal): Hypoglossal Canal."
    ]
  },
  {
    id: "pathology-oral-lesions",
    subject: "Oral Pathology",
    badge: "Day 1 • Pathology",
    bookPage: 50,
    title: "High-Yield Oral Lesions & Differentiating Features",
    pearl: "Candida pseudomembranous wipes off; Leukoplakia and Oral Hairy Leukoplakia do NOT wipe off!",
    bullets: [
      "Pseudomembranous Candidiasis: White curd-like plaques that WIPE OFF leaving a bleeding red base.",
      "Leukoplakia: White plaque that CANNOT be wiped off; 5-25% dysplasia; high risk at ventrolateral tongue & floor of mouth.",
      "Erythroplakia: Velvety red patch; >90% show severe dysplasia, CIS, or squamous cell carcinoma!",
      "Recurrent Intraoral Herpes: Strictly localized to KERATINIZED mucosa bound to bone (hard palate & attached gingiva).",
      "Aphthous Ulcers: Occurs on NON-KERATINIZED, mobile mucosa (buccal mucosa, labial mucosa, ventral tongue)."
    ]
  }
];

export function NotesCheatSheet({ girlfriendName, notes, onSaveNotes, onSelectTab, onNavigateToBookPage }) {
  const [content, setContent] = useState(notes);
  const [savedBadge, setSavedBadge] = useState(false);
  const [activeTab, setActiveTab] = useState("cards"); // "cards", "tables", "editor"
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  const todayNote = getTodayAngeloNote();

  useEffect(() => {
    setContent(notes);
  }, [notes]);

  const handleSave = () => {
    sound.playSuccess();
    onSaveNotes(content);
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2000);
  };

  const handleCopyCard = (card) => {
    sound.playClick();
    const formatted = `[${card.subject}] ${card.title}\n${card.pearl}\n\nKey Concepts:\n${card.bullets.map((b) => `• ${b}`).join("\n")}`;
    navigator.clipboard.writeText(formatted);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenInBook = (pNum) => {
    if (onNavigateToBookPage) {
      onNavigateToBookPage(pNum);
    } else if (onSelectTab) {
      onSelectTab("book");
    }
  };

  // Filter cards
  const filteredCards = CHEAT_SHEET_CARDS.filter((card) => {
    const q = searchFilter.toLowerCase();
    const matchesSearch = 
      card.title.toLowerCase().includes(q) ||
      card.subject.toLowerCase().includes(q) ||
      card.pearl.toLowerCase().includes(q) ||
      card.bullets.some((b) => b.toLowerCase().includes(q));
    
    const matchesSubject = selectedSubject === "all" || card.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const uniqueSubjects = ["all", ...Array.from(new Set(CHEAT_SHEET_CARDS.map((c) => c.subject)))];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.25rem 1rem 4rem" }}>
      
      {/* Aesthetic Header */}
      <div className="glass-panel" style={{
        padding: "1.75rem",
        marginBottom: "1.5rem",
        background: "linear-gradient(135deg, rgba(35, 20, 60, 0.75), rgba(20, 12, 38, 0.9))",
        borderRadius: "var(--radius-lg)",
        border: "1px solid rgba(168, 85, 247, 0.35)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #ec4899, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(236, 72, 153, 0.4)"
            }}>
              <Sparkles size={26} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
                  Dr. {girlfriendName}'s Board Exam Cheat Sheet & Clinical Hub
                </h1>
                <span className="badge badge-pink" style={{ fontSize: "0.75rem" }}>
                  High-Yield ✨
                </span>
              </div>
              <p style={{ margin: "0.25rem 0 0", color: "var(--text-secondary)", fontSize: "0.88rem" }}>
                Formulas, Malamed dosages, eruption timelines, and personal study notes curated for topnotcher success.
              </p>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div style={{
            display: "flex",
            background: "rgba(0,0,0,0.3)",
            padding: "4px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-color)"
          }}>
            <button
              onClick={() => setActiveTab("cards")}
              className={`btn btn-ghost ${activeTab === "cards" ? "active" : ""}`}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                background: activeTab === "cards" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "cards" ? "#fff" : "var(--text-secondary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <Layers size={15} />
              <span>Study Cards ({CHEAT_SHEET_CARDS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("tables")}
              className={`btn btn-ghost ${activeTab === "tables" ? "active" : ""}`}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                background: activeTab === "tables" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "tables" ? "#fff" : "var(--text-secondary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <Calculator size={15} />
              <span>Clinical Tables</span>
            </button>

            <button
              onClick={() => setActiveTab("editor")}
              className={`btn btn-ghost ${activeTab === "editor" ? "active" : ""}`}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                background: activeTab === "editor" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "editor" ? "#fff" : "var(--text-secondary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              <FileText size={15} />
              <span>My Notes Pad ✍️</span>
            </button>
          </div>
        </div>

        {/* Angelo's Rotating Daily Note Card */}
        {todayNote && (
          <div style={{
            marginTop: "1.25rem",
            padding: "0.9rem 1.25rem",
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(168, 85, 247, 0.08))",
            border: "1px dashed rgba(236, 72, 153, 0.4)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Heart size={22} color="#ec4899" fill="#ec4899" style={{ flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#f472b6" }}>
                  Angelo's Note for Today: "{todayNote.title}"
                </span>
                <p style={{ margin: "0.15rem 0 0", fontSize: "0.82rem", color: "#fbcfe8", lineHeight: 1.4 }}>
                  {todayNote.note} <span style={{ opacity: 0.8, fontStyle: "italic" }}>{todayNote.signature}</span>
                </p>
              </div>
            </div>
            <span className="badge badge-pink" style={{ fontSize: "0.72rem" }}>
              Daily Love 💌
            </span>
          </div>
        )}
      </div>

      {/* TAB 1: STUDY CARDS */}
      {activeTab === "cards" && (
        <div>
          {/* Search & Subject Filter Bar */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "1.25rem"
          }}>
            <div style={{ position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--accent-primary)" }} />
              <input
                type="text"
                placeholder="Search cheat sheet cards (e.g. malamed, epinephrine, steiner, leeway, candida)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.8rem",
                  background: "var(--input-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem"
                }}
              />
            </div>

            {/* Subject Filter Pills */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginRight: "0.25rem" }}>
                Filter:
              </span>
              {uniqueSubjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  style={{
                    padding: "0.3rem 0.75rem",
                    borderRadius: "16px",
                    fontSize: "0.78rem",
                    border: "1px solid " + (selectedSubject === sub ? "var(--accent-primary)" : "var(--border-color)"),
                    background: selectedSubject === sub ? "rgba(168, 85, 247, 0.25)" : "rgba(255,255,255,0.03)",
                    color: selectedSubject === sub ? "#fff" : "var(--text-secondary)",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontWeight: selectedSubject === sub ? 700 : 500
                  }}
                >
                  {sub === "all" ? "All Subjects" : sub}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1.25rem" }}>
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="glass-panel"
                style={{
                  padding: "1.35rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(168, 85, 247, 0.25)",
                  background: "rgba(22, 14, 40, 0.75)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  transition: "transform 0.2s ease, border-color 0.2s ease"
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                      <span className="badge badge-purple" style={{ fontSize: "0.72rem" }}>
                        {card.subject}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {card.badge}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyCard(card)}
                      className="btn btn-ghost"
                      title="Copy Card"
                      style={{ padding: "0.25rem 0.5rem", color: copiedId === card.id ? "#10b981" : "var(--text-muted)" }}
                    >
                      {copiedId === card.id ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", margin: "0 0 0.6rem", lineHeight: 1.35 }}>
                    {card.title}
                  </h3>

                  {/* Board Pearl Alert Banner */}
                  <div style={{
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(236, 72, 153, 0.12)",
                    borderLeft: "3px solid #ec4899",
                    marginBottom: "0.85rem",
                    fontSize: "0.82rem",
                    color: "#fbcfe8",
                    lineHeight: 1.45,
                    fontWeight: 600
                  }}>
                    {card.pearl}
                  </div>

                  {/* Bullet points */}
                  <ul style={{
                    margin: 0,
                    paddingLeft: "1.15rem",
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    lineHeight: 1.6
                  }}>
                    {card.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: "0.35rem" }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Deep Link to Book Page */}
                <div style={{
                  marginTop: "1.15rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Source: DMF Page {card.bookPage}
                  </span>

                  <button
                    onClick={() => handleOpenInBook(card.bookPage)}
                    className="btn btn-secondary"
                    style={{
                      padding: "0.3rem 0.65rem",
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      color: "var(--accent-primary)"
                    }}
                  >
                    <span>View Page {card.bookPage} in Book</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CLINICAL TABLES */}
      {activeTab === "tables" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Table 1: Malamed Local Anesthesia Maximum Doses */}
          <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Pill size={18} color="#a855f7" />
                  Malamed Local Anesthetic Maximum Recommended Doses (MRD)
                </h3>
                <p style={{ margin: "0.2rem 0 0", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  Values for healthy adults using standard 1.8 mL cartridges.
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playSuccess();
                  navigator.clipboard.writeText("Malamed MRD Table:\nLidocaine 2% + Epi: 7.0 mg/kg (3.2 mg/lb), max 500mg (~13.8 carpules)\nMepivacaine 3% plain: 6.6 mg/kg (3.0 mg/lb), max 400mg (~7.4 carpules)\nArticaine 4% + Epi: 7.0 mg/kg (3.2 mg/lb), max 500mg (~6.9 carpules)\nBupivacaine 0.5% + Epi: 2.0 mg/kg (0.9 mg/lb), max 90mg (~10 carpules)\nPrilocaine 4%: 8.0 mg/kg (3.6 mg/lb), max 600mg (~8.3 carpules)");
                  alert("Copied Malamed MRD table to clipboard!");
                }}
                className="btn btn-secondary"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
              >
                <Copy size={13} />
                <span>Copy Table</span>
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--accent-primary)", color: "var(--accent-primary)" }}>
                    <th style={{ padding: "0.6rem" }}>Local Anesthetic</th>
                    <th style={{ padding: "0.6rem" }}>Concentration</th>
                    <th style={{ padding: "0.6rem" }}>mg / Carpule (1.8mL)</th>
                    <th style={{ padding: "0.6rem" }}>MRD (mg/kg)</th>
                    <th style={{ padding: "0.6rem" }}>MRD (mg/lb)</th>
                    <th style={{ padding: "0.6rem" }}>Absolute Max</th>
                    <th style={{ padding: "0.6rem" }}>Max Carpules</th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--text-primary)" }}>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "0.6rem", fontWeight: 700 }}>Lidocaine (with Epi)</td>
                    <td style={{ padding: "0.6rem" }}>2% (1:100k)</td>
                    <td style={{ padding: "0.6rem" }}>36 mg</td>
                    <td style={{ padding: "0.6rem" }}>7.0 mg/kg</td>
                    <td style={{ padding: "0.6rem" }}>3.2 mg/lb</td>
                    <td style={{ padding: "0.6rem", color: "#10b981", fontWeight: 700 }}>500 mg</td>
                    <td style={{ padding: "0.6rem" }}>~13.8 carpules</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "0.6rem", fontWeight: 700 }}>Mepivacaine Plain</td>
                    <td style={{ padding: "0.6rem" }}>3%</td>
                    <td style={{ padding: "0.6rem" }}>54 mg</td>
                    <td style={{ padding: "0.6rem" }}>6.6 mg/kg</td>
                    <td style={{ padding: "0.6rem" }}>3.0 mg/lb</td>
                    <td style={{ padding: "0.6rem", color: "#10b981", fontWeight: 700 }}>400 mg</td>
                    <td style={{ padding: "0.6rem" }}>~7.4 carpules</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "0.6rem", fontWeight: 700 }}>Articaine (with Epi)</td>
                    <td style={{ padding: "0.6rem" }}>4% (1:100k / 1:200k)</td>
                    <td style={{ padding: "0.6rem" }}>72 mg</td>
                    <td style={{ padding: "0.6rem" }}>7.0 mg/kg</td>
                    <td style={{ padding: "0.6rem" }}>3.2 mg/lb</td>
                    <td style={{ padding: "0.6rem", color: "#10b981", fontWeight: 700 }}>500 mg</td>
                    <td style={{ padding: "0.6rem" }}>~6.9 carpules</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "0.6rem", fontWeight: 700 }}>Bupivacaine (Marcaine)</td>
                    <td style={{ padding: "0.6rem" }}>0.5% (1:200k)</td>
                    <td style={{ padding: "0.6rem" }}>9 mg</td>
                    <td style={{ padding: "0.6rem" }}>2.0 mg/kg</td>
                    <td style={{ padding: "0.6rem" }}>0.9 mg/lb</td>
                    <td style={{ padding: "0.6rem", color: "#10b981", fontWeight: 700 }}>90 mg</td>
                    <td style={{ padding: "0.6rem" }}>~10.0 carpules</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.6rem", fontWeight: 700 }}>Prilocaine (Citanest)</td>
                    <td style={{ padding: "0.6rem" }}>4%</td>
                    <td style={{ padding: "0.6rem" }}>72 mg</td>
                    <td style={{ padding: "0.6rem" }}>8.0 mg/kg</td>
                    <td style={{ padding: "0.6rem" }}>3.6 mg/lb</td>
                    <td style={{ padding: "0.6rem", color: "#10b981", fontWeight: 700 }}>600 mg</td>
                    <td style={{ padding: "0.6rem" }}>~8.3 carpules</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Cephalometric Steiner Standards */}
          <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0 0 0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Compass size={18} color="#ec4899" />
              Cephalometric Steiner Analysis Standards & Class Diagnostic Key
            </h3>
            <p style={{ margin: "0 0 1rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              Sagittal jaw positions relative to cranial base (Sella-Nasion line).
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.25)", border: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-primary)" }}>SNA ANGLE</span>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0.25rem 0" }}>82° ± 2°</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>
                  Maxillary sagittal position. &gt;84° = Maxillary prognathism. &lt;80° = Maxillary retrognathism.
                </p>
              </div>

              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.25)", border: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-primary)" }}>SNB ANGLE</span>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0.25rem 0" }}>80° ± 2°</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>
                  Mandibular sagittal position. &gt;82° = Mandibular prognathism. &lt;78° = Mandibular retrognathism.
                </p>
              </div>

              <div style={{ padding: "1rem", borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(236, 72, 153, 0.4)" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#f472b6" }}>ANB ANGLE (KEY!)</span>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0.25rem 0", color: "#ec4899" }}>2° ± 2° (0° to 4°)</h4>
                <p style={{ fontSize: "0.8rem", color: "#fbcfe8", margin: 0 }}>
                  &gt;4° = Skeletal Class II (retrognathic mandible). &lt;0° = Skeletal Class III (prognathic mandible).
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: DR. LEANE'S PERSONAL NOTEBOOK */}
      {activeTab === "editor" && (
        <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>
                Dr. {girlfriendName}'s Personal Study Notes
              </h3>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Jot down tricky clinical cases, personal mnemonics, or concepts to ask in study group.
              </p>
            </div>

            <button onClick={handleSave} className="btn btn-primary" style={{ padding: "0.5rem 1.25rem" }}>
              {savedBadge ? <Check size={16} /> : <Save size={16} />}
              <span>{savedBadge ? "Saved to Cloud & Storage!" : "Save Notes"}</span>
            </button>
          </div>

          <textarea
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your personal study notes, reminders, mnemonics, or tricky question rationales here..."
            style={{
              width: "100%",
              background: "var(--input-bg)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              fontFamily: "'JetBrains Mono', 'Plus Jakarta Sans', monospace",
              resize: "vertical"
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
            <span>💡 All notes are auto-persisted and synced across your devices.</span>
            <span>Character count: {content.length}</span>
          </div>
        </div>
      )}

    </div>
  );
}
