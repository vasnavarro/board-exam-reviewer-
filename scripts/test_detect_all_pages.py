import fitz
import re

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")

for page_idx in range(5):
    page = doc[page_idx]
    words = page.get_text("words")
    annots = list(page.annots() or [])
    
    # Filter blue ink annotations
    blue_annots = [a for a in annots if a.type[0] == 15] # 15 is /Ink in PyMuPDF
    
    # Find option letters
    print(f"=== PAGE {page_idx+1} (Ink annots: {len(blue_annots)}) ===")
    
    # Let's find words that are "A.", "B.", "C.", "D." or "a.", "b.", "c.", "d."
    opt_words = [w for w in words if re.match(r"^[A-Da-d][\.\)]$", w[4])]
    
    for w in opt_words:
        w_rect = fitz.Rect(w[:4])
        # Check intersection with ink annots with generous padding
        matched_annots = [a for a in blue_annots if fitz.Rect(a.rect).intersects(w_rect + (-8, -8, 8, 8))]
        if matched_annots:
            print(f"  Page {page_idx+1} -> Circled option: {w[4]} at y={w_rect.y0:.1f}")

