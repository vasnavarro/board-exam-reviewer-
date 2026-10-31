import pypdf, re

r = pypdf.PdfReader("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
print("Resto total pages:", len(r.pages))

for i in range(3, 15):
    txt = r.pages[i].extract_text() or ""
    print(f"\n--- Slide {i+1} ---")
    print(txt.strip())

