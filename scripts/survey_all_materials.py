import fitz
import os
import re

files = [
    ("reviewer_materials/1-General Physiology rationale.pdf", "Physio"),
    ("reviewer_materials/2- General Anatomy rationale.pdf", "GA"),
    ("reviewer_materials/OCT 2026 Resto final coaching 2.pdf", "Resto"),
    ("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf", "OH"),
    ("reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf", "Pharma"),
    ("reviewer_materials/3 - General Pathology rationale.pdf", "Path"),
    ("reviewer_materials/13 - Orthodontics rationale.pdf", "Ortho"),
    ("reviewer_materials/8 - General Histology and Microbiology rationale.pdf", "GHM"),
    ("reviewer_materials/4 - Oral Anatomy rationale.pdf", "OA"),
    ("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf", "PM")
]

for fpath, label in files:
    if not os.path.exists(fpath):
        print(f"[{label}] Missing file: {fpath}")
        continue
    doc = fitz.open(fpath)
    total_annots = sum(len(list(p.annots() or [])) for p in doc)
    total_drawings = sum(len(p.get_drawings()) for p in doc)
    # Check if there is an answer key text in the PDF (e.g. "Answer Key", "1. A", "1. B")
    has_ak_text = False
    for pno in range(len(doc)-3, len(doc)):
        if pno >= 0:
            txt = doc[pno].get_text()
            if "answer key" in txt.lower() or "1. a" in txt.lower() or "1. b" in txt.lower():
                has_ak_text = True
                break
    print(f"[{label}] Pages: {len(doc)}, Annots: {total_annots}, Drawings: {total_drawings}, Has AK Text at end: {has_ak_text}")
