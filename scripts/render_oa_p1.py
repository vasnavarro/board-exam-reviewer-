import fitz

doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save("scripts/oa_p1.png")
print("Saved scripts/oa_p1.png")
