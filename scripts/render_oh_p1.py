import fitz

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save("scripts/oh_p1.png")
print("Saved scripts/oh_p1.png")
