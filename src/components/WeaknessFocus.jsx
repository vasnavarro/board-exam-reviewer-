import { RationaleBreakdown } from "./RationaleBreakdown";
import React, { useState } from "react";
import { 
  Target, CheckCircle2, XCircle, ArrowRight, 
  RotateCcw, Sparkles, Check, Heart, Trophy
} from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "../utils/audio";

export function WeaknessFocus({ questions, flaggedQuestions, onToggleFlag, girlfriendName }) {
  // Weakness questions are those flagged
  const weakQuestions = questions.filter(q => flaggedQuestions.includes(q.id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (weakQuestions.length === 0) {
    return (
      <div style={{ maxWidth: "680px", margin: "3rem auto", textAlign: "center" }} className="glass-panel">
        <div style={{ padding: "3rem 2rem" }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "var(--gradient-emerald)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
          }}>
            <Trophy size={32} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Zero Weaknesses Flagged! 🎉
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto 1.5rem" }}>
            Amazing job, {girlfriendName}! You currently have no questions flagged for review. 
            As you take mock exams or practice drills, any questions you miss or bookmark will automatically gather here.
          </p>
        </div>
      </div>
    );
  }

  const currentQ = weakQuestions[currentIndex] || weakQuestions[0];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleMarkMastered = () => {
    sound.playSuccess();
    onToggleFlag(currentQ.id); // removes from flagged
    setSelectedOption(null);
    setIsAnswered(false);

    if (weakQuestions.length === 1) {
      confetti({ particleCount: 100, spread: 70 });
    } else if (currentIndex >= weakQuestions.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex < weakQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "1.5rem 1rem 4rem" }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: "1rem 1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        border: "1px solid rgba(245, 158, 11, 0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Target size={20} color="#fbbf24" />
          <span style={{ fontWeight: 700, fontSize: "1rem" }}>Weakness Focus Mode</span>
          <span className="badge badge-amber">{weakQuestions.length} Items Remaining</span>
        </div>

        <span className="mono-font" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Item {currentIndex + 1} of {weakQuestions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="glass-panel" style={{ padding: "2.25rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <span className="badge badge-purple">{currentQ.category}</span>
          <span className="badge badge-rose">{currentQ.difficulty}</span>
        </div>

        <p style={{ fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.6, marginBottom: "2rem", color: "#f8fafc" }}>
          {currentQ.question}
        </p>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isPicked = selectedOption === idx;
            const isRight = currentQ.correctIndex === idx;

            let border = "1px solid var(--border-color)";
            let bg = "rgba(255, 255, 255, 0.03)";
            let badgeBg = "rgba(255, 255, 255, 0.08)";

            if (isAnswered) {
              if (isRight) {
                border = "2px solid #10b981";
                bg = "rgba(16, 185, 129, 0.15)";
                badgeBg = "#10b981";
              } else if (isPicked && !isRight) {
                border = "2px solid #ef4444";
                bg = "rgba(239, 68, 68, 0.15)";
                badgeBg = "#ef4444";
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.1rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  cursor: isAnswered ? "default" : "pointer",
                  border,
                  background: bg
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    background: badgeBg,
                    color: "#ffffff"
                  }}>
                    {letter}
                  </div>
                  <span style={{ fontSize: "1rem", color: "#ffffff" }}>
                    {option}
                  </span>
                </div>

                {isAnswered && isRight && <CheckCircle2 size={20} color="#10b981" />}
                {isAnswered && isPicked && !isRight && <XCircle size={20} color="#ef4444" />}
              </div>
            );
          })}
        </div>

        {/* Rationale Breakdown */}
        {isAnswered && (
          <RationaleBreakdown 
            question={currentQ} 
            selectedOption={selectedOption} 
            isCorrect={selectedOption === currentQ.correctIndex} 
          />
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={handleMarkMastered}
          className="btn btn-emerald"
          style={{ padding: "0.75rem 1.5rem" }}
          title="Remove from Weakness Focus"
        >
          <Check size={18} /> Mark as Mastered (Remove)
        </button>

        <button onClick={handleNext} className="btn btn-primary" style={{ padding: "0.75rem 1.75rem" }}>
          Next Weakness Item <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
