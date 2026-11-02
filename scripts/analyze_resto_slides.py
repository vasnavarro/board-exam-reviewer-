import fitz
import re

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")

# Check all slides
resto_data = {}
for pno in range(4, len(doc)):
    page = doc[pno]
    txt = page.get_text()
    
    # Check question number
    m = re.search(r"(?:^|\n)\s*(\d{1,3})\.\s*(.*)", txt)
    if m:
        qnum = int(m.group(1))
        # Look for checkmarks (✓ or &#10003;) or blue box or red text
        has_checkmark = "✓" in txt or "✔" in txt or "Answer:" in txt or "Ans:" in txt
        
        # Check drawings for blue box or checkmarks
        drawings = page.get_drawings()
        blue_rects = [fitz.Rect(d["rect"]) for d in drawings if d.get("color") and len(d["color"]) >= 3 and d["color"][2] > 0.5 and d["color"][0] < 0.3 and fitz.Rect(d["rect"]).width > 30 and fitz.Rect(d["rect"]).height > 10]
        
        words = page.get_text("words")
        opt_words = [w for w in words if w[4] in ["A.", "B.", "C.", "D.", "A", "B", "C", "D"]]
        
        hit = None
        for br in blue_rects:
            for ow in opt_words:
                if br.intersects(fitz.Rect(ow[:4])):
                    hit = ow[4][0].upper()
                    break
            if hit: break
            
        resto_data[qnum] = {
            "slide": pno + 1,
            "blue_box": hit,
            "has_checkmark": has_checkmark,
            "snippet": txt.replace("\n", " ")[:100]
        }
    else:
        # Check if this is an explanation slide following a question
        # Often has ✓ or bold text
        pass

print(f"Total question slides matched: {len(resto_data)}")
box_hits = {k: v["blue_box"] for k, v in resto_data.items() if v["blue_box"]}
print(f"Blue box answers ({len(box_hits)}): {box_hits}")
