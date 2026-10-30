import docx, pypdf, re, json, os

print("Auditing all questions across reviewer_materials...")

def clean(t):
    return re.sub(r'\s+', ' ', t).strip()

def inspect_pdf_questions(filename, max_qs=5):
    print("="*50, filename, "="*50)
    reader = pypdf.PdfReader(f"reviewer_materials/{filename}")
    full = "\n".join(p.extract_text() or "" for p in reader.pages)
    
    # Try finding numbered items like "1. ", "2. ", etc.
    matches = list(re.finditer(r'(?:^|\n)\s*(\d+)\.\s*(.+?)(?=\n\s*\d+\.|\Z)', full, re.DOTALL))
    print(f"Found {len(matches)} numbered question items.")
    for m in matches[:max_qs]:
        chunk = m.group(0).strip()
        lines = chunk.split("\n")
        print("  -> First line:", lines[0][:90])
        opts = [l for l in lines if re.match(r'^[A-Ea-e][\.\)]', l.strip())]
        print(f"     Options found: {len(opts)} -> {opts[:2]}")

for f in [
    "1-General Physiology rationale.pdf",
    "2- General Anatomy rationale.pdf",
    "3 - General Pathology rationale.pdf",
    "4 - Oral Anatomy rationale.pdf",
    "7 - Oral Histology and Embryology answer key.pdf",
    "8 - General Histology and Microbiology rationale.pdf",
    "10 - Pharmacology and Anesthesiology rationale.pdf",
    "13 - Orthodontics rationale.pdf",
    "PRACTICE MANAGEMENT FC-2.pdf",
]:
    inspect_pdf_questions(f, 3)
