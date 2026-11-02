import fitz

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
print("Resto Blue Box Detection Test:")

detected_count = 0
for pno in range(4, len(doc)):
    page = doc[pno]
    drawings = page.get_drawings()
    # Find blue stroked rectangles
    blue_rects = []
    for d in drawings:
        c = d.get("color")
        r = fitz.Rect(d["rect"])
        if c and len(c) >= 3:
            # Blue color: c[2] > 0.5 and c[0] < 0.3
            if c[2] > 0.5 and c[0] < 0.3 and r.width > 30 and r.height > 10:
                blue_rects.append(r)
                
    if blue_rects:
        # Match with words
        words = page.get_text("words")
        opt_words = [w for w in words if w[4] in ["A.", "B.", "C.", "D.", "A", "B", "C", "D"]]
        matched = []
        for br in blue_rects:
            for ow in opt_words:
                ow_rect = fitz.Rect(ow[:4])
                if br.intersects(ow_rect):
                    matched.append(ow[4][0])
                    break
        if matched:
            detected_count += 1
            if detected_count <= 10:
                print(f"Slide {pno+1}: matched {matched[0]}")

print(f"Total Resto slides with detected answer: {detected_count}")
