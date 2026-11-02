import fitz
import re
import json

def get_ga_answers():
    doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
    answers = {}
    for pno in range(1, len(doc)):
        page = doc[pno]
        txt = page.get_text().strip()
        m = re.match(r"^(\d{1,3})\.\s*", txt)
        if not m: continue
        qnum = int(m.group(1))
        
        # Detect blue circle or checkmark ink
        annots = list(page.annots() or [])
        ink_annots = [a for a in annots if a.type[1] == "Ink"]
        words = page.get_text("words")
        opt_words = [w for w in words if re.match(r"^[A-Ea-e][\.\)]?$", w[4])]
        
        hit = None
        for a in ink_annots:
            ab = fitz.Rect(a.rect)
            # check intersection with opt_words
            for ow in opt_words:
                ow_rect = fitz.Rect(ow[:4])
                if ab.intersects(ow_rect + (-5, -5, 5, 5)):
                    hit = ow[4][0].upper()
                    break
            if hit: break
        if hit:
            answers[qnum] = hit
    return answers

ga_ans = get_ga_answers()
print(f"General Anatomy: detected {len(ga_ans)} / 75 answers: {list(ga_ans.items())[:10]}")
