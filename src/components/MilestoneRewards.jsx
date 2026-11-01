import React, { useState } from "react";
import { Gift, Lock, CheckCircle, Heart, Sparkles, X, ChevronRight, Award, Smile } from "lucide-react";
import confetti from "canvas-confetti";
import { MILESTONES } from "../data/milestones";
import { sound } from "../utils/audio";

export function MilestoneRewards({
  isOpen,
  onClose,
  stats,
  girlfriendName = "Leane"
}) {
  const [openedLetters, setOpenedLetters] = useState({});
  const [activeLetter, setActiveLetter] = useState(null);

  // Load redeemed rewards from localStorage
  const [redeemed, setRedeemed] = useState(() => {
    try {
      const saved = localStorage.getItem("pb_redeemed_milestones");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  if (!isOpen) return null;

  const handleClaim = (milestone) => {
    sound.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (milestone.isLetter) {
      setActiveLetter(milestone);
    }
  };

  const handleRedeem = (milestoneId) => {
    sound.playClick();
    const updated = {
      ...redeemed,
      [milestoneId]: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    setRedeemed(updated);
    localStorage.setItem("pb_redeemed_milestones", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("pb_trigger_sync"));
  };

  // Calculate unlocked count
  const unlockedCount = MILESTONES.filter(m => m.checkUnlock(stats)).length;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 250,
      background: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(12px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div className="glass-panel" style={{
        maxWidth: "680px",
        width: "100%",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(236, 72, 153, 0.35)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          padding: "1.25rem 1.75rem",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--gradient-love)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 14px rgba(236, 72, 153, 0.4)"
            }}>
              <Gift size={20} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Milestone Love Chests 🎁</h2>
                <Sparkles size={16} color="#ec4899" />
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "-2px" }}>
                Real study achievements unlock sweet surprises from Angelo!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "0.4rem"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Unlocked Progress Bar */}
        <div style={{
          padding: "0.85rem 1.75rem",
          background: "rgba(168, 85, 247, 0.05)",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Heart size={15} fill="#ec4899" color="#ec4899" />
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
              {unlockedCount} of {MILESTONES.length} Chests Unlocked
            </span>
          </div>

          <div style={{
            width: "160px",
            height: "8px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "9999px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${(unlockedCount / MILESTONES.length) * 100}%`,
              height: "100%",
              background: "var(--gradient-love)",
              borderRadius: "9999px",
              transition: "width 0.4s ease"
            }} />
          </div>
        </div>

        {/* Content list */}
        <div style={{
          padding: "1.25rem 1.75rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          {MILESTONES.map((m) => {
            const isUnlocked = m.checkUnlock(stats);
            const isRedeemed = !!redeemed[m.id];

            return (
              <div
                key={m.id}
                style={{
                  background: isUnlocked ? "rgba(168, 85, 247, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  border: isUnlocked
                    ? "1px solid rgba(168, 85, 247, 0.35)"
                    : "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "14px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  position: "relative",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{
                      fontSize: "1.5rem",
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isUnlocked ? "rgba(168, 85, 247, 0.15)" : "rgba(255, 255, 255, 0.04)",
                      border: isUnlocked ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                      {isUnlocked ? m.icon : <Lock size={18} color="var(--text-muted)" />}
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                        <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: isUnlocked ? "var(--text-primary)" : "var(--text-muted)" }}>
                          {m.title}
                        </h4>
                        <span style={{
                          fontSize: "0.7rem",
                          padding: "0.15rem 0.45rem",
                          borderRadius: "4px",
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "var(--text-secondary)"
                        }}>
                          {m.category}
                        </span>
                      </div>

                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        Requirement: {m.requirementText}
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                    background: isRedeemed
                      ? "rgba(16, 185, 129, 0.15)"
                      : isUnlocked
                      ? "rgba(236, 72, 153, 0.18)"
                      : "rgba(255, 255, 255, 0.06)",
                    color: isRedeemed ? "#10b981" : isUnlocked ? "#ec4899" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}>
                    {isRedeemed ? (
                      <>
                        <CheckCircle size={12} />
                        Redeemed
                      </>
                    ) : isUnlocked ? (
                      <>
                        <Sparkles size={12} />
                        Unlocked!
                      </>
                    ) : (
                      "Locked"
                    )}
                  </span>
                </div>

                {/* Reward Revealed Content */}
                {isUnlocked ? (
                  <div style={{
                    marginTop: "0.35rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    background: "rgba(236, 72, 153, 0.06)",
                    border: "1px dashed rgba(236, 72, 153, 0.35)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.6rem"
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--accent-purple)" }}>
                        {m.rewardTitle}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                        {m.rewardDescription}
                      </div>
                      {isRedeemed && (
                        <div style={{ fontSize: "0.72rem", color: "#10b981", marginTop: "4px", fontWeight: 600 }}>
                          ✓ Redeemed with Angelo on {redeemed[m.id]} 💕
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      {m.isLetter && (
                        <button
                          onClick={() => {
                            sound.playClick();
                            setActiveLetter(m);
                          }}
                          className="btn btn-outline"
                          style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem" }}
                        >
                          💌 Read Letter
                        </button>
                      )}

                      {!isRedeemed ? (
                        <button
                          onClick={() => handleRedeem(m.id)}
                          className="btn btn-primary"
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.4rem 0.8rem",
                            background: "var(--gradient-love)"
                          }}
                        >
                          Redeem with Angelo 💕
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    paddingLeft: "3.25rem"
                  }}>
                    🔒 Keep studying to unlock this surprise from Angelo!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: "1rem 1.75rem",
          borderTop: "1px solid var(--border-color)",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          background: "var(--footer-bg)"
        }}>
          Every milestone you achieve brings you one step closer to <strong>Dr. Leane, DMD</strong>! 🦷💜
        </div>
      </div>

      {/* Love Letter Modal Overlay */}
      {activeLetter && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem"
        }}>
          <div style={{
            maxWidth: "520px",
            width: "100%",
            background: "#fffdf9",
            color: "#27272a",
            borderRadius: "16px",
            padding: "2rem 2.25rem",
            boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
            border: "2px solid #fbcfe8",
            position: "relative",
            animation: "slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            <button
              onClick={() => setActiveLetter(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#71717a"
              }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "2rem" }}>💌</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#831843", marginTop: "0.25rem" }}>
                {activeLetter.letterTitle}
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#9d174d", fontStyle: "italic" }}>
                Dedicated to Dr. Leane from Angelo 💖
              </p>
            </div>

            <div style={{
              fontSize: "0.925rem",
              lineHeight: 1.65,
              whiteSpace: "pre-line",
              color: "#3f3f46",
              fontFamily: "'Outfit', sans-serif"
            }}>
              {activeLetter.letterBody}
            </div>

            <div style={{ marginTop: "1.75rem", textAlign: "center" }}>
              <button
                onClick={() => setActiveLetter(null)}
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "9999px",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(236, 72, 153, 0.4)"
                }}
              >
                Keep Striving, Dr. Leane! 🦷💜
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

