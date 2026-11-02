import fitz

doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
page = doc[1]
drawings = page.get_drawings()
blue_drawings = [d for d in drawings if d.get("color") and tuple(round(c, 1) for c in d["color"][:3]) == (0.0, 0.0, 1.0)]
print("Blue drawings:", [d["rect"] for d in blue_drawings])
words = page.get_text("words")
for w in words:
    if w[4] in ["A.", "B.", "C.", "D.", "E.", "A", "B", "C", "D", "E"]:
        print(f"Option {w[4]} at {w[:4]}")
