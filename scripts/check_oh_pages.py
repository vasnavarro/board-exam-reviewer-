import fitz

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
print("Total pages:", len(doc))
for pno in range(len(doc)):
    page = doc[pno]
    text = page.get_text()
    print(f"Page {pno+1}: text len {len(text)}")
    for line in text.split("\n")[:5]:
        print("  ", line)
