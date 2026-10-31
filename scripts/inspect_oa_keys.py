import fitz
import re

doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
print("Oral Anatomy page count:", len(doc))
for i, page in enumerate(doc):
    annots = list(page.annots() or [])
    print(f"Page {i+1} has {len(annots)} annots.")
    text = page.get_text()
    # Check if there are keys or circled letters
    print(f"Page {i+1} text length: {len(text)}")
