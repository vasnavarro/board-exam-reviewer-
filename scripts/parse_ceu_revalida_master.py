import pymupdf
import re
import json
import time

print("Starting Master CEU Revalida Question Extractor...")
t0 = time.time()
doc = pymupdf.open('reviewer_materials/CEU-REVALIDA-word97-2003doc.pdf')
print(f"Loaded PDF: {len(doc)} pages")

KNOWN_HEADERS = [
    ('PHARMACOLOGY', 'Pharmacology & Anesthesiology'),
    ('ENDODONTIC', 'Periodontics & Endodontics'),
    ('PERIODONT', 'Periodontics & Endodontics'),
    ('PROSTHODONTIC', 'Prosthodontics & Dental Materials'),
    ('DENTAL MATERIALS', 'Prosthodontics & Dental Materials'),
    ('JURISPRUDENCE', 'Practice Management & Jurisprudence'),
    ('ANATOMY', 'General Anatomy & Physiology'),
    ('PHYSIOLOGY', 'General Anatomy & Physiology'),
    ('MICROSCOPIC ANATOMY', 'Oral Histology & Embryology'),
    ('HISTOLOGY', 'Oral Histology & Embryology'),
    ('EMBRYOLOGY', 'Oral Histology & Embryology'),
    ('PATHOLOGY', 'General Pathology & Microbiology'),
    ('MICROBIOLOGY', 'General Pathology & Microbiology'),
    ('SURGERY', 'Roentgenology, Oral Diagnosis & Oral Surgery'),
    ('DIAGNOSIS', 'Roentgenology, Oral Diagnosis & Oral Surgery'),
    ('ROENTGENOLOGY', 'Roentgenology, Oral Diagnosis & Oral Surgery'),
    ('ORTHODONTIC', 'Orthodontics & Pediatric Dentistry'),
    ('PEDIATRIC', 'Orthodontics & Pediatric Dentistry'),
    ('RESTORATIVE', 'Restorative Dentistry & Community Health'),
    ('COMMUNITY', 'Restorative Dentistry & Community Health')
]

current_subject = 'Pharmacology & Anesthesiology'
tokens = []

for p in range(len(doc)):
    page = doc[p]
    blocks = page.get_text('dict')['blocks']
    page_txt = page.get_text()
    non_empty = [l.strip() for l in page_txt.split('\n') if l.strip()]
    
    # Check subject heading on leading lines
    for l in non_empty[:4]:
        if l.isupper() and len(l) >= 6 and len(l) <= 80 and not re.match(r'^[A-Ea-e1-9][\.\)]', l):
            for pattern, cat in KNOWN_HEADERS:
                if pattern in l:
                    current_subject = cat
                    break
                    
    for b in blocks:
        if 'lines' in b:
            for l in b['lines']:
                for s in l['spans']:
                    t = s['text']
                    if not t: continue
                    is_b = bool('bold' in s['font'].lower() or s['flags'] & 16 != 0)
                    tokens.append((t, is_b, current_subject))
                tokens.append(('\n', False, current_subject))

print(f"Tokens collected in {time.time()-t0:.2f}s. Parsing questions...")

full_str = ""
bold_mask = []
subject_mask = []

for t, b, subj in tokens:
    full_str += t
    bold_mask.extend([b] * len(t))
    subject_mask.extend([subj] * len(t))

# Regex split on numbered questions
q_splits = list(re.finditer(r'(?:\n|^)\s*(\d{1,3})\.\s+', full_str))
print(f"Detected {len(q_splits)} numbered stems in text.")

parsed_questions = []
q_counter = 1

for i in range(len(q_splits)):
    start_pos = q_splits[i].end()
    end_pos = q_splits[i+1].start() if i+1 < len(q_splits) else len(full_str)
    q_num = q_splits[i].group(1)
    q_body = full_str[start_pos:end_pos]
    
    # Get subject for this question
    subj = subject_mask[start_pos] if start_pos < len(subject_mask) else 'General Clinical Dentistry'
    
    # Find options (A. B. C. D. E. or a. b. c. d. e.)
    opt_matches = list(re.finditer(r'(?:^|[\s\n])([A-Ea-e])[\.\)]\s+', q_body))
    if len(opt_matches) >= 3:
        stem = q_body[:opt_matches[0].start()].strip()
        stem = re.sub(r'\s+', ' ', stem)
        if len(stem) < 10:
            continue
            
        opts = []
        correct_idx = None
        
        for j in range(len(opt_matches)):
            o_letter = opt_matches[j].group(1).upper()
            o_start = opt_matches[j].end()
            o_end = opt_matches[j+1].start() if j+1 < len(opt_matches) else len(q_body)
            opt_text = q_body[o_start:o_end].strip()
            opt_text = re.sub(r'\s+', ' ', opt_text)
            
            # Check bold ratio
            abs_start = start_pos + opt_matches[j].start()
            abs_end = start_pos + o_end
            if abs_end > abs_start:
                bold_chars = sum(bold_mask[abs_start:abs_end])
                ratio = bold_chars / (abs_end - abs_start)
                if ratio > 0.25 and correct_idx is None:
                    correct_idx = j
            opts.append(opt_text)
            
        if correct_idx is not None and len(opts) >= 3 and len(opts) <= 5:
            # Clean up trailing numbers or artifacts from options
            clean_opts = []
            for opt in opts:
                o_c = re.sub(r'\s*\d{1,3}\.?\s*$', '', opt).strip()
                clean_opts.append(o_c if o_c else opt)
                
            qid = f"ceu-rev-{q_counter:04d}"
            q_counter += 1
            
            c_letter = chr(65 + correct_idx)
            c_text = clean_opts[correct_idx]
            
            parsed_questions.append({
                "id": qid,
                "category": subj,
                "question": stem,
                "options": clean_opts,
                "correctIndex": correct_idx,
                "source": "CEU Dental Revalida Reviewer",
                "difficulty": "Hard" if len(clean_opts) == 5 else "Medium"
            })

print(f"Extracted {len(parsed_questions)} high-quality questions with verified bold answer keys!")

# Stats by category
from collections import Counter
cat_counts = Counter(q['category'] for q in parsed_questions)
print("Questions by Category:")
for cat, count in cat_counts.most_common():
    print(f"  {cat}: {count}")

with open("scripts/ceu_revalida_parsed.json", "w", encoding="utf-8") as f:
    json.dump(parsed_questions, f, indent=2, ensure_ascii=False)

print("Saved to scripts/ceu_revalida_parsed.json successfully!")
