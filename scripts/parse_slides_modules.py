import fitz
import re

for filename, label in [
    ("reviewer_materials/2- General Anatomy rationale.pdf", "General Anatomy"),
    ("reviewer_materials/3 - General Pathology rationale.pdf", "General Pathology"),
    ("reviewer_materials/OCT 2026 Resto final coaching 2.pdf", "Restorative Dentistry")
]:
    doc = fitz.open(filename)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    lines = full_text.split("\n")
    clean_lines = []
    for line in lines:
        l = line.strip()
        if not l: continue
        if any(h in l for h in ["DMF DENTAL TRAINING CENTER", "FINAL COACHING", "Final coaching", "Mickhail", "Nikko", "Claire", "By:"]):
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
    print(f"{label:25} -> {len(parsed)} questions parsed (unique nums: {len(set(q['num'] for q in parsed))})")
    if parsed:
        print(f"   First: Q{parsed[0]['num']}: {parsed[0]['stem'][:70]}")
        print(f"   Last:  Q{parsed[-1]['num']}: {parsed[-1]['stem'][:70]}")

