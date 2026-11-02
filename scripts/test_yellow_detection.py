import fitz

def test_yellow_highlights(pdf_path, label):
    doc = fitz.open(pdf_path)
    total_detected = 0
    for pno in range(len(doc)):
        page = doc[pno]
        drawings = page.get_drawings()
        # Find yellow highlight rectangles
        # Yellow in RGB: high R, high G, low B
        yellow_rects = []
        for d in drawings:
            fill = d.get("fill")
            if fill and len(fill) >= 3:
                r, g, b = fill[:3]
                if r > 0.8 and g > 0.8 and b < 0.6:
                    yellow_rects.append(fitz.Rect(d["rect"]))
                    
        # Match with words
        words = page.get_text("words") # x0, y0, x1, y1, word
        # Find which option letters fall inside or intersect a yellow_rect
        opt_words = [w for w in words if len(w[4]) <= 2 and w[4][0] in "ABCDE"]
        page_hits = []
        for ow in opt_words:
            ow_rect = fitz.Rect(ow[:4])
            if any(yr.intersects(ow_rect) for yr in yellow_rects):
                page_hits.append((ow[4][0], ow[1]))
        print(f"[{label} Page {pno+1}] Yellow rects={len(yellow_rects)}, hits={len(page_hits)}: {[h[0] for h in page_hits[:10]]}")
        total_detected += len(page_hits)
    print(f"[{label}] Total detected across all pages: {total_detected}")

test_yellow_highlights("reviewer_materials/4 - Oral Anatomy rationale.pdf", "Oral Anatomy")
test_yellow_highlights("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf", "Oral Histology")
