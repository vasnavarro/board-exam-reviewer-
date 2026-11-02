import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
page = doc[7]
words = page.get_text("words")
for w in words:
    if w[1] > 100 and w[1] < 200:
        print(f"word: {w[4]!r} at ({w[0]:.1f}, {w[1]:.1f}, {w[2]:.1f}, {w[3]:.1f})")
