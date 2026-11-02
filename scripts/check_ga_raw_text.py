import fitz

doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
page = doc[1]
print("Raw text first 200 chars:")
print(repr(page.get_text()[:200]))
