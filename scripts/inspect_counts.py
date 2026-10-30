import docx, pypdf, re, json

print("Starting dental questions generator...")

def clean_text(s):
    if not s: return ""
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

# ----------------- 1. ORAL PATHOLOGY & DIAGNOSIS -----------------
doc = docx.Document('reviewer_materials/6 - Oral Pathology_Oral Diagnosis answer key.docx')
oral_path_raw = []
cur_q = None

for p in doc.paragraphs:
    t = p.text.strip()
    if not t: continue
    m = re.match(r'^(\d+)\.\s*(.*)', t)
    if m:
        if cur_q and len(cur_q['options']) >= 2 and cur_q['correct_idx'] != -1:
            oral_path_raw.append(cur_q)
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

if cur_q and len(cur_q['options']) >= 2 and cur_q['correct_idx'] != -1:
    oral_path_raw.append(cur_q)

print(f"Loaded {len(oral_path_raw)} raw Oral Pathology questions.")

# ----------------- 2. COMMUNITY DENTISTRY -----------------
comm_doc = docx.Document('reviewer_materials/11 - Community Dentistry answer key.docx')
comm_raw = []
paragraphs = [p for p in comm_doc.paragraphs if p.text.strip()]
i = 0
while i < len(paragraphs):
    p = paragraphs[i]
    t = p.text.strip()
    if 'COMMUNITY DENTISTRY' in t or 'DMF TRAINING' in t or 'PREPARED' in t:
        i += 1
        continue
    
    q_text = t
    options = []
    correct_idx = -1
    j = i + 1
    while j < len(paragraphs) and len(options) < 4:
        opt_p = paragraphs[j]
        opt_t = opt_p.text.strip()
        is_hl = any(r.font.highlight_color is not None for r in opt_p.runs)
        is_b = any(r.bold for r in opt_p.runs)
        
        if is_hl or is_b:
            correct_idx = len(options)
        options.append(opt_t)
        j += 1
        
    if len(options) >= 3 and correct_idx != -1:
        comm_raw.append({
            'question': q_text,
            'options': options,
            'correct_idx': correct_idx
        })
        i = j
    else:
        i += 1

print(f"Loaded {len(comm_raw)} raw Community Dentistry questions.")

# ----------------- 3. ORAL ANATOMY & OCCLUSION -----------------
oa_reader = pypdf.PdfReader('reviewer_materials/4 - Oral Anatomy rationale.pdf')
oa_full = '\n'.join(p.extract_text() for p in oa_reader.pages)
oa_chunks = re.split(r'\n(?=\d+\.)', oa_full)
oral_anat_raw = []

for chunk in oa_chunks[1:]:
    lines = [clean_text(l) for l in chunk.strip().split('\n') if clean_text(l)]
    if not lines: continue
    
    m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
    if not m: continue
    q_num = int(m.group(1))
    
    # parse question stem vs options
    q_stem_parts = [m.group(2)]
    opts = []
    
    for l in lines[1:]:
        opt_m = re.match(r'^([A-D])\.\s*(.*)', l)
        if opt_m:
            opts.append(opt_m.group(2).strip())
        elif len(opts) == 0:
            q_stem_parts.append(l)
        elif len(opts) > 0:
            opts[-1] += " " + l
            
    if len(opts) >= 2:
        oral_anat_raw.append({
            'num': q_num,
            'question': " ".join(q_stem_parts).strip(),
            'options': opts
        })

print(f"Loaded {len(oral_anat_raw)} raw Oral Anatomy questions.")

# ----------------- 4. PRACTICE MANAGEMENT & JURISPRUDENCE -----------------
pm_reader = pypdf.PdfReader('reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf')
pm_full = '\n'.join(p.extract_text() for p in pm_reader.pages)
pm_chunks = re.split(r'\n(?=\d+\.)', pm_full)
pm_raw = []

for chunk in pm_chunks[1:]:
    lines = [clean_text(l) for l in chunk.strip().split('\n') if clean_text(l)]
    if not lines: continue
    m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
    if not m: continue
    q_num = int(m.group(1))
    
    q_stem_parts = [m.group(2)]
    opts = []
    for l in lines[1:]:
        opt_m = re.match(r'^([a-d])\.\s*(.*)', l, re.IGNORECASE)
        if opt_m:
            opts.append(opt_m.group(2).strip())
        elif len(opts) == 0:
            q_stem_parts.append(l)
        elif len(opts) > 0:
            opts[-1] += " " + l
            
    if len(opts) >= 2:
        pm_raw.append({
            'num': q_num,
            'question': " ".join(q_stem_parts).strip(),
            'options': opts
        })

print(f"Loaded {len(pm_raw)} raw Practice Management questions.")

