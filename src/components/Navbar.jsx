import React from "react";
import { Sparkles, Heart, Clock, Flame, Volume2, VolumeX, Settings, BookOpen } from "lucide-react";
import { sound } from "../utils/audio";

export function Navbar({ 
  girlfriendName, 
  daysLeft, 
  streak, 
  soundEnabled, 
  onToggleSound, 
  onOpenSettings,
  currentTab,
  onSelectTab
}) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "mock", label: "Mock Exam", icon: "📝" },
    { id: "flashcards", label: "Flashcards", icon: "🗂️" },
    { id: "practice", label: "Practice Drill", icon: "⚡" },
    { id: "weakness", label: "Weakness Focus", icon: "🎯" },
    { id: "bank", label: "Question Bank", icon: "📚" },
    { id: "notes", label: "Cheat Sheet", icon: "📌" },
  ];

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(10, 14, 23, 0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "0.75rem 1.5rem"
    }}>
      <div style={{
        maxWidth: "1380px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        {/* Logo and Girlfriend Dedication */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div 
            onClick={() => onSelectTab("dashboard")}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.6rem", 
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(236, 72, 153, 0.4)"
            }}>
              <BookOpen size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span className="brand-font" style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
                  PassBoard
                </span>
                <Sparkles size={16} color="#ec4899" />
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "-3px" }}>
                Board Exam Companion
              </p>
            </div>
          </div>

          {/* Dedicated Girlfriend Pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "rgba(236, 72, 153, 0.12)",
            border: "1px solid rgba(236, 72, 153, 0.3)",
            padding: "0.35rem 0.85rem",
            borderRadius: "var(--radius-full)",
            fontSize: "0.825rem",
            color: "#f472b6",
            fontWeight: 600
          }}>
            <Heart size={14} fill="#ec4899" color="#ec4899" className="animate-heart" />
            <span>Reviewing for: <strong style={{ color: "#ffffff" }}>{girlfriendName}</strong></span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          background: "rgba(255, 255, 255, 0.04)",
          padding: "0.3rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
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
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  background: isActive ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3))" : "transparent",
                  borderBottom: isActive ? "2px solid #ec4899" : "2px solid transparent",
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Days Left */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(99, 102, 241, 0.12)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            padding: "0.35rem 0.75rem",
            borderRadius: "var(--radius-full)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#818cf8"
          }}>
            <Clock size={14} />
            <span className="mono-font">{daysLeft}d to Board Exam</span>
          </div>

          {/* Study Streak */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            background: "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            padding: "0.35rem 0.75rem",
            borderRadius: "var(--radius-full)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#fbbf24"
          }}>
            <Flame size={14} fill="#f59e0b" color="#f59e0b" />
            <span className="mono-font">{streak} Day Streak</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--border-color)",
              color: soundEnabled ? "#ec4899" : "var(--text-muted)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s ease"
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            title="Reviewer Settings & Personalization"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s ease"
            }}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
