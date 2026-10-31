import pypdf, re

def inspect_file(fname):
    r = pypdf.PdfReader(f"reviewer_materials/{fname}")
    full = "\n".join(p.extract_text() or "" for p in r.pages)
    matches = list(re.finditer(r'(?:^|\n)\s*(\d+)\.\s*(.+?)(?=\n\s*\d+\.|\Z)', full, re.DOTALL))
    print(f"=== {fname} === Total items: {len(matches)}")
    for m in matches[:5]:
        chunk = m.group(0).strip()
        first_line = chunk.split("\n")[0]
        print(" ", first_line[:100])

inspect_file("8 - General Histology and Microbiology rationale.pdf")
inspect_file("10 - Pharmacology and Anesthesiology rationale.pdf")
inspect_file("3 - General Pathology rationale.pdf")
inspect_file("7 - Oral Histology and Embryology answer key.pdf")

