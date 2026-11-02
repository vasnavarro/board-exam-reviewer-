import React, { useState, useEffect, useRef } from "react";
import { 
  Search, BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  RotateCcw, Copy, Check, Bookmark, Star, Sparkles, Heart, 
  Layers, ExternalLink, HelpCircle, X
} from "lucide-react";
import { DMF_BOOK_PAGES, DMF_CHAPTERS, DMF_TOTAL_PAGES } from "../data/dmfBookData";
import { sound } from "../utils/audio";

export function BookReader({ girlfriendName, initialPage = 1, onOpenCheatSheet }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState("split"); // "split", "book-only", "summary-only"
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [bookmarkedPages, setBookmarkedPages] = useState(() => {
    try {
      const saved = localStorage.getItem("dr_leane_bookmarked_pages");
      return saved ? JSON.parse(saved) : [57, 63, 70, 88, 93];
    } catch {
      return [57, 63, 70, 88, 93];
    }
  });

  const pageContainerRef = useRef(null);

  // Sync initialPage if prop changes
  useEffect(() => {
    if (initialPage && initialPage >= 1 && initialPage <= DMF_TOTAL_PAGES) {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem("dr_leane_bookmarked_pages", JSON.stringify(bookmarkedPages));
    } catch (e) {
      console.warn("Could not save bookmarks", e);
    }
  }, [bookmarkedPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in search input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      
      if (e.key === "ArrowLeft") {
        goToPage(currentPage - 1);
      } else if (e.key === "ArrowRight") {
        goToPage(currentPage + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const currentPageData = DMF_BOOK_PAGES.find((p) => p.pageNumber === currentPage) || DMF_BOOK_PAGES[0];
  const currentChapter = DMF_CHAPTERS.find(
    (c) => currentPage >= c.startPage && currentPage <= c.endPage
  );

  const goToPage = (p) => {
    const target = Math.max(1, Math.min(DMF_TOTAL_PAGES, p));
    if (target !== currentPage) {
      sound.playClick();
      setCurrentPage(target);
      setZoomLevel(1);
      if (pageContainerRef.current) {
        pageContainerRef.current.scrollTop = 0;
      }
    }
  };

  const toggleBookmark = (pNum) => {
    sound.playClick();
    setBookmarkedPages((prev) => 
      prev.includes(pNum) ? prev.filter((p) => p !== pNum) : [...prev, pNum].sort((a, b) => a - b)
    );
  };

  const isBookmarked = bookmarkedPages.includes(currentPage);

  const handleCopySummary = () => {
    sound.playSuccess();
    const textToCopy = `DMF Reviewer Page ${currentPageData.pageNumber}: ${currentPageData.title}\n\n${currentPageData.summary}\n\nKeywords: ${currentPageData.keywords.join(", ")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter search results
  const searchResults = searchQuery.trim() === "" ? [] : DMF_BOOK_PAGES.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.subject.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q)) ||
      p.pageNumber.toString() === q;
    
    const matchesSubject = selectedSubject === "all" || p.subject === selectedSubject;
    return matchesQuery && matchesSubject;
  });

  const subjectsList = Array.from(new Set(DMF_BOOK_PAGES.map((p) => p.subject)));

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "1rem 1rem 4rem" }}>
      
      {/* Top Banner & Search Station */}
      <div className="glass-panel" style={{
        padding: "1.5rem",
        marginBottom: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderRadius: "var(--radius-lg)",
        background: "linear-gradient(135deg, rgba(30, 20, 50, 0.7), rgba(20, 15, 35, 0.9))",
        border: "1px solid rgba(168, 85, 247, 0.3)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(168, 85, 247, 0.4)"
            }}>
              <BookOpen size={24} color="#fff" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h1 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
                  Dr. {girlfriendName}'s Digital DMF Library
                </h1>
                <span className="badge badge-purple" style={{ fontSize: "0.75rem" }}>
                  Pages 1–100 Online 📖
                </span>
              </div>
              <p style={{ margin: "0.2rem 0 0", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                Search any dental word, drug, landmark, or concept to instantly view the original reviewer book page!
              </p>
            </div>
          </div>

          {/* Quick Actions & View Toggles */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <div style={{
              display: "flex",
              background: "rgba(0,0,0,0.3)",
              padding: "3px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-color)"
            }}>
              <button
                onClick={() => setViewMode("split")}
                className={`btn btn-ghost ${viewMode === "split" ? "active" : ""}`}
                style={{
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.8rem",
                  background: viewMode === "split" ? "var(--accent-primary)" : "transparent",
                  color: viewMode === "split" ? "#fff" : "var(--text-secondary)",
                  borderRadius: "6px"
                }}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode("book-only")}
                className={`btn btn-ghost ${viewMode === "book-only" ? "active" : ""}`}
                style={{
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.8rem",
                  background: viewMode === "book-only" ? "var(--accent-primary)" : "transparent",
                  color: viewMode === "book-only" ? "#fff" : "var(--text-secondary)",
                  borderRadius: "6px"
                }}
              >
                Book Only
              </button>
              <button
                onClick={() => setViewMode("summary-only")}
                className={`btn btn-ghost ${viewMode === "summary-only" ? "active" : ""}`}
                style={{
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.8rem",
                  background: viewMode === "summary-only" ? "var(--accent-primary)" : "transparent",
                  color: viewMode === "summary-only" ? "#fff" : "var(--text-secondary)",
                  borderRadius: "6px"
                }}
              >
                Notes Only
              </button>
            </div>

            <button
              onClick={() => toggleBookmark(currentPage)}
              className="btn btn-secondary"
              style={{
                padding: "0.45rem 0.85rem",
                fontSize: "0.82rem",
                color: isBookmarked ? "#fbbf24" : "var(--text-secondary)",
                borderColor: isBookmarked ? "#fbbf24" : "var(--border-color)"
              }}
            >
              <Bookmark size={15} fill={isBookmarked ? "#fbbf24" : "none"} />
              <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>
          </div>
        </div>

        {/* Search Bar Input */}
        <div style={{ position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--accent-primary)" }} />
          <input
            type="text"
            placeholder="Type any keyword to search book (e.g. lidocaine, synchondrosis, malamed, meckel, leeway space, actinomyces)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 2.8rem 0.75rem 2.8rem",
              background: "var(--input-bg)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "0.85rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer"
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown / Pill Ribbon */}
        {searchQuery.trim() !== "" && (
          <div style={{
            background: "rgba(15, 10, 28, 0.95)",
            border: "1px solid var(--accent-primary)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            maxHeight: "260px",
            overflowY: "auto",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                Found {searchResults.length} matching page{searchResults.length === 1 ? "" : "s"} for "{searchQuery}"
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Click a page to jump directly
              </span>
            </div>

            {searchResults.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "0.5rem 0" }}>
                No direct matches found. Try searching related dental terms like "nerve", "anesthesia", "molar", or "growth".
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.6rem" }}>
                {searchResults.map((res) => (
                  <div
                    key={res.pageNumber}
                    onClick={() => {
                      goToPage(res.pageNumber);
                      setSearchQuery("");
                    }}
                    style={{
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      background: res.pageNumber === currentPage ? "rgba(168, 85, 247, 0.25)" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (res.pageNumber === currentPage ? "var(--accent-primary)" : "var(--border-color)"),
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>
                        Page {res.pageNumber} • {res.subject}
                      </span>
                      <span className="badge badge-purple" style={{ fontSize: "0.7rem", padding: "2px 6px" }}>
                        Jump ↗
                      </span>
                    </div>
                    <p style={{
                      margin: "0.25rem 0 0",
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {res.title}: {res.summary}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chapters Ribbon */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.25rem"
        }}>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap", marginRight: "0.25rem" }}>
            Chapters:
          </span>
          {DMF_CHAPTERS.map((chap, idx) => {
            const isActive = currentPage >= chap.startPage && currentPage <= chap.endPage;
            return (
              <button
                key={idx}
                onClick={() => goToPage(chap.startPage)}
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.78rem",
                  borderRadius: "20px",
                  whiteSpace: "nowrap",
                  background: isActive ? "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))" : "rgba(255,255,255,0.04)",
                  border: "1px solid " + (isActive ? "var(--accent-primary)" : "var(--border-color)"),
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontWeight: isActive ? 700 : 500,
                  transition: "all 0.15s ease"
                }}
              >
                <span>{chap.icon}</span>
                <span>{chap.title}</span>
                <span style={{ opacity: 0.6, fontSize: "0.7rem" }}>
                  (p.{chap.startPage}–{chap.endPage})
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Content Area: Split View of Original Book + Transcribed Notes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: viewMode === "split" ? "1.15fr 0.85fr" : "1fr",
        gap: "1.25rem",
        alignItems: "start"
      }}>
        
        {/* LEFT PANE: Original DMF Book Photo Viewer */}
        {viewMode !== "summary-only" && (
          <div className="glass-panel" style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            background: "rgba(18, 12, 32, 0.85)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-lg)"
          }}>
            {/* Viewer Header Controls */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontWeight: 800, fontSize: "1rem", color: "#fff" }}>
                  Original DMF Reviewer • Page {currentPage} of {DMF_TOTAL_PAGES}
                </span>
                {currentChapter && (
                  <span className="badge badge-purple" style={{ fontSize: "0.72rem" }}>
                    {currentChapter.subject}
                  </span>
                )}
              </div>

              {/* Zoom Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                  className="btn btn-secondary"
                  title="Zoom Out"
                  style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem" }}
                >
                  <ZoomOut size={14} />
                </button>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", minWidth: "40px", textAlign: "center" }}>
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                  className="btn btn-secondary"
                  title="Zoom In"
                  style={{ padding: "0.35rem 0.6rem", fontSize: "0.75rem" }}
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="btn btn-ghost"
                  title="Reset Zoom"
                  style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Book Page Image Stage */}
            <div 
              ref={pageContainerRef}
              style={{
                width: "100%",
                minHeight: "560px",
                maxHeight: "720px",
                overflow: "auto",
                background: "#080511",
                borderRadius: "var(--radius-md)",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "1rem",
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.6)"
              }}
            >
              <div style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top center",
                transition: "transform 0.15s ease",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <img
                  src={`/book/page_${currentPage.toString().padStart(3, "0")}.webp`}
                  alt={`DMF Reviewer Book Page ${currentPage}`}
                  loading="eager"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "6px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.12)"
                  }}
                  onError={(e) => {
                    // Fallback visual if offline or not loaded
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Quick Caption */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "var(--text-muted)", padding: "0.25rem 0.5rem" }}>
              <span>💡 Double tap or scroll inside viewer to inspect small handwriting & notes</span>
              <span>Physical Book: Page {currentPage}/313</span>
            </div>
          </div>
        )}

        {/* RIGHT PANE: Transcribed Study Notes & Clinical High-Yield */}
        {viewMode !== "book-only" && (
          <div className="glass-panel" style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            background: "rgba(22, 15, 40, 0.85)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            borderRadius: "var(--radius-lg)"
          }}>
            {/* Header info */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span className="badge badge-purple" style={{ fontSize: "0.75rem" }}>
                      {currentPageData.subject}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {currentPageData.day}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                    {currentPageData.title}
                  </h2>
                </div>

                <button
                  onClick={handleCopySummary}
                  className="btn btn-secondary"
                  title="Copy Page Summary"
                  style={{ padding: "0.45rem 0.75rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}
                >
                  {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* High-Yield Transcribed Summary Card */}
            <div style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
              lineHeight: 1.7,
              fontSize: "0.92rem",
              color: "var(--text-primary)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.6rem", color: "#ec4899", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <Sparkles size={14} />
                <span>High-Yield Page Summary & Board Pearls</span>
              </div>
              <p style={{ margin: 0, color: "#f3f4f6" }}>
                {currentPageData.summary}
              </p>
            </div>

            {/* Key Concepts / Search Tags */}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                INDEXED KEYWORDS FOR SEARCH:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {currentPageData.keywords.map((kw, kIdx) => (
                  <span
                    key={kIdx}
                    onClick={() => setSearchQuery(kw)}
                    style={{
                      background: "rgba(168, 85, 247, 0.12)",
                      border: "1px solid rgba(168, 85, 247, 0.3)",
                      color: "#d8b4fe",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "12px",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                    title={`Search "${kw}" in book`}
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Bookmarks Quick List */}
            {bookmarkedPages.length > 0 && (
              <div style={{
                paddingTop: "0.75rem",
                borderTop: "1px solid rgba(255,255,255,0.06)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  <Star size={13} color="#fbbf24" fill="#fbbf24" />
                  <span>Dr. {girlfriendName}'s Bookmarked Pages:</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {bookmarkedPages.map((bPage) => (
                    <button
                      key={bPage}
                      onClick={() => goToPage(bPage)}
                      style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        background: bPage === currentPage ? "var(--accent-primary)" : "rgba(255,255,255,0.05)",
                        border: "1px solid " + (bPage === currentPage ? "var(--accent-primary)" : "var(--border-color)"),
                        color: bPage === currentPage ? "#fff" : "var(--text-secondary)",
                        cursor: "pointer"
                      }}
                    >
                      p.{bPage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Angelo's Motivation Note on the Page */}
            <div style={{
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))",
              border: "1px dashed rgba(236, 72, 153, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: "auto"
            }}>
              <Heart size={20} color="#ec4899" fill="#ec4899" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "0.82rem", color: "#fbcfe8", lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700 }}>Angelo's Note: </span>
                "100 pages down, you're mastering this whole book! Take it page by page, my love! ❤️"
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Bottom Sticky Page Navigation Bar */}
      <div style={{
        position: "sticky",
        bottom: "1rem",
        zIndex: 90,
        marginTop: "1.5rem",
        background: "rgba(18, 12, 34, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(168, 85, 247, 0.4)",
        borderRadius: "var(--radius-lg)",
        padding: "0.75rem 1.25rem",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.75rem"
      }}>
        {/* Prev Page Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="btn btn-secondary"
          style={{ padding: "0.5rem 1rem", fontSize: "0.88rem" }}
        >
          <ChevronLeft size={18} />
          <span>Previous Page</span>
        </button>

        {/* Center Page Slider & Direct Input */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flex: "1 1 300px",
          maxWidth: "500px"
        }}>
          <input
            type="range"
            min="1"
            max={DMF_TOTAL_PAGES}
            value={currentPage}
            onChange={(e) => goToPage(parseInt(e.target.value))}
            style={{
              flex: 1,
              accentColor: "var(--accent-primary)",
              cursor: "pointer",
              height: "6px"
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Page</span>
            <input
              type="number"
              min="1"
              max={DMF_TOTAL_PAGES}
              value={currentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) goToPage(val);
              }}
              style={{
                width: "55px",
                padding: "0.3rem 0.4rem",
                textAlign: "center",
                background: "var(--input-bg)",
                border: "1px solid var(--accent-primary)",
                borderRadius: "var(--radius-sm)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem"
              }}
            />
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              of {DMF_TOTAL_PAGES}
            </span>
          </div>
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= DMF_TOTAL_PAGES}
          className="btn btn-primary"
          style={{ padding: "0.5rem 1.25rem", fontSize: "0.88rem" }}
        >
          <span>Next Page</span>
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}
