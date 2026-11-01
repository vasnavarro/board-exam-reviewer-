import React, { useState, useEffect } from "react";
import { Sparkles, Heart, X, CheckCircle2, ShieldCheck, Smile } from "lucide-react";
import { sound } from "../utils/audio";

export function ZenAntiPanicModal({ isOpen, onClose, girlfriendName = "Leane", stats = {} }) {
  const [phase, setPhase] = useState("inhale"); // 'inhale' (4s) | 'hold' (7s) | 'exhale' (8s)
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (phase === "inhale") {
            setPhase("hold");
            return 7;
          } else if (phase === "hold") {
            setPhase("exhale");
            return 8;
          } else {
            setPhase("inhale");
            setCycleCount(c => c + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, phase]);

  if (!isOpen) return null;

  const phaseInstruction = {
    inhale: "Inhale slowly through your nose...",
    hold: "Hold gently & relax your shoulders...",
    exhale: "Exhale slowly through your mouth..."
  };

  const circleScale = phase === "inhale" ? 1.35 : phase === "hold" ? 1.35 : 1.0;

  // Best exam score
  const bestScore = (stats.examHistory || []).reduce((max, e) => Math.max(max, e.scorePercent || e.score || 0), 0);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 280,
      background: "radial-gradient(circle at center, rgba(30, 20, 50, 0.95) 0%, rgba(10, 8, 20, 0.98) 100%)",
      backdropFilter: "blur(20px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem"
    }}>
      <div style={{
        maxWidth: "560px",
        width: "100%",
        textAlign: "center",
        position: "relative",
        animation: "slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-1.5rem",
            right: "0",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "0.5rem"
          }}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "rgba(168, 85, 247, 0.15)",
            border: "1px solid rgba(168, 85, 247, 0.35)",
            padding: "0.35rem 0.9rem",
            borderRadius: "9999px",
            fontSize: "0.825rem",
            color: "#c084fc",
            fontWeight: 700,
            marginBottom: "0.75rem"
          }}>
            <Heart size={14} fill="#ec4899" color="#ec4899" />
            <span>Emergency Zen & Anti-Panic Station</span>
          </div>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Take a Slow Breath, Dr. {girlfriendName} 🌸
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
            Review center fatigue and test anxiety are completely normal. You are safe, you are capable, and you are deeply loved.
          </p>
        </div>

        {/* 4-7-8 Breathing Animated Circle */}
        <div style={{
          position: "relative",
          width: "220px",
          height: "220px",
          margin: "1.5rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/* Outer glow ring */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.1) 70%, transparent 100%)",
            transform: `scale(${circleScale * 1.15})`,
            transition: phase === "inhale" ? "transform 4s ease-out" : phase === "exhale" ? "transform 8s ease-in-out" : "transform 0.5s ease",
            filter: "blur(12px)"
          }} />

          {/* Main Breathing Circle */}
          <div style={{
            width: "170px",
            height: "170px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)",
            border: "2px solid rgba(236, 72, 153, 0.6)",
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${circleScale})`,
            transition: phase === "inhale" ? "transform 4s ease-out" : phase === "exhale" ? "transform 8s ease-in-out" : "transform 0.5s ease"
          }}>
            <span style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#fff"
            }}>
              {phase}
            </span>
            <span className="mono-font" style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              color: "#fbcfe8",
              marginTop: "-2px"
            }}>
              {secondsLeft}s
            </span>
            <span style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.7)" }}>
              Cycle {cycleCount}
            </span>
          </div>
        </div>

        {/* Phase instruction */}
        <p style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--accent-purple)",
          minHeight: "1.5rem",
          marginBottom: "1.25rem"
        }}>
          {phaseInstruction[phase]}
        </p>

        {/* Grounding Affirmation Box */}
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "14px",
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          textAlign: "left"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
            <Sparkles size={16} color="#c084fc" />
            <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>
              Angelo's Grounding Truths for You:
            </span>
          </div>
          <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
            • You don't have to conquer all questions today — consistency beats intensity.<br />
            • One low practice drill does not define your clinical brilliance.<br />
            • You have already achieved a <strong>{stats.streak || 1}-day streak</strong> and scored up to <strong>{bestScore || 75}%</strong> in mock exams!<br />
            • The Philippine license already has your name written on it. 💜
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => {
            sound.playSuccess();
            onClose();
          }}
          className="btn btn-primary"
          style={{
            padding: "0.65rem 1.75rem",
            fontSize: "0.9rem",
            background: "var(--gradient-love)",
            boxShadow: "0 6px 20px rgba(236, 72, 153, 0.4)"
          }}
        >
          I Feel Grounded & Ready to Continue 🌸
        </button>
      </div>
    </div>
  );
}
