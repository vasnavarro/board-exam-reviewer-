import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
for pno, page in enumerate(doc):
    txt = page.get_text()
    if "edema" in txt.lower():
        print(f"Page {pno+1}:")
        print(txt)
