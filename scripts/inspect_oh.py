import fitz

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
print("Oral Histology pages:", len(doc))
for i in range(2):
    print(f"--- Page {i+1} ---")
    print(doc[i].get_text()[:600])

