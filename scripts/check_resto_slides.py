import fitz

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
print("Resto total pages:", len(doc))
for pno in range(4, 10):
    page = doc[pno]
    print(f"\n--- Resto Page {pno+1} ---")
    print(page.get_text()[:400].strip())
    # Save image of page 5 and 6
    if pno in [4, 5]:
        pix = page.get_pixmap(dpi=120)
        pix.save(f"scripts/resto_p{pno+1}.png")
        print(f"Saved scripts/resto_p{pno+1}.png")
