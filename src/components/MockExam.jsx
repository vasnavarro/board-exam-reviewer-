import React, { useState, useEffect, useRef } from "react";
import { 
  Clock, Flag, CheckCircle, XCircle, AlertTriangle, 
  ArrowLeft, ArrowRight, Award, RotateCcw, ChevronRight, 
  HelpCircle, Eye, Sparkles, Trophy
} from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "../utils/audio";

export function MockExam({ 
  questions, 
  passingScore, 
  girlfriendName,
  onSaveExamResult,
  onToggleFlag,
  flaggedQuestions,
  onExit
}) {
  const [gameState, setGameState] = useState("setup"); // 'setup' | 'playing' | 'results'
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: optionIndex }
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [totalTime, setTotalTime] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCount, setSelectedCount] = useState(10);
  const [selectedDuration, setSelectedDuration] = useState(20); // minutes
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);

  const categories = ["All", ...Array.from(new Set(questions.map(q => q.category)))];

  // Start Exam
  const handleStartExam = () => {
    sound.playClick();
    let pool = selectedCategory === "All" 
      ? [...questions]
      : questions.filter(q => q.category === selectedCategory);

    // Shuffle pool
    pool.sort(() => Math.random() - 0.5);
    const count = Math.min(pool.length, selectedCount === "all" ? pool.length : Number(selectedCount));
    const selected = pool.slice(0, count);

    setExamQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    const seconds = selectedDuration === 0 ? 0 : Number(selectedDuration) * 60;
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setGameState("playing");
  };

  // Timer Countdown
  useEffect(() => {
    if (gameState !== "playing" || totalTime === 0) return;
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft, totalTime]);

  // Handle Option Select
  const handleSelectOption = (index) => {
    sound.playClick();
    const currentQ = examQuestions[currentIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: index }));
  };

  // Keyboard Navigation
  useEffect(() => {
    if (gameState !== "playing") return;
    const handleKeyDown = (e) => {
      if (e.key >= "1" && e.key <= "4") {
        handleSelectOption(Number(e.key) - 1);
      } else if (e.key === "ArrowRight") {
        if (currentIndex < examQuestions.length - 1) setCurrentIndex(prev => prev + 1);
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, currentIndex, examQuestions]);

  // Submit Exam
  const handleSubmitExam = () => {
    setIsSubmitModalOpen(false);
    let correctCount = 0;
    examQuestions.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / examQuestions.length) * 100);
    const passed = percent >= passingScore;

    if (passed) {
      sound.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      sound.playError();
    }

    onSaveExamResult({
      date: new Date().toISOString(),
      totalQuestions: examQuestions.length,
      correctCount,
      scorePercent: percent,
      category: selectedCategory,
      passed
    });

    setGameState("results");
  };

  // Format Timer mm:ss
  const formatTime = (secs) => {
    if (totalTime === 0) return "Untimed";
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // ---------------- SETUP SCREEN ----------------
  if (gameState === "setup") {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div className="glass-panel" style={{ padding: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
            <Award size={24} color="#ec4899" />
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Timed Mock Board Exam</h2>
          </div>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            Configure your exam simulation. Experience realistic conditions to build timing, stamina, and confidence!
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Subject Filter */}
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Select Subject Domain
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  color: "#ffffff",
                  fontSize: "0.95rem"
                }}
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat} style={{ background: "#111827", color: "#ffffff" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Number of Questions
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {[5, 10, 20, "all"].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedCount(num)}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: selectedCount === num ? "2px solid #ec4899" : "1px solid var(--border-color)",
                      background: selectedCount === num ? "rgba(236, 72, 153, 0.2)" : "rgba(255, 255, 255, 0.03)",
                      color: selectedCount === num ? "#ffffff" : "var(--text-secondary)",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {num === "all" ? "All Available" : `${num} Items`}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Time Allowance
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {[
                  { label: "10 Mins", val: 10 },
                  { label: "20 Mins", val: 20 },
                  { label: "40 Mins", val: 40 },
                  { label: "Untimed", val: 0 }
                ].map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => setSelectedDuration(t.val)}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "var(--radius-sm)",
                      border: selectedDuration === t.val ? "2px solid #a855f7" : "1px solid var(--border-color)",
                      background: selectedDuration === t.val ? "rgba(168, 85, 247, 0.2)" : "rgba(255, 255, 255, 0.03)",
                      color: selectedDuration === t.val ? "#ffffff" : "var(--text-secondary)",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div style={{
              background: "rgba(236, 72, 153, 0.08)",
              border: "1px solid rgba(236, 72, 153, 0.2)",
              padding: "1rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.85rem",
              color: "#f472b6"
            }}>
              💡 <strong>Board Tip for {girlfriendName}:</strong> Read each scenario carefully. Eliminate definitely wrong distractors first before selecting the best answer. You've got this!
            </div>

            {/* Start Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
              <button onClick={onExit} className="btn btn-secondary">
                Back to Dashboard
              </button>
              <button onClick={handleStartExam} className="btn btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "1.05rem" }}>
                Begin Mock Exam ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- PLAYING SCREEN ----------------
  if (gameState === "playing") {
    const currentQ = examQuestions[currentIndex];
    const isAnswered = answers[currentQ.id] !== undefined;
    const isFlagged = flaggedQuestions.includes(currentQ.id);
    const answeredCount = Object.keys(answers).length;

    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem 1rem 4rem" }}>
        
        {/* Exam Header Bar */}
        <div className="glass-panel" style={{
          padding: "1rem 1.5rem",
          marginBottom: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="badge badge-purple">{currentQ.category}</span>
              <span className="badge badge-amber">{currentQ.difficulty}</span>
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, marginTop: "0.3rem" }}>
              Question {currentIndex + 1} of {examQuestions.length}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Timer */}
            {totalTime > 0 && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "var(--radius-full)",
                background: timeLeft < 180 ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.06)",
                border: timeLeft < 180 ? "1px solid #ef4444" : "1px solid var(--border-color)",
                color: timeLeft < 180 ? "#f87171" : "#ffffff",
                fontWeight: 800
              }}>
                <Clock size={16} />
                <span className="mono-font" style={{ fontSize: "1.1rem" }}>{formatTime(timeLeft)}</span>
              </div>
            )}

            {/* Toggle Flag */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleFlag(currentQ.id);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                background: isFlagged ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.05)",
                border: isFlagged ? "1px solid #f59e0b" : "1px solid var(--border-color)",
                color: isFlagged ? "#fbbf24" : "var(--text-secondary)",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem"
              }}
            >
              <Flag size={15} fill={isFlagged ? "#f59e0b" : "none"} />
              <span>{isFlagged ? "Flagged" : "Flag"}</span>
            </button>

            {/* Palette Trigger */}
            <button
              onClick={() => setShowQuestionPalette(!showQuestionPalette)}
              className="btn btn-secondary"
              style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
            >
              Grid ({answeredCount}/{examQuestions.length})
            </button>

            {/* Submit */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn btn-emerald"
              style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Question Palette Drawer (Collapsible) */}
        {showQuestionPalette && (
          <div className="glass-panel" style={{ padding: "1.25rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                Question Navigation Palette
              </span>
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span>🟢 Answered</span>
                <span>⚪ Current</span>
                <span>🟡 Flagged</span>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {examQuestions.map((q, idx) => {
                const answered = answers[q.id] !== undefined;
                const flagged = flaggedQuestions.includes(q.id);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowQuestionPalette(false);
                    }}
                    className={`question-grid-btn ${isCurrent ? "active" : ""} ${answered ? "answered" : ""} ${flagged ? "flagged" : ""}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="glass-panel" style={{ padding: "2.25rem", marginBottom: "1.5rem" }}>
          <p style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.6,
            marginBottom: "2rem",
            color: "#f8fafc"
          }}>
            {currentQ.question}
          </p>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {currentQ.options.map((option, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              const letter = String.fromCharCode(65 + idx);

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1.1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    border: isSelected ? "2px solid #ec4899" : "1px solid var(--border-color)",
                    background: isSelected ? "rgba(236, 72, 153, 0.15)" : "rgba(255, 255, 255, 0.03)",
                    boxShadow: isSelected ? "0 0 15px rgba(236, 72, 153, 0.25)" : "none",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    background: isSelected ? "var(--accent-rose)" : "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff"
                  }}>
                    {letter}
                  </div>
                  <span style={{ fontSize: "1rem", color: isSelected ? "#ffffff" : "var(--text-primary)", flex: 1 }}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="btn btn-secondary"
            style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Tip: Press 1, 2, 3, or 4 on keyboard to select option
          </span>

          {currentIndex < examQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="btn btn-primary"
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn btn-emerald"
            >
              Finish & Review <Award size={16} />
            </button>
          )}
        </div>

        {/* Submit Confirmation Modal */}
        {isSubmitModalOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}>
            <div className="glass-panel" style={{ maxWidth: "460px", width: "100%", padding: "2rem", textAlign: "center" }}>
              <Award size={40} color="#ec4899" style={{ margin: "0 auto 1rem" }} />
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Submit Your Exam?</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                You have answered <strong style={{ color: "#34d399" }}>{answeredCount}</strong> of <strong style={{ color: "#ffffff" }}>{examQuestions.length}</strong> questions.
                {answeredCount < examQuestions.length && (
                  <span style={{ display: "block", color: "#fbbf24", marginTop: "0.5rem" }}>
                    ⚠️ You still have {examQuestions.length - answeredCount} unanswered questions!
                  </span>
                )}
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button onClick={() => setIsSubmitModalOpen(false)} className="btn btn-secondary">
                  Continue Review
                </button>
                <button onClick={handleSubmitExam} className="btn btn-emerald">
                  Yes, Submit Now
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ---------------- RESULTS SCREEN ----------------
  if (gameState === "results") {
    let correctCount = 0;
    examQuestions.forEach(q => {
      if (answers[q.id] === q.correctIndex) correctCount++;
    });
    const percent = Math.round((correctCount / examQuestions.length) * 100);
    const passed = percent >= passingScore;

    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        {/* Score Hero Card */}
        <div className="glass-panel" style={{
          padding: "2.5rem",
          textAlign: "center",
          marginBottom: "2rem",
          border: passed ? "2px solid rgba(16, 185, 129, 0.4)" : "2px solid rgba(245, 158, 11, 0.4)",
          background: passed 
            ? "linear-gradient(145deg, rgba(16, 185, 129, 0.1) 0%, rgba(17, 24, 39, 0.98) 100%)"
            : "linear-gradient(145deg, rgba(245, 158, 11, 0.1) 0%, rgba(17, 24, 39, 0.98) 100%)"
        }}>
          <div style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: passed ? "var(--gradient-emerald)" : "linear-gradient(135deg, #f59e0b, #ef4444)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
            boxShadow: passed ? "0 0 25px rgba(16, 185, 129, 0.5)" : "0 0 25px rgba(245, 158, 11, 0.5)"
          }}>
            {passed ? <Trophy size={34} color="#ffffff" /> : <AlertTriangle size={34} color="#ffffff" />}
          </div>

          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.25rem" }}>
            {passed ? `Incredible Job, ${girlfriendName}! 🌟` : `Good Effort, ${girlfriendName}! Keep Going! 💪`}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "1.5rem" }}>
            {passed 
              ? `You passed above the ${passingScore}% benchmark! You are on track to be a board topnotcher!`
              : `You scored ${percent}%. Review the rationales below and re-test weak spots. Every mistake is a step forward!`}
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            padding: "1rem 2.5rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-color)",
            marginBottom: "1.5rem"
          }}>
            <span className="mono-font" style={{ fontSize: "3.5rem", fontWeight: 800, color: passed ? "#34d399" : "#fbbf24" }}>
              {percent}%
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              ({correctCount} / {examQuestions.length} Correct)
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={handleStartExam} className="btn btn-secondary">
              <RotateCcw size={16} /> Retake Same Exam
            </button>
            <button onClick={() => setGameState("setup")} className="btn btn-primary">
              <Award size={16} /> New Exam Setup
            </button>
            <button onClick={onExit} className="btn btn-secondary">
              Dashboard
            </button>
          </div>
        </div>

        {/* Detailed Question Review Breakdown */}
        <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Eye size={20} color="#ec4899" />
          <span>Full Exam Question Review & Rationales</span>
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {examQuestions.map((q, idx) => {
            const userChoice = answers[q.id];
            const isCorrect = userChoice === q.correctIndex;
            const isUnanswered = userChoice === undefined;

            return (
              <div key={q.id} className="glass-panel" style={{
                padding: "1.75rem",
                borderLeft: isCorrect 
                  ? "4px solid #10b981" 
                  : isUnanswered ? "4px solid #94a3b8" : "4px solid #ef4444"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-muted)" }}>#{idx + 1}</span>
                    <span className="badge badge-purple">{q.category}</span>
                    <span className="badge badge-rose">{q.difficulty}</span>
                  </div>
                  <span className={`badge ${isCorrect ? "badge-emerald" : "badge-amber"}`}>
                    {isCorrect ? "CORRECT ✓" : isUnanswered ? "UNANSWERED" : "INCORRECT ✗"}
                  </span>
                </div>

                <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.5 }}>
                  {q.question}
                </p>

                {/* Options Review */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = userChoice === optIdx;
                    const isRightAnswer = q.correctIndex === optIdx;

                    let bg = "rgba(255, 255, 255, 0.02)";
                    let border = "1px solid var(--border-color)";
                    let textColor = "var(--text-secondary)";

                    if (isRightAnswer) {
                      bg = "rgba(16, 185, 129, 0.15)";
                      border = "1px solid #10b981";
                      textColor = "#34d399";
                    } else if (isUserPick && !isRightAnswer) {
                      bg = "rgba(239, 68, 68, 0.15)";
                      border = "1px solid #ef4444";
                      textColor = "#f87171";
                    }

                    return (
                      <div key={optIdx} style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        background: bg,
                        border,
                        fontSize: "0.925rem",
                        color: textColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <span><strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}</span>
                        {isRightAnswer && <CheckCircle size={16} color="#10b981" />}
                        {isUserPick && !isRightAnswer && <XCircle size={16} color="#ef4444" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: "#c084fc", display: "block", marginBottom: "0.25rem" }}>
                    📖 Rationale & Analysis:
                  </strong>
                  <p style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    {q.explanation}
                  </p>
                  <strong style={{ color: "#f472b6", display: "block", marginBottom: "0.25rem" }}>
                    💡 Key Takeaway Mnemonic:
                  </strong>
                  <p style={{ color: "#fbcfe8", fontStyle: "italic" }}>
                    {q.keyTakeaway}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
