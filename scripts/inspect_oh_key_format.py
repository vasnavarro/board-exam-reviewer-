import fitz
import re

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
print("Oral Histology pages:", len(doc))

# Check last page or look for key table
last_page = doc[-1].get_text()
print("Last page preview:")
print(last_page[-500:])

# Check if there is an answer list like "1. A, 2. B, 3. C..."
for i, page in enumerate(doc):
    t = page.get_text()
    if "KEY" in t.upper() or "ANSWERS" in t.upper():
        print(f"Page {i+1} mentions KEY/ANSWERS")
