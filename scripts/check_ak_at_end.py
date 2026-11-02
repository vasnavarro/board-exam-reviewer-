import fitz

for fname in ["10 - Pharmacology and Anesthesiology rationale.pdf", "8 - General Histology and Microbiology rationale.pdf"]:
    doc = fitz.open(f"reviewer_materials/{fname}")
    print(f"=== {fname} LAST PAGES ===")
    for pno in range(len(doc)-2, len(doc)):
        print(f"--- Page {pno+1} ---")
        print(doc[pno].get_text()[:1000])
