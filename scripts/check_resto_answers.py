import fitz
import re
import json

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")

# In Resto, let's map each question number to its question slide and answer slide
resto_answers = {}

for pno in range(4, len(doc)):
    page = doc[pno]
    txt = page.get_text()
    
    # Check if slide has a question number at the top
    m = re.search(r"(?:^|\n)\s*(\d{1,3})\.\s*", txt)
    if m:
        qnum = int(m.group(1))
        
        # 1. Check for blue box
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
            
        if hit:
            resto_answers[qnum] = hit

print(f"Resto extracted answers via blue box: {len(resto_answers)} / 100")
print(f"Sample Resto answers: {list(resto_answers.items())[:15]}")
