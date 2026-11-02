import fitz

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save("scripts/physio_p1.png")
print("Saved scripts/physio_p1.png")
