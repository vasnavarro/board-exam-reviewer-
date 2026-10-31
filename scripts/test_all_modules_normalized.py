import fitz
import re
import os

modules = [
    ("reviewer_materials/1-General Physiology rationale.pdf", "General Physiology"),
    ("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", "Pharmacology"),
    ("reviewer_materials/13 - Orthodontics rationale.pdf", "Orthodontics"),
    ("reviewer_materials/4 - Oral Anatomy rationale.pdf", "Oral Anatomy"),
    ("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf", "Oral Histology"),
    ("reviewer_materials/8 - General Histology and Microbiology rationale.pdf", "General Histology & Micro"),
    ("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf", "Practice Management")
]

for p, label in modules:
    doc = fitz.open(p)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    lines = [l.strip() for l in full_text.split("\n") if l.strip() and not any(h in l for h in ["DMF DENTAL", "FINAL COACHING", "Mickhail", "Wesley"])]
    clean_text = "\n".join(lines)
    
    raw_blocks = re.split(r"(?:\n|^)(\d{1,3})\.\s+", "\n" + clean_text)
    
    parsed = []
    few_opts = []
    for i in range(1, len(raw_blocks), 2):
        q_num = int(raw_blocks[i])
        q_body = raw_blocks[i+1].strip()
        
        # Pre-normalize option markers
        s_norm = re.sub(r"(?:\s*|^)([A-Ea-e])[\.,\)]\s*", r"\n\1. ", q_body)
        opt_parts = re.split(r"(?:\n|^)\s*([A-Ea-e])[\.\)]\s*", "\n" + s_norm)
        stem = opt_parts[0].strip().replace("\n", " ")
        
        options = []
        for j in range(1, len(opt_parts), 2):
            options.append(opt_parts[j+1].strip().replace("\n", " "))
            
        if len(options) < 4:
            few_opts.append((q_num, len(options), options))
        parsed.append(q_num)
        
    print(f"[{label:25}] Total: {len(parsed)} questions | Questions with <4 opts: {len(few_opts)}")
    if few_opts:
        for f in few_opts[:3]:
            print(f"   Q{f[0]} ({f[1]} opts): {f[2]}")
