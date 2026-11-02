import fitz

doc = fitz.open("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf")
print("PM total pages:", len(doc))
for pno in range(min(2, len(doc))):
    page = doc[pno]
    pix = page.get_pixmap(dpi=120)
    pix.save(f"scripts/pm_p{pno+1}.png")
    print(f"Saved scripts/pm_p{pno+1}.png")
