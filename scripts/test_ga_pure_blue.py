import fitz
import re

doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
print("General Anatomy Blue Circle Test with proper regex:")

detected = {}
for pno in range(1, len(doc)):
    page = doc[pno]
    txt = page.get_text()
    # Find question number anywhere in page text
    qnums = re.findall(r"(?:^|\n)\s*(\d{1,3})\.\s*", txt)
    if not qnums:
        continue
    qnum = int(qnums[0])
    
    drawings = page.get_drawings()
    blue_drawings = [d for d in drawings if d.get("color") and tuple(round(c, 1) for c in d["color"][:3]) == (0.0, 0.0, 1.0)]
    
    words = page.get_text("words")
    opt_words = [w for w in words if w[4] in ["A.", "B.", "C.", "D.", "E.", "A", "B", "C", "D", "E"]]
    
    hit = None
    for bd in blue_drawings:
        br = fitz.Rect(bd["rect"])
        for ow in opt_words:
            ow_rect = fitz.Rect(ow[:4])
            if br.intersects(ow_rect):
                hit = ow[4][0].upper()
                break
        if hit: break
    if hit:
        detected[qnum] = hit

print(f"Total detected in GA: {len(detected)} / 75:")
for q, a in sorted(detected.items())[:20]:
    print(f"  Q{q}: {a}")
