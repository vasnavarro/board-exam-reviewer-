import fitz
import re

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")
page = doc[0]

# Find all option letters and their bounding boxes
words = page.get_text("words")
opt_letters = []
for w in words:
    # Match A. B. C. D. or A B C D at line start
    if re.match(r"^[A-D][\.\)]?$", w[4]):
        opt_letters.append({"text": w[4][0], "bbox": fitz.Rect(w[:4])})

print(f"Found {len(opt_letters)} option letters on page 1")

# Find ink annotations
annots = list(page.annots() or [])
ink_annots = [a for a in annots if a.type[1] == "Ink"]
print(f"Found {len(ink_annots)} ink annots on page 1")

# For each option letter, let's see which ink annots enclose or tightly circle it
for opt in opt_letters:
    r = opt["bbox"]
    # check ink annots whose bbox contains or closely covers the option letter
    # A circle around 'B' will have a bbox slightly larger than 'B' (e.g. width 15-40, height 15-40)
    # and its center will be near r's center
    matched_circles = []
    for a in ink_annots:
        ab = fitz.Rect(a.rect)
        # Check if ab is circle-sized (w between 10 and 60, h between 10 and 60)
        # and centers are close
        if 8 <= ab.width <= 70 and 8 <= ab.height <= 70:
            cx_diff = abs((ab.x0 + ab.x1)/2 - (r.x0 + r.x1)/2)
            cy_diff = abs((ab.y0 + ab.y1)/2 - (r.y0 + r.y1)/2)
            if cx_diff < 15 and cy_diff < 15:
                matched_circles.append(ab)
    if matched_circles:
        print(f"Option {opt['text']} at y={r.y0:.1f} has circle! Box={matched_circles[0]}")
