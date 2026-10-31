import pypdf, re

files = [
    "1-General Physiology rationale.pdf",
    "2- General Anatomy rationale.pdf",
    "3 - General Pathology rationale.pdf",
    "4 - Oral Anatomy rationale.pdf",
    "8 - General Histology and Microbiology rationale.pdf",
    "10 - Pharmacology and Anesthesiology rationale.pdf",
    "13 - Orthodontics rationale.pdf",
]

for fname in files:
    r = pypdf.PdfReader(f"reviewer_materials/{fname}")
    full_text = "\n".join(p.extract_text() or "" for p in r.pages)
    print("="*50)
    print(fname)
    print(f"Total pages: {len(r.pages)}, Total chars: {len(full_text)}")
    
    # Check for keywords like "Rationale", "Answer", "Key", "Explanation", bold or colored indicators
    has_answer = re.findall(r'(answer\s*key|rationale|correct\s*answer|ans:)', full_text, re.IGNORECASE)
    print(f"Matches for answer/rationale: {set(has_answer[:10])}")
    
    # Check the last 1500 chars of document
    print("Last 400 chars:")
    print(full_text[-400:].strip())

