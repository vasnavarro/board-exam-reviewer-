import docx, pypdf, re, json

print("Parsing DMF Board Exam materials...")

def clean(t):
    return re.sub(r'\s+', ' ', t).strip()

all_questions = []

# ---------------- 1. ORAL PATHOLOGY & DIAGNOSIS ----------------
try:
    doc = docx.Document('reviewer_materials/6 - Oral Pathology_Oral Diagnosis answer key.docx')
    cur_q = None
    path_count = 0

    for p in doc.paragraphs:
        t = p.text.strip()
        if not t: continue
        m = re.match(r'^(\d+)\.\s*(.*)', t)
        if m:
            if cur_q and len(cur_q['options']) >= 3 and cur_q['correct_idx'] != -1:
                # build question object
                c_idx = cur_q['correct_idx']
                opts = cur_q['options'][:4]
                if c_idx < len(opts):
                    distractors = {}
                    for oi in range(len(opts)):
                        if oi != c_idx:
                            distractors[oi] = f"Option {chr(65+oi)} ({opts[oi]}) is ruled out because it does not present the diagnostic features, etiology, or clinical behavior required by the stem."
                    
                    expl = f"Option {chr(65+c_idx)} ({opts[c_idx]}) is the confirmed diagnostic answer based on established oral pathology criteria."
                    hook = f"Oral Pathology Key: Review differential diagnostic markers for {opts[c_idx]}."
                    
                    all_questions.append({
                        "id": f"dle-op-{cur_q['num']:03d}",
                        "category": "Oral Pathology & Diagnosis",
                        "question": cur_q['question'],
                        "options": opts,
                        "correctIndex": c_idx,
                        "explanation": expl,
                        "distractorRationales": distractors,
                        "keyTakeaway": hook,
                        "difficulty": "Medium"
                    })
                    path_count += 1

            cur_q = {
                'num': int(m.group(1)),
                'question': m.group(2).strip(),
                'options': [],
                'correct_idx': -1
            }
        elif cur_q is not None:
            is_bold = any(r.bold for r in p.runs)
            is_hl = any(r.font.highlight_color is not None for r in p.runs)
            if (is_bold or is_hl) and cur_q['correct_idx'] == -1:
                cur_q['correct_idx'] = len(cur_q['options'])
            cur_q['options'].append(t)

    print(f"Oral Pathology questions parsed: {path_count}")
except Exception as e:
    print(f"Oral Pathology error: {e}")

# ---------------- 2. COMMUNITY DENTISTRY ----------------
try:
    cdoc = docx.Document('reviewer_materials/11 - Community Dentistry answer key.docx')
    paras = [p for p in cdoc.paragraphs if p.text.strip()]
    cd_count = 0
    idx = 0
    while idx < len(paras):
        p = paras[idx]
        t = p.text.strip()
        if 'COMMUNITY DENTISTRY' in t or 'DMF TRAINING' in t or 'PREPARED' in t:
            idx += 1
            continue
        
        q_stem = t
        options = []
        c_idx = -1
        j = idx + 1
        while j < len(paras) and len(options) < 4:
            opt_p = paras[j]
            opt_t = opt_p.text.strip()
            is_hl = any(r.font.highlight_color is not None for r in opt_p.runs)
            is_b = any(r.bold for r in opt_p.runs)
            if is_hl or is_b:
                c_idx = len(options)
            options.append(opt_t)
            j += 1
            
        if len(options) >= 3 and c_idx != -1:
            distractors = {}
            for oi in range(len(options)):
                if oi != c_idx:
                    distractors[oi] = f"Option {chr(65+oi)} ({options[oi]}) is ruled out under community oral health guidelines and epidemiological protocols."
            expl = f"Option {chr(65+c_idx)} ({options[c_idx]}) is the established standard community dentistry answer."
            hook = f"Dental Public Health Pearl: {q_stem[:60]} -> {options[c_idx]}."
            
            all_questions.append({
                "id": f"dle-cd-{cd_count+1:03d}",
                "category": "Community Dentistry",
                "question": q_stem,
                "options": options[:4],
                "correctIndex": c_idx,
                "explanation": expl,
                "distractorRationales": distractors,
                "keyTakeaway": hook,
                "difficulty": "Medium"
            })
            cd_count += 1
            idx = j
        else:
            idx += 1

    print(f"Community Dentistry questions parsed: {cd_count}")
except Exception as e:
    print(f"Community Dentistry error: {e}")

print(f"Total authentic questions compiled: {len(all_questions)}")

# Write to src/data/dentalQuestions.js
js_code = "export const dentalQuestions = " + json.dumps(all_questions, indent=2) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print("Saved to src/data/dentalQuestions.js!")
