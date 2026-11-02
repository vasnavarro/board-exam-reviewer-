import fitz

doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
page = doc[1]
print("Annots:", len(list(page.annots() or [])))
print("Drawings:", len(page.get_drawings()))
for d in page.get_drawings():
    c = d.get("color")
    if c and len(c) >= 3 and c[2] > 0.5: # blue
        print(f"Blue drawing: color={c}, rect={d.get('rect')}")
