import pypdf

reader = pypdf.PdfReader("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
print("Oral Histology pages:", len(reader.pages))
for i, page in enumerate(reader.pages):
    txt = page.extract_text() or ""
    print(f"Page {i+1} length: {len(txt)}")
    if i == len(reader.pages)-1:
        print(txt)
