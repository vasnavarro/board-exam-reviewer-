import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
page = doc[1] # slide 2

drawings = page.get_drawings()
for i, d in enumerate(drawings):
    fill = d.get("fill")
    color = d.get("color")
    rect = d.get("rect")
    # if rect is near y=180 (where Albright is located at y=180 to 200)
    if rect and 150 < rect.y0 < 220:
        print(f"Drawing {i}: rect={rect}, fill={fill}, color={color}, items={len(d.get('items', []))}")
