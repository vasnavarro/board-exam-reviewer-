import fitz

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
print("Oral Histology Yellow Stroke Test:")

for pno in range(min(2, len(doc))):
    page = doc[pno]
    drawings = page.get_drawings()
    yellow_strokes = [d for d in drawings if d.get("color") and tuple(round(c, 2) for c in d["color"][:3]) == (1.0, 1.0, 0.0)]
    
    lines = []
    for b in page.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            line_text = "".join(s["text"] for s in l.get("spans", []))
            lines.append({"text": line_text.strip(), "bbox": fitz.Rect(l["bbox"])})
            
    print(f"Page {pno+1}: {len(yellow_strokes)} yellow strokes")
    for ys in yellow_strokes[:10]:
        ys_rect = fitz.Rect(ys["rect"])
        matched_line = None
        for l in lines:
            if abs((l["bbox"].y0 + l["bbox"].y1)/2 - (ys_rect.y0 + ys_rect.y1)/2) < 8:
                if max(l["bbox"].x0, ys_rect.x0) < min(l["bbox"].x1, ys_rect.x1) + 10:
                    matched_line = l
                    break
        print(f"  {ys_rect.y0:.1f} => {matched_line['text'] if matched_line else 'None'}")
