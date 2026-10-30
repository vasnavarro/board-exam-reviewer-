import React, { useState, useMemo } from "react";
import { 
  CheckCircle2, XCircle, ArrowRight, ArrowLeft, Flag, 
  HelpCircle, Sparkles, Flame, RotateCcw, Shuffle,
  Filter, Grid, BookOpen
} from "lucide-react";
import { sound } from "../utils/audio";
import { RationaleBreakdown } from "./RationaleBreakdown";

export function PracticeMode({ questions, flaggedQuestions, onToggleFlag, girlfriendName }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showPalette, setShowPalette] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  // Extract categories list
  const categories = useMemo(() => {
    const list = ["All", ...Array.from(new Set(questions.map(q => q.category)))];
    return list;
  }, [questions]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    let pool = selectedCategory === "All" 
      ? [...questions] 
      : questions.filter(q => q.category === selectedCategory);
    
    if (isShuffled) {
      pool = [...pool].sort(() => 0.5 - Math.random());
    }
    return pool;
  }, [questions, selectedCategory, isShuffled]);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];
  const isFlagged = flaggedQuestions.includes(currentQ?.id);

  const handleCategoryChange = (e) => {
    sound.playClick();
    setSelectedCategory(e.target.value);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

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
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.playClick();
      setSelectedOption(null);
      setIsAnswered(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!currentQ) {
    return (
      <div style={{ maxWidth: "600px", margin: "3rem auto", textAlign: "center" }} className="glass-panel">
        <p style={{ padding: "2rem" }}>No questions available in this domain.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "920px", margin: "0 auto", padding: "1.5rem 1rem 4rem" }}>
      
      {/* Top Banner & Subject Filter */}
      <div className="glass-panel" style={{
        padding: "1.1rem 1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        {/* Category Picker */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Filter size={16} color="#c084fc" />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              {categories.map(cat => {
                const count = cat === "All" ? questions.length : questions.filter(q => q.category === cat).length;
                return (
                  <option key={cat} value={cat}>
                    {cat} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          <span className="badge badge-purple" style={{ fontSize: "0.75rem" }}>
            {currentQ.difficulty || "Board Level"}
          </span>

          <span className="mono-font" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {currentIndex + 1} of {filteredQuestions.length}
          </span>
        </div>

        {/* Controls: Shuffle, Question Jumper, Flag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
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

          {/* Shuffle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setIsShuffled(!isShuffled);
              setCurrentIndex(0);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            title={isShuffled ? "Sequential Order" : "Randomize Order"}
            className="btn btn-secondary"
            style={{ 
              padding: "0.4rem 0.75rem", 
              fontSize: "0.8rem",
              borderColor: isShuffled ? "#c084fc" : "var(--border-color)",
              background: isShuffled ? "rgba(168, 85, 247, 0.25)" : "transparent"
            }}
          >
            <Shuffle size={14} />
            <span>{isShuffled ? "Shuffled" : "Sequential"}</span>
          </button>

          {/* Question Jumper Grid Toggle */}
          <button
            onClick={() => setShowPalette(!showPalette)}
            title="Question Palette Jumper"
            className="btn btn-secondary"
            style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
          >
            <Grid size={14} />
            <span>Jump ({currentIndex + 1})</span>
          </button>

          {/* Flag Button */}
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
            <span>{isFlagged ? "Flagged" : "Flag"}</span>
          </button>
        </div>
      </div>

      {/* Question Jumper Palette Drawer */}
      {showPalette && (
        <div 
          className="glass-panel" 
          style={{ 
            padding: "1.25rem", 
            marginBottom: "1.5rem",
            maxHeight: "220px",
            overflowY: "auto"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>
              Select Question ({filteredQuestions.length} total)
            </span>
            <button 
              onClick={() => setShowPalette(false)}
              style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem" }}
            >
              ✕ Close
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {filteredQuestions.map((q, idx) => {
              const isCur = idx === currentIndex;
              const isFlg = flaggedQuestions.includes(q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sound.playClick();
                    setCurrentIndex(idx);
                    setSelectedOption(null);
                    setIsAnswered(false);
                    setShowPalette(false);
                  }}
                  className={`question-grid-btn ${isCur ? "active" : ""} ${isFlg ? "flagged" : ""}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="glass-panel" style={{ padding: "2.25rem", marginBottom: "1.5rem" }}>
        
        {/* Category tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <BookOpen size={16} color="#a855f7" />
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-lavender)" }}>
            {currentQ.category}
          </span>
        </div>

        {/* Question Stem */}
        <p style={{ 
          fontSize: "1.2rem", 
          fontWeight: 600, 
          lineHeight: 1.6, 
          marginBottom: "1.85rem", 
          color: "var(--text-primary)" 
        }}>
          {currentQ.question}
        </p>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isPicked = selectedOption === idx;
            const isRight = currentQ.correctIndex === idx;

            let border = "1px solid var(--border-color)";
            let bg = "var(--option-bg)";
            let badgeBg = "rgba(168, 85, 247, 0.15)";
            let badgeColor = "var(--accent-lavender)";

            if (isAnswered) {
              if (isRight) {
                border = "2px solid #10b981";
                bg = "rgba(16, 185, 129, 0.15)";
                badgeBg = "#10b981";
                badgeColor = "#ffffff";
              } else if (isPicked && !isRight) {
                border = "2px solid #ef4444";
                bg = "rgba(239, 68, 68, 0.15)";
                badgeBg = "#ef4444";
                badgeColor = "#ffffff";
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
                  <span style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
                    {option}
                  </span>
                </div>

                {isAnswered && isRight && <CheckCircle2 size={20} color="#10b981" />}
                {isAnswered && isPicked && !isRight && <XCircle size={20} color="#ef4444" />}
              </div>
            );
          })}
        </div>

        {/* Immediate In-Depth Rationale & Distractor Breakdown */}
        {isAnswered && (
          <RationaleBreakdown 
            question={currentQ} 
            selectedOption={selectedOption} 
            isCorrect={selectedOption === currentQ.correctIndex} 
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className="btn btn-secondary" 
          style={{ 
            padding: "0.8rem 1.5rem", 
            fontSize: "0.95rem",
            opacity: currentIndex === 0 ? 0.4 : 1
          }}
        >
          <ArrowLeft size={16} /> Previous
        </button>

        <button 
          onClick={handleNext} 
          className="btn btn-primary" 
          style={{ padding: "0.85rem 2.25rem", fontSize: "1rem" }}
        >
          Next Question <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}