import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Headphones, Coffee, X, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { sound } from "../utils/audio";

export function StudyStation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("study"); // 'study' (25m) | 'break' (5m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSound, setActiveSound] = useState("none"); // 'none' | 'rain' | 'brown' | 'waves'
  const [volume, setVolume] = useState(0.5);

  // Web Audio Refs
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Timer countdown
  useEffect(() => {
    if (isRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            sound.playSuccess();
            const nextMode = mode === "study" ? "break" : "study";
            setMode(nextMode);
            return nextMode === "study" ? 25 * 60 : 5 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isRunning, mode]);

  // Handle Mode Switch
  const handleSwitchMode = (newMode) => {
    sound.playClick();
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === "study" ? 25 * 60 : 5 * 60);
  };

  // Reset Timer
  const handleReset = () => {
    sound.playClick();
    setIsRunning(false);
    setTimeLeft(mode === "study" ? 25 * 60 : 5 * 60);
  };

  // Web Audio Synthesizer
  const stopAmbientAudio = () => {
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
      } catch (e) {}
      noiseSourceRef.current = null;
    }
  };

  const playAmbientAudio = (soundType) => {
    stopAmbientAudio();
    if (soundType === "none") return;

    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Master Gain
    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.connect(ctx.destination);
    }
    gainNodeRef.current.gain.setValueAtTime(volume * 0.25, ctx.currentTime);

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    if (soundType === "brown" || soundType === "waves") {
      // Brown noise generator
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    } else {
      // Pink / Rain noise generator
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filters for realism
    const filter = ctx.createBiquadFilter();
    if (soundType === "rain") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
    } else if (soundType === "brown") {
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, ctx.currentTime);
    } else if (soundType === "waves") {
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
    }

    whiteNoise.connect(filter);
    filter.connect(gainNodeRef.current);
    whiteNoise.start();
    noiseSourceRef.current = whiteNoise;
  };

  // Sound change handler
  const handleSelectSound = (type) => {
    setActiveSound(type);
    playAmbientAudio(type);
  };

  // Volume slider
  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.25, audioCtxRef.current.currentTime);
    }
  };

  // Format mm:ss
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeFormatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div style={{
      position: "fixed",
      bottom: "1.25rem",
      right: "1.25rem",
      zIndex: 180,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    }}>
      {/* Expanded Study Station Dock */}
      {isOpen && (
        <div className="glass-panel" style={{
          width: "300px",
          padding: "1.25rem",
          marginBottom: "0.6rem",
          borderRadius: "16px",
          border: "1px solid rgba(168, 85, 247, 0.35)",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
          animation: "slideUpToast 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Coffee size={16} color="#ec4899" />
              <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>Pomodoro & Ambient Beats</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Mode Selector */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.3rem",
            background: "rgba(255, 255, 255, 0.05)",
            padding: "0.25rem",
            borderRadius: "10px",
            marginBottom: "0.85rem"
          }}>
            <button
              onClick={() => handleSwitchMode("study")}
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "0.35rem",
                fontWeight: 700,
                fontSize: "0.78rem",
                cursor: "pointer",
                background: mode === "study" ? "var(--gradient-love)" : "transparent",
                color: mode === "study" ? "#fff" : "var(--text-secondary)"
              }}
            >
              Study 25m
            </button>
            <button
              onClick={() => handleSwitchMode("break")}
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "0.35rem",
                fontWeight: 700,
                fontSize: "0.78rem",
                cursor: "pointer",
                background: mode === "break" ? "var(--gradient-emerald)" : "transparent",
                color: mode === "break" ? "#fff" : "var(--text-secondary)"
              }}
            >
              Break 5m
            </button>
          </div>

          {/* Big Digital Timer Display */}
          <div style={{ textAlign: "center", margin: "0.5rem 0 0.85rem" }}>
            <div className="mono-font" style={{
              fontSize: "2.4rem",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: mode === "study" ? "#c084fc" : "#34d399"
            }}>
              {timeFormatted}
            </div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
              {mode === "study" ? "🎯 Deep Review Focus" : "☕ Rest Your Eyes & Hydrate"}
            </span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <button
              onClick={() => {
                sound.playClick();
                setIsRunning(!isRunning);
              }}
              className="btn btn-primary"
              style={{
                padding: "0.45rem 1.25rem",
                fontSize: "0.825rem",
                background: isRunning ? "rgba(239, 68, 68, 0.8)" : "var(--gradient-love)"
              }}
            >
              {isRunning ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Start</>}
            </button>

            <button
              onClick={handleReset}
              className="btn btn-outline"
              style={{ padding: "0.45rem 0.75rem", fontSize: "0.825rem" }}
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Ambient Sound Selection */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                Offline Ambient Sound
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {activeSound !== "none" ? "Playing 🎧" : "Off"}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.3rem", marginBottom: "0.6rem" }}>
              {[
                { id: "none", label: "Mute", icon: "🔇" },
                { id: "rain", label: "Rain", icon: "🌧️" },
                { id: "brown", label: "Brown", icon: "🎧" },
                { id: "waves", label: "Waves", icon: "🌊" }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSound(s.id)}
                  style={{
                    padding: "0.35rem 0.2rem",
                    borderRadius: "8px",
                    border: activeSound === s.id ? "1px solid #c084fc" : "1px solid rgba(255,255,255,0.06)",
                    background: activeSound === s.id ? "rgba(168, 85, 247, 0.2)" : "rgba(255,255,255,0.03)",
                    color: activeSound === s.id ? "#fff" : "var(--text-muted)",
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    textAlign: "center"
                  }}
                >
                  <div>{s.icon}</div>
                  <div>{s.label}</div>
                </button>
              ))}
            </div>

            {/* Volume slider */}
            {activeSound !== "none" && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Volume2 size={13} color="var(--text-muted)" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-purple)", height: "4px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        title="Open Pomodoro Study Timer & Ambient Noise"
        style={{
          background: isRunning ? "var(--gradient-love)" : "rgba(23, 25, 45, 0.9)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          backdropFilter: "blur(12px)",
          color: "#fff",
          padding: "0.45rem 0.9rem",
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          fontWeight: 700,
          fontSize: "0.8rem",
          cursor: "pointer",
          boxShadow: isRunning ? "0 0 20px rgba(236, 72, 153, 0.5)" : "0 8px 20px rgba(0, 0, 0, 0.4)",
          transition: "all 0.2s ease"
        }}
      >
        <span>{isRunning ? "⏱️" : "🎧"}</span>
        <span className="mono-font">{timeFormatted}</span>
        {activeSound !== "none" && <span>• 🌧️</span>}
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
}
