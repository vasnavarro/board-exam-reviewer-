import fitz
import re

def test_file_circles(pdf_path, label):
    doc = fitz.open(pdf_path)
    total_found = 0
    for pno in range(min(3, len(doc))):
        page = doc[pno]
        words = page.get_text("words")
        opt_letters = [w for w in words if re.match(r"^[A-Ea-e][\.\)]?$", w[4])]
        annots = list(page.annots() or [])
        ink_annots = [a for a in annots if a.type[1] == "Ink"]
        
        detected = []
        for opt in opt_letters:
            r = fitz.Rect(opt[:4])
            for a in ink_annots:
                ab = fitz.Rect(a.rect)
                if 8 <= ab.width <= 75 and 8 <= ab.height <= 75:
                    if abs((ab.x0 + ab.x1)/2 - (r.x0 + r.x1)/2) < 18 and abs((ab.y0 + ab.y1)/2 - (r.y0 + r.y1)/2) < 18:
                        detected.append((opt[4][0], r.y0))
                        break
        print(f"[{label} Page {pno+1}] detected {len(detected)} circled options: {detected[:6]}")
        total_found += len(detected)
    print(f"[{label}] Total in first 3 pages: {total_found}")

test_file_circles("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", "Pharma")
test_file_circles("reviewer_materials/13 - Orthodontics rationale.pdf", "Ortho")
test_file_circles("reviewer_materials/8 - General Histology and Microbiology rationale.pdf", "GHM")
