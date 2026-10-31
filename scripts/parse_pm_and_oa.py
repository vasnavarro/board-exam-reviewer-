import pypdf, re

def dump_samples(fname, count=10):
    print("="*30, fname, "="*30)
    r = pypdf.PdfReader(f"reviewer_materials/{fname}")
    full = "\n".join(p.extract_text() or "" for p in r.pages)
    matches = list(re.finditer(r'(?:^|\n)\s*(\d+)\.\s*(.+?)(?=\n\s*\d+\.|\Z)', full, re.DOTALL))
    for m in matches[:count]:
        chunk = m.group(0).strip()
        print("-" * 20)
        print(chunk[:300])

dump_samples("PRACTICE MANAGEMENT FC-2.pdf", 5)
dump_samples("4 - Oral Anatomy rationale.pdf", 5)
dump_samples("10 - Pharmacology and Anesthesiology rationale.pdf", 5)
dump_samples("13 - Orthodontics rationale.pdf", 5)

