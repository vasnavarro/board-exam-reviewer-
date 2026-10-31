import docx

doc = docx.Document("reviewer_materials/6 - Oral Pathology_Oral Diagnosis answer key.docx")
print("Total paras in OP:", len(doc.paragraphs))
sample = []
for p in doc.paragraphs[:50]:
    if not p.text.strip(): continue
    is_hl = any(r.font.highlight_color is not None for r in p.runs)
    is_b = any(r.bold for r in p.runs)
    sample.append(p.text[:75] + (" [KEY]" if (is_hl or is_b) else ""))

print("\n".join(sample[:35]))
