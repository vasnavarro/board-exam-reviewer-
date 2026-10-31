import React, { useState, useEffect } from "react";
import { 
  RotateCw, ArrowLeft, ArrowRight, Shuffle, 
  CheckCircle2, Filter, Eye, EyeOff, BookOpen, HelpCircle
} from "lucide-react";
import { sound } from "../utils/audio";

export function Flashcards({ questions, girlfriendName }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deck, setDeck] = useState([...questions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showChoices, setShowChoices] = useState(true);

  const categories = ["All", ...Array.from(new Set(questions.map(q => q.category)))];

  // Filter deck by category
  useEffect(() => {
    let pool = selectedCategory === "All" 
      ? [...questions]
      : questions.filter(q => q.category === selectedCategory);
    setDeck(pool);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory, questions]);

  // Shuffle
  const handleShuffle = () => {
    sound.playClick();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    sound.playClick();
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    sound.playClick();
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(deck.length - 1);
    }
  };

  // Keyboard shortcut Space to flip, ArrowLeft/Right
  useEffect(() => {
    const onKey = (e) => {
      // Don't trigger if typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFlipped, currentIndex, deck]);

  if (deck.length === 0) {
    return (
      <div style={{ maxWidth: "600px", margin: "3rem auto", textAlign: "center" }} className="glass-panel">
        <p style={{ padding: "2rem", color: "var(--text-muted)" }}>No questions found in this category.</p>
      </div>
    );
  }

  const currentQ = deck[currentIndex];
  const correctLetter = String.fromCharCode(65 + currentQ.correctIndex);
  const correctText = currentQ.options[currentQ.correctIndex];
  const distractors = currentQ.distractorRationales || {};

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      
      {/* Controls Bar */}
      <div className="glass-panel" style={{
        padding: "0.85rem 1.25rem",
        marginBottom: "1.25rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.85rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Filter size={16} color="var(--accent-purple)" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              background: "var(--input-bg)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              fontSize: "0.85rem"
            }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat} style={{ background: "#111827", color: "#ffffff" }}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Choices Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setShowChoices(prev => !prev);
            }}
            className="btn btn-secondary"
            style={{ 
              padding: "0.4rem 0.75rem", 
              fontSize: "0.8rem",
              background: showChoices ? "rgba(168, 85, 247, 0.15)" : "transparent",
              borderColor: showChoices ? "var(--accent-purple)" : "var(--border-color)",
              color: showChoices ? "var(--accent-purple)" : "var(--text-muted)"
            }}
            title="Toggle multiple-choice options on card front"
          >
            {showChoices ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>Choices: {showChoices ? "Shown" : "Hidden"}</span>
          </button>

          <span className="mono-font" style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Card <strong style={{ color: "var(--text-primary)" }}>{currentIndex + 1}</strong> / {deck.length}
          </span>

          <button
            onClick={handleShuffle}
            className="btn btn-secondary"
            style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
            title="Shuffle deck"
          >
            <Shuffle size={14} /> Shuffle
          </button>
        </div>
      </div>

      {/* 3D Flashcard Scene */}
      <div className="flashcard-scene" onClick={handleFlip}>
        <div className={`flashcard-inner ${isFlipped ? "is-flipped" : ""}`}>
          
          {/* FRONT FACE (Question + Choices) */}
          <div className="flashcard-face flashcard-front">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span className="badge badge-purple">{currentQ.category}</span>
                <span className="badge badge-rose">{currentQ.difficulty || "Board Exam"}</span>
              </div>
              
              <h3 style={{ 
                fontSize: "1.2rem", 
                fontWeight: 700, 
                lineHeight: 1.5, 
                color: "var(--text-primary)", 
                marginTop: "0.5rem",
                marginBottom: "1rem" 
              }}>
                {currentQ.question}
              </h3>

              {/* Choices / Options List */}
              {showChoices && currentQ.options && currentQ.options.length > 0 ? (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginTop: "0.75rem",
                  marginBottom: "1rem"
                }}>
                  {currentQ.options.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "10px",
                          background: "rgba(168, 85, 247, 0.05)",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.9rem",
                          color: "var(--text-primary)"
                        }}
                      >
                        <span style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          background: "rgba(168, 85, 247, 0.18)",
                          color: "var(--accent-purple)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {letter}
                        </span>
                        <span style={{ lineHeight: 1.35 }}>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              ) : !showChoices ? (
                <div style={{
                  padding: "1rem",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px dashed var(--border-color)",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  margin: "1rem 0"
                }}>
                  Choices hidden for pure recall mode. Click card to reveal the answer!
                </div>
              ) : null}
            </div>

            <div style={{ 
              textAlign: "center", 
              color: "var(--text-muted)", 
              fontSize: "0.82rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border-color)"
            }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <RotateCw size={13} color="var(--accent-purple)" /> Click card or press <kbd style={{ padding: "0.15rem 0.4rem", background: "rgba(255,255,255,0.08)", borderRadius: "4px", fontSize: "0.75rem" }}>Space</kbd> to flip & reveal answer
              </span>
            </div>
          </div>

          {/* BACK FACE (Answer, Why Correct, Distractors, Pearl) */}
          <div className="flashcard-face flashcard-back">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span className="badge badge-emerald">CORRECT ANSWER</span>
                <span className="badge badge-purple">{currentQ.category}</span>
              </div>

              {/* Correct Option Highlight Banner */}
              <div style={{
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.45)",
                padding: "0.85rem 1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <CheckCircle2 size={24} color="#10b981" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Option {correctLetter} is Correct
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginTop: "2px" }}>
                    {correctText}
                  </div>
                </div>
              </div>

              {/* Primary Rationale */}
              <div style={{ marginBottom: "1rem", fontSize: "0.9rem", lineHeight: 1.5, color: "var(--text-primary)" }}>
                <strong style={{ color: "var(--accent-purple)", display: "block", marginBottom: "0.25rem", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Why Option {correctLetter} is Correct:
                </strong>
                {currentQ.explanation}
              </div>

              {/* Distractor Breakdown (Why the other options are wrong) */}
              {distractors && Object.keys(distractors).length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#f87171",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.45rem"
                  }}>
                    Why the Other Options are Incorrect:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {Object.entries(distractors).map(([idxStr, rationale]) => {
                      const optIdx = parseInt(idxStr, 10);
                      const letter = String.fromCharCode(65 + optIdx);
                      const optText = currentQ.options[optIdx] || `Option ${letter}`;
                      return (
                        <div
                          key={idxStr}
                          style={{
                            fontSize: "0.82rem",
                            lineHeight: 1.45,
                            background: "rgba(239, 68, 68, 0.05)",
                            borderLeft: "2px solid rgba(239, 68, 68, 0.45)",
                            padding: "0.45rem 0.65rem",
                            borderRadius: "4px",
                            color: "var(--text-secondary)"
                          }}
                        >
                          <strong style={{ color: "#fca5a5" }}>Option {letter} ({optText}): </strong>
                          {rationale}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Clinical Pearl & Key Takeaway */}
              {currentQ.keyTakeaway && (
                <div style={{
                  background: "rgba(168, 85, 247, 0.1)",
                  borderLeft: "3px solid var(--accent-purple)",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "4px",
                  fontSize: "0.83rem",
                  color: "var(--text-primary)",
                  marginTop: "0.5rem"
                }}>
                  💡 <strong>Clinical Pearl & Memory Hook:</strong> {currentQ.keyTakeaway}
                </div>
              )}
            </div>

            <div style={{ 
              textAlign: "center", 
              color: "var(--text-muted)", 
              fontSize: "0.82rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border-color)",
              marginTop: "1rem"
            }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <RotateCw size={13} color="var(--accent-purple)" /> Click card or press <kbd style={{ padding: "0.15rem 0.4rem", background: "rgba(255,255,255,0.08)", borderRadius: "4px", fontSize: "0.75rem" }}>Space</kbd> to flip back
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
        <button onClick={handlePrev} className="btn btn-secondary" style={{ padding: "0.65rem 1.25rem" }}>
          <ArrowLeft size={16} /> Previous Card
        </button>

        <button onClick={handleFlip} className="btn btn-primary" style={{ padding: "0.65rem 1.75rem" }}>
          <RotateCw size={16} /> Flip Card
        </button>

        <button onClick={handleNext} className="btn btn-secondary" style={{ padding: "0.65rem 1.25rem" }}>
          Next Card <ArrowRight size={16} />
        </button>
      </div>

      <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.85rem" }}>
        Keyboard Shortcuts: [←] Previous &nbsp;|&nbsp; [Space] Flip &nbsp;|&nbsp; [→] Next
      </p>

    </div>
  );
}
