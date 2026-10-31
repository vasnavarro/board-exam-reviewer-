import pypdf, re, json

r = pypdf.PdfReader("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
print("Total slides:", len(r.pages))

# Search for questions across slides
questions = []
for idx, page in enumerate(r.pages):
    txt = page.extract_text() or ""
    # Look for slide with question number at start: "1. ", "2. ", etc.
    m = re.search(r'(\d+)\.\s*(.+?)(?=\n[A-Ea-e]\.|\Z)', txt, re.DOTALL)
    if m:
        q_num = int(m.group(1))
        q_text = re.sub(r'\s+', ' ', m.group(2)).strip()
        # Find options
        opts = re.findall(r'([A-Ea-e])\.\s*([^\n]+)', txt)
        # Find any text after options (often contains rationales/notes!)
        notes = ""
        opt_matches = list(re.finditer(r'[A-Ea-e]\.\s*[^\n]+', txt))
        if opt_matches:
            last_opt_end = opt_matches[-1].end()
            notes = txt[last_opt_end:].replace("DMF DENTAL TRAINING CENTER BY: DR. C. GUERRERO-PINEDA", "").strip()
            
        questions.append({
            "slide": idx + 1,
            "q_num": q_num,
            "q_text": q_text,
            "opts": opts,
            "notes": notes
        })

print(f"Extracted {len(questions)} potential Resto questions.")
for q in questions[:6]:
    print(f"Q#{q['q_num']}: {q['q_text'][:70]} | Opts: {len(q['opts'])} | Notes: {q['notes'][:60]}")

