import fitz

doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
print("GA total pages:", len(doc))
for pno in range(1, 3):
    page = doc[pno]
    pix = page.get_pixmap(dpi=120)
    pix.save(f"scripts/ga_p{pno+1}.png")
    print(f"Saved scripts/ga_p{pno+1}.png")
