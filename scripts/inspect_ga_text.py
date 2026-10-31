import fitz

doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
print("GA pages:", len(doc))
print("Page 1 text:")
print(repr(doc[0].get_text()[:300]))
print("Page 2 text:")
print(repr(doc[1].get_text()[:300]))
