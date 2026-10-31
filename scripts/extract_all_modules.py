import fitz
import re
import os
import json

def clean_text_lines(text):
    lines = text.split("\n")
    clean = []
    for l in lines:
        s = l.strip()
        if not s: continue
        if any(h in s for h in [
            "DMF DENTAL TRAINING CENTER", "FINAL COACHING", "Final coaching",
            "Mickhail", "Nikko", "Claire", "By:", "Wesley A. Bombard"
        ]):
            continue
        clean.append(s)
    return "\n".join(clean)

def parse_standard_pdf(pdf_path, prefix, category):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    clean_text = clean_text_lines(full_text)
    raw_blocks = re.split(r"(?:\n|^)(\d{1,3})\.\s+", "\n" + clean_text)
    
    questions = []
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
            questions.append({
                "id": f"{prefix}-{q_num:03d}",
                "num": q_num,
                "category": category,
                "stem": stem,
                "options": options
            })
    return questions

def parse_slides_pdf(pdf_path, prefix, category):
    doc = fitz.open(pdf_path)
    questions = []
    seen_nums = set()
    
    for pno, page in enumerate(doc):
        text = page.get_text().strip()
        m = re.search(r"(?:^|\n)(\d{1,3})\.\s+(.+)", text, re.DOTALL)
        if not m:
            continue
        q_num = int(m.group(1))
        if q_num in seen_nums or q_num > 150:
            continue
            
        body = m.group(2).strip()
        # Clean header lines
        clean_lines = [l.strip() for l in body.split("\n") if l.strip() and not any(h in l for h in ["DMF DENTAL", "FINAL COACHING", "Liberato", "Guerrero"])]
        clean_body = "\n".join(clean_lines)
        
        opt_parts = re.split(r"(?:\n|^)([A-Ea-e])[\.\)]\s+", "\n" + clean_body)
        stem = opt_parts[0].strip().replace("\n", " ")
        if len(stem) < 5:
            continue
            
        options = []
        for j in range(1, len(opt_parts), 2):
            opt_text = opt_parts[j+1].strip().replace("\n", " ")
            # strip trailing commentary if long
            if len(opt_text) > 150:
                opt_text = opt_text[:150].strip()
            options.append(opt_text)
            
        if len(options) >= 2:
            seen_nums.add(q_num)
            questions.append({
                "id": f"{prefix}-{q_num:03d}",
                "num": q_num,
                "category": category,
                "stem": stem,
                "options": options
            })
            
    questions.sort(key=lambda x: x["num"])
    return questions

modules = [
    ("reviewer_materials/1-General Physiology rationale.pdf", "dle-physio", "General Anatomy & Physiology", parse_standard_pdf),
    ("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", "dle-pharma", "Pharmacology & Anesthesiology", parse_standard_pdf),
    ("reviewer_materials/13 - Orthodontics rationale.pdf", "dle-ortho", "Orthodontics & Pediatric Dentistry", parse_standard_pdf),
    ("reviewer_materials/4 - Oral Anatomy rationale.pdf", "dle-oa", "Oral Anatomy & Occlusion", parse_standard_pdf),
    ("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf", "dle-oh", "Oral Histology & Embryology", parse_standard_pdf),
    ("reviewer_materials/8 - General Histology and Microbiology rationale.pdf", "dle-ghm", "General Histology & Microbiology", parse_standard_pdf),
    ("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf", "dle-pm", "Practice Management & Jurisprudence", parse_standard_pdf),
    ("reviewer_materials/2- General Anatomy rationale.pdf", "dle-ga", "General Anatomy & Physiology", parse_slides_pdf),
    ("reviewer_materials/3 - General Pathology rationale.pdf", "dle-gp", "General Pathology", parse_slides_pdf),
    ("reviewer_materials/OCT 2026 Resto final coaching 2.pdf", "dle-resto", "Restorative Dentistry", parse_slides_pdf)
]

all_extracted = {}
total_extracted = 0
for path, prefix, cat, parser_fn in modules:
    qs = parser_fn(path, prefix, cat)
    all_extracted[prefix] = qs
    total_extracted += len(qs)
    print(f"[{cat}] {prefix}: Extracted {len(qs)} questions")

print(f"\nTOTAL QUESTIONS EXTRACTED ACROSS 10 MODULES: {total_extracted}")
with open("scripts/all_extracted_coaching.json", "w", encoding="utf-8") as f:
    json.dump(all_extracted, f, indent=2)
print("Saved to scripts/all_extracted_coaching.json")
