import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
print("Gen Path Slides Highlights Test:")
detected_count = 0

for pno in range(1, len(doc)): # slide 1 is title
    page = doc[pno]
    drawings = page.get_drawings()
    # Highlighters: thick horizontal line with color having high green or high red/yellow
    # Look for strokes whose width >> height or height <= 2
    hl_drawings = []
    for d in drawings:
        c = d.get("color")
        r = fitz.Rect(d["rect"])
        if c and len(c) >= 3:
            # Check for lime green (r~0.75, g~1, b~0) or yellow (r~1, g~1, b~0) or cyan or orange
            # Typically high g (>0.7) and low b (<0.5)
            if c[1] > 0.7 and c[2] < 0.5 and (r.x1 - r.x0) > 30 and abs(r.y1 - r.y0) < 5:
                hl_drawings.append((c, r))
                
    words = page.get_text("words")
    opt_words = [w for w in words if w[4] in ["A.", "B.", "C.", "D.", "E."]]
    
    matched = []
    for c, hr in hl_drawings:
        for ow in opt_words:
            if abs(ow[1] - hr.y0) < 15 or abs(ow[3] - hr.y0) < 15:
                matched.append(ow[4][0])
                break
    if matched:
        detected_count += 1
print(f"Total slides with detected highlighted answer: {detected_count} / {len(doc)-1}")
