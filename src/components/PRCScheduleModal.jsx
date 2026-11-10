import React, { useState } from "react";
import { 
  X, Calendar, Clock, Award, ShieldAlert, Sparkles, 
  ExternalLink, BookOpen, CheckCircle, Heart, ChevronRight, Info,
  Flame, Moon, Sun, ArrowRight, Activity
} from "lucide-react";
import { PRC_OFFICIAL_PROGRAM, DSP_PRACTICAL_SCHEDULE } from "../data/prcSchedule";
import { sound } from "../utils/audio";

export function PRCScheduleModal({ isOpen, onClose, onNavigateToBook, girlfriendName = "Leane" }) {
  const [scheduleView, setScheduleView] = useState("dsp"); // Default to Dr. Leane's DSP schedule!
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
          maxWidth: "880px",
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
              <span style={{ fontSize: "1.2rem" }}>🩺</span>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#d8b4fe", fontWeight: 700 }}>
                Philippine Dental Licensure Examination • Dr. {girlfriendName}'s Strategy
              </span>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
              {scheduleView === "dsp" ? "Dr. Leane's DSP Practical & Evening DLE Sprint" : "Official PRC DLE 3-Day Program (Nov 22-24)"}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.35rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#f472b6", fontWeight: 700 }}>8am–5pm DSP Practicals</span>
              <span>•</span>
              <span style={{ color: "#fff", fontWeight: 600 }}>6:30pm–10:15pm High-Yield Theory</span>
              <span>•</span>
              <span className="badge badge-purple" style={{ fontSize: "0.72rem" }}>
                12 Days Remaining
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
              transition: "all 0.2s ease"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Top Schedule Mode Toggle */}
        <div style={{
          display: "flex",
          gap: "0.6rem",
          padding: "0.75rem 1.5rem",
          background: "rgba(0, 0, 0, 0.3)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
        }}>
          <button
            onClick={() => {
              sound.playClick();
              setScheduleView("dsp");
            }}
            style={{
              flex: 1,
              padding: "0.65rem 1rem",
              borderRadius: "10px",
              border: scheduleView === "dsp" ? "1px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.08)",
              background: scheduleView === "dsp"
                ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(236, 72, 153, 0.25))"
                : "rgba(255, 255, 255, 0.03)",
              color: scheduleView === "dsp" ? "#fff" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "all 0.15s ease"
            }}
          >
            <span>🩺</span>
            <span>Dr. Leane's DSP Practical Sprint (8am–5pm Practicals)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setScheduleView("prc");
            }}
            style={{
              flex: 1,
              padding: "0.65rem 1rem",
              borderRadius: "10px",
              border: scheduleView === "prc" ? "1px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.08)",
              background: scheduleView === "prc"
                ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(236, 72, 153, 0.25))"
                : "rgba(255, 255, 255, 0.03)",
              color: scheduleView === "prc" ? "#fff" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "all 0.15s ease"
            }}
          >
            <span>🇵🇭</span>
            <span>Official PRC 3-Day Written Program (Nov 22–24)</span>
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

          {scheduleView === "dsp" ? (
            /* ========================================== */
            /* VIEW 1: DR. LEANE'S DSP PRACTICAL SPRINT   */
            /* ========================================== */
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Context Banner */}
              <div style={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1))",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "14px",
                padding: "1.1rem 1.25rem",
                display: "flex",
                gap: "0.85rem",
                alignItems: "flex-start"
              }}>
                <Heart size={24} style={{ color: "#ec4899", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ margin: "0 0 0.3rem", fontSize: "0.95rem", color: "#fff", fontWeight: 700 }}>
                    Tailored for Dr. Leane's DSP Practical School Reality
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.82rem", lineHeight: 1.5, color: "var(--text-secondary)" }}>
                    You are working with your hands from 8:00 AM to 5:00 PM at DSP every day prepping typodonts and mastering clinical procedures. You do <strong>not</strong> need to worry about theory during the day! Theoretical mastery is concentrated into a sharp, focused 3.5-hour evening routine (6:30 PM – 10:15 PM) so you never burn out.
                  </p>
                </div>
              </div>

              {/* Daily Evening Schedule Timeline */}
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>⏰</span>
                  <span>Daily Routine: DSP Hands-On + Evening DLE Sprint</span>
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {DSP_PRACTICAL_SCHEDULE.dailyRoutine.map((item, idx) => (
                    <div 
                      key={idx}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderLeft: `4px solid ${item.color}`,
                        borderRadius: "12px",
                        padding: "0.85rem 1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1rem"
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                          <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>
                            {item.label}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                          {item.details}
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: item.color }}>
                          {item.time}
                        </span>
                        <span style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "6px",
                          background: "rgba(0, 0, 0, 0.3)",
                          color: "var(--text-muted)"
                        }}>
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12-Day Countdown Target Board */}
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>🗓️</span>
                  <span>12-Day Subject Sprint (Leading to Nov 22)</span>
                </h3>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "0.65rem"
                }}>
                  {DSP_PRACTICAL_SCHEDULE.twelveDayCountdown.map((dayItem, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(0, 0, 0, 0.25)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: "12px",
                        padding: "0.85rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          color: "#a855f7",
                          background: "rgba(168, 85, 247, 0.15)",
                          padding: "2px 6px",
                          borderRadius: "4px"
                        }}>
                          Day {dayItem.day}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {dayItem.date}
                        </span>
                      </div>

                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
                        {dayItem.subject}
                      </div>

                      <div style={{ fontSize: "0.75rem", color: "#f472b6", fontWeight: 600 }}>
                        🎯 {dayItem.questions}
                      </div>

                      <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.35, marginTop: "2px" }}>
                        {dayItem.focus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ========================================== */
            /* VIEW 2: OFFICIAL PRC 3-DAY PROGRAM         */
            /* ========================================== */
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
                borderRadius: "14px",
                padding: "1rem 1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem"
              }}>
                <div>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "#f472b6", fontWeight: 700 }}>
                    Official PRC Program • {currentDay.dateString}
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: "0.2rem 0 0" }}>
                    {currentDay.dayTitle}
                  </h3>
                </div>

                <div style={{
                  background: "rgba(168, 85, 247, 0.2)",
                  border: "1px solid rgba(168, 85, 247, 0.4)",
                  padding: "0.5rem 0.85rem",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <Award size={18} style={{ color: "#d8b4fe" }} />
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>PRC Weight</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>{currentDay.totalDayWeight}% GWA</div>
                  </div>
                </div>
              </div>

              {/* Examination Slots List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {currentDay.slots.map((slot, sIdx) => {
                  const isInstructions = slot.weight === 0;
                  return (
                    <div 
                      key={sIdx}
                      style={{
                        background: isInstructions ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.03)",
                        border: isInstructions ? "1px dashed rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "14px",
                        padding: "1.1rem 1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                            <span style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#f472b6",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.3rem"
                            }}>
                              <Clock size={13} /> {slot.time}
                            </span>
                            {!isInstructions && (
                              <span style={{
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                background: "rgba(16, 185, 129, 0.15)",
                                color: "#10b981",
                                border: "1px solid rgba(16, 185, 129, 0.3)",
                                padding: "1px 6px",
                                borderRadius: "6px"
                              }}>
                                {slot.weight}% Weight
                              </span>
                            )}
                          </div>
                          <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                            {slot.subject}
                          </h4>
                        </div>
                      </div>

                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.45 }}>
                        {slot.description}
                      </p>

                      {/* Linked DMF Book Chapters */}
                      {slot.dmfChapters && slot.dmfChapters.length > 0 && (
                        <div style={{
                          marginTop: "0.4rem",
                          paddingTop: "0.6rem",
                          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.35rem"
                        }}>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>
                            📖 Matching DMF Reviewer Book Chapters:
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                            {slot.dmfChapters.map((chap, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={() => {
                                  sound.playClick();
                                  if (onNavigateToBook) {
                                    onNavigateToBook(chap.startPage);
                                    onClose();
                                  }
                                }}
                                style={{
                                  background: "rgba(168, 85, 247, 0.12)",
                                  border: "1px solid rgba(168, 85, 247, 0.3)",
                                  color: "#d8b4fe",
                                  padding: "0.3rem 0.6rem",
                                  borderRadius: "8px",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.35rem",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                <span>{chap.title} ({chap.pages})</span>
                                <ExternalLink size={12} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(0, 0, 0, 0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            PRC Passing Benchmark: <strong style={{ color: "#fff" }}>75.0% GWA</strong> with no subject below <strong style={{ color: "#fff" }}>50.0%</strong>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn btn-primary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", fontWeight: 700 }}
          >
            Got it, Let's Review! ✨
          </button>
        </div>
      </div>
    </div>
  );
}
