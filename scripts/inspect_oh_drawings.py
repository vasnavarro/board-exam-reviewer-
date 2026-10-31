import fitz

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
print("Total drawings on page 1:", len(doc[0].get_drawings()))
# Check colors of drawings
colors = set()
for d in doc[0].get_drawings():
    c = d.get("color")
    if c:
        colors.add(tuple(round(x, 2) for x in c))
print("Colors of drawings on Page 1:", colors)

