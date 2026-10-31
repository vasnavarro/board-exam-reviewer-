import fitz

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")
page = doc[0]

# Get all text words with bboxes
words = page.get_text("words") # (x0, y0, x1, y1, word, block_no, line_no, word_no)

# Get all annotations
annots = list(page.annots())
print(f"Page 1 has {len(annots)} annotations.")

# Let's find annotations with blue ink (Color [0, 0, 1] or similar)
blue_annots = [a for a in annots if a.colors.get("stroke") == (0.0, 0.0, 1.0) or a.colors.get("stroke") == [0.0, 0.0, 1.0]]
print(f"Page 1 has {len(blue_annots)} blue ink annotations.")

# For questions 1 to 6 on page 1, let's find the option letters: "A.", "B.", "C.", "D."
for w in words:
    text = w[4]
    if text in ["A.", "B.", "C.", "D."]:
        rect = fitz.Rect(w[:4])
        # Check if any annotation overlaps or is close to this option letter
        hit_annots = [a for a in annots if fitz.Rect(a.rect).intersects(rect + (-5, -5, 5, 5))]
        if hit_annots:
            print(f"OPTION {text} at y={rect.y0:.1f} HAS {len(hit_annots)} INTERSECTING ANNOTATIONS -> CIRCLED KEY!")

