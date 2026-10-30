import React from "react";
import { CheckCircle2, XCircle, Lightbulb, Sparkles, BookOpen } from "lucide-react";

export function RationaleBreakdown({ question, selectedOption = null, isCorrect = null }) {
  if (!question) return null;

  const correctLetter = String.fromCharCode(65 + question.correctIndex);
  const correctText = question.options[question.correctIndex];

  // Helper to fetch distractor rationale by index or letter
  const getDistractorRationale = (idx) => {
    if (!question.distractorRationales) return null;
    const letter = String.fromCharCode(65 + idx);
    return question.distractorRationales[idx] || question.distractorRationales[letter] || null;
  };

  return (
    <div className="rationale-container" style={{
      marginTop: "1.75rem",
      background: "var(--bg-elevated)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-lg)",
      padding: "1.75rem",
      boxShadow: "var(--shadow-md)"
    }}>
      
      {/* Status Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-color)",
        paddingBottom: "1rem",
        marginBottom: "1.25rem",
        flexWrap: "wrap",
        gap: "0.75rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: isCorrect === true 
              ? "linear-gradient(135deg, #10b981, #059669)" 
              : isCorrect === false
                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                : "linear-gradient(135deg, #a855f7, #7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(168, 85, 247, 0.35)"
          }}>
            {isCorrect === true ? (
              <CheckCircle2 size={18} color="#ffffff" />
            ) : isCorrect === false ? (
              <XCircle size={18} color="#ffffff" />
            ) : (
              <BookOpen size={16} color="#ffffff" />
            )}
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              {isCorrect === true 
                ? "Excellent! Correct Answer" 
                : isCorrect === false 
                  ? "Learning Opportunity — Rationale Breakdown" 
                  : "Comprehensive Study Rationale"}
            </h4>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-lavender)" }}>
              Dental Licensure Exam (DLE) Clinical Concept
            </span>
          </div>
        </div>

        <span className="badge badge-purple" style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem" }}>
          Correct: Option {correctLetter}
        </span>
      </div>

      {/* 1. WHY THE CORRECT ANSWER IS RIGHT */}
      <div style={{
        background: "rgba(16, 185, 129, 0.08)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        borderRadius: "var(--radius-md)",
        padding: "1.25rem",
        marginBottom: "1.25rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "#10b981",
          marginBottom: "0.6rem"
        }}>
          <CheckCircle2 size={18} color="#10b981" />
          <span>Why Option {correctLetter} is Correct:</span>
        </div>
        <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.65 }}>
          {question.explanation || `Option ${correctLetter} (${correctText}) is the established standard answer.`}
        </p>
      </div>

      {/* 2. WHY THE OTHER OPTIONS ARE INCORRECT (DISTRACTOR ANALYSIS) */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "var(--text-primary)",
          marginBottom: "0.85rem"
        }}>
          <XCircle size={17} color="#f472b6" />
          <span>Distractor Analysis — Why the Other Options are Incorrect:</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {question.options.map((opt, idx) => {
            if (idx === question.correctIndex) return null; // Skip correct option
            const optLetter = String.fromCharCode(65 + idx);
            const distractorText = getDistractorRationale(idx);
            const wasChosen = selectedOption === idx;

            return (
              <div 
                key={idx}
                style={{
                  background: wasChosen 
                    ? "rgba(239, 68, 68, 0.12)" 
                    : "rgba(168, 85, 247, 0.05)",
                  border: wasChosen 
                    ? "1px solid rgba(239, 68, 68, 0.4)" 
                    : "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.9rem 1.1rem",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.35rem",
                  flexWrap: "wrap",
                  gap: "0.4rem"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{
                      fontWeight: 700,
                      fontSize: "0.825rem",
                      color: wasChosen ? "#ef4444" : "var(--accent-purple)",
                      background: wasChosen ? "rgba(239, 68, 68, 0.18)" : "rgba(168, 85, 247, 0.15)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px"
                    }}>
                      Option {optLetter}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      {opt}
                    </span>
                  </div>

                  {wasChosen && (
                    <span style={{
                      fontSize: "0.75rem",
                      color: "#ef4444",
                      fontWeight: 700,
                      background: "rgba(239, 68, 68, 0.15)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px"
                    }}>
                      Your Selected Option
                    </span>
                  )}
                </div>

                <p style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  lineHeight: 1.55,
                  paddingLeft: "0.25rem"
                }}>
                  {distractorText || `This option is incorrect because it does not fit the diagnostic criteria or anatomical structure described in the stem.`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CLINICAL PEARL / EXAM HOOK */}
      {question.keyTakeaway && (
        <div style={{
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
          border: "1px solid var(--border-color)",
          borderLeft: "4px solid #a855f7",
          borderRadius: "var(--radius-md)",
          padding: "0.85rem 1.15rem",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem"
        }}>
          <Sparkles size={18} color="#a855f7" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
          <div>
            <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--accent-purple)", display: "block", marginBottom: "0.2rem" }}>
              💡 Clinical Pearl & Board Memory Hook:
            </span>
            <span style={{ color: "var(--text-primary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
              {question.keyTakeaway}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
