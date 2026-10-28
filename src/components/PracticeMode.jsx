import React, { useState } from "react";
import { 
  CheckCircle2, XCircle, ArrowRight, Flag, 
  HelpCircle, Sparkles, Flame, RotateCcw 
} from "lucide-react";
import { sound } from "../utils/audio";

export function PracticeMode({ questions, flaggedQuestions, onToggleFlag, girlfriendName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);

  const currentQ = questions[currentIndex];
  const isFlagged = flaggedQuestions.includes(currentQ.id);

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playSuccess();
      setConsecutiveCorrect(prev => prev + 1);
    } else {
      sound.playError();
      setConsecutiveCorrect(0);
      // Auto-flag missed question for weakness focus
      if (!isFlagged) {
        onToggleFlag(currentQ.id);
      }
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex < questions.length - 1) {
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
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="badge badge-purple">{currentQ.category}</span>
          <span className="badge badge-rose">{currentQ.difficulty}</span>
          <span className="mono-font" style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>
            Question {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {consecutiveCorrect > 1 && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              padding: "0.3rem 0.75rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8rem",
              color: "#fbbf24",
              fontWeight: 700
            }}>
              <Flame size={14} fill="#f59e0b" />
              <span>{consecutiveCorrect} In A Row!</span>
            </div>
          )}

          <button
            onClick={() => onToggleFlag(currentQ.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.8rem",
              borderRadius: "var(--radius-sm)",
              background: isFlagged ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.05)",
              border: isFlagged ? "1px solid #f59e0b" : "1px solid var(--border-color)",
              color: isFlagged ? "#fbbf24" : "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600
            }}
          >
            <Flag size={14} fill={isFlagged ? "#f59e0b" : "none"} />
            <span>{isFlagged ? "Flagged for Review" : "Flag"}</span>
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel" style={{ padding: "2.25rem", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.6, marginBottom: "2rem", color: "#f8fafc" }}>
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
            let badgeColor = "#ffffff";

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
                  background: bg,
                  transition: "all 0.18s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    background: badgeBg,
                    color: badgeColor
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

        {/* Immediate Rationale Reveal */}
        {isAnswered && (
          <div style={{
            marginTop: "1.75rem",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "var(--radius-md)",
            padding: "1.25rem"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: 700,
              fontSize: "0.95rem",
              marginBottom: "0.5rem",
              color: selectedOption === currentQ.correctIndex ? "#34d399" : "#fbbf24"
            }}>
              {selectedOption === currentQ.correctIndex ? "✨ Correct!" : "💡 Study Note:"}
            </div>

            <p style={{ color: "#e2e8f0", fontSize: "0.925rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              {currentQ.explanation}
            </p>

            <div style={{
              background: "rgba(236, 72, 153, 0.1)",
              borderLeft: "3px solid #ec4899",
              padding: "0.6rem 0.85rem",
              fontSize: "0.85rem",
              color: "#fbcfe8"
            }}>
              <strong>Key Memory Hook:</strong> {currentQ.keyTakeaway}
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      {isAnswered && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleNext} className="btn btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
            Next Question <ArrowRight size={18} />
          </button>
        </div>
      )}

    </div>
  );
}
