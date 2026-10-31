import React, { useState, useEffect } from "react";
import { 
  Sparkles, Heart, Clock, Award, Target, Flame, 
  ArrowRight, BookOpen, CheckCircle2, AlertCircle, RefreshCw,
  TrendingUp, BarChart3, ShieldCheck, PenTool
} from "lucide-react";
import { motivationalQuotes } from "../data/quotes";
import { sound } from "../utils/audio";

export function Dashboard({
  girlfriendName,
  examDate,
  personalMessage,
  questions,
  examHistory,
  flaggedCount,
  streak,
  passingScore,
  onStartMode
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate live countdown
  useEffect(() => {
    function updateCountdown() {
      const target = new Date(examDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [examDate]);

  // Average score
  const avgScore = examHistory.length > 0 
    ? Math.round(examHistory.reduce((acc, curr) => acc + curr.scorePercent, 0) / examHistory.length)
    : 0;

  // Categories breakdown
  const categories = Array.from(new Set(questions.map(q => q.category)));

  const handleNextQuote = () => {
    sound.playClick();
    setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const currentQuote = motivationalQuotes[quoteIndex] || motivationalQuotes[0];

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      
      {/* Hero Welcome & Cheering Card */}
      <div className="glass-panel" style={{
        padding: "2rem",
        marginBottom: "1.75rem",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(236, 72, 153, 0.2)",
        background: "linear-gradient(135deg, rgba(23, 25, 45, 0.9) 0%, rgba(17, 24, 39, 0.95) 100%)"
      }}>
        <div style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ flex: "1 1 500px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-rose">
                <Heart size={12} fill="#ec4899" /> Dedicated Study Space
              </span>
              <span className="badge badge-purple">Future Board Licensed ✨</span>
            </div>

            <h1 style={{ fontSize: "2.1rem", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              Ready to crush today's review, <span style={{
                background: "var(--gradient-love)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>{girlfriendName}</span>?
            </h1>

            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              {personalMessage || "You've worked so hard for this moment. Keep believing in yourself, stay focused, and take it one question at a time. The license is waiting for you! 💖"}
            </p>

            {/* Motivational Quote Box */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              borderLeft: "3px solid var(--accent-rose)",
              padding: "0.85rem 1.25rem",
              borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem"
            }}>
              <div>
                <p style={{ fontStyle: "italic", fontSize: "0.925rem", color: "#f1f5f9" }}>
                  "{currentQuote.quote}"
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--accent-rose)", fontWeight: 600, marginTop: "0.25rem" }}>
                  — {currentQuote.author}
                </p>
              </div>
              <button
                onClick={handleNextQuote}
                title="Next inspirational cheer"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "0.3rem",
                  borderRadius: "50%",
                  transition: "all 0.2s"
                }}
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* Countdown Clock Box */}
          <div style={{
            background: "rgba(10, 14, 23, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "1.5rem 1.75rem",
            borderRadius: "var(--radius-md)",
            minWidth: "280px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", color: "#818cf8", marginBottom: "0.75rem" }}>
              <Clock size={16} />
              <span style={{ fontSize: "0.825rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Target Board Exam
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
              {[
                { val: timeLeft.days, label: "Days" },
                { val: timeLeft.hours, label: "Hours" },
                { val: timeLeft.minutes, label: "Mins" },
                { val: timeLeft.seconds, label: "Secs" }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "0.6rem 0.3rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(255, 255, 255, 0.05)"
                }}>
                  <div className="mono-font" style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>
                    {String(item.val).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.75rem" }}>
              Target: <strong style={{ color: "#ffffff" }}>Nov 22–24, 2026 (DLE Theoretical Phase)</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Metrics Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        marginBottom: "1.75rem"
      }}>
        {/* Total Questions */}
        <div className="glass-panel" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 600 }}>Question Bank</span>
            <div style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(168, 85, 247, 0.15)", color: "#c084fc" }}>
              <BookOpen size={18} />
            </div>
          </div>
          <div className="mono-font" style={{ fontSize: "1.8rem", fontWeight: 800 }}>{questions.length}</div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Across {categories.length} core subject domains</p>
        </div>

        {/* Average Score */}
        <div className="glass-panel" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 600 }}>Avg Mock Score</span>
            <div style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span className="mono-font" style={{ fontSize: "1.8rem", fontWeight: 800 }}>{avgScore}%</span>
            <span className={`badge ${avgScore >= passingScore ? "badge-emerald" : "badge-amber"}`}>
              {avgScore >= passingScore ? "Passing Standard" : `Target ${passingScore}%`}
            </span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Based on {examHistory.length} mock exam sessions</p>
        </div>

        {/* Weakness Count */}
        <div className="glass-panel" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 600 }}>Needs Review</span>
            <div style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
              <Target size={18} />
            </div>
          </div>
          <div className="mono-font" style={{ fontSize: "1.8rem", fontWeight: 800 }}>{flaggedCount}</div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Flagged or missed review questions</p>
        </div>

        {/* Study Streak */}
        <div className="glass-panel" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 600 }}>Study Streak</span>
            <div style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(236, 72, 153, 0.15)", color: "#f472b6" }}>
              <Flame size={18} />
            </div>
          </div>
          <div className="mono-font" style={{ fontSize: "1.8rem", fontWeight: 800 }}>{streak} Days</div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Consistent practice makes a topnotcher!</p>
        </div>
      </div>

      {/* Main Study Modes Grid */}
      <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Choose Your Study Mode</span>
        <Sparkles size={18} color="#ec4899" />
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.25rem",
        marginBottom: "2rem"
      }}>
        {/* LeaneNotes Digital Notebook */}
        <div 
          onClick={() => onStartMode("goodnotes")}
          className="glass-panel" 
          style={{
            padding: "1.75rem",
            cursor: "pointer",
            border: "1px solid rgba(168, 85, 247, 0.35)",
            background: "linear-gradient(145deg, rgba(168, 85, 247, 0.12) 0%, rgba(124, 58, 237, 0.05) 100%)",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.15)"
          }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "var(--gradient-royal)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "0 6px 15px rgba(124, 58, 237, 0.35)"
          }}>
            <PenTool size={24} color="#ffffff" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>LeaneNotes ✍️</h3>
            <span className="badge badge-purple" style={{ fontSize: "0.7rem" }}>Tablet Ready</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Digital GoodNotes replica: Apple Pencil & stylus canvas, Cornell notes, Odontogram tooth charting, and highlighters.
          </p>
          <span style={{ color: "#c084fc", fontWeight: 700, fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            Open Digital Notebook <ArrowRight size={14} />
          </span>
        </div>

        {/* Practice Drill */}
        <div 
          onClick={() => onStartMode("practice")}
          className="glass-panel" 
          style={{
            padding: "1.75rem",
            cursor: "pointer",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            background: "linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(17, 24, 39, 0.95) 100%)"
          }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "var(--gradient-emerald)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "0 6px 15px rgba(16, 185, 129, 0.3)"
          }}>
            <CheckCircle2 size={24} color="#ffffff" />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.4rem" }}>Q&A Practice Drill</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Immediate feedback mode: detailed breakdown of why the right answer is correct and why other choices are wrong.
          </p>
          <span style={{ color: "#34d399", fontWeight: 700, fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            Practice Drill <ArrowRight size={14} />
          </span>
        </div>
        <div 
          onClick={() => onStartMode("mock")}
          className="glass-panel" 
          style={{
            padding: "1.75rem",
            cursor: "pointer",
            border: "1px solid rgba(236, 72, 153, 0.2)",
            background: "linear-gradient(145deg, rgba(236, 72, 153, 0.08) 0%, rgba(17, 24, 39, 0.95) 100%)"
          }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "var(--gradient-love)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "0 6px 15px rgba(236, 72, 153, 0.3)"
          }}>
            <Award size={24} color="#ffffff" />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.4rem" }}>Timed Mock Exam</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Realistic board exam simulation with timer, question navigation grid, flag for review, and pass/fail diagnostics.
          </p>
          <span style={{ color: "#ec4899", fontWeight: 700, fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            Start Simulation <ArrowRight size={14} />
          </span>
        </div>

        {/* Flashcards */}
        <div 
          onClick={() => onStartMode("flashcards")}
          className="glass-panel" 
          style={{
            padding: "1.75rem",
            cursor: "pointer",
            border: "1px solid rgba(168, 85, 247, 0.2)",
            background: "linear-gradient(145deg, rgba(168, 85, 247, 0.08) 0%, rgba(17, 24, 39, 0.95) 100%)"
          }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "0 6px 15px rgba(168, 85, 247, 0.3)"
          }}>
            <BookOpen size={24} color="#ffffff" />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.4rem" }}>3D Flashcard Deck</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Flip-to-reveal cards with spaced-repetition ratings (Again, Hard, Good, Easy) for fast active recall mastery.
          </p>
          <span style={{ color: "#c084fc", fontWeight: 700, fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            Flip Flashcards <ArrowRight size={14} />
          </span>
        </div>

        {/* Weakness Focus */}
        <div 
          onClick={() => onStartMode("weakness")}
          className="glass-panel" 
          style={{
            padding: "1.75rem",
            cursor: "pointer",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            background: "linear-gradient(145deg, rgba(245, 158, 11, 0.08) 0%, rgba(17, 24, 39, 0.95) 100%)"
          }}
        >
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "0 6px 15px rgba(245, 158, 11, 0.3)"
          }}>
            <AlertCircle size={24} color="#ffffff" />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.4rem" }}>Weakness Focus</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Specifically drill missed exam questions and bookmarked topics until your mastery rate reaches 100%.
          </p>
          <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
            Target Weaknesses ({flaggedCount}) <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Subject Domain Breakdown */}
      <div className="glass-panel" style={{ padding: "1.75rem", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <BarChart3 size={18} color="#a855f7" />
          <span>Curriculum Subject Breakdown</span>
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {categories.map((cat, idx) => {
            const count = questions.filter(q => q.category === cat).length;
            const pct = Math.round((count / questions.length) * 100);
            return (
              <div key={idx} style={{
                background: "rgba(255, 255, 255, 0.03)",
                padding: "1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{cat}</span>
                  <span className="mono-font" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{count} items ({pct}%)</span>
                </div>
                <div style={{
                  height: "8px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: "var(--gradient-love)",
                    borderRadius: "4px"
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Exam History */}
      {examHistory.length > 0 && (
        <div className="glass-panel" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={18} color="#10b981" />
            <span>Recent Mock Exam Results</span>
          </h3>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "0.75rem" }}>Date</th>
                  <th style={{ padding: "0.75rem" }}>Questions</th>
                  <th style={{ padding: "0.75rem" }}>Score</th>
                  <th style={{ padding: "0.75rem" }}>Percentage</th>
                  <th style={{ padding: "0.75rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {examHistory.slice(0, 5).map((attempt, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                    <td style={{ padding: "0.75rem" }}>{new Date(attempt.date).toLocaleString()}</td>
                    <td style={{ padding: "0.75rem" }}>{attempt.totalQuestions}</td>
                    <td style={{ padding: "0.75rem" }} className="mono-font">{attempt.correctCount} / {attempt.totalQuestions}</td>
                    <td style={{ padding: "0.75rem" }} className="mono-font">
                      <strong style={{ color: attempt.scorePercent >= passingScore ? "#34d399" : "#fbbf24" }}>
                        {attempt.scorePercent}%
                      </strong>
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <span className={`badge ${attempt.scorePercent >= passingScore ? "badge-emerald" : "badge-amber"}`}>
                        {attempt.scorePercent >= passingScore ? "PASSED 🏆" : "FOR REVIEW"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
