import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
page = doc[7]
words = page.get_text("words")
target_w = [w for w in words if "Decreased" in w[4]][0]
print("Decreased word bbox:", target_w[:4])

drawings = page.get_drawings()
for i, d in enumerate(drawings):
    r = fitz.Rect(d["rect"])
    if abs(r.y0 - target_w[1]) < 30:
        print(f"Drawing {i}: fill={d.get('fill')}, color={d.get('color')}, rect={r}")
