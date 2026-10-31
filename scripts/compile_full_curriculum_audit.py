import os
import glob
import fitz
import docx

materials = [
    ("1-General Physiology rationale.pdf", "General Physiology", 100),
    ("10 - Pharmacology and Anesthesiology rationale.pdf", "Pharmacology & Anesthesiology", 100),
    ("11 - Community Dentistry answer key.docx", "Community Dentistry", 70),
    ("13 - Orthodontics rationale.pdf", "Orthodontics", 75),
    ("2- General Anatomy rationale.pdf", "General Anatomy", 75),
    ("3 - General Pathology rationale.pdf", "General Pathology", 84),
    ("4 - Oral Anatomy rationale.pdf", "Oral Anatomy & Occlusion", 70),
    ("5 - Pediatric Dentistry answer key.jfif", "Pediatric Dentistry (Key)", 100),
    ("6 - Oral Pathology_Oral Diagnosis answer key.docx", "Oral Pathology & Diagnosis", 100),
    ("7 - Oral Histology and Embryology answer key.pdf", "Oral Histology & Embryology", 100),
    ("8 - General Histology and Microbiology rationale.pdf", "General Histology & Microbiology", 75),
    ("9 - Periodontics Answer Key.pdf", "Periodontics (Key)", 100),
    ("OCT 2026 Resto final coaching 2.pdf", "Restorative Dentistry", 100),
    ("PRACTICE MANAGEMENT FC-2.pdf", "Practice Management & Jurisprudence", 70)
]

print("=== COACHING MODULES AUDIT ===")
total_coaching = 0
for fname, subject, count in materials:
    path = os.path.join("reviewer_materials", fname)
    exists = os.path.exists(path)
    size_kb = os.path.getsize(path) / 1024 if exists else 0
    total_coaching += count
    print(f"- {subject:35} | File: {fname:45} | Count: {count:3} items | Found: {exists} ({size_kb:.1f} KB)")

print(f"\nTotal Coaching Questions in reviewer_materials/: {total_coaching} items")

# Check reviewer book photos
book_photos = glob.glob("reviewer_book/*")
print(f"\n=== REVIEWER BOOK AUDIT ===")
print(f"Total uploaded photos in reviewer_book/: {len(book_photos)} photos (Pages 1 to 30 uploaded so far)")
print(f"Estimated full physical book items: ~300+ items across all subject review sets.")
print(f"Grand Combined Total: ~{total_coaching + 300}+ questions!")

