import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MockExam } from "./components/MockExam";
import { Flashcards } from "./components/Flashcards";
import { PracticeMode } from "./components/PracticeMode";
import { WeaknessFocus } from "./components/WeaknessFocus";
import { QuestionBank } from "./components/QuestionBank";
import { NotesCheatSheet } from "./components/NotesCheatSheet";
import { SettingsModal } from "./components/SettingsModal";
import { defaultQuestions } from "./data/defaultQuestions";
import { sound } from "./utils/audio";

const DEFAULT_NOTES = `# High-Yield Board Exam Strategies & Mnemonics

### 1. The Core Priority Frameworks
* **ABCs**: Airway > Breathing > Circulation. An acute obstruction or stridor always precedes pain or vitals.
* **Maslow's Hierarchy**: Physiological safety and basic biological stability come before psychosocial needs.
* **Acute vs. Chronic**: New sudden findings (e.g., sudden confusion, fever spike) take precedence over expected chronic states.
* **Stable vs. Unstable**: Look for signs of impending shock (tachycardia, tachypnea, narrowing pulse pressure) early!

---

### 2. Acid-Base Interpretation (ROME Rule)
* **R-O**: Respiratory Opposite (If pH is Low, PaCO2 is High = Acidosis)
* **M-E**: Metabolic Equal (If pH is Low, HCO3 is Low = Acidosis)
* *Normal Reference Ranges*:
  - pH: 7.35 – 7.45
  - PaCO2: 35 – 45 mmHg
  - HCO3: 22 – 26 mEq/L

---

### 3. Emergency Safety & Fire Protocol (RACE & PASS)
* **RACE**: Rescue -> Alarm -> Contain -> Extinguish / Evacuate
* **PASS**: Pull pin -> Aim at base -> Squeeze handle -> Sweep side to side

---

### 4. Calculation Quick Checks
* **IV Flow Rate (gtt/min)** = (Volume in mL × Drop Factor) ÷ Total Minutes
* **1 Gram** = 1,000 mg = 1,000,000 mcg
* Always double-check decimal placements on high-alert drugs!

---

### 5. Personal Note for You 💖
Take a deep breath whenever a question feels overwhelming. Re-read the stem, eliminate the 2 obviously wrong options, and trust your instincts. You are going to do amazing!
`;

export default function App() {
  // LocalStorage state initialization
  const [girlfriendName, setGirlfriendName] = useState(() => {
    return localStorage.getItem("pb_name") || "My Love";
  });

  const [examDate, setExamDate] = useState(() => {
    const saved = localStorage.getItem("pb_date");
    if (saved) return saved;
    const future = new Date();
    future.setDate(future.getDate() + 75);
    return future.toISOString().split("T")[0];
  });

  const [personalMessage, setPersonalMessage] = useState(() => {
    return localStorage.getItem("pb_msg") || "I have watched how dedicated and smart you are every single day. The board exam doesn't stand a chance against you. The license already has your name on it! 💖";
  });

  const [passingScore, setPassingScore] = useState(() => {
    return Number(localStorage.getItem("pb_passing")) || 75;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("pb_sound") !== "false";
  });

  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem("pb_questions");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
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
    if (confirm("Reset question bank back to default 20+ curriculum questions?")) {
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

        {currentTab === "practice" && (
          <PracticeMode
            questions={questions}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
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
        background: "rgba(10, 14, 23, 0.95)",
        padding: "1.25rem 1.5rem",
        textAlign: "center",
        fontSize: "0.85rem",
        color: "var(--text-muted)"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span>PassBoard ✨ Dedicated Study & Board Exam Reviewer</span>
          <span>Made with love for <strong style={{ color: "#ec4899" }}>{girlfriendName}</strong> • Future Topnotcher! 🎓</span>
        </div>
      </footer>
    </div>
  );
}
