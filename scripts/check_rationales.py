import pypdf

def examine(name):
    print("="*40, name, "="*40)
    reader = pypdf.PdfReader(f"reviewer_materials/{name}")
    print(f"Num pages: {len(reader.pages)}")
    for i in [0, 1, len(reader.pages)//2, len(reader.pages)-2, len(reader.pages)-1]:
        if 0 <= i < len(reader.pages):
            txt = reader.pages[i].extract_text() or ""
            print(f"--- Page {i+1} (Length: {len(txt)}) ---")
            print(txt[:400].strip())
            print("...")
            print(txt[-300:].strip())

examine("1-General Physiology rationale.pdf")
examine("4 - Oral Anatomy rationale.pdf")
examine("10 - Pharmacology and Anesthesiology rationale.pdf")
examine("13 - Orthodontics rationale.pdf")
examine("OCT 2026 Resto final coaching 2.pdf")
