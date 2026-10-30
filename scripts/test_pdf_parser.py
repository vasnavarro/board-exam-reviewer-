import pypdf, re, json

def parse_pdf_mcqs(filepath, category, id_prefix, default_key_map={}):
    r = pypdf.PdfReader(filepath)
    full = "\n".join(p.extract_text() or "" for p in r.pages)
    
    # Split by item numbers like "1. ", "2. ", etc.
    raw_items = re.split(r'\n(?=\d+\.)', full)
    parsed = []
    
    for item in raw_items:
        lines = [re.sub(r'\s+', ' ', l).strip() for l in item.strip().split('\n') if l.strip()]
        if not lines: continue
        
        m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
        if not m: continue
        q_num = int(m.group(1))
        
        # Collect stem and options
        stem_parts = [m.group(2)]
        options = []
        for l in lines[1:]:
            opt_m = re.match(r'^([A-Ea-e])[\.\)]\s*(.*)', l)
            if opt_m:
                options.append(opt_m.group(2).strip())
            elif len(options) == 0:
                stem_parts.append(l)
            elif len(options) > 0:
                options[-1] += " " + l
                
        stem = " ".join(stem_parts).strip()
        if len(options) >= 3 and len(stem) > 10:
            parsed.append({
                "num": q_num,
                "stem": stem,
                "options": options[:4]
            })
            
    return parsed

pm_qs = parse_pdf_mcqs("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf", "Practice Management & Jurisprudence", "dle-pm")
oa_qs = parse_pdf_mcqs("reviewer_materials/4 - Oral Anatomy rationale.pdf", "Oral Anatomy & Occlusion", "dle-oa")
ph_qs = parse_pdf_mcqs("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", "Pharmacology & Anesthesiology", "dle-pha")
ortho_qs = parse_pdf_mcqs("reviewer_materials/13 - Orthodontics rationale.pdf", "Orthodontics & Pediatric Dentistry", "dle-ortho")

print(f"PM: {len(pm_qs)}, OA: {len(oa_qs)}, PH: {len(ph_qs)}, Ortho: {len(ortho_qs)}")
print("Sample PM Q1:", pm_qs[0] if pm_qs else "None")
print("Sample OA Q1:", oa_qs[0] if oa_qs else "None")
print("Sample PH Q1:", ph_qs[0] if ph_qs else "None")
print("Sample Ortho Q1:", ortho_qs[0] if ortho_qs else "None")
