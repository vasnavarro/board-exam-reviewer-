import fitz
import re

doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
print("Oral Anatomy Yellow Highlight Extraction Test:")

for pno in range(len(doc)):
    page = doc[pno]
    drawings = page.get_drawings()
    yellow_strokes = [d for d in drawings if d.get("color") and tuple(round(c, 2) for c in d["color"][:3]) == (1.0, 1.0, 0.0)]
    
    words = page.get_text("words")
    opt_words = [w for w in words if re.match(r"^[A-Ea-e][\.\)]?$", w[4])]
    
    hits = []
    for ow in opt_words:
        ow_rect = fitz.Rect(ow[:4])
        for ys in yellow_strokes:
            ys_rect = fitz.Rect(ys["rect"])
            # Yellow stroke y is close to option y, and spans across x
            if abs(ys_rect.y0 - ow_rect.y0) < 15 and ys_rect.x0 < ow_rect.x1 + 10 and ys_rect.x1 > ow_rect.x0 - 10:
                hits.append((ow[4][0], ow[1]))
                break
    print(f"Page {pno+1}: {len(yellow_strokes)} yellow strokes, {len(hits)} matched option letters: {[h[0] for h in hits]}")
