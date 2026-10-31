import os, re
import docx
import pypdf

materials_dir = "reviewer_materials"
files = sorted(os.listdir(materials_dir))

for f in files:
    full_path = os.path.join(materials_dir, f)
    print("=" * 60)
    print(f"FILE: {f}")
    if f.endswith(".pdf"):
        try:
            reader = pypdf.PdfReader(full_path)
            print(f"Total Pages: {len(reader.pages)}")
            text = ""
            for i in range(min(3, len(reader.pages))):
                extracted = reader.pages[i].extract_text() or ""
                text += f"\n--- Page {i+1} ---\n" + extracted[:500]
            print(text[:1000])
        except Exception as e:
            print(f"Error reading PDF: {e}")
    elif f.endswith(".docx"):
        try:
            doc = docx.Document(full_path)
            print(f"Total Paragraphs: {len(doc.paragraphs)}")
            sample = [p.text for p in doc.paragraphs[:15] if p.text.strip()]
            print("\n".join(sample))
        except Exception as e:
            print(f"Error reading docx: {e}")
    else:
        print(f"Other file type: {f}")

