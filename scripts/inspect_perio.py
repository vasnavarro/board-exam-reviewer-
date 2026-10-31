import fitz

doc = fitz.open("reviewer_materials/9 - Periodontics Answer Key.pdf")
print("Periodontics pages:", len(doc))
for i, page in enumerate(doc):
    print(f"--- Page {i+1} ---")
    print(page.get_text()[:400])

