import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
print("Total pages in Gen Path:", len(doc))

for pno in range(1, 10):
    page = doc[pno]
    drawings = page.get_drawings()
    # Find filled rectangles that are green / yellow-green highlight
    # Let's inspect all filled shapes with fill color
    fills = []
    for d in drawings:
        fill = d.get("fill")
        if fill:
            # Check if fill is not white (1,1,1) or black (0,0,0)
            r, g, b = fill[:3]
            if not (r > 0.95 and g > 0.95 and b > 0.95):
                fills.append((fill, d.get("rect")))
    print(f"Slide {pno+1}: {len(fills)} colored fills found: {fills[:3]}")

