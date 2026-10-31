import fitz
import re

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
print("Total pages in Gen Path:", len(doc))

# Test parsing on Slide 2 (Q1)
page = doc[1]
text = page.get_text()

# Look at lines
lines = [l.strip() for l in text.split("\n") if l.strip()]
print("Raw lines on Slide 2:")
for idx, l in enumerate(lines):
    print(f"  [{idx}] {l}")

