import docx, re

doc = docx.Document("reviewer_materials/11 - Community Dentistry answer key.docx")
paras = [p for p in doc.paragraphs if p.text.strip()]

print(f"Total paragraphs: {len(paras)}")
for i, p in enumerate(paras[:40]):
    is_hl = any(r.font.highlight_color is not None for r in p.runs)
    is_b = any(r.bold for r in p.runs)
    mark = " [KEY]" if (is_hl or is_b) else ""
    print(f"{i}: {p.text[:80]}{mark}")

