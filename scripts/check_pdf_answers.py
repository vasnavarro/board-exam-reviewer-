import fitz
import os

pdf_dir = "reviewer_materials"
files = [
    "1-General Physiology rationale.pdf",
    "10 - Pharmacology and Anesthesiology rationale.pdf",
    "7 - Oral Histology and Embryology answer key.pdf",
    "13 - Orthodontics rationale.pdf",
    "4 - Oral Anatomy rationale.pdf",
    "PRACTICE MANAGEMENT FC-2.pdf",
    "8 - General Histology and Microbiology rationale.pdf",
    "2- General Anatomy rationale.pdf",
    "3 - General Pathology rationale.pdf",
    "OCT 2026 Resto final coaching 2.pdf"
]

for fname in files:
    path = os.path.join(pdf_dir, fname)
    if not os.path.exists(path):
        print(f"NOT FOUND: {fname}")
        continue
    doc = fitz.open(path)
    print(f"\n=== {fname} (Pages: {len(doc)}) ===")
    # Print first 500 chars of page 0
    p0 = doc[0].get_text()
    print("Page 0 snippet:\n", p0[:400].strip())
    # Also check if there's an answer key at the end
    p_last = doc[-1].get_text()
    print("Last page snippet:\n", p_last[:400].strip())
