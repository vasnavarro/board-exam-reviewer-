import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
page = doc[7]
drawings = page.get_drawings()
print(f"Total drawings on slide 8: {len(drawings)}")
for i, d in enumerate(drawings):
    fill = d.get("fill")
    color = d.get("color")
    rect = d.get("rect")
    print(f"Drawing {i}: fill={fill}, color={color}, rect={rect}")
