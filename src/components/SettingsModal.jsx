import React, { useState } from "react";
import { X, Heart, Save, RotateCcw, Calendar, User, MessageCircleHeart } from "lucide-react";
import { sound } from "../utils/audio";

export function SettingsModal({
  isOpen,
  onClose,
  girlfriendName,
  examDate,
  personalMessage,
  passingScore,
  onSave,
  onResetData
}) {
  const [name, setName] = useState(girlfriendName);
  const [date, setDate] = useState(examDate);
  const [msg, setMsg] = useState(personalMessage);
  const [targetScore, setTargetScore] = useState(passingScore);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    sound.playSuccess();
    onSave({
      girlfriendName: name.trim() || "My Love",
      examDate: date,
      personalMessage: msg.trim(),
      passingScore: Number(targetScore)
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div className="glass-panel" style={{
        maxWidth: "540px",
        width: "100%",
        padding: "2rem",
        border: "1px solid rgba(236, 72, 153, 0.3)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Heart size={20} fill="#ec4899" color="#ec4899" />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Reviewer Settings & Personalization</h2>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "0.3rem"
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Girlfriend's Name */}
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              <User size={14} style={{ display: "inline", marginRight: "4px" }} /> Girlfriend's Name / Nickname
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maria, Dr. Sarah, Engr. Michelle"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--input-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.95rem"
              }}
            />
          </div>

          {/* Exam Date */}
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              <Calendar size={14} style={{ display: "inline", marginRight: "4px" }} /> Target Board Exam Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--input-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.95rem"
              }}
            />
          </div>

          {/* Personal Cheer Message */}
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              <MessageCircleHeart size={14} style={{ display: "inline", marginRight: "4px" }} /> Your Personal Message / Cheer
            </label>
            <textarea
              rows={3}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="A heartfelt message from you displayed on her dashboard"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                background: "var(--input-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                resize: "vertical"
              }}
            />
          </div>

          {/* Passing Target Score */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Passing Benchmark Score (%)
              </label>
              <span className="mono-font" style={{ fontWeight: 700, color: "var(--accent-emerald)" }}>{targetScore}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              step="5"
              value={targetScore}
              onChange={(e) => setTargetScore(e.target.value)}
              style={{ width: "100%", accentColor: "var(--accent-rose)" }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
            <button
              type="button"
              onClick={onResetData}
              className="btn btn-outline-danger"
              style={{ fontSize: "0.8rem", padding: "0.5rem 0.85rem" }}
            >
              <RotateCcw size={14} /> Reset Question Bank
            </button>

            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
