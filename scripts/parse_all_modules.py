import fitz
import re
import os
import json

def parse_coaching_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    lines = full_text.split("\n")
    clean_lines = []
    for line in lines:
        l = line.strip()
        if not l: continue
        if any(h in l for h in ["DMF DENTAL TRAINING CENTER", "FINAL COACHING", "Final coaching", "Mickhail", "By:"]):
            continue
        clean_lines.append(l)
        
    clean_text = "\n".join(clean_lines)
    raw_blocks = re.split(r"(?:\n|^)(\d{1,3})\.\s+", "\n" + clean_text)
    
    parsed = []
    for i in range(1, len(raw_blocks), 2):
        q_num = int(raw_blocks[i])
        q_body = raw_blocks[i+1].strip()
        
        opt_parts = re.split(r"(?:\n|^)([A-Ea-e])[\.\)]\s+", "\n" + q_body)
        stem = opt_parts[0].strip().replace("\n", " ")
        if len(stem) < 5:
            continue
            
        options = []
        for j in range(1, len(opt_parts), 2):
            options.append(opt_parts[j+1].strip().replace("\n", " "))
            
        if len(options) >= 2:
            parsed.append({
                "num": q_num,
                "stem": stem,
                "options": options
            })
    return parsed

files_to_test = [
    ("reviewer_materials/1-General Physiology rationale.pdf", "General Physiology"),
    ("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", "Pharmacology"),
    ("reviewer_materials/13 - Orthodontics rationale.pdf", "Orthodontics"),
    ("reviewer_materials/4 - Oral Anatomy rationale.pdf", "Oral Anatomy"),
    ("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf", "Oral Histology"),
    ("reviewer_materials/8 - General Histology and Microbiology rationale.pdf", "General Histology & Micro"),
    ("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf", "Practice Management")
]

for p, label in files_to_test:
    res = parse_coaching_pdf(p)
    print(f"{label:30} -> {len(res)} questions parsed successfully.")
    if res:
        print(f"   Sample Q1: {res[0]['stem'][:70]}")
        print(f"   Sample Q{res[-1]['num']}: {res[-1]['stem'][:70]}")

