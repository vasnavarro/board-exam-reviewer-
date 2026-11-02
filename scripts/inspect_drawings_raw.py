import fitz

doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
page = doc[0]
drawings = page.get_drawings()
print("Drawings count:", len(drawings))
for i, d in enumerate(drawings[:15]):
    print(f"Drawing {i}: type={d.get('type')}, fill={d.get('fill')}, color={d.get('color')}, rect={d.get('rect')}, items={d.get('items')[:2]}")
