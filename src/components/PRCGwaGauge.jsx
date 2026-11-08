import React from "react";
import { ShieldCheck, TrendingUp, AlertTriangle, Sparkles, ArrowRight, Award, Calendar } from "lucide-react";
import { calculatePRCGwa } from "../data/prcSchedule";

export function PRCGwaGauge({ examHistory = [], onSimulateDay, girlfriendName = "Leane", onOpenSchedule }) {
  const stats = calculatePRCGwa(examHistory);

  return (
    <div className="glass-panel" style={{
      padding: "1.75rem",
      marginBottom: "1.75rem",
      borderRadius: "16px",
      border: "1px solid rgba(168, 85, 247, 0.35)",
      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>🇵🇭</span>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800 }}>PRC Official GWA Passing Predictor</h3>
            <Sparkles size={16} color="#c084fc" />
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            Calculated under official PRC Board Program: Day 1 (40%), Day 2 (30%), Day 3 (30%). Passing cutoff: 75.0%
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          {onOpenSchedule && (
            <button
              onClick={onOpenSchedule}
              className="btn btn-secondary"
              style={{
                padding: "0.4rem 0.85rem",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                borderRadius: "9999px",
                border: "1px solid rgba(168, 85, 247, 0.4)"
              }}
            >
              <Calendar size={14} color="#c084fc" />
              <span>Official PRC Schedule 📋</span>
            </button>
          )}

          {/* Live GWA Indicator Pill */}
          <div style={{
            background: stats.isPassing ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
            border: stats.isPassing ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(245, 158, 11, 0.4)",
            padding: "0.4rem 1rem",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            fontWeight: 800,
            fontSize: "0.85rem",
            color: stats.isPassing ? "#10b981" : "#f59e0b"
          }}>
            {stats.isPassing ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
            <span>{stats.gwa >= 85 ? "TOPNOTCHER PACE (85%+) 🌟" : stats.isPassing ? "PROJECTED PASSER 🏆" : "TARGETING 75% BENCHMARK"}</span>
          </div>
        </div>
      </div>

      {/* Main Gauge & Days Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        alignItems: "center"
      }}>
        {/* Overall GWA Card */}
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid var(--border-color)",
          borderRadius: "14px",
          padding: "1.25rem",
          textAlign: "center"
        }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
            Projected GWA
          </span>
          <div className="mono-font" style={{
            fontSize: "2.6rem",
            fontWeight: 900,
            color: stats.gwa >= 75 ? "#10b981" : "#f59e0b",
            margin: "0.2rem 0"
          }}>
            {stats.gwa}%
          </div>
          <div style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: stats.safetyBuffer >= 0 ? "#10b981" : "#ef4444"
          }}>
            {stats.safetyBuffer >= 0 ? `+${stats.safetyBuffer}% Safety Buffer` : `${stats.safetyBuffer}% Below Passing`}
          </div>
        </div>

        {/* Day 1 Card */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>Day 1: Basic & Resto</span>
              <span style={{ fontSize: "0.7rem", color: "#a855f7", fontWeight: 800 }}>40% weight</span>
            </div>
            <div className="mono-font" style={{ fontSize: "1.5rem", fontWeight: 800, color: stats.day1Score >= 75 ? "#10b981" : "#f59e0b", marginTop: "0.3rem" }}>
              {stats.day1Score}%
            </div>
          </div>
          {onSimulateDay && (
            <button
              onClick={() => onSimulateDay("day1")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent-purple)",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.25rem 0",
                marginTop: "0.5rem"
              }}
            >
              Simulate Day 1 <ArrowRight size={12} />
            </button>
          )}
        </div>

        {/* Day 2 Card */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>Day 2: Clinical & Surgery</span>
              <span style={{ fontSize: "0.7rem", color: "#a855f7", fontWeight: 800 }}>30% weight</span>
            </div>
            <div className="mono-font" style={{ fontSize: "1.5rem", fontWeight: 800, color: stats.day2Score >= 75 ? "#10b981" : "#f59e0b", marginTop: "0.3rem" }}>
              {stats.day2Score}%
            </div>
          </div>
          {onSimulateDay && (
            <button
              onClick={() => onSimulateDay("day2")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent-purple)",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.25rem 0",
                marginTop: "0.5rem"
              }}
            >
              Simulate Day 2 <ArrowRight size={12} />
            </button>
          )}
        </div>

        {/* Day 3 Card */}
        <div style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)" }}>Day 3: Specialties & Ethics</span>
              <span style={{ fontSize: "0.7rem", color: "#a855f7", fontWeight: 800 }}>30% weight</span>
            </div>
            <div className="mono-font" style={{ fontSize: "1.5rem", fontWeight: 800, color: stats.day3Score >= 75 ? "#10b981" : "#f59e0b", marginTop: "0.3rem" }}>
              {stats.day3Score}%
            </div>
          </div>
          {onSimulateDay && (
            <button
              onClick={() => onSimulateDay("day3")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent-purple)",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.25rem 0",
                marginTop: "0.5rem"
              }}
            >
              Simulate Day 3 <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

