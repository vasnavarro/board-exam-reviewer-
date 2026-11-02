import fitz
import re
import json

def extract_ink_circle_keys(pdf_path, max_q=105):
    doc = fitz.open(pdf_path)
    keys = {}
    
    for pno in range(len(doc)):
        page = doc[pno]
        txt = page.get_text()
        
        # Get all words
        words = page.get_text("words")
        opt_words = [w for w in words if re.match(r"^[A-Ea-e][\.\)]?$", w[4])]
        
        # Get ink annots
        annots = list(page.annots() or [])
        ink_annots = [a for a in annots if a.type[1] == "Ink"]
        
        # Also check drawings for circles
        drawings = page.get_drawings()
        circle_drawings = [d for d in drawings if d.get("color") and d["color"][0] < 0.3 and d["color"][2] > 0.5 and 8 <= fitz.Rect(d["rect"]).width <= 60 and 8 <= fitz.Rect(d["rect"]).height <= 60]
        
        all_circles = [fitz.Rect(a.rect) for a in ink_annots if 8 <= fitz.Rect(a.rect).width <= 75 and 8 <= fitz.Rect(a.rect).height <= 75]
        all_circles.extend([fitz.Rect(d["rect"]) for d in circle_drawings])
        
        # Parse questions on this page: find lines starting with number
        # We can find question numbers and their y-ranges
        lines = []
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                ltxt = "".join(s["text"] for s in l.get("spans", [])).strip()
                if ltxt:
                    lines.append({"text": ltxt, "bbox": fitz.Rect(l["bbox"])})
                    
        # Identify question positions
        q_positions = []
        for l in lines:
            m = re.match(r"^(\d{1,3})\.\s*(.*)", l["text"])
            if m:
                qnum = int(m.group(1))
                if qnum <= max_q:
                    q_positions.append({"qnum": qnum, "y": l["bbox"].y0, "x": l["bbox"].x0})
                    
        # Sort questions by y
        q_positions.sort(key=lambda q: (q["x"] > 300, q["y"]))
        
        # For each question, determine its y-range
        for idx, qpos in enumerate(q_positions):
            qnum = qpos["qnum"]
            y_start = qpos["y"]
            y_end = q_positions[idx+1]["y"] if idx + 1 < len(q_positions) and (q_positions[idx+1]["x"] > 300) == (qpos["x"] > 300) else (y_start + 250)
            
            # Find option letters in this y range
            q_opts = [ow for ow in opt_words if y_start <= ow[1] <= y_end and (ow[0] > 300) == (qpos["x"] > 300)]
            
            # Check which option letter is circled
            best_opt = None
            best_dist = 999
            for ow in q_opts:
                ow_rect = fitz.Rect(ow[:4])
                for cb in all_circles:
                    # check distance between centers
                    cdist = (( (cb.x0+cb.x1)/2 - (ow_rect.x0+ow_rect.x1)/2 )**2 + ( (cb.y0+cb.y1)/2 - (ow_rect.y0+ow_rect.y1)/2 )**2)**0.5
                    if cdist < 25 and cdist < best_dist:
                        best_dist = cdist
                        best_opt = ow[4][0].upper()
                        
            if best_opt:
                keys[qnum] = best_opt
                
    return keys

physio_k = extract_ink_circle_keys("reviewer_materials/1-General Physiology rationale.pdf", 99)
pharma_k = extract_ink_circle_keys("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", 100)
ortho_k = extract_ink_circle_keys("reviewer_materials/13 - Orthodontics rationale.pdf", 75)
ghm_k = extract_ink_circle_keys("reviewer_materials/8 - General Histology and Microbiology rationale.pdf", 75)

print(f"Physio keys: {len(physio_k)} / 99")
print(f"Pharma keys: {len(pharma_k)} / 100")
print(f"Ortho keys: {len(ortho_k)} / 75")
print(f"GHM keys: {len(ghm_k)} / 75")

with open("scripts/extracted_ink_keys.json", "w", encoding="utf-8") as f:
    json.dump({
        "physio": physio_k,
        "pharma": pharma_k,
        "ortho": ortho_k,
        "ghm": ghm_k
    }, f, indent=2)
print("Saved scripts/extracted_ink_keys.json")
