import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MockExam } from "./components/MockExam";
import { Flashcards } from "./components/Flashcards";
import { PracticeMode } from "./components/PracticeMode";
import { WeaknessFocus } from "./components/WeaknessFocus";
import { QuestionBank } from "./components/QuestionBank";
import { NotesCheatSheet } from "./components/NotesCheatSheet";
import { GoodNotes } from "./components/GoodNotes";
import { SettingsModal } from "./components/SettingsModal";
import { defaultQuestions } from "./data/defaultQuestions";
import { sound } from "./utils/audio";

const DEFAULT_NOTES = `# High-Yield Dental Board (DLE) Strategies & Mnemonics 🦷✨

### 1. Tooth Numbering & Identification Rules
* **FDI World Dental Federation System**:
  - 1st Digit = Quadrant (1=Maxillary Right, 2=Maxillary Left, 3=Mandibular Left, 4=Mandibular Right)
  - Primary Quadrants = 5 (UR), 6 (UL), 7 (LL), 8 (LR)
  - 2nd Digit = Tooth number from midline (1=Central Incisor to 8=Third Molar; 1 to 5 for primary).
* **Universal System**:
  - Permanent: 1 (UR 3rd molar) to 32 (LR 3rd molar).
  - Primary: A (UR 2nd molar) through T (LR 2nd molar).

---

### 2. Tooth Eruption Sequences
* **Deciduous Teeth (Primary)**:
  - Sequence: **A - B - D - C - E** (Centrals ~6-10 mo -> Laterals ~10-16 mo -> 1st Molars ~14-18 mo -> Canines ~16-23 mo -> 2nd Molars ~23-31 mo).
* **Permanent Dentition**:
  - Mandibular: **6 - 1 - 2 - 3 - 4 - 5 - 7 - 8**
  - Maxillary: **6 - 1 - 2 - 4 - 5 - 3 - 7 - 8** (Canine erupts *after* premolars in maxilla!).

---

### 3. Dental Local Anesthesia & Epinephrine Rules
* **Epinephrine MRD**:
  - Healthy Patient (ASA I): **0.2 mg** (~11 standard 1.8 mL cartridges of 1:100,000 epi).
  - Cardiac / Hypertensive Patient (ASA III/IV): **0.04 mg** (Strict limit: **2 cartridges** of 1:100,000 epi).
* **Articaine (Septocaine)**:
  - 4% formulation. Only dental amide local anesthetic containing a thiophene ring and an ester link; metabolized in **blood plasma by pseudocholinesterase** (elimination half-life ~20 mins).

---

### 4. G.V. Black Cavity Classifications
* **Class I**: Pits and fissures on occlusal surfaces of molars/premolars, facial/lingual pits of molars, lingual pits of maxillary incisors.
* **Class II**: Proximal surfaces of posterior teeth (premolars and molars).
* **Class III**: Proximal surfaces of anterior teeth (incisors/canines) NOT involving the incisal angle.
* **Class IV**: Proximal surfaces of anterior teeth INVOLVING the incisal angle.
* **Class V**: Gingival / cervical third of facial or lingual surfaces of all teeth.
* **Class VI**: Cavities on incisal edges of anterior teeth or cusp tips of posterior teeth.

---

### 5. RA 9484 (The Philippine Dental Act of 2007)
* **Exam Results**: Must be officially released and posted within **30 days** after the final examination day.
* **Reinstatement of Revoked License**: Allowed upon application after **2 years** following revocation, subject to Board discretion.

---

### 6. Special Note for You 💕
Every tooth morphology line angle, every cranial nerve pathway, and every diagnostic criteria you study today is building your future clinic. You are going to be such an incredible, compassionate, licensed dentist. Take a deep breath, trust your clinical instinct, and remember Angelo is always here cheering you on! 🦷💜

---

### 7. DMF Reviewer: General Anatomy, Physiology & Histology (Pages 1–30) 🔬
* **Integumentary System**:
  - **Keratinocytes**: >90% of cells; produces keratin.
  - **Melanocytes**: Neural crest origin; synthesizes melanin; nucleus shielded from UV rays.
  - **Langerhans cells**: Bone marrow monocyte lineage; dendritic antigen-presenting cells in Stratum spinosum.
  - **Merkel cells**: Stratum basale; light touch mechanoreceptors ('Merkel tactile discs').
  - **Malpighian layer** (Stratum germinativum) = Stratum basale + Stratum spinosum (highest mitotic activity!).
  - **Stratum lucidum**: Clear translucent layer with eleidin found ONLY in thick skin (palms and soles).
* **Mechanoreceptors Summary**:
  - **Pacinian corpuscles**: Deep pressure & vibration (concentric 'onion-like' lamellae).
  - **Meissner corpuscles**: Light touch & flutter located in dermal papillae.
  - **Ruffini corpuscles**: Heat & skin stretch.
  - **End-bulbs of Krause**: Cold sensation.
* **Vitamin D Synthesis Cascade**:
  - Skin: 7-dehydrocholesterol + solar UVB -> Cholecalciferol (Vitamin D3).
  - Liver: 25-hydroxylase -> Calcidiol (25-OH-D3).
  - Kidney: 1α-hydroxylase -> Calcitriol (1,25-(OH)2-D3) = Active form enabling intestinal Ca2+ absorption.
* **Muscle Physiology & Sarcomere**:
  - **Sarcomere** = Functional contractile unit of muscle (spanning Z-disc to Z-disc).
  - **Z line** bisects I (light) band; **M line** bisects H zone / A (dark) band.
  - **Sarcoplasmic Reticulum (SR)** terminal cisternae = Primary intracellular storage of Calcium (Ca2+).
  - **Cross-bridge cycle**: Myosin binds actin -> Power stroke releases ADP + Pi -> Binding of NEW ATP detaches myosin head (lack of ATP = Rigor Mortis!).
* **Cranial Nerves & Tongue Innervation**:
  - **Anterior 2/3 of tongue**: General sensation = Lingual nerve (V3); Taste = Chorda tympani (CN VII).
  - **Posterior 1/3 of tongue**: General sensation & Taste = Glossopharyngeal (CN IX).
  - **Base of tongue / Vallecula**: General sensation & Taste = Internal laryngeal (CN X).
  - **Motor to all tongue muscles**: Hypoglossal nerve (CN XII) (except palatoglossus: CN X).
  - **Posterior division of V3**: Has ONE motor branch = **Mylohyoid nerve** (supplies mylohyoid & anterior digastric).
* **Lingual Papillae**:
  - **Filiform**: Most numerous; keratinized; ONLY papillae WITHOUT taste buds.
  - **Fungiform**: Mushroom-shaped; located on tip and lateral margins; has taste buds.
  - **Circumvallate**: 8-12 large papillae in V-shaped sulcus terminalis; cleansed by purely serous **Glands of Von Ebner**.
* **Stomach & Digestive Histology**:
  - **Parietal (Oxyntic) cells**: Secrete HCl + Intrinsic Factor (essential for Vit B12 absorption; deficiency = Pernicious Anemia).
  - **Chief (Peptic) cells**: Secrete Pepsinogen (zymogen for protein digestion).
  - **G cells**: Secrete Gastrin in gastric antrum.
  - **Hepatic Portal Triad**: Hepatic Artery branch + Portal Vein branch + Bile Ductule.
  - **Pancreatic Ducts**: Duct of Wirsung (major/main duct) + Duct of Santorini (accessory duct).
`;

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("pb_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pb_theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    sound.playClick();
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // LocalStorage state initialization
  const [girlfriendName, setGirlfriendName] = useState(() => {
    return localStorage.getItem("pb_name") || "Leane";
  });

  const [examDate, setExamDate] = useState(() => {
    const saved = localStorage.getItem("pb_date");
    if (!saved || saved === "2026-11-25" || saved === "2026-11-20") {
      localStorage.setItem("pb_date", "2026-11-22");
      return "2026-11-22";
    }
    return saved;
  });

  const [personalMessage, setPersonalMessage] = useState(() => {
    return localStorage.getItem("pb_msg") || "Hi Leane! I have watched how hard and dedicated you are every single day. The board exam doesn't stand a chance against you. The license already has your name on it, Dr. Leane! Made with all my love by Angelo 💖";
  });

  const [passingScore, setPassingScore] = useState(() => {
    return Number(localStorage.getItem("pb_passing")) || 75;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("pb_sound") !== "false";
  });

  const DENTAL_VERSION = "dle_v6_dmf_book_integrated";

  const [questions, setQuestions] = useState(() => {
    try {
      const savedVersion = localStorage.getItem("pb_dle_version");
      if (savedVersion === DENTAL_VERSION) {
        const saved = localStorage.getItem("pb_questions");
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {}
    localStorage.setItem("pb_dle_version", DENTAL_VERSION);
    localStorage.setItem("pb_questions", JSON.stringify(defaultQuestions));
    return defaultQuestions;
  });

  const [examHistory, setExamHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("pb_history");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem("pb_flagged");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("pb_notes") || DEFAULT_NOTES;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("pb_streak")) || 1;
  });

  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync sound setting
  useEffect(() => {
    sound.enabled = soundEnabled;
    localStorage.setItem("pb_sound", String(soundEnabled));
  }, [soundEnabled]);

  // Sync streak on daily visit
  useEffect(() => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem("pb_last_login");

    if (lastLogin !== today) {
      if (lastLogin) {
        const lastDate = new Date(lastLogin);
        const diffDays = Math.round((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          const nextStreak = streak + 1;
          setStreak(nextStreak);
          localStorage.setItem("pb_streak", String(nextStreak));
        } else if (diffDays > 1) {
          setStreak(1);
          localStorage.setItem("pb_streak", "1");
        }
      }
      localStorage.setItem("pb_last_login", today);
    }
  }, []);

  // Save changes handler
  const handleSaveSettings = (settings) => {
    setGirlfriendName(settings.girlfriendName);
    setExamDate(settings.examDate);
    setPersonalMessage(settings.personalMessage);
    setPassingScore(settings.passingScore);

    localStorage.setItem("pb_name", settings.girlfriendName);
    localStorage.setItem("pb_date", settings.examDate);
    localStorage.setItem("pb_msg", settings.personalMessage);
    localStorage.setItem("pb_passing", String(settings.passingScore));
  };

  // Flag toggle handler
  const handleToggleFlag = (qId) => {
    setFlaggedQuestions(prev => {
      const exists = prev.includes(qId);
      const updated = exists ? prev.filter(id => id !== qId) : [...prev, qId];
      localStorage.setItem("pb_flagged", JSON.stringify(updated));
      return updated;
    });
  };

  // Exam result handler
  const handleSaveExamResult = (result) => {
    setExamHistory(prev => {
      const updated = [result, ...prev];
      localStorage.setItem("pb_history", JSON.stringify(updated));
      return updated;
    });
  };

  // Question bank handlers
  const handleAddQuestion = (newQ) => {
    setQuestions(prev => {
      const updated = [newQ, ...prev];
      localStorage.setItem("pb_questions", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteQuestion = (qId) => {
    setQuestions(prev => {
      const updated = prev.filter(q => q.id !== qId);
      localStorage.setItem("pb_questions", JSON.stringify(updated));
      return updated;
    });
  };

  const handleImportQuestions = (imported) => {
    setQuestions(imported);
    localStorage.setItem("pb_questions", JSON.stringify(imported));
  };

  const handleResetQuestions = () => {
    if (confirm("Reset question bank back to standard board exam curriculum?")) {
      setQuestions(defaultQuestions);
      setFlaggedQuestions([]);
      localStorage.setItem("pb_questions", JSON.stringify(defaultQuestions));
      localStorage.removeItem("pb_flagged");
      sound.playSuccess();
    }
  };

  const handleSaveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("pb_notes", newNotes);
  };

  // Days left calculation
  const targetTime = new Date(examDate).getTime();
  const now = new Date().getTime();
  const daysLeft = Math.max(0, Math.ceil((targetTime - now) / (1000 * 60 * 60 * 24)));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar
        girlfriendName={girlfriendName}
        daysLeft={daysLeft}
        streak={streak}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1 }}>
        {currentTab === "dashboard" && (
          <Dashboard
            girlfriendName={girlfriendName}
            examDate={examDate}
            personalMessage={personalMessage}
            questions={questions}
            examHistory={examHistory}
            flaggedCount={flaggedQuestions.length}
            streak={streak}
            passingScore={passingScore}
            onStartMode={(mode) => setCurrentTab(mode)}
          />
        )}

        {currentTab === "practice" && (
          <PracticeMode
            questions={questions}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            girlfriendName={girlfriendName}
          />
        )}

        {currentTab === "goodnotes" && (
          <GoodNotes
            girlfriendName={girlfriendName}
            theme={theme}
          />
        )}

        {currentTab === "mock" && (
          <MockExam
            questions={questions}
            passingScore={passingScore}
            girlfriendName={girlfriendName}
            onSaveExamResult={handleSaveExamResult}
            onToggleFlag={handleToggleFlag}
            flaggedQuestions={flaggedQuestions}
            onExit={() => setCurrentTab("dashboard")}
          />
        )}

        {currentTab === "flashcards" && (
          <Flashcards
            questions={questions}
            girlfriendName={girlfriendName}
          />
        )}

        {currentTab === "weakness" && (
          <WeaknessFocus
            questions={questions}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            girlfriendName={girlfriendName}
          />
        )}

        {currentTab === "bank" && (
          <QuestionBank
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onImportQuestions={handleImportQuestions}
            onResetQuestions={handleResetQuestions}
          />
        )}

        {currentTab === "notes" && (
          <NotesCheatSheet
            girlfriendName={girlfriendName}
            notes={notes}
            onSaveNotes={handleSaveNotes}
          />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        girlfriendName={girlfriendName}
        examDate={examDate}
        personalMessage={personalMessage}
        passingScore={passingScore}
        onSave={handleSaveSettings}
        onResetData={handleResetQuestions}
      />

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border-color)",
        background: "var(--footer-bg)",
        padding: "1.25rem 1.5rem",
        textAlign: "center",
        fontSize: "0.85rem",
        color: "var(--text-muted)"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span>PassBoard ✨ Dedicated Dentist Licensure Exam Reviewer</span>
          <span>Made with all my love by <strong>Angelo</strong> for <strong style={{ color: "var(--accent-rose)" }}>{girlfriendName}</strong> • Future Topnotcher! 🦷💜🎓</span>
        </div>
      </footer>
    </div>
  );
}