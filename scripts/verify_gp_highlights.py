import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
print("Gen Path slides:", len(doc))

green_keys = {}
for pno in range(1, len(doc)):
    page = doc[pno]
    drawings = page.get_drawings()
    # find drawing with greenish color
    green_drawings = []
    for d in drawings:
        c = d.get("color")
        if c and len(c) >= 3:
            r, g, b = c[:3]
            # Lime green highlighter in PDF: high green, low blue (g > 0.8 and b < 0.2)
            if g > 0.8 and b < 0.2:
                green_drawings.append(d)
                
    if green_drawings:
        # Match with options on the page
        text_words = page.get_text("words")
        # Find option letters A, B, C, D
        for d in green_drawings:
            d_rect = fitz.Rect(d["rect"])
            # find which option letter or text aligns with d_rect.y0
            for w in text_words:
                if w[4] in ["A.", "B.", "C.", "D.", "E."]:
                    w_rect = fitz.Rect(w[:4])
                    if abs(w_rect.y0 - d_rect.y0) < 25:
                        green_keys[pno+1] = (w[4], w_rect.y0, d_rect.y0)
                        break

print(f"Total green-highlighted correct answers detected: {len(green_keys)}")
for pno, key in sorted(green_keys.items())[:15]:
    print(f"Slide {pno}: Correct Option = {key[0]}")

