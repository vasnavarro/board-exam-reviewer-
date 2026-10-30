import React, { useState, useEffect, useRef } from "react";
import { 
  PenTool, Highlighter, Eraser, Square, Circle, Minus, 
  ArrowRight, Undo2, Redo2, Download, Trash2, Plus, 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  FileText, Sparkles, Heart, Palette, Type, Check, 
  BookOpen, Eye, HelpCircle, Layers, Compass
} from "lucide-react";
import { sound } from "../utils/audio";

// Paper Templates definition
const TEMPLATES = [
  { id: "lined", label: "Ruled Lines", icon: "📝" },
  { id: "dotted", label: "Dotted Grid", icon: "⚬" },
  { id: "grid", label: "Graph Grid", icon: "▦" },
  { id: "cornell", label: "Cornell Notes", icon: "📐" },
  { id: "odontogram", label: "Dental Chart 🦷", icon: "🦷" },
  { id: "blank", label: "Blank Paper", icon: "📄" },
];

// Color palette presets
const PALETTE = [
  { name: "Royal Purple", color: "#7c3aed" },
  { name: "Aesthetic Lilac", color: "#a855f7" },
  { name: "Pastel Lavender", color: "#c084fc" },
  { name: "Soft Rose", color: "#ec4899" },
  { name: "Dental Cyan", color: "#06b6d4" },
  { name: "Emerald Mint", color: "#10b981" },
  { name: "Amber Gold", color: "#f59e0b" },
  { name: "Deep Ink", color: "#1e1b4b" },
  { name: "Chalk White", color: "#ffffff" },
];

const INITIAL_NOTEBOOKS = [
  {
    id: "nb-1",
    title: "🦷 Restorative & Operative Dentistry",
    cover: "#7c3aed",
    template: "cornell",
    pages: [""]
  },
  {
    id: "nb-2",
    title: "💊 Dental Pharmacology & Local Anesthesia",
    cover: "#a855f7",
    template: "lined",
    pages: [""]
  },
  {
    id: "nb-3",
    title: "📐 Odontogram Drills & Cavity Preps",
    cover: "#06b6d4",
    template: "odontogram",
    pages: [""]
  },
  {
    id: "nb-4",
    title: "💜 Angelo's Love Notes & Study Reminders",
    cover: "#ec4899",
    template: "dotted",
    pages: [""]
  }
];

export function GoodNotes({ girlfriendName, theme = "dark" }) {
  // Notebook management state
  const [notebooks, setNotebooks] = useState(() => {
    try {
      const saved = localStorage.getItem("leane_notes_notebooks");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_NOTEBOOKS;
  });

  const [currentNbId, setCurrentNbId] = useState(() => {
    return localStorage.getItem("leane_notes_cur_nb") || notebooks[0]?.id || "nb-1";
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // Active Notebook
  const activeNotebook = notebooks.find(n => n.id === currentNbId) || notebooks[0];

  // Tool state
  const [activeTool, setActiveTool] = useState("pen"); // 'pen' | 'fountain' | 'highlighter' | 'eraser' | 'line' | 'arrow' | 'rect' | 'circle'
  const [penColor, setPenColor] = useState("#a855f7");
  const [highlighterColor, setHighlighterColor] = useState("#c084fc");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [paperTemplate, setPaperTemplate] = useState(activeNotebook?.template || "lined");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stickyNotes, setStickyNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(`leane_sticky_${currentNbId}_${currentPageIndex}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Canvas Refs
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Sync active notebook template
  useEffect(() => {
    if (activeNotebook?.template) {
      setPaperTemplate(activeNotebook.template);
    }
  }, [currentNbId]);

  // Load sticky notes for page
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`leane_sticky_${currentNbId}_${currentPageIndex}`);
      setStickyNotes(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setStickyNotes([]);
    }
  }, [currentNbId, currentPageIndex]);

  // Save sticky notes
  const saveStickyNotes = (notes) => {
    setStickyNotes(notes);
    localStorage.setItem(`leane_sticky_${currentNbId}_${currentPageIndex}`, JSON.stringify(notes));
  };

  // Add a new sticky note
  const handleAddStickyNote = () => {
    sound.playClick();
    const newNote = {
      id: Date.now(),
      text: "💡 Board Exam Pearl: ",
      x: 60 + Math.random() * 80,
      y: 80 + Math.random() * 80,
      color: "#fef08a"
    };
    const updated = [...stickyNotes, newNote];
    saveStickyNotes(updated);
  };

  // Canvas Size Initialization & Redraw
  const initCanvasSize = () => {
    const canvas = canvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !bgCanvas || !container) return;

    const width = Math.min(1080, container.clientWidth - 32);
    const height = Math.max(760, Math.round(width * 1.35)); // A4 / Tablet aspect ratio

    const dpr = window.devicePixelRatio || 1;

    // Set display size
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    bgCanvas.style.width = `${width}px`;
    bgCanvas.style.height = `${height}px`;

    // Only resize actual buffer if changed
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      // Save current drawings
      const tempImg = canvas.toDataURL();

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      bgCanvas.width = width * dpr;
      bgCanvas.height = height * dpr;

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      const bgCtx = bgCanvas.getContext("2d");
      bgCtx.scale(dpr, dpr);

      // Restore drawing
      if (tempImg && tempImg.length > 50) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          saveState();
        };
        img.src = tempImg;
      }
    }

    renderPaperTemplate(width, height);
  };

  // Render Background Paper Template
  const renderPaperTemplate = (width, height) => {
    const bgCanvas = bgCanvasRef.current;
    if (!bgCanvas) return;
    const ctx = bgCanvas.getContext("2d");
    const isDark = theme === "dark";

    ctx.clearRect(0, 0, width, height);

    // Paper Base
    ctx.fillStyle = isDark ? "#120a22" : "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const lineColor = isDark ? "rgba(168, 85, 247, 0.18)" : "rgba(147, 51, 234, 0.16)";
    const highlightLine = isDark ? "rgba(236, 72, 153, 0.45)" : "rgba(236, 72, 153, 0.55)";

    if (paperTemplate === "lined") {
      // Top header space
      const lineSpacing = 32;
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;

      // Red/Rose left margin
      ctx.strokeStyle = highlightLine;
      ctx.beginPath();
      ctx.moveTo(70, 0);
      ctx.lineTo(70, height);
      ctx.stroke();

      // Horizontal lines
      ctx.strokeStyle = lineColor;
      for (let y = 80; y < height - 20; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(30, y);
        ctx.lineTo(width - 30, y);
        ctx.stroke();
      }
    } else if (paperTemplate === "dotted") {
      const dotSpacing = 28;
      ctx.fillStyle = isDark ? "rgba(192, 132, 252, 0.35)" : "rgba(124, 58, 237, 0.3)";
      for (let x = 36; x < width - 20; x += dotSpacing) {
        for (let y = 36; y < height - 20; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (paperTemplate === "grid") {
      const gridSize = 24;
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = lineColor;
      ctx.beginPath();
      for (let x = 24; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 24; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    } else if (paperTemplate === "cornell") {
      // Cornell Template: Cue column (left 28%), Notes (right 72%), Summary (bottom 120px)
      const cueWidth = Math.round(width * 0.28);
      const summaryY = height - 120;

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isDark ? "rgba(168, 85, 247, 0.45)" : "rgba(124, 58, 237, 0.45)";

      // Cue separator line
      ctx.beginPath();
      ctx.moveTo(cueWidth, 50);
      ctx.lineTo(cueWidth, summaryY);
      // Summary line
      ctx.moveTo(20, summaryY);
      ctx.lineTo(width - 20, summaryY);
      // Header line
      ctx.moveTo(20, 50);
      ctx.lineTo(width - 20, 50);
      ctx.stroke();

      // Ruled lines in notes area
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = lineColor;
      for (let y = 75; y < summaryY - 10; y += 28) {
        ctx.beginPath();
        ctx.moveTo(cueWidth + 10, y);
        ctx.lineTo(width - 25, y);
        ctx.stroke();
      }

      // Cornell Labels
      ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = isDark ? "#c4b5fd" : "#7c3aed";
      ctx.fillText("TOPIC / CUES & MNEMONICS", 25, 42);
      ctx.fillText("DETAILED STUDY NOTES", cueWidth + 15, 42);
      ctx.fillText("HIGH-YIELD SUMMARY / DLE TAKEAWAY", 25, summaryY + 22);
    } else if (paperTemplate === "odontogram") {
      // Pre-rendered Dental Chart Odontogram
      ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = isDark ? "#c084fc" : "#7c3aed";
      ctx.fillText("MAXILLARY DENTAL ARCH (UPPER JAW)", width / 2 - 120, 40);

      // Maxillary line
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 50, width - 60, 240);

      // Draw tooth circles for teeth 18 to 28
      const toothNames = [
        "18", "17", "16", "15", "14", "13", "12", "11",
        "21", "22", "23", "24", "25", "26", "27", "28"
      ];
      const spacing = (width - 100) / 16;
      toothNames.forEach((t, i) => {
        const cx = 50 + i * spacing;
        const cy = 130;
        ctx.strokeStyle = isDark ? "#a855f7" : "#6b21a8";
        ctx.lineWidth = 1.5;

        // Tooth box / anatomical circle
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.stroke();

        // 5 Surfaces inside tooth (B, L, M, D, O)
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.stroke();

        // Cross lines
        ctx.beginPath();
        ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy);
        ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14);
        ctx.stroke();

        // Label
        ctx.font = "bold 10px monospace";
        ctx.fillStyle = isDark ? "#f8fafc" : "#1e1b4b";
        ctx.fillText(t, cx - 6, cy + 30);
      });

      // Mandibular line
      ctx.font = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = isDark ? "#c084fc" : "#7c3aed";
      ctx.fillText("MANDIBULAR DENTAL ARCH (LOWER JAW)", width / 2 - 120, 320);

      ctx.strokeStyle = lineColor;
      ctx.strokeRect(30, 330, width - 60, 240);

      const mandTeeth = [
        "48", "47", "46", "45", "44", "43", "42", "41",
        "31", "32", "33", "34", "35", "36", "37", "38"
      ];
      mandTeeth.forEach((t, i) => {
        const cx = 50 + i * spacing;
        const cy = 410;
        ctx.strokeStyle = isDark ? "#a855f7" : "#6b21a8";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy);
        ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14);
        ctx.stroke();

        ctx.font = "bold 10px monospace";
        ctx.fillStyle = isDark ? "#f8fafc" : "#1e1b4b";
        ctx.fillText(t, cx - 6, cy + 30);
      });

      // Notes area below
      ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = isDark ? "#c4b5fd" : "#7c3aed";
      ctx.fillText("CLINICAL CHARTING NOTES & CAVITY CLASSIFICATION (CLASS I - VI):", 40, 600);
      ctx.strokeStyle = lineColor;
      for (let y = 620; y < height - 20; y += 26) {
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(width - 40, y);
        ctx.stroke();
      }
    }
  };

  // Resize listener
  useEffect(() => {
    initCanvasSize();
    window.addEventListener("resize", initCanvasSize);
    return () => window.removeEventListener("resize", initCanvasSize);
  }, [paperTemplate, theme, currentNbId, currentPageIndex]);

  // Load Saved Page Data
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const savedData = activeNotebook?.pages?.[currentPageIndex];

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, width, height);

    if (savedData && savedData.startsWith("data:image")) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        historyRef.current = [savedData];
        historyIndexRef.current = 0;
        setCanUndo(false);
        setCanRedo(false);
      };
      img.src = savedData;
    } else {
      historyRef.current = [canvas.toDataURL()];
      historyIndexRef.current = 0;
      setCanUndo(false);
      setCanRedo(false);
    }
  }, [currentNbId, currentPageIndex]);

  // Save current canvas to notebook state & localStorage
  const saveCurrentPageToStorage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");

    setNotebooks(prev => {
      const updated = prev.map(nb => {
        if (nb.id === currentNbId) {
          const newPages = [...nb.pages];
          newPages[currentPageIndex] = dataUrl;
          return { ...nb, pages: newPages };
        }
        return nb;
      });
      localStorage.setItem("leane_notes_notebooks", JSON.stringify(updated));
      return updated;
    });
  };

  // History State for Undo / Redo
  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();

    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(dataUrl);
    // Limit stack size
    if (newHistory.length > 25) newHistory.shift();
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;

    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(false);
    saveCurrentPageToStorage();
  };

  const handleUndo = () => {
    if (historyIndexRef.current <= 0) return;
    sound.playClick();
    historyIndexRef.current -= 1;
    restoreStateFromIndex(historyIndexRef.current);
  };

  const handleRedo = () => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    sound.playClick();
    historyIndexRef.current += 1;
    restoreStateFromIndex(historyIndexRef.current);
  };

  const restoreStateFromIndex = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    const dataUrl = historyRef.current[index];
    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        setCanUndo(index > 0);
        setCanRedo(index < historyRef.current.length - 1);
        saveCurrentPageToStorage();
      };
      img.src = dataUrl;
    }
  };

  // Pointer Event Coordinates (relative to canvas css dimensions)
  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure && e.pressure > 0 ? e.pressure : 0.5
    };
  };

  // Drawing Handlers with PointerEvents (Supports Touch, Apple Pencil / Stylus & Mouse)
  const handlePointerDown = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const pos = getCoords(e);
    isDrawing.current = true;
    startPos.current = pos;

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    if (activeTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = strokeWidth * 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.arc(pos.x, pos.y, strokeWidth * 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (activeTool === "highlighter") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = highlighterColor + "55"; // Semi-transparent
      ctx.lineWidth = strokeWidth * 3.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = activeTool === "fountain" ? strokeWidth * pos.pressure * 1.5 : strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getCoords(e);

    if (["line", "arrow", "rect", "circle"].includes(activeTool)) {
      // Shape preview: restore last history snapshot then draw preview
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const lastSnapshot = historyRef.current[historyIndexRef.current];

      if (lastSnapshot) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          ctx.beginPath();
          ctx.strokeStyle = penColor;
          ctx.lineWidth = strokeWidth;

          if (activeTool === "line") {
            ctx.moveTo(startPos.current.x, startPos.current.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
          } else if (activeTool === "arrow") {
            drawArrow(ctx, startPos.current.x, startPos.current.y, pos.x, pos.y);
          } else if (activeTool === "rect") {
            ctx.strokeRect(
              startPos.current.x, 
              startPos.current.y, 
              pos.x - startPos.current.x, 
              pos.y - startPos.current.y
            );
          } else if (activeTool === "circle") {
            const rx = Math.abs(pos.x - startPos.current.x) / 2;
            const ry = Math.abs(pos.y - startPos.current.y) / 2;
            const cx = (startPos.current.x + pos.x) / 2;
            const cy = (startPos.current.y + pos.y) / 2;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            ctx.stroke();
          }
        };
        img.src = lastSnapshot;
      }
    } else {
      // Freehand pen or highlighter
      if (activeTool === "fountain") {
        ctx.lineWidth = Math.max(1, strokeWidth * (pos.pressure || 0.6) * 1.6);
      }
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const handlePointerUp = (e) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getCoords(e);

    if (["line", "arrow", "rect", "circle"].includes(activeTool)) {
      ctx.beginPath();
      ctx.strokeStyle = penColor;
      ctx.lineWidth = strokeWidth;

      if (activeTool === "line") {
        ctx.moveTo(startPos.current.x, startPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (activeTool === "arrow") {
        drawArrow(ctx, startPos.current.x, startPos.current.y, pos.x, pos.y);
      } else if (activeTool === "rect") {
        ctx.strokeRect(
          startPos.current.x, 
          startPos.current.y, 
          pos.x - startPos.current.x, 
          pos.y - startPos.current.y
        );
      } else if (activeTool === "circle") {
        const rx = Math.abs(pos.x - startPos.current.x) / 2;
        const ry = Math.abs(pos.y - startPos.current.y) / 2;
        const cx = (startPos.current.x + pos.x) / 2;
        const cy = (startPos.current.y + pos.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    saveState();
  };

  // Draw Arrow helper
  const drawArrow = (ctx, fromx, fromy, tox, toy) => {
    const headlen = 12;
    const angle = Math.atan2(toy - fromy, tox - fromx);
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  // Clear Canvas
  const handleClearCanvas = () => {
    if (confirm("Are you sure you want to clear this entire page?")) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      saveState();
      sound.playClick();
    }
  };

  // Export as PNG (Composite Background + Drawings + Notes)
  const handleExportPNG = () => {
    sound.playSuccess();
    const canvas = canvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!canvas || !bgCanvas) return;

    // Create export composite canvas
    const exp = document.createElement("canvas");
    exp.width = canvas.width;
    exp.height = canvas.height;
    const expCtx = exp.getContext("2d");

    // 1. Draw Background
    expCtx.drawImage(bgCanvas, 0, 0);
    // 2. Draw Ink
    expCtx.drawImage(canvas, 0, 0);

    // Trigger download
    const link = document.createElement("a");
    link.download = `${activeNotebook.title.replace(/[^a-zA-Z0-9]/g, "_")}_Page_${currentPageIndex + 1}.png`;
    link.href = exp.toDataURL("image/png");
    link.click();
  };

  // Page Operations
  const handleAddPage = () => {
    sound.playSuccess();
    setNotebooks(prev => {
      const updated = prev.map(nb => {
        if (nb.id === currentNbId) {
          const newPages = [...nb.pages, ""];
          return { ...nb, pages: newPages };
        }
        return nb;
      });
      localStorage.setItem("leane_notes_notebooks", JSON.stringify(updated));
      return updated;
    });
    setCurrentPageIndex(activeNotebook.pages.length);
  };

  const handleDeletePage = () => {
    if (activeNotebook.pages.length <= 1) {
      alert("A notebook must have at least one page!");
      return;
    }
    if (confirm(`Delete page ${currentPageIndex + 1}?`)) {
      sound.playClick();
      setNotebooks(prev => {
        const updated = prev.map(nb => {
          if (nb.id === currentNbId) {
            const newPages = nb.pages.filter((_, i) => i !== currentPageIndex);
            return { ...nb, pages: newPages };
          }
          return nb;
        });
        localStorage.setItem("leane_notes_notebooks", JSON.stringify(updated));
        return updated;
      });
      setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
    }
  };

  // Create New Notebook
  const handleCreateNotebook = () => {
    const title = prompt("Enter notebook name for your board exam review:", "📚 New Dental Review Notebook");
    if (!title) return;
    sound.playSuccess();
    const newNb = {
      id: "nb-" + Date.now(),
      title,
      cover: penColor,
      template: paperTemplate,
      pages: [""]
    };
    setNotebooks(prev => {
      const updated = [...prev, newNb];
      localStorage.setItem("leane_notes_notebooks", JSON.stringify(updated));
      return updated;
    });
    setCurrentNbId(newNb.id);
    setCurrentPageIndex(0);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        maxWidth: isFullscreen ? "100vw" : "1200px",
        margin: "0 auto",
        padding: isFullscreen ? "0.5rem" : "1.25rem 1rem 3.5rem",
        minHeight: "100vh"
      }}
    >
      {/* GoodNotes Top Control Bar */}
      <div 
        className="glass-panel"
        style={{
          padding: "0.85rem 1.25rem",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.85rem",
          position: "sticky",
          top: "65px",
          zIndex: 40,
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)"
        }}
      >
        {/* Left: Notebook Selector & Page Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.3rem" }}>📓</span>
            <select
              value={currentNbId}
              onChange={(e) => {
                sound.playClick();
                setCurrentNbId(e.target.value);
                setCurrentPageIndex(0);
                localStorage.setItem("leane_notes_cur_nb", e.target.value);
              }}
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer"
              }}
            >
              {notebooks.map(nb => (
                <option key={nb.id} value={nb.id}>
                  {nb.title} ({nb.pages.length}p)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreateNotebook}
            className="btn btn-secondary"
            style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
            title="Create New Digital Notebook"
          >
            <Plus size={14} /> New Notebook
          </button>

          {/* Page Jumper */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            background: "rgba(168, 85, 247, 0.12)",
            border: "1px solid var(--border-color)",
            padding: "0.25rem 0.5rem",
            borderRadius: "var(--radius-md)"
          }}>
            <button
              onClick={() => {
                if (currentPageIndex > 0) {
                  sound.playClick();
                  setCurrentPageIndex(prev => prev - 1);
                }
              }}
              disabled={currentPageIndex === 0}
              style={{
                background: "transparent",
                border: "none",
                color: currentPageIndex === 0 ? "var(--text-muted)" : "var(--accent-lavender)",
                cursor: currentPageIndex === 0 ? "not-allowed" : "pointer",
                padding: "0.2rem"
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <span className="mono-font" style={{ fontSize: "0.85rem", fontWeight: 700, minWidth: "70px", textAlign: "center" }}>
              {currentPageIndex + 1} / {activeNotebook.pages.length}
            </span>

            <button
              onClick={() => {
                if (currentPageIndex < activeNotebook.pages.length - 1) {
                  sound.playClick();
                  setCurrentPageIndex(prev => prev + 1);
                }
              }}
              disabled={currentPageIndex >= activeNotebook.pages.length - 1}
              style={{
                background: "transparent",
                border: "none",
                color: currentPageIndex >= activeNotebook.pages.length - 1 ? "var(--text-muted)" : "var(--accent-lavender)",
                cursor: currentPageIndex >= activeNotebook.pages.length - 1 ? "not-allowed" : "pointer",
                padding: "0.2rem"
              }}
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={handleAddPage}
              title="Add New Page"
              style={{
                background: "rgba(168, 85, 247, 0.25)",
                border: "none",
                borderRadius: "4px",
                color: "#ffffff",
                cursor: "pointer",
                padding: "0.25rem 0.45rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Plus size={14} />
            </button>

            <button
              onClick={handleDeletePage}
              title="Delete Page"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "0.25rem"
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Right: Actions (Undo, Redo, Export, Fullscreen) */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="btn btn-secondary"
            style={{ padding: "0.45rem 0.65rem", opacity: canUndo ? 1 : 0.4 }}
          >
            <Undo2 size={16} />
          </button>

          <button
            onClick={handleRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="btn btn-secondary"
            style={{ padding: "0.45rem 0.65rem", opacity: canRedo ? 1 : 0.4 }}
          >
            <Redo2 size={16} />
          </button>

          <button
            onClick={handleAddStickyNote}
            title="Add Sticky Note"
            className="btn btn-secondary"
            style={{ padding: "0.45rem 0.75rem", fontSize: "0.825rem" }}
          >
            <Type size={15} color="#ec4899" />
            <span style={{ display: "none", smDisplay: "inline" }}>Sticky</span>
          </button>

          <button
            onClick={handleClearCanvas}
            title="Clear Canvas Page"
            className="btn btn-secondary"
            style={{ padding: "0.45rem 0.65rem", color: "#f87171" }}
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={handleExportPNG}
            title="Export Page as High-Res Image"
            className="btn btn-primary"
            style={{ padding: "0.45rem 0.9rem", fontSize: "0.85rem" }}
          >
            <Download size={15} /> Export PNG
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Drawing Mode"}
            className="btn btn-secondary"
            style={{ padding: "0.45rem 0.65rem" }}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Floating Stylus & Tool Dock (GoodNotes Signature Toolbar) */}
      <div 
        className="glass-panel"
        style={{
          padding: "0.65rem 1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          background: "var(--bg-card)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-color)",
          boxShadow: "0 6px 25px rgba(0,0,0,0.35)"
        }}
      >
        {/* Tool Selectors */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
          {[
            { id: "pen", label: "Ballpoint", icon: <PenTool size={16} /> },
            { id: "fountain", label: "Fountain", icon: <Sparkles size={16} /> },
            { id: "highlighter", label: "Highlighter", icon: <Highlighter size={16} /> },
            { id: "eraser", label: "Eraser", icon: <Eraser size={16} /> },
            { id: "line", label: "Line", icon: <Minus size={16} /> },
            { id: "arrow", label: "Arrow", icon: <ArrowRight size={16} /> },
            { id: "rect", label: "Box", icon: <Square size={16} /> },
            { id: "circle", label: "Circle", icon: <Circle size={16} /> },
          ].map(tool => {
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTool(tool.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.45rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  border: isSelected ? "2px solid #c084fc" : "1px solid transparent",
                  background: isSelected 
                    ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(124, 58, 237, 0.45))" 
                    : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? "#ffffff" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: "0.825rem",
                  transition: "all 0.15s ease"
                }}
              >
                {tool.icon}
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* Palette Presets */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
          {PALETTE.map((p, i) => {
            const isPicked = (activeTool === "highlighter" ? highlighterColor : penColor) === p.color;
            return (
              <button
                key={i}
                onClick={() => {
                  sound.playClick();
                  if (activeTool === "highlighter") {
                    setHighlighterColor(p.color);
                  } else {
                    setPenColor(p.color);
                  }
                }}
                title={p.name}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: p.color,
                  border: isPicked ? "3px solid #ffffff" : "1px solid rgba(0,0,0,0.3)",
                  boxShadow: isPicked ? "0 0 10px " + p.color : "none",
                  cursor: "pointer",
                  transform: isPicked ? "scale(1.2)" : "scale(1)",
                  transition: "all 0.15s ease"
                }}
              />
            );
          })}

          {/* Color Picker Input */}
          <input
            type="color"
            value={activeTool === "highlighter" ? highlighterColor : penColor}
            onChange={(e) => {
              if (activeTool === "highlighter") setHighlighterColor(e.target.value);
              else setPenColor(e.target.value);
            }}
            title="Custom Color"
            style={{
              width: "26px",
              height: "26px",
              padding: 0,
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              background: "transparent"
            }}
          />
        </div>

        {/* Thickness & Paper Template */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Stroke Width Slider */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Size:</span>
            <input
              type="range"
              min="1"
              max="24"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              style={{ width: "70px", accentColor: "#a855f7", cursor: "pointer" }}
            />
            <span className="mono-font" style={{ fontSize: "0.75rem", width: "24px" }}>
              {strokeWidth}px
            </span>
          </div>

          {/* Paper Template Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Layers size={14} color="#c084fc" />
            <select
              value={paperTemplate}
              onChange={(e) => {
                sound.playClick();
                setPaperTemplate(e.target.value);
              }}
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                padding: "0.35rem 0.65rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8rem",
                cursor: "pointer"
              }}
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Canvas Note Page Surface */}
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
          userSelect: "none",
          touchAction: "none"
        }}
      >
        <div 
          style={{
            position: "relative",
            boxShadow: "0 16px 45px rgba(0,0,0,0.45)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--border-color)"
          }}
        >
          {/* Background Canvas (Grid / Ruled / Odontogram) */}
          <canvas
            ref={bgCanvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 1
            }}
          />

          {/* Foreground Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              position: "relative",
              zIndex: 2,
              cursor: activeTool === "eraser" 
                ? "crosshair" 
                : activeTool === "highlighter" 
                  ? "cell" 
                  : "crosshair",
              touchAction: "none"
            }}
          />

          {/* Floating Sticky Notes */}
          {stickyNotes.map((note, idx) => (
            <div
              key={note.id}
              style={{
                position: "absolute",
                top: `${note.y}px`,
                left: `${note.x}px`,
                zIndex: 10,
                width: "210px",
                background: "linear-gradient(135deg, #fef08a 0%, #fde047 100%)",
                color: "#713f12",
                padding: "0.75rem",
                borderRadius: "8px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                border: "1px solid #facc15"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
                  📌 Note for {girlfriendName}
                </span>
                <button
                  onClick={() => {
                    const filtered = stickyNotes.filter(n => n.id !== note.id);
                    saveStickyNotes(filtered);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#a16207",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: 700
                  }}
                >
                  ✕
                </button>
              </div>
              <textarea
                value={note.text}
                onChange={(e) => {
                  const updated = [...stickyNotes];
                  updated[idx].text = e.target.value;
                  saveStickyNotes(updated);
                }}
                rows={3}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  resize: "none",
                  outline: "none",
                  fontSize: "0.85rem",
                  fontFamily: "'Outfit', sans-serif",
                  color: "#422006",
                  lineHeight: 1.4
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet Tip Banner */}
      <div style={{
        marginTop: "1.25rem",
        textAlign: "center",
        fontSize: "0.825rem",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
      }}>
        <Sparkles size={14} color="#c084fc" />
        <span>
          <strong>LeaneNotes Tablet Edition</strong>: Smooth Apple Pencil & Stylus stylus support with auto-saving to your browser. Perfect for drawing tooth anatomy & preps! 💜
        </span>
      </div>

    </div>
  );
}