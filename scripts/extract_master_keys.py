import fitz
import re
import json
import os

print("Building Master Detected Answer Key from all coaching PDFs...")

# 1. Oral Anatomy (yellow strokes)
def extract_oa_keys():
    doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
    keys = {}
    for pno in range(len(doc)):
        page = doc[pno]
        drawings = page.get_drawings()
        yellow_strokes = [d for d in drawings if d.get("color") and tuple(round(c, 2) for c in d["color"][:3]) == (1.0, 1.0, 0.0)]
        
        # Parse questions on page
        txt = page.get_text()
        # Find all questions like "1.\nWhich..." or "1. Which..."
        blocks = page.get_text("blocks")
        lines = []
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                ltxt = "".join(s["text"] for s in l.get("spans", [])).strip()
                if ltxt:
                    lines.append({"text": ltxt, "bbox": fitz.Rect(l["bbox"])})
                    
        for ys in yellow_strokes:
            ys_rect = fitz.Rect(ys["rect"])
            matched_line = None
            for l in lines:
                if abs((l["bbox"].y0 + l["bbox"].y1)/2 - (ys_rect.y0 + ys_rect.y1)/2) < 8:
                    if max(l["bbox"].x0, ys_rect.x0) < min(l["bbox"].x1, ys_rect.x1) + 10:
                        matched_line = l["text"]
                        break
            if matched_line and re.match(r"^[A-Ea-e][\.\)]", matched_line):
                # find closest preceding question number
                # ys_rect center
                yc = (ys_rect.y0 + ys_rect.y1)/2
                xc = (ys_rect.x0 + ys_rect.x1)/2
                # Column check: left col x < 300, right col x > 300
                col_left = xc < 300
                
                best_q = None
                best_dist = 9999
                for l in lines:
                    m = re.match(r"^(\d{1,3})\.?$", l["text"]) or re.match(r"^(\d{1,3})\.\s+", l["text"])
                    if m:
                        l_col_left = l["bbox"].x0 < 300
                        if l_col_left == col_left and l["bbox"].y0 <= yc + 5:
                            dist = yc - l["bbox"].y0
                            if dist < best_dist:
                                best_dist = dist
                                best_q = int(m.group(1))
                if best_q:
                    keys[best_q] = matched_line[0].upper()
    return keys

# 2. Oral Histology (yellow strokes)
def extract_oh_keys():
    doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
    keys = {}
    for pno in range(len(doc)):
        page = doc[pno]
        drawings = page.get_drawings()
        yellow_strokes = [d for d in drawings if d.get("color") and tuple(round(c, 2) for c in d["color"][:3]) == (1.0, 1.0, 0.0)]
        
        lines = []
        for b in page.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                ltxt = "".join(s["text"] for s in l.get("spans", [])).strip()
                if ltxt:
                    lines.append({"text": ltxt, "bbox": fitz.Rect(l["bbox"])})
                    
        for ys in yellow_strokes:
            ys_rect = fitz.Rect(ys["rect"])
            matched_line = None
            for l in lines:
                if abs((l["bbox"].y0 + l["bbox"].y1)/2 - (ys_rect.y0 + ys_rect.y1)/2) < 8:
                    if max(l["bbox"].x0, ys_rect.x0) < min(l["bbox"].x1, ys_rect.x1) + 10:
                        matched_line = l["text"]
                        break
            if matched_line and re.match(r"^[A-Ea-e][\.\)]", matched_line):
                yc = (ys_rect.y0 + ys_rect.y1)/2
                xc = (ys_rect.x0 + ys_rect.x1)/2
                col_left = xc < 300
                
                best_q = None
                best_dist = 9999
                for l in lines:
                    m = re.match(r"^(\d{1,3})\.\s*", l["text"])
                    if m:
                        l_col_left = l["bbox"].x0 < 300
                        if l_col_left == col_left and l["bbox"].y0 <= yc + 5:
                            dist = yc - l["bbox"].y0
                            if dist < best_dist:
                                best_dist = dist
                                best_q = int(m.group(1))
                if best_q:
                    keys[best_q] = matched_line[0].upper()
    return keys

# 3. General Pathology (green highlights)
def extract_gp_keys():
    doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
    keys = {}
    for pno in range(1, len(doc)):
        page = doc[pno]
        txt = page.get_text()
        m = re.search(r"(?:^|\n)\s*(\d{1,3})\.\s*", txt)
        if not m: continue
        qnum = int(m.group(1))
        
        drawings = page.get_drawings()
        hl_drawings = [d for d in drawings if d.get("color") and len(d["color"]) >= 3 and d["color"][1] > 0.7 and d["color"][2] < 0.5 and (d["rect"][2]-d["rect"][0]) > 30]
        
        words = page.get_text("words")
        opt_words = [w for w in words if w[4] in ["A.", "B.", "C.", "D.", "E."]]
        
        hit = None
        for hd in hl_drawings:
            hr = fitz.Rect(hd["rect"])
            for ow in opt_words:
                if abs(ow[1] - hr.y0) < 15 or abs(ow[3] - hr.y0) < 15:
                    hit = ow[4][0].upper()
                    break
            if hit: break
        if hit:
            keys[qnum] = hit
    return keys

# 4. General Anatomy (pure blue circle drawings)
def extract_ga_keys():
    doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
    keys = {}
    for pno in range(1, len(doc)):
        page = doc[pno]
        txt = page.get_text()
        qnums = re.findall(r"(?:^|\n)\s*(\d{1,3})\.\s*", txt)
        if not qnums: continue
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
            keys[qnum] = hit
    return keys

oa_k = extract_oa_keys()
oh_k = extract_oh_keys()
gp_k = extract_gp_keys()
ga_k = extract_ga_keys()

print(f"OA extracted keys: {len(oa_k)} / 70")
print(f"OH extracted keys: {len(oh_k)} / 99")
print(f"GP extracted keys: {len(gp_k)} / 81")
print(f"GA extracted keys: {len(ga_k)} / 75")

with open("scripts/extracted_pdf_keys.json", "w", encoding="utf-8") as f:
    json.dump({
        "oa": oa_k,
        "oh": oh_k,
        "gp": gp_k,
        "ga": ga_k
    }, f, indent=2)
print("Saved scripts/extracted_pdf_keys.json")
