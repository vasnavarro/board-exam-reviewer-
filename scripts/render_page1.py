import fitz # PyMuPDF

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")
print("Total pages in General Physiology:", len(doc))

page = doc[0]
pix = page.get_pixmap(dpi=150)
output_path = "scripts/physio_page1.png"
pix.save(output_path)
print(f"Rendered Page 1 to {output_path} successfully!")

