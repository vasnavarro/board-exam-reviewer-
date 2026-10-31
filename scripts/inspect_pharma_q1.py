import fitz

doc = fitz.open("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf")
page = doc[0]
print("Pharma Page 1 text:")
print(page.get_text()[:400])
