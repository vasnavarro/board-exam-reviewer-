import React, { useState, useEffect } from "react";
import { BookOpen, Save, Sparkles, Check, Heart } from "lucide-react";
import { sound } from "../utils/audio";

export function NotesCheatSheet({ girlfriendName, notes, onSaveNotes }) {
  const [content, setContent] = useState(notes);
  const [savedBadge, setSavedBadge] = useState(false);

  useEffect(() => {
    setContent(notes);
  }, [notes]);

  const handleSave = () => {
    sound.playSuccess();
    onSaveNotes(content);
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2000);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem 1rem 4rem" }}>
      
      {/* Header */}
      <div className="glass-panel" style={{
        padding: "1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <BookOpen size={20} color="#ec4899" />
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>
              {girlfriendName}'s Board Exam Cheat Sheet & Notes
            </h2>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: "0.25rem" }}>
            High-yield formulas, mnemonics, and personal study notes. Auto-saved locally.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary">
          {savedBadge ? <Check size={16} /> : <Save size={16} />}
          <span>{savedBadge ? "Saved!" : "Save Notes"}</span>
        </button>
      </div>

      {/* Editor Pad */}
      <div className="glass-panel" style={{ padding: "1.5rem" }}>
        <textarea
          rows={22}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Jot down high-yield formulas, reminders, mnemonics, or encouraging notes here..."
          style={{
            width: "100%",
            background: "rgba(0, 0, 0, 0.25)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            padding: "1.25rem",
            color: "#f8fafc",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            fontFamily: "'JetBrains Mono', 'Plus Jakarta Sans', monospace",
            resize: "vertical"
          }}
        />
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
          💡 Tip: Click "Save Notes" above to preserve any changes in your browser storage.
        </p>
      </div>

    </div>
  );
}
