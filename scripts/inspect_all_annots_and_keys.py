import fitz
import re

def detect_circled_keys(pdf_path):
    doc = fitz.open(pdf_path)
    page_keys = {}
    for pno, page in enumerate(doc):
        annots = list(page.annots() or [])
        words = page.get_text("words") # x0, y0, x1, y1, word
        opt_words = [w for w in words if re.match(r"^[A-Ea-e][\.\)]?$", w[4])]
        
        # Check ink annots
        ink_annots = [a for a in annots if a.type[0] == 15]
        hits = []
        for w in opt_words:
            w_rect = fitz.Rect(w[:4])
            # check intersection with ink annots with small bbox
            matched = [a for a in ink_annots if fitz.Rect(a.rect).intersects(w_rect + (-3, -3, 3, 3))]
            if matched:
                hits.append((w[4], w_rect.y0))
        page_keys[pno+1] = hits
    return page_keys

files = [
    "reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf",
    "reviewer_materials/13 - Orthodontics rationale.pdf",
    "reviewer_materials/8 - General Histology and Microbiology rationale.pdf"
]

for f in files:
    keys = detect_circled_keys(f)
    total_hits = sum(len(v) for v in keys.values())
    print(f"{f}: Total key hits detected = {total_hits} across {len(keys)} pages")
