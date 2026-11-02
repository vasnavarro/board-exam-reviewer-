import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
page = doc[7] # 0-indexed slide 8
pix = page.get_pixmap(dpi=150)
pix.save("scripts/path_p8.png")
print("Saved scripts/path_p8.png")
