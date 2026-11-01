import React from "react";
import { 
  Sparkles, Heart, Clock, Flame, Volume2, VolumeX, 
  Settings, BookOpen, Sun, Moon, PenTool,
  Cloud, CloudOff, RefreshCw, Gift
} from "lucide-react";
import { sound } from "../utils/audio";

export function Navbar({ 
  girlfriendName, 
  daysLeft, 
  streak, 
  soundEnabled, 
  onToggleSound, 
  onOpenSettings,
  currentTab,
  onSelectTab,
  theme,
  onToggleTheme,
  syncStatus = "synced",
  onManualSync,
  lastSyncTime,
  onOpenRewards,
  unlockedRewardsCount = 0
}) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "drills", label: "Quick Drills ⚡", icon: "🦷" },
    { id: "practice", label: "Practice Drill", icon: "⚡" },
    { id: "goodnotes", label: "LeaneNotes ✍️", icon: "📓" },
    { id: "mock", label: "Mock Exam", icon: "🎯" },
    { id: "flashcards", label: "Flashcards", icon: "🗂️" },
    { id: "weakness", label: "Weakness Focus", icon: "🔍" },
    { id: "bank", label: "Question Bank", icon: "📚" },
    { id: "notes", label: "Cheat Sheet", icon: "📌" },
  ];

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "var(--nav-bg)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border-color)",
      padding: "0.75rem 1.5rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      transition: "background 0.25s ease, border-color 0.25s ease"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.85rem"
      }}>
        {/* Logo and Girlfriend Dedication */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div 
            onClick={() => onSelectTab("dashboard")}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.65rem", 
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 18px rgba(168, 85, 247, 0.5)",
              fontSize: "1.2rem"
            }}>
              🦷
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span className="brand-font" style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                  Dr. Leane DLE
                </span>
                <Sparkles size={16} color="#c084fc" />
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "-3px" }}>
                Dental Licensure Exam Prep
              </p>
            </div>
          </div>

          {/* Dedicated Girlfriend Pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "rgba(168, 85, 247, 0.15)",
            border: "1px solid var(--border-color)",
            padding: "0.35rem 0.85rem",
            borderRadius: "9999px",
            fontSize: "0.825rem",
            color: "var(--text-primary)",
            fontWeight: 600,
            boxShadow: "0 0 12px rgba(168, 85, 247, 0.12)"
          }}>
            <Heart size={14} fill="#ec4899" color="#ec4899" />
            <span>Dedicated to: <strong style={{ color: "var(--accent-purple)" }}>{girlfriendName}</strong> 💜</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          background: "var(--option-bg)",
          padding: "0.3rem",
          borderRadius: "14px",
          border: "1px solid var(--border-color)",
          overflowX: "auto"
        }}>
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  onSelectTab(tab.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.45rem 0.8rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.825rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  background: isActive ? "var(--gradient-love)" : "transparent",
                  boxShadow: isActive ? "0 2px 10px rgba(168, 85, 247, 0.35)" : "none",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap"
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Badges & Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Days Left */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(168, 85, 247, 0.12)",
            border: "1px solid var(--border-color)",
            padding: "0.35rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--accent-purple)"
          }}>
            <Clock size={14} color="#a855f7" />
            <span className="mono-font">{daysLeft}d to DLE (Nov 22)</span>
          </div>

          {/* Study Streak */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            padding: "0.35rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#f59e0b"
          }}>
            <Flame size={14} fill="#f59e0b" color="#f59e0b" />
            <span className="mono-font">{streak}d Streak</span>
          </div>

          {/* Milestone Love Chests Button */}
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenRewards) onOpenRewards();
            }}
            title="Milestone Love Chests & Surprise Coupons from Angelo 🎁"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(236, 72, 153, 0.15)",
              border: "1px solid rgba(236, 72, 153, 0.35)",
              padding: "0.35rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#ec4899",
              cursor: "pointer",
              transition: "all 0.18s ease"
            }}
          >
            <Gift size={14} color="#ec4899" />
            <span>Love Chests</span>
            {unlockedRewardsCount > 0 && (
              <span style={{
                background: "linear-gradient(135deg, #ec4899, #a855f7)",
                color: "#fff",
                fontSize: "0.68rem",
                borderRadius: "9999px",
                padding: "0.05rem 0.4rem",
                fontWeight: 800
              }}>
                {unlockedRewardsCount}
              </span>
            )}
          </button>

          {/* Cloud Sync Status Pill */}
          <button
            onClick={() => {
              if (onManualSync) {
                sound.playClick();
                onManualSync(false);
              }
            }}
            title={
              syncStatus === "syncing"
                ? "Syncing progress with iPad / Laptop..."
                : syncStatus === "synced"
                ? `All progress synced with cloud (${lastSyncTime ? new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Ready'}). Click to sync now!`
                : "Cloud sync offline. Click to retry."
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              background: syncStatus === "synced"
                ? "rgba(16, 185, 129, 0.12)"
                : syncStatus === "syncing"
                ? "rgba(168, 85, 247, 0.15)"
                : "rgba(245, 158, 11, 0.12)",
              border: `1px solid ${
                syncStatus === "synced"
                  ? "rgba(16, 185, 129, 0.35)"
                  : syncStatus === "syncing"
                  ? "rgba(168, 85, 247, 0.45)"
                  : "rgba(245, 158, 11, 0.35)"
              }`,
              padding: "0.35rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: syncStatus === "synced" ? "#10b981" : syncStatus === "syncing" ? "#c084fc" : "#f59e0b",
              cursor: "pointer",
              transition: "all 0.18s ease"
            }}
          >
            {syncStatus === "syncing" ? (
              <>
                <RefreshCw size={13} className="spin-animation" />
                <span>Syncing</span>
              </>
            ) : syncStatus === "synced" ? (
              <>
                <Cloud size={14} color="#10b981" />
                <span>Synced</span>
              </>
            ) : (
              <>
                <CloudOff size={14} color="#f59e0b" />
                <span>Offline</span>
              </>
            )}
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              background: "rgba(168, 85, 247, 0.1)",
              border: "1px solid var(--border-color)",
              color: "var(--accent-purple)",
              cursor: "pointer",
              padding: "0.45rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease"
            }}
          >
            {theme === "dark" ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#7c3aed" />}
          </button>

          {/* Audio Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            style={{
              background: "rgba(168, 85, 247, 0.1)",
              border: "1px solid var(--border-color)",
              color: soundEnabled ? "var(--accent-purple)" : "var(--text-muted)",
              cursor: "pointer",
              padding: "0.45rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease"
            }}
          >
            {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            title="Reviewer Settings"
            style={{
              background: "rgba(168, 85, 247, 0.1)",
              border: "1px solid var(--border-color)",
              color: "var(--accent-purple)",
              cursor: "pointer",
              padding: "0.45rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease"
            }}
          >
            <Settings size={17} />
          </button>
        </div>

      </div>
    </header>
  );
}