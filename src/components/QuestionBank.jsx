import { RationaleBreakdown } from "./RationaleBreakdown";
import React, { useState } from "react";
import { 
  Plus, Search, Download, Upload, Trash2, 
  BookOpen, Filter, CheckCircle2, RotateCcw, X 
} from "lucide-react";
import { sound } from "../utils/audio";

export function QuestionBank({
  questions, onAddQuestion, onDeleteQuestion, onImportQuestions, onResetQuestions 
}) {
  const [expandedRationales, setExpandedRationales] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [newCat, setNewCat] = useState("Diagnostic & Clinical Thinking");
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrect, setNewCorrect] = useState(0);
  const [newExplanation, setNewExplanation] = useState("");
  const [newTakeaway, setNewTakeaway] = useState("");
  const [newDiff, setNewDiff] = useState("Medium");

  const categories = ["All", ...Array.from(new Set(questions.map(q => q.category)))];
  const toggleRationale = (id) => {
    setExpandedRationales(prev => ({ ...prev, [id]: !prev[id] }));
  };


  const filtered = questions.filter(q => {
    const matchesCat = selectedCategory === "All" || q.category === selectedCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.options.some(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleExport = () => {
    sound.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "passboard_questions_bank.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          onImportQuestions(parsed);
          sound.playSuccess();
          alert(`Successfully imported ${parsed.length} questions!`);
        }
      } catch (err) {
        sound.playError();
        alert("Failed to parse JSON file. Please ensure it is a valid questions array.");
      }
    };
    reader.readAsText(file);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || newOptions.some(opt => !opt.trim())) {
      alert("Please fill out the question and all four options.");
      return;
    }

    const created = {
      id: "q-" + Date.now(),
      category: newCat.trim(),
      question: newQuestion.trim(),
      options: newOptions.map(opt => opt.trim()),
      correctIndex: Number(newCorrect),
      explanation: newExplanation.trim() || "No detailed explanation provided.",
      keyTakeaway: newTakeaway.trim() || "Focus on foundational board principles.",
      difficulty: newDiff
    };

    onAddQuestion(created);
    sound.playSuccess();
    setIsAddModalOpen(false);

    // Reset form
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewExplanation("");
    setNewTakeaway("");
  };

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 1rem 4rem" }}>
      
      {/* Header Bar */}
      <div className="glass-panel" style={{
        padding: "1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
            Curriculum Question Bank
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
            Manage, customize, export, or add questions specifically tailored for her board exam syllabus.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
            <Plus size={16} /> Add New Question
          </button>

          <button onClick={handleExport} className="btn btn-secondary">
            <Download size={16} /> Export JSON
          </button>

          <label className="btn btn-secondary" style={{ cursor: "pointer" }}>
            <Upload size={16} /> Import JSON
            <input type="file" accept=".json" onChange={handleImportFile} style={{ display: "none" }} />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px", position: "relative" }}>
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by keyword or topic..."
            style={{
              width: "100%",
              padding: "0.85rem 1rem 0.85rem 2.8rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              color: "#ffffff",
              fontSize: "0.95rem"
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              color: "#ffffff",
              fontSize: "0.9rem"
            }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat} style={{ background: "#111827", color: "#ffffff" }}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filtered.map((q, idx) => (
          <div key={q.id} className="glass-panel" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="badge badge-purple">{q.category}</span>
                <span className="badge badge-rose">{q.difficulty}</span>
              </div>

              <button
                onClick={() => {
                  if (confirm("Delete this question from the bank?")) {
                    onDeleteQuestion(q.id);
                  }
                }}
                className="btn btn-outline-danger"
                style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem" }}
              >
                <Trash2 size={14} />
              </button>
            </div>

            <p style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.85rem", lineHeight: 1.5 }}>
              {q.question}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.4rem", marginBottom: "0.75rem" }}>
              {q.options.map((opt, optIdx) => (
                <div
                  key={optIdx}
                  style={{
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: optIdx === q.correctIndex ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.02)",
                    border: optIdx === q.correctIndex ? "1px solid #10b981" : "1px solid var(--border-color)",
                    color: optIdx === q.correctIndex ? "#34d399" : "var(--text-secondary)",
                    fontSize: "0.85rem"
                  }}
                >
                  <strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                <strong style={{ color: "var(--text-secondary)" }}>Key Takeaway:</strong> {q.keyTakeaway}
              </p>
              <button
                onClick={() => toggleRationale(q.id)}
                className="btn btn-secondary"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}
              >
                {expandedRationales[q.id] ? "Hide Rationale" : "📖 Full Rationale & Distractor Breakdown"}
              </button>
            </div>

            {expandedRationales[q.id] && (
              <RationaleBreakdown question={q} isCorrect={null} />
            )}
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {isAddModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div className="glass-panel" style={{
            maxWidth: "650px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "2rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>Add Question to Bank</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Category / Subject Domain</label>
                <input
                  type="text"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  placeholder="e.g. Pharmacology, Structural Analysis, Auditing"
                  required
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Question Scenario</label>
                <textarea
                  rows={3}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Enter the full question or case scenario..."
                  required
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff" }}
                />
              </div>

              {/* 4 Options */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Multiple Choice Options</label>
                {newOptions.map((opt, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 700, width: "20px" }}>{String.fromCharCode(65 + idx)}.</span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const next = [...newOptions];
                        next[idx] = e.target.value;
                        setNewOptions(next);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      required
                      style={{ flex: 1, padding: "0.6rem 0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff" }}
                    />
                    <label style={{ fontSize: "0.8rem", color: newCorrect === idx ? "#34d399" : "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={newCorrect === idx}
                        onChange={() => setNewCorrect(idx)}
                      />
                      Correct
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Explanation & Rationale</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Why is the chosen answer correct?"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.3rem" }}>Key Takeaway / Memory Mnemonic</label>
                <input
                  type="text"
                  value={newTakeaway}
                  onChange={(e) => setNewTakeaway(e.target.value)}
                  placeholder="Short, punchy rule of thumb"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
