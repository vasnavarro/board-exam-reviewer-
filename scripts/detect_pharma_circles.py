import fitz
import re

doc = fitz.open("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf")
page = doc[0]

words = page.get_text("words")
annots = [a for a in page.annots() or [] if a.type[0] == 15]

# Find option letters a., b., c., d., e.
opt_words = [w for w in words if re.match(r"^[a-eA-E][\.\)]$", w[4])]

print(f"Page 1 has {len(annots)} ink annots and {len(opt_words)} option letters.")

# For each option letter, check distance to nearest ink annot center
for w in opt_words:
    w_rect = fitz.Rect(w[:4])
    # check if any annot is close to this option letter (within 5 points)
    near = [a for a in annots if fitz.Rect(a.rect).intersects(w_rect + (-3, -3, 3, 3))]
    if near:
        print(f"Option {w[4]} at y={w_rect.y0:.1f} has {len(near)} overlapping annots -> KEY!")

