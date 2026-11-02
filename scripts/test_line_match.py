import fitz
import re

doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
page = doc[0]
drawings = page.get_drawings()
yellow_strokes = [d for d in drawings if d.get("color") and tuple(round(c, 2) for c in d["color"][:3]) == (1.0, 1.0, 0.0)]

# Get all text lines
lines = []
for b in page.get_text("dict")["blocks"]:
    for l in b.get("lines", []):
        line_text = "".join(s["text"] for s in l.get("spans", []))
        lines.append({"text": line_text.strip(), "bbox": fitz.Rect(l["bbox"])})

for ys in yellow_strokes[:5]:
    ys_rect = fitz.Rect(ys["rect"])
    # Find line whose bbox vertical center matches ys_rect
    matched_line = None
    for l in lines:
        if abs((l["bbox"].y0 + l["bbox"].y1)/2 - (ys_rect.y0 + ys_rect.y1)/2) < 8:
            # and horizontal overlap
            if max(l["bbox"].x0, ys_rect.x0) < min(l["bbox"].x1, ys_rect.x1) + 10:
                matched_line = l
                break
    print(f"Yellow stroke at {ys_rect} => {matched_line['text'] if matched_line else 'None'}")
