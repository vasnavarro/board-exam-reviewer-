import fitz
import re
import os

pdf_files = [
    "reviewer_materials/1-General Physiology rationale.pdf",
    "reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf",
    "reviewer_materials/13 - Orthodontics rationale.pdf",
    "reviewer_materials/2- General Anatomy rationale.pdf",
    "reviewer_materials/3 - General Pathology rationale.pdf",
    "reviewer_materials/4 - Oral Anatomy rationale.pdf",
    "reviewer_materials/7 - Oral Histology and Embryology answer key.pdf",
    "reviewer_materials/8 - General Histology and Microbiology rationale.pdf",
    "reviewer_materials/OCT 2026 Resto final coaching 2.pdf",
    "reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf"
]

for p in pdf_files:
    doc = fitz.open(p)
    base = os.path.basename(p)
    # Check last page text
    last_page_text = doc[-1].get_text().strip()
    
    # Check if there are annotations
    total_annots = sum(len(list(page.annots() or [])) for page in doc)
    
    # Check if words like "Answer:" or "Key:" or "Rationale:" exist
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
    
    ans_matches = re.findall(r"(?:answer|ans\.?|key)[\s:]+([A-D])\b", full_text, re.IGNORECASE)
    
    print(f"File: {base}")
    print(f"  Pages: {len(doc)} | Total Annots: {total_annots} | 'Answer: X' matches: {len(ans_matches)}")
    print(f"  Last page preview: {last_page_text[:150].replace(chr(10), ' ')}")
    print("---")

