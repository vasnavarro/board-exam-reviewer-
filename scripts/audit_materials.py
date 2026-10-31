import os, glob, docx
from pypdf import PdfReader

materials = sorted(glob.glob("reviewer_materials/*"))

print(f"Found {len(materials)} files in reviewer_materials/:")
for m in materials:
    ext = os.path.splitext(m)[1].lower()
    name = os.path.basename(m)
    if ext == ".pdf":
        try:
            reader = PdfReader(m)
            num_pages = len(reader.pages)
            total_text = ""
            for p in reader.pages:
                total_text += p.extract_text() or ""
            print(f"[PDF] {name} | Pages: {num_pages} | Chars: {len(total_text)}")
        except Exception as e:
            print(f"[PDF ERROR] {name}: {e}")
    elif ext == ".docx":
        try:
            doc = docx.Document(m)
            total_text = "\n".join([p.text for p in doc.paragraphs])
            print(f"[DOCX] {name} | Paragraphs: {len(doc.paragraphs)} | Chars: {len(total_text)}")
        except Exception as e:
            print(f"[DOCX ERROR] {name}: {e}")
    else:
        print(f"[{ext.upper()}] {name}")

