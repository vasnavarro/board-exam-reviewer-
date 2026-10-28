import React, { useState, useEffect } from "react";
import { 
  RotateCw, ArrowLeft, ArrowRight, Shuffle, 
  CheckCircle2, Sparkles, Filter, Eye, BookOpen 
} from "lucide-react";
import { sound } from "../utils/audio";

export function Flashcards({ questions, girlfriendName }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deck, setDeck] = useState([...questions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        handleNext();
      } else if (e.code === "ArrowLeft") {
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

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      
      {/* Controls Bar */}
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
          <Filter size={16} color="#ec4899" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              color: "#ffffff",
              fontSize: "0.88rem"
            }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat} style={{ background: "#111827", color: "#ffffff" }}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="mono-font" style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Card <strong style={{ color: "#ffffff" }}>{currentIndex + 1}</strong> of {deck.length}
          </span>
          <button
            onClick={handleShuffle}
            className="btn btn-secondary"
            style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
            title="Shuffle deck"
          >
            <Shuffle size={14} /> Shuffle
          </button>
        </div>
      </div>

      {/* 3D Flashcard Scene */}
      <div className="flashcard-scene" onClick={handleFlip}>
        <div className={`flashcard-inner ${isFlipped ? "is-flipped" : ""}`}>
          
          {/* FRONT FACE (Question) */}
          <div className="flashcard-face flashcard-front">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span className="badge badge-purple">{currentQ.category}</span>
                <span className="badge badge-rose">{currentQ.difficulty}</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.6, color: "#f8fafc", marginTop: "1rem" }}>
                {currentQ.question}
              </h3>
            </div>

            <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                <RotateCw size={14} /> Click card or press [Space] to flip & reveal answer
              </span>
            </div>
          </div>

          {/* BACK FACE (Answer & Rationale) */}
          <div className="flashcard-face flashcard-back">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span className="badge badge-emerald">CORRECT ANSWER</span>
                <span className="badge badge-purple">{currentQ.category}</span>
              </div>

              {/* Correct Option */}
              <div style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                padding: "1rem",
                borderRadius: "var(--radius-sm)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <CheckCircle2 size={24} color="#10b981" />
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 700, textTransform: "uppercase" }}>
                    Option {correctLetter}
                  </div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff" }}>
                    {correctText}
                  </div>
                </div>
              </div>

              {/* Rationale */}
              <div style={{ marginBottom: "0.75rem", fontSize: "0.9rem", lineHeight: 1.5, color: "#e2e8f0" }}>
                <strong style={{ color: "#c084fc", display: "block", marginBottom: "0.2rem" }}>Rationale:</strong>
                {currentQ.explanation}
              </div>

              {/* Mnemonic Hook */}
              <div style={{
                background: "rgba(236, 72, 153, 0.1)",
                borderLeft: "3px solid #ec4899",
                padding: "0.6rem 0.85rem",
                fontSize: "0.85rem",
                color: "#fbcfe8"
              }}>
                💡 <strong>Key Takeaway:</strong> {currentQ.keyTakeaway}
              </div>
            </div>

            <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Click to flip back
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem", marginTop: "2rem" }}>
        <button onClick={handlePrev} className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
          <ArrowLeft size={18} /> Previous Card
        </button>

        <button onClick={handleFlip} className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>
          <RotateCw size={18} /> Flip Card
        </button>

        <button onClick={handleNext} className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
          Next Card <ArrowRight size={18} />
        </button>
      </div>

      <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>
        Keyboard Shortcuts: [←] Previous, [Space] Flip, [→] Next
      </p>

    </div>
  );
}
