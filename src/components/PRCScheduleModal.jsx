import React, { useState } from "react";
import { 
  X, Calendar, Clock, Award, ShieldAlert, Sparkles, 
  ExternalLink, BookOpen, CheckCircle, Heart, ChevronRight, Info
} from "lucide-react";
import { PRC_OFFICIAL_PROGRAM } from "../data/prcSchedule";
import { sound } from "../utils/audio";

export function PRCScheduleModal({ isOpen, onClose, onNavigateToBook, girlfriendName = "Leane" }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  if (!isOpen) return null;

  const currentDay = PRC_OFFICIAL_PROGRAM.days[activeDayIndex];

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(10, 5, 20, 0.85)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div 
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "850px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          background: "linear-gradient(135deg, rgba(22, 14, 38, 0.98), rgba(16, 10, 28, 0.98))",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(168, 85, 247, 0.2)",
          overflow: "hidden"
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1))"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "1.2rem" }}>🇵🇭</span>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#d8b4fe", fontWeight: 700 }}>
                Republic of the Philippines • PRC Manila
              </span>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
              Official Dentists Licensure Examination (DLE) Program
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.35rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#f472b6", fontWeight: 700 }}>Written Phase</span>
              <span>•</span>
              <span style={{ color: "#fff", fontWeight: 600 }}>November 22, 23 and 24, 2026</span>
              <span>•</span>
              <span className="badge badge-purple" style={{ fontSize: "0.72rem" }}>
                Dr. {girlfriendName}'s Battle Plan
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--border-color)",
              color: "var(--text-muted)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s ease"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          padding: "1.5rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem"
        }}>

          {/* Day Navigation Tabs */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.6rem",
            background: "rgba(0, 0, 0, 0.3)",
            padding: "0.4rem",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.06)"
          }}>
            {PRC_OFFICIAL_PROGRAM.days.map((day, idx) => {
              const isSelected = idx === activeDayIndex;
              return (
                <button
                  key={day.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveDayIndex(idx);
                  }}
                  style={{
                    padding: "0.75rem 0.5rem",
                    borderRadius: "10px",
                    border: isSelected ? "1px solid var(--accent-primary)" : "1px solid transparent",
                    background: isSelected 
                      ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(236, 72, 153, 0.25))" 
                      : "transparent",
                    color: isSelected ? "#fff" : "var(--text-secondary)",
                    cursor: "pointer",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.2rem",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 800 }}>
                    <span>{day.icon}</span>
                    <span>Day {day.dayNumber}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: isSelected ? "#fbcfe8" : "var(--text-muted)" }}>
                    {day.shortDate}
                  </div>
                  <div style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: isSelected ? "#10b981" : "#a855f7",
                    background: "rgba(0,0,0,0.25)",
                    padding: "2px 8px",
                    borderRadius: "8px",
                    marginTop: "2px"
                  }}>
                    {day.totalDayWeight}% of Total GWA
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Day Header Banner */}
          <div style={{
            background: "rgba(168, 85, 247, 0.08)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            borderRadius: "12px",
            padding: "0.9rem 1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem"
          }}>
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--accent-purple)", fontWeight: 700 }}>
                {currentDay.dateString}
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", marginTop: "2px" }}>
                {currentDay.dayTitle}
              </div>
            </div>
            <div style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#10b981",
              padding: "0.35rem 0.85rem",
              borderRadius: "20px",
              fontSize: "0.82rem",
              fontWeight: 800
            }}>
              Total Weight: {currentDay.totalDayWeight}%
            </div>
          </div>

          {/* Time Slots Breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {currentDay.slots.map((slot, sIdx) => {
              const isOrientation = slot.weight === 0;
              return (
                <div 
                  key={sIdx}
                  style={{
                    background: isOrientation ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.04)",
                    border: isOrientation ? "1px dashed rgba(255, 255, 255, 0.15)" : "1px solid rgba(168, 85, 247, 0.2)",
                    borderRadius: "12px",
                    padding: "1.1rem 1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{
                        background: "rgba(168, 85, 247, 0.2)",
                        border: "1px solid rgba(168, 85, 247, 0.4)",
                        color: "#d8b4fe",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem"
                      }}>
                        <Clock size={12} />
                        {slot.time}
                      </span>
                      {slot.weight > 0 && (
                        <span style={{
                          background: "rgba(236, 72, 153, 0.2)",
                          border: "1px solid rgba(236, 72, 153, 0.4)",
                          color: "#f472b6",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 800
                        }}>
                          {slot.weight}% Weight
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", margin: "0 0 0.3rem" }}>
                      {slot.subject}
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                      {slot.description}
                    </p>
                  </div>

                  {/* Corresponding DMF Book Chapters & Jump Shortcut */}
                  {slot.dmfChapters && slot.dmfChapters.length > 0 && (
                    <div style={{
                      marginTop: "0.3rem",
                      paddingTop: "0.6rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.5rem"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700 }}>
                          DMF REVIEWER SOURCE:
                        </span>
                        {slot.dmfChapters.map((chap, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => {
                              sound.playClick();
                              onClose();
                              if (onNavigateToBook) onNavigateToBook(chap.startPage);
                            }}
                            title={`Open ${chap.title} (${chap.pages}) in Reviewer Book`}
                            style={{
                              background: "rgba(168, 85, 247, 0.15)",
                              border: "1px solid rgba(168, 85, 247, 0.3)",
                              color: "#e9d5ff",
                              borderRadius: "8px",
                              padding: "0.25rem 0.6rem",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              transition: "all 0.15s ease"
                            }}
                          >
                            <BookOpen size={12} color="#c084fc" />
                            <span>{chap.title}</span>
                            <span style={{ opacity: 0.7, fontSize: "0.7rem" }}>({chap.pages})</span>
                            <ChevronRight size={12} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Official PRC Guidelines & Rules Card */}
          <div style={{
            background: "rgba(245, 158, 11, 0.06)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: "14px",
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "#fbbf24", fontWeight: 700, fontSize: "0.85rem" }}>
              <ShieldAlert size={16} />
              <span>Official PRC General Instructions (Must Know!):</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.8rem", color: "#fef3c7", lineHeight: 1.6 }}>
              {PRC_OFFICIAL_PROGRAM.generalInstructions.map((inst, iIdx) => (
                <li key={iIdx} style={{ marginBottom: "0.3rem" }}>
                  {inst}
                </li>
              ))}
              <li style={{ color: "#d8b4fe" }}>
                <strong>Essential Items:</strong> Notice of Admission (NOA), Official Receipt, No. 2 Pencils, Black Ballpens, 1 piece long brown envelope, 1 piece long transparent plastic envelope.
              </li>
            </ul>
          </div>

          {/* Angelo's Romantic & Encouraging Note */}
          <div style={{
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(168, 85, 247, 0.12))",
            border: "1px dashed rgba(236, 72, 153, 0.4)",
            borderRadius: "14px",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem"
          }}>
            <Heart size={24} color="#ec4899" fill="#ec4899" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: "0.85rem", color: "#fbcfe8", lineHeight: 1.5 }}>
              <span style={{ fontWeight: 800 }}>Angelo's Note for Dr. Leane: </span>
              "Babygirl, look at this schedule: exactly three days to prove what you already know. Day 1 (40%) is in your hands with all our anatomy, pathology, and restorative drills. By Tuesday, November 24 at 4:00 PM, you will step out of that testing room with your head held high as Doctor Leane. I believe in you with all my heart! ❤️🦷✨"
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          background: "rgba(0, 0, 0, 0.2)"
        }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Passing benchmark: <strong style={{ color: "#10b981" }}>75.0% Overall GWA</strong> • Minimum <strong style={{ color: "#f59e0b" }}>50.0%</strong> per subject
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn btn-primary"
            style={{ padding: "0.5rem 1.5rem", fontSize: "0.85rem" }}
          >
            Got it, Let's Review! ✨
          </button>
        </div>

      </div>
    </div>
  );
}
