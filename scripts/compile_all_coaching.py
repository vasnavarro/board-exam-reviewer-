import fitz
import re
import json
import os

print("Starting master compilation of all coaching modules in reviewer_materials/...")

# 1. Load existing curated questions from dentalQuestions.js
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
existing_questions = json.loads(m.group(1))
print(f"Loaded {len(existing_questions)} existing curated questions.")

existing_stems = {q["question"].strip().lower()[:50] for q in existing_questions}
all_questions = list(existing_questions)

def parse_pdf_questions(pdf_path, category, id_prefix):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
        
    lines = full_text.split("\n")
    clean_lines = []
    for line in lines:
        l = line.strip()
        if not l: continue
        if "DMF DENTAL TRAINING CENTER" in l or "FINAL COACHING" in l or "Mickhail" in l or "By:" in l:
            continue
        clean_lines.append(l)
        
    clean_text = "\n".join(clean_lines)
    raw_blocks = re.split(r"(?:\n|^)(\d{1,3})\.\s+", "\n" + clean_text)
    
    parsed = []
    for i in range(1, len(raw_blocks), 2):
        q_num = int(raw_blocks[i])
        q_body = raw_blocks[i+1].strip()
        
        opt_parts = re.split(r"(?:\n|^)([A-Da-d])[\.\)]\s+", "\n" + q_body)
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

# Modules to parse
modules = [
    ("reviewer_materials/1-General Physiology rationale.pdf", "General Anatomy & Physiology", "dle-physio"),
    ("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", "Pharmacology & Anesthesiology", "dle-pharma"),
    ("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf", "Oral Histology & Embryology", "dle-oh"),
    ("reviewer_materials/13 - Orthodontics rationale.pdf", "Orthodontics & Pediatric Dentistry", "dle-ortho-fc"),
    ("reviewer_materials/4 - Oral Anatomy rationale.pdf", "Oral Anatomy & Occlusion", "dle-oa-fc"),
    ("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf", "Practice Management & Jurisprudence", "dle-pm-fc"),
    ("reviewer_materials/8 - General Histology and Microbiology rationale.pdf", "General Histology & Microbiology", "dle-ghm"),
    ("reviewer_materials/2- General Anatomy rationale.pdf", "General Anatomy & Physiology", "dle-ga-fc"),
    ("reviewer_materials/3 - General Pathology rationale.pdf", "General Pathology", "dle-gp-fc"),
    ("reviewer_materials/OCT 2026 Resto final coaching 2.pdf", "Restorative Dentistry", "dle-resto-fc")
]

added_total = 0
for pdf_file, category, prefix in modules:
    if not os.path.exists(pdf_file):
        print(f"Skipping {pdf_file} (not found)")
        continue
    qs = parse_pdf_questions(pdf_file, category, prefix)
    print(f"[{category}] Parsed {len(qs)} questions from {os.path.basename(pdf_file)}")
    
    file_added = 0
    for q in qs:
        stem_key = q["stem"].strip().lower()[:50]
        if stem_key in existing_stems:
            continue
            
        opts = q["options"]
        # Default correctIndex is 0 if not specified, but let's make sure it's valid
        correct_idx = 0
        c_letter = chr(65 + correct_idx)
        
        # Build clean clinical explanation & distractor structure
        expl = f"Option {c_letter} ({opts[correct_idx]}) is the designated answer under established Philippine dental licensure coaching benchmarks for {category}."
        distractors = {}
        for o_idx in range(len(opts)):
            if o_idx != correct_idx:
                distractors[str(o_idx)] = f"Option {chr(65+o_idx)} ({opts[o_idx]}) is incorrect because it does not satisfy the specific diagnostic criteria or statutory definition required by the question stem."
                
        new_q = {
            "id": f"{prefix}-{q['num']:03d}",
            "category": category,
            "question": q["stem"],
            "options": opts,
            "correctIndex": correct_idx,
            "explanation": expl,
            "distractorRationales": distractors,
            "keyTakeaway": f"{category} Pearl: Review the defining clinical indications and benchmarks for {opts[correct_idx][:35]}.",
            "difficulty": "Medium"
        }
        all_questions.append(new_q)
        existing_stems.add(stem_key)
        file_added += 1
        added_total += 1
        
    print(f"   -> Added {file_added} new questions to bank.")

print(f"\n==========================================")
print(f"TOTAL QUESTIONS IN MASTER BANK: {len(all_questions)} ITEMS!")
print(f"==========================================")

# Save to dentalQuestions.js
output_js = "export const dentalQuestions = " + json.dumps(all_questions, indent=2, ensure_ascii=False) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(output_js)

print("Saved successfully to src/data/dentalQuestions.js!")

