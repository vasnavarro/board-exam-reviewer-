import fitz
import re

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
print("=== DIAGNOSING GENERAL PATHOLOGY SLIDES ===")

# Check Page 2 (Slide 2 - Question 1)
page = doc[1]
print("Text on Slide 2:")
print(page.get_text())
print("Drawings / Rects on Slide 2:")
drawings = page.get_drawings()
print(f"Total drawings: {len(drawings)}")
for d in drawings:
    # Check fill color
    fill = d.get("fill")
    color = d.get("color")
    rect = d.get("rect")
    print(f"Drawing rect: {rect}, fill: {fill}, color: {color}")

