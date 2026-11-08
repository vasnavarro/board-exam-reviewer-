import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  RotateCw, ArrowLeft, ArrowRight, Shuffle, 
  CheckCircle2, Filter, Eye, EyeOff, BookOpen, HelpCircle,
  Star, Search, Sparkles, Check, X, Bookmark, Layers, Volume2, Award, Zap, Heart
} from "lucide-react";
import { sound } from "../utils/audio";
import { DENTAL_DECKS, ALL_DENTAL_DECK_CARDS, TOTAL_DENTAL_DECK_CARDS } from "../data/dentalDecksData";

export function Flashcards({ questions = [], girlfriendName = "Dr. Leane" }) {
  // Mode: 'dental_decks' (1,209 Authentic Cards) vs 'qbank' (839 Original Questions)
  const [sourceMode, setSourceMode] = useState("dental_decks");

  // Dental Decks State
  const [selectedDeckId, setSelectedDeckId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dentalDeckList, setDentalDeckList] = useState([]);
  const [dentalIndex, setDentalIndex] = useState(0);
  const [dentalFlipped, setDentalFlipped] = useState(false);
  const [ratingToast, setRatingToast] = useState(null);
  const [jumpInput, setJumpInput] = useState("");

  // Bookmarks (saved to localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("leane_dental_deck_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save bookmarks
  const toggleBookmark = (cardId, e) => {
    if (e) e.stopPropagation();
    sound.playClick();
    setBookmarkedIds(prev => {
      const exists = prev.includes(cardId);
      const updated = exists ? prev.filter(id => id !== cardId) : [...prev, cardId];
      try {
        localStorage.setItem("leane_dental_deck_bookmarks", JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
  };

  // QBank State
  const [qbankCategory, setQbankCategory] = useState("All");
  const [qbankDeck, setQbankDeck] = useState([...questions]);
  const [qbankIndex, setQbankIndex] = useState(0);
  const [qbankFlipped, setQbankFlipped] = useState(false);
  const [showChoices, setShowChoices] = useState(true);

  const qbankCategories = useMemo(() => {
    return ["All", ...Array.from(new Set(questions.map(q => q.category)))];
  }, [questions]);

  // Build active pool of Dental Deck cards
  useEffect(() => {
    let pool = [];
    if (selectedDeckId === "all") {
      pool = [...ALL_DENTAL_DECK_CARDS];
    } else if (selectedDeckId === "starred") {
      pool = ALL_DENTAL_DECK_CARDS.filter(c => bookmarkedIds.includes(c.id));
    } else {
      const found = DENTAL_DECKS.find(d => d.id === selectedDeckId);
      pool = found ? [...found.cards] : [...ALL_DENTAL_DECK_CARDS];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      pool = pool.filter(c => {
        const f = (c.front || "").toLowerCase();
        const a = (c.answer || "").toLowerCase();
        const r = (c.rationale || "").toLowerCase();
        const cat = (c.category || "").toLowerCase();
        const term = (c.term || "").toLowerCase();
        return f.includes(q) || a.includes(q) || r.includes(q) || cat.includes(q) || term.includes(q);
      });
    }

    setDentalDeckList(pool);
    setDentalIndex(0);
    setDentalFlipped(false);
  }, [selectedDeckId, searchQuery, bookmarkedIds]);

  // QBank deck filter
  useEffect(() => {
    let pool = qbankCategory === "All" 
      ? [...questions]
      : questions.filter(q => q.category === qbankCategory);
    setQbankDeck(pool);
    setQbankIndex(0);
    setQbankFlipped(false);
  }, [qbankCategory, questions]);

  // Active current card pointers based on mode
  const isDental = sourceMode === "dental_decks";
  const activeDeck = isDental ? dentalDeckList : qbankDeck;
  const currentIndex = isDental ? dentalIndex : qbankIndex;
  const isFlipped = isDental ? dentalFlipped : qbankFlipped;

  const setCurrentIndex = (valOrFn) => {
    if (isDental) setDentalIndex(valOrFn);
    else setQbankIndex(valOrFn);
  };

  const setIsFlipped = (valOrFn) => {
    if (isDental) setDentalFlipped(valOrFn);
    else setQbankFlipped(valOrFn);
  };

  // Flip Handler
  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(prev => !prev);
  };

  // Next Handler
  const handleNext = () => {
    sound.playClick();
    setIsFlipped(false);
    if (activeDeck.length === 0) return;
    if (currentIndex < activeDeck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  // Prev Handler
  const handlePrev = () => {
    sound.playClick();
    setIsFlipped(false);
    if (activeDeck.length === 0) return;
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(activeDeck.length - 1);
    }
  };

  // Shuffle Handler
  const handleShuffle = () => {
    sound.playClick();
    if (isDental) {
      const shuffled = [...dentalDeckList].sort(() => Math.random() - 0.5);
      setDentalDeckList(shuffled);
      setDentalIndex(0);
      setDentalFlipped(false);
    } else {
      const shuffled = [...qbankDeck].sort(() => Math.random() - 0.5);
      setQbankDeck(shuffled);
      setQbankIndex(0);
      setQbankFlipped(false);
    }
  };

  // Jump to specific card
  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= activeDeck.length) {
      sound.playClick();
      setCurrentIndex(pageNum - 1);
      setIsFlipped(false);
      setJumpInput("");
    }
  };

  // Spaced Repetition Rating Handler
  const handleRating = (ratingType, e) => {
    if (e) e.stopPropagation();
    
    if (ratingType === "again") {
      sound.playClick();
      setRatingToast({ text: "🔄 Will review again soon!", color: "#ef4444" });
    } else if (ratingType === "hard") {
      sound.playClick();
      setRatingToast({ text: "⚠️ Marked as Hard", color: "#f59e0b" });
    } else if (ratingType === "good") {
      sound.playClick();
      setRatingToast({ text: "👍 Good! Keep rhythm going", color: "#a855f7" });
    } else if (ratingType === "easy") {
      sound.playSuccess();
      setRatingToast({ text: "⚡ Mastered! Easy recall", color: "#10b981" });
    }

    setTimeout(() => {
      setRatingToast(null);
      handleNext();
    }, 450);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.code === "KeyS") {
        e.preventDefault();
        handleShuffle();
      } else if (e.code === "KeyB" && isDental && dentalDeckList[dentalIndex]) {
        e.preventDefault();
        toggleBookmark(dentalDeckList[dentalIndex].id);
      } else if (isFlipped && isDental) {
        if (e.code === "Digit1") handleRating("again");
        if (e.code === "Digit2") handleRating("hard");
        if (e.code === "Digit3") handleRating("good");
        if (e.code === "Digit4") handleRating("easy");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFlipped, currentIndex, activeDeck, isDental, dentalIndex, dentalDeckList]);

  // Current Card Object
  const currentCard = activeDeck[currentIndex];

  // Active Deck Meta info
  const activeDeckMeta = useMemo(() => {
    if (selectedDeckId === "all") {
      return {
        name: "All Dental Decks Combined",
        icon: "🌟",
        color: "#a855f7",
        badge: "1,209 Total Flashcards",
        description: "Complete collection of 2017 Radiology Decks, Clinical Testlets, Oral Surgery, High-Yield Glossary, and 9 Official PRC Exam Blocks."
      };
    }
    if (selectedDeckId === "starred") {
      return {
        name: "Starred & Bookmarked Cards",
        icon: "⭐",
        color: "#f59e0b",
        badge: `${bookmarkedIds.length} Saved Cards`,
        description: "Your personalized collection of starred flashcards for targeted high-yield review before exam day."
      };
    }
    return DENTAL_DECKS.find(d => d.id === selectedDeckId) || DENTAL_DECKS[0];
  }, [selectedDeckId, bookmarkedIds]);

  const isCurrentCardBookmarked = currentCard && bookmarkedIds.includes(currentCard.id);

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "1.25rem 1rem 3.5rem" }}>
      
      {/* HEADER BANNER */}
      <div className="glass-panel" style={{
        padding: "1.25rem 1.5rem",
        marginBottom: "1.25rem",
        borderRadius: "16px",
        border: "1px solid rgba(168, 85, 247, 0.25)",
        background: "linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(17, 24, 39, 0.95) 100%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🃏</span>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              Dental Decks &amp; Board Flashcards
            </h2>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", margin: 0 }}>
            Dedicated to <strong style={{ color: "var(--accent-pink)" }}>{girlfriendName}</strong> • Flip to reveal answers, rationales, and test your active recall.
          </p>
        </div>

        {/* Source Mode Switcher */}
        <div style={{
          display: "flex",
          background: "rgba(0, 0, 0, 0.4)",
          borderRadius: "12px",
          padding: "4px",
          border: "1px solid rgba(255, 255, 255, 0.08)"
        }}>
          <button
            onClick={() => {
              sound.playClick();
              setSourceMode("dental_decks");
            }}
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "8px",
              fontSize: "0.83rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              background: sourceMode === "dental_decks" ? "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)" : "transparent",
              color: sourceMode === "dental_decks" ? "#ffffff" : "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: sourceMode === "dental_decks" ? "0 2px 8px rgba(168, 85, 247, 0.4)" : "none",
              transition: "all 0.2s"
            }}
          >
            <span>🃏 Dental Decks (1,209)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setSourceMode("qbank");
            }}
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "8px",
              fontSize: "0.83rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              background: sourceMode === "qbank" ? "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)" : "transparent",
              color: sourceMode === "qbank" ? "#ffffff" : "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: sourceMode === "qbank" ? "0 2px 8px rgba(99, 102, 241, 0.4)" : "none",
              transition: "all 0.2s"
            }}
          >
            <span>📚 QBank Cards (839)</span>
          </button>
        </div>
      </div>

      {/* DENTAL DECKS SELECTOR & SEARCH (Only in dental_decks mode) */}
      {isDental && (
        <div className="glass-panel" style={{
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
          borderRadius: "16px",
          border: "1px solid var(--border-color)"
        }}>
          {/* Deck Ribbon Chips */}
          <div style={{ marginBottom: "0.85rem" }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "0.6rem",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              <span>Select Dental Deck ({DENTAL_DECKS.length} Decks Available)</span>
              <span style={{ color: "var(--accent-purple)", fontWeight: 700 }}>
                {dentalDeckList.length} cards in active view
              </span>
            </div>

            <div style={{
              display: "flex",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              scrollbarWidth: "thin"
            }}>
              {/* All Decks Chip */}
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedDeckId("all");
                }}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontWeight: selectedDeckId === "all" ? 700 : 500,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: selectedDeckId === "all" ? "1px solid #a855f7" : "1px solid var(--border-color)",
                  background: selectedDeckId === "all" ? "rgba(168, 85, 247, 0.22)" : "rgba(255, 255, 255, 0.03)",
                  color: selectedDeckId === "all" ? "#c084fc" : "var(--text-secondary)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem"
                }}
              >
                <span>🌟 All Decks (1,209)</span>
              </button>

              {/* Starred Deck Chip */}
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedDeckId("starred");
                }}
                style={{
                  padding: "0.4rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontWeight: selectedDeckId === "starred" ? 700 : 500,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: selectedDeckId === "starred" ? "1px solid #f59e0b" : "1px solid var(--border-color)",
                  background: selectedDeckId === "starred" ? "rgba(245, 158, 11, 0.22)" : "rgba(255, 255, 255, 0.03)",
                  color: selectedDeckId === "starred" ? "#fbbf24" : "var(--text-secondary)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem"
                }}
              >
                <Star size={13} fill={selectedDeckId === "starred" ? "#fbbf24" : "none"} color="#fbbf24" />
                <span>Starred ({bookmarkedIds.length})</span>
              </button>

              {/* Individual Decks */}
              {DENTAL_DECKS.map(d => {
                const isSelected = selectedDeckId === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedDeckId(d.id);
                    }}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.8rem",
                      fontWeight: isSelected ? 700 : 500,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      border: isSelected ? `1px solid ${d.color}` : "1px solid var(--border-color)",
                      background: isSelected ? `${d.color}25` : "rgba(255, 255, 255, 0.03)",
                      color: isSelected ? "#ffffff" : "var(--text-secondary)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem"
                    }}
                  >
                    <span>{d.icon}</span>
                    <span>{d.shortTitle}</span>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      background: 'rgba(0,0,0,0.35)', 
                      padding: '1px 6px', 
                      borderRadius: '8px',
                      color: isSelected ? d.color : 'var(--text-muted)'
                    }}>
                      {d.totalCards}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar & Scrub Controls */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            paddingTop: "0.6rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: "1 1 280px" }}>
              <div style={{ position: "relative", width: "100%" }}>
                <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Search deck (e.g. lidocaine, hashimoto, cathode, synchondrosis, malamad)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.45rem 0.75rem 0.45rem 2rem",
                    borderRadius: "8px",
                    background: "var(--input-bg)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "0.82rem"
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      fontSize: "0.75rem"
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
              {/* Jump to Card */}
              <form onSubmit={handleJumpSubmit} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Card:</span>
                <input
                  type="number"
                  min="1"
                  max={dentalDeckList.length || 1}
                  placeholder={`${currentIndex + 1}`}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  style={{
                    width: "48px",
                    padding: "0.3rem 0.4rem",
                    textAlign: "center",
                    borderRadius: "6px",
                    background: "var(--input-bg)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "0.8rem"
                  }}
                />
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>/ {dentalDeckList.length}</span>
              </form>

              <button
                onClick={handleShuffle}
                className="btn btn-secondary"
                style={{ padding: "0.38rem 0.75rem", fontSize: "0.8rem" }}
                title="Shuffle deck (Key: S)"
              >
                <Shuffle size={13} /> Shuffle
              </button>
            </div>
          </div>

          {/* Active Deck Info Banner */}
          {activeDeckMeta && (
            <div style={{
              marginTop: "0.75rem",
              padding: "0.55rem 0.85rem",
              borderRadius: "8px",
              background: "rgba(0, 0, 0, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.8rem",
              color: "var(--text-secondary)"
            }}>
              <span style={{ fontSize: "1.15rem" }}>{activeDeckMeta.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ color: activeDeckMeta.color || "var(--text-primary)" }}>{activeDeckMeta.name}:</strong>{" "}
                <span>{activeDeckMeta.description}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* QBANK CONTROLS BAR (Only in qbank mode) */}
      {!isDental && (
        <div className="glass-panel" style={{
          padding: "0.85rem 1.25rem",
          marginBottom: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.85rem",
          borderRadius: "16px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Filter size={16} color="var(--accent-purple)" />
            <select
              value={qbankCategory}
              onChange={(e) => setQbankCategory(e.target.value)}
              style={{
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--input-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.85rem"
              }}
            >
              {qbankCategories.map((cat, idx) => (
                <option key={idx} value={cat} style={{ background: "#111827", color: "#ffffff" }}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
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
              Card <strong style={{ color: "var(--text-primary)" }}>{qbankDeck.length > 0 ? currentIndex + 1 : 0}</strong> / {qbankDeck.length}
            </span>

            <button
              onClick={handleShuffle}
              className="btn btn-secondary"
              style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
              title="Shuffle deck (Key: S)"
            >
              <Shuffle size={14} /> Shuffle
            </button>
          </div>
        </div>
      )}

      {/* EMPTY DECK STATE */}
      {activeDeck.length === 0 ? (
        <div style={{ maxWidth: "600px", margin: "3rem auto", textAlign: "center", padding: "3rem 2rem" }} className="glass-panel">
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>No Cards Found</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
            {selectedDeckId === "starred"
              ? "You haven't starred any dental deck cards yet! Click the star icon (⭐) on any card to save it for quick high-yield review."
              : searchQuery
                ? `No flashcards matched your search query "${searchQuery}". Try another keyword.`
                : "No flashcards available in this category."}
          </p>
          {(searchQuery || selectedDeckId === "starred") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDeckId("all");
              }}
              className="btn btn-primary"
              style={{ fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}
            >
              Reset Filters &amp; View All 1,209 Cards
            </button>
          )}
        </div>
      ) : (
        <>
          {/* RATING FEEDBACK TOAST */}
          {ratingToast && (
            <div style={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              padding: "0.6rem 1.25rem",
              borderRadius: "9999px",
              background: "#1f2937",
              border: `1px solid ${ratingToast.color}`,
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.88rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span>{ratingToast.text}</span>
            </div>
          )}

          {/* 3D FLASHCARD SCENE */}
          <div className="flashcard-scene" onClick={handleFlip}>
            <div className={`flashcard-inner ${isFlipped ? "is-flipped" : ""}`}>
              
              {/* ======================= FRONT FACE ======================= */}
              <div className="flashcard-face flashcard-front">
                <div>
                  {/* Top Header Bar */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginBottom: "1rem",
                    paddingBottom: "0.65rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span className="badge badge-purple" style={{
                        background: isDental && activeDeckMeta.color ? `${activeDeckMeta.color}25` : undefined,
                        color: isDental && activeDeckMeta.color ? activeDeckMeta.color : undefined,
                        borderColor: isDental && activeDeckMeta.color ? `${activeDeckMeta.color}60` : undefined
                      }}>
                        {isDental ? (currentCard.deckName || activeDeckMeta.name) : currentCard.category}
                      </span>
                      {currentCard.category && isDental && (
                        <span className="badge badge-rose" style={{ fontSize: "0.72rem" }}>
                          {currentCard.category}
                        </span>
                      )}
                      {!isDental && (
                        <span className="badge badge-rose">{currentCard.difficulty || "Board Exam"}</span>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {/* Bookmark Star Button */}
                      {isDental && (
                        <button
                          onClick={(e) => toggleBookmark(currentCard.id, e)}
                          style={{
                            background: isCurrentCardBookmarked ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.05)",
                            border: isCurrentCardBookmarked ? "1px solid #f59e0b" : "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "0.35rem 0.6rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            color: isCurrentCardBookmarked ? "#fbbf24" : "var(--text-muted)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            transition: "all 0.15s"
                          }}
                          title="Star/Bookmark this card (Key: B)"
                        >
                          <Star size={14} fill={isCurrentCardBookmarked ? "#fbbf24" : "none"} color={isCurrentCardBookmarked ? "#fbbf24" : "currentColor"} />
                          <span>{isCurrentCardBookmarked ? "Starred" : "Star"}</span>
                        </button>
                      )}

                      <span className="mono-font" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        #{currentIndex + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Front Content */}
                  {isDental ? (
                    <div>
                      {/* Render Dental Deck HTML Front */}
                      <div 
                        style={{ 
                          fontSize: "1.05rem", 
                          lineHeight: 1.6, 
                          color: "var(--text-primary)",
                          marginBottom: "1rem",
                          wordBreak: "break-word"
                        }}
                        dangerouslySetInnerHTML={{ __html: currentCard.front }}
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ 
                        fontSize: "1.18rem", 
                        fontWeight: 700, 
                        lineHeight: 1.5, 
                        color: "var(--text-primary)", 
                        marginTop: "0.5rem",
                        marginBottom: "1rem" 
                      }}>
                        {currentCard.question}
                      </h3>

                      {/* QBank Choices */}
                      {showChoices && currentCard.options && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                          {currentCard.options.map((opt, idx) => {
                            const letter = String.fromCharCode(65 + idx);
                            return (
                              <div
                                key={idx}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.75rem",
                                  padding: "0.65rem 0.9rem",
                                  borderRadius: "8px",
                                  background: "rgba(255, 255, 255, 0.03)",
                                  border: "1px solid rgba(255, 255, 255, 0.06)",
                                  fontSize: "0.9rem",
                                  color: "var(--text-secondary)"
                                }}
                              >
                                <span style={{
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "6px",
                                  background: "rgba(168, 85, 247, 0.15)",
                                  color: "var(--accent-purple)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                  fontSize: "0.78rem",
                                  flexShrink: 0
                                }}>
                                  {letter}
                                </span>
                                <span style={{ flex: 1, paddingTop: "1px" }}>{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Flip Prompt Footer */}
                <div style={{ 
                  textAlign: "center", 
                  color: "var(--text-muted)", 
                  fontSize: "0.82rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--border-color)",
                  marginTop: "1.25rem"
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    <RotateCw size={13} color="var(--accent-purple)" /> Click card or press <kbd style={{ padding: "0.15rem 0.4rem", background: "rgba(255,255,255,0.08)", borderRadius: "4px", fontSize: "0.75rem" }}>Space</kbd> to reveal answer
                  </span>
                </div>
              </div>

              {/* ======================= BACK FACE ======================= */}
              <div className="flashcard-face flashcard-back">
                <div>
                  {/* Top Header Bar */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginBottom: "1rem",
                    paddingBottom: "0.65rem",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className="badge badge-green" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontWeight: 700
                      }}>
                        <CheckCircle2 size={13} /> Correct Answer Revealed
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {isDental && (
                        <button
                          onClick={(e) => toggleBookmark(currentCard.id, e)}
                          style={{
                            background: isCurrentCardBookmarked ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.05)",
                            border: isCurrentCardBookmarked ? "1px solid #f59e0b" : "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "0.35rem 0.6rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            color: isCurrentCardBookmarked ? "#fbbf24" : "var(--text-muted)",
                            fontSize: "0.75rem",
                            fontWeight: 600
                          }}
                          title="Star/Bookmark this card"
                        >
                          <Star size={14} fill={isCurrentCardBookmarked ? "#fbbf24" : "none"} color={isCurrentCardBookmarked ? "#fbbf24" : "currentColor"} />
                          <span>{isCurrentCardBookmarked ? "Starred" : "Star"}</span>
                        </button>
                      )}
                      <span className="mono-font" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        #{currentIndex + 1}
                      </span>
                    </div>
                  </div>

                  {/* Correct Answer Display */}
                  {isDental ? (
                    <div>
                      {/* Answer Banner */}
                      <div style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.25) 100%)",
                        borderLeft: "4px solid #10b981",
                        borderTop: "1px solid rgba(16, 185, 129, 0.3)",
                        borderRight: "1px solid rgba(16, 185, 129, 0.2)",
                        borderBottom: "1px solid rgba(16, 185, 129, 0.2)",
                        padding: "0.85rem 1.15rem",
                        borderRadius: "10px",
                        marginBottom: "1rem"
                      }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#34d399", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>
                          Official Answer &amp; Finding
                        </div>
                        <div style={{ fontSize: "1.08rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.45 }}>
                          {currentCard.answer || currentCard.term}
                        </div>
                      </div>

                      {/* Rationale & Diagnostic Explanation */}
                      {currentCard.rationale && (
                        <div style={{ marginBottom: "1.25rem" }}>
                          <div style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            color: "var(--accent-purple)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            marginBottom: "0.45rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem"
                          }}>
                            <Sparkles size={13} /> Comprehensive Rationale &amp; Clinical Context
                          </div>
                          <div 
                            style={{
                              fontSize: "0.92rem",
                              lineHeight: 1.6,
                              color: "var(--text-primary)",
                              background: "rgba(0, 0, 0, 0.25)",
                              padding: "0.85rem 1rem",
                              borderRadius: "8px",
                              border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}
                            dangerouslySetInnerHTML={{ __html: currentCard.rationale }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {/* QBank Answer */}
                      <div style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.25) 100%)",
                        borderLeft: "4px solid #10b981",
                        padding: "0.85rem 1.15rem",
                        borderRadius: "10px",
                        marginBottom: "1rem"
                      }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#34d399", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Option {String.fromCharCode(65 + currentCard.correctIndex)} is Correct
                        </div>
                        <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginTop: "2px" }}>
                          {currentCard.options[currentCard.correctIndex]}
                        </div>
                      </div>

                      {/* Primary Rationale */}
                      <div style={{ marginBottom: "1rem", fontSize: "0.9rem", lineHeight: 1.5, color: "var(--text-primary)" }}>
                        <strong style={{ color: "var(--accent-purple)", display: "block", marginBottom: "0.25rem", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Why Option {String.fromCharCode(65 + currentCard.correctIndex)} is Correct:
                        </strong>
                        {currentCard.explanation}
                      </div>

                      {/* Distractors Breakdown */}
                      {currentCard.distractorRationales && Object.keys(currentCard.distractorRationales).length > 0 && (
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
                            {Object.entries(currentCard.distractorRationales).map(([idxStr, rationale]) => {
                              const optIdx = parseInt(idxStr, 10);
                              const letter = String.fromCharCode(65 + optIdx);
                              const optText = currentCard.options[optIdx] || `Option ${letter}`;
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

                      {/* Key Takeaway */}
                      {currentCard.keyTakeaway && (
                        <div style={{
                          background: "rgba(168, 85, 247, 0.1)",
                          borderLeft: "3px solid var(--accent-purple)",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "4px",
                          fontSize: "0.83rem",
                          color: "var(--text-primary)",
                          marginTop: "0.5rem"
                        }}>
                          💡 <strong>Clinical Pearl &amp; Memory Hook:</strong> {currentCard.keyTakeaway}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Active Recall Self-Rating Controls (Spaced Repetition) */}
                  <div style={{
                    marginTop: "1.25rem",
                    padding: "0.85rem",
                    borderRadius: "10px",
                    background: "rgba(0, 0, 0, 0.35)",
                    border: "1px solid rgba(255, 255, 255, 0.06)"
                  }} onClick={(e) => e.stopPropagation()}>
                    <div style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.55rem",
                      textAlign: "center"
                    }}>
                      Self-Assessment • How well did you recall this?
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                      <button
                        onClick={(e) => handleRating("again", e)}
                        style={{
                          padding: "0.5rem 0.35rem",
                          borderRadius: "8px",
                          border: "1px solid rgba(239, 68, 68, 0.4)",
                          background: "rgba(239, 68, 68, 0.12)",
                          color: "#f87171",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          transition: "all 0.15s"
                        }}
                        title="Review again soon (Key: 1)"
                      >
                        <span>🔄 Again</span>
                        <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>[1]</span>
                      </button>

                      <button
                        onClick={(e) => handleRating("hard", e)}
                        style={{
                          padding: "0.5rem 0.35rem",
                          borderRadius: "8px",
                          border: "1px solid rgba(245, 158, 11, 0.4)",
                          background: "rgba(245, 158, 11, 0.12)",
                          color: "#fbbf24",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          transition: "all 0.15s"
                        }}
                        title="Hesitant or difficult (Key: 2)"
                      >
                        <span>⚠️ Hard</span>
                        <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>[2]</span>
                      </button>

                      <button
                        onClick={(e) => handleRating("good", e)}
                        style={{
                          padding: "0.5rem 0.35rem",
                          borderRadius: "8px",
                          border: "1px solid rgba(168, 85, 247, 0.4)",
                          background: "rgba(168, 85, 247, 0.12)",
                          color: "#c084fc",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          transition: "all 0.15s"
                        }}
                        title="Correct with normal effort (Key: 3)"
                      >
                        <span>👍 Good</span>
                        <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>[3]</span>
                      </button>

                      <button
                        onClick={(e) => handleRating("easy", e)}
                        style={{
                          padding: "0.5rem 0.35rem",
                          borderRadius: "8px",
                          border: "1px solid rgba(16, 185, 129, 0.4)",
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "#34d399",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          transition: "all 0.15s"
                        }}
                        title="Instant recall / Mastered (Key: 4)"
                      >
                        <span>⚡ Easy</span>
                        <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>[4]</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Flip Prompt Footer */}
                <div style={{ 
                  textAlign: "center", 
                  color: "var(--text-muted)", 
                  fontSize: "0.82rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--border-color)",
                  marginTop: "1.25rem"
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    <RotateCw size={13} color="var(--accent-purple)" /> Click card or press <kbd style={{ padding: "0.15rem 0.4rem", background: "rgba(255,255,255,0.08)", borderRadius: "4px", fontSize: "0.75rem" }}>Space</kbd> to flip back
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* PROGRESS BAR */}
          <div style={{ maxWidth: "720px", margin: "1.25rem auto 0", padding: "0 0.5rem" }}>
            <div style={{
              width: "100%",
              height: "6px",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.08)",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${activeDeck.length > 0 ? ((currentIndex + 1) / activeDeck.length) * 100 : 0}%`,
                height: "100%",
                background: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
                borderRadius: "9999px",
                transition: "width 0.25s ease"
              }} />
            </div>
          </div>

          {/* NAVIGATION CONTROLS */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.85rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            <button 
              onClick={handlePrev} 
              className="btn btn-secondary" 
              style={{ padding: "0.65rem 1.25rem", fontSize: "0.88rem" }}
              title="Previous Card (Key: [←])"
            >
              <ArrowLeft size={16} /> Previous Card
            </button>

            <button 
              onClick={handleFlip} 
              className="btn btn-primary" 
              style={{ padding: "0.65rem 1.75rem", fontSize: "0.9rem", fontWeight: 700 }}
              title="Flip Card (Key: [Space])"
            >
              <RotateCw size={16} /> Flip Card
            </button>

            <button 
              onClick={handleNext} 
              className="btn btn-secondary" 
              style={{ padding: "0.65rem 1.25rem", fontSize: "0.88rem" }}
              title="Next Card (Key: [→])"
            >
              Next Card <ArrowRight size={16} />
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.85rem" }}>
            Keyboard Shortcuts: [←] Prev &nbsp;|&nbsp; [Space] Flip &nbsp;|&nbsp; [→] Next &nbsp;|&nbsp; [S] Shuffle &nbsp;|&nbsp; [B] Star Card
          </p>
        </>
      )}

    </div>
  );
}
