from pypdf import PdfReader

reader = PdfReader("reviewer_materials/1-General Physiology rationale.pdf")
print("Total pages:", len(reader.pages))

for i in range(10, len(reader.pages)):
    txt = reader.pages[i].extract_text() or ""
    print(f"=== PAGE {i+1} ===")
    print(txt[:600])

