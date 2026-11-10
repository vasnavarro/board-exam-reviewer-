import React, { useState } from "react";
import { X, Heart, Save, RotateCcw, Calendar, User, MessageCircleHeart, Cloud, RefreshCw, Smartphone, Laptop, CheckCircle2 } from "lucide-react";
import { sound } from "../utils/audio";
import { getSyncKey, setSyncKey, getDeviceName } from "../services/cloudSync";

export function SettingsModal({
  isOpen,
  onClose,
  girlfriendName,
  examDate,
  personalMessage,
  passingScore,
  onSave,
  onResetData,
  onResetAllProgress,
  onForcePurgeUpdate,
  syncStatus = "synced",
  lastSyncTime,
  syncDevice,
  onManualSync,
  totalQuestionsCount = 2027
}) {
  const [name, setName] = useState(girlfriendName);
  const [date, setDate] = useState(examDate);
  const [msg, setMsg] = useState(personalMessage);
  const [targetScore, setTargetScore] = useState(passingScore);
  const [syncKeyVal, setSyncKeyVal] = useState(() => getSyncKey());
  const [syncNotice, setSyncNotice] = useState("");

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
              <Calendar size={14} style={{ display: "inline", marginRight: "4px" }} /> Target Board Exam Date (Nov 22–24, 2026 Theoretical)
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

          {/* Cloud Synchronization Section */}
          <div style={{
            background: "rgba(168, 85, 247, 0.08)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            borderRadius: "14px",
            padding: "1.1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Cloud size={18} color="#c084fc" />
                <span style={{ fontWeight: 700, fontSize: "0.925rem", color: "var(--text-primary)" }}>
                  Cloud Sync (Laptop 💻 & iPad 📱)
                </span>
              </div>
              <span style={{
                fontSize: "0.725rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "9999px",
                background: syncStatus === "synced" ? "rgba(16, 185, 129, 0.15)" : syncStatus === "syncing" ? "rgba(168, 85, 247, 0.2)" : "rgba(245, 158, 11, 0.15)",
                color: syncStatus === "synced" ? "#10b981" : syncStatus === "syncing" ? "#c084fc" : "#f59e0b",
                fontWeight: 700
              }}>
                {syncStatus === "synced" ? "● Synced" : syncStatus === "syncing" ? "● Syncing..." : "● Offline"}
              </span>
            </div>

            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.45, marginBottom: "0.85rem" }}>
              Keeps Leane's <strong>streak</strong>, <strong>mock exam scores</strong>, <strong>flagged questions</strong>, and <strong>LeaneNotes</strong> synced across all devices automatically.
            </p>

            <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-end", marginBottom: "0.75rem" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.25rem" }}>
                  Personal Sync Key
                </label>
                <input
                  type="text"
                  value={syncKeyVal}
                  onChange={(e) => setSyncKeyVal(e.target.value)}
                  placeholder="leane"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "8px",
                    background: "var(--input-bg)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    fontFamily: "monospace"
                  }}
                />
              </div>

              <button
                type="button"
                onClick={async () => {
                  sound.playClick();
                  setSyncKey(syncKeyVal);
                  if (onManualSync) {
                    await onManualSync(false);
                    setSyncNotice("Cloud progress merged successfully! ✨");
                    setTimeout(() => setSyncNotice(""), 3000);
                  }
                }}
                className="btn btn-outline"
                style={{ fontSize: "0.8rem", padding: "0.55rem 0.85rem", display: "flex", alignItems: "center", gap: "0.35rem" }}
              >
                <RefreshCw size={13} className={syncStatus === "syncing" ? "spin-animation" : ""} />
                Sync Now
              </button>

              <button
                type="button"
                onClick={async () => {
                  if (confirm("Backup this device's progress to cloud?")) {
                    sound.playClick();
                    setSyncKey(syncKeyVal);
                    if (onManualSync) {
                      await onManualSync(true);
                      setSyncNotice("Device progress uploaded to cloud! 🚀");
                      setTimeout(() => setSyncNotice(""), 3000);
                    }
                  }
                }}
                title="Force push current device state to cloud"
                className="btn btn-secondary"
                style={{ fontSize: "0.8rem", padding: "0.55rem 0.75rem" }}
              >
                Backup
              </button>
            </div>

            {syncNotice && (
              <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600, marginBottom: "0.5rem" }}>
                ✓ {syncNotice}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.72rem", color: "var(--text-muted)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.5rem" }}>
              <span>Current Device: <strong style={{ color: "var(--text-secondary)" }}>{getDeviceName()}</strong></span>
              <span>Last Synced: <strong style={{ color: "var(--text-secondary)" }}>{lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "Never"}</strong></span>
            </div>
          </div>

          {/* Question Bank & Cache Invalidation Card */}
          <div style={{
            marginTop: "1.25rem",
            padding: "1rem",
            borderRadius: "12px",
            background: "rgba(168, 85, 247, 0.08)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>
                ✨ Question Bank Sync & Cache Purge
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                Version 13.0 Master • {totalQuestionsCount} Questions Loaded • Clears stale iPad PWA cache
              </div>
            </div>
            <button
              type="button"
              onClick={onForcePurgeUpdate}
              className="btn btn-outline-primary"
              style={{ fontSize: "0.8rem", padding: "0.5rem 0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              title="Clears Service Worker cache and forces immediate reload of all 2,027 questions"
            >
              <RefreshCw size={14} /> Clear Cache & Update App
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={onResetAllProgress}
                className="btn btn-outline-danger"
                style={{ fontSize: "0.8rem", padding: "0.5rem 0.85rem" }}
                title="Clears all streaks, mock exam scores, flags, and rewards for a clean start"
              >
                <RotateCcw size={14} /> Reset Progress to Day 1
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
