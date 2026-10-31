import fitz

doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
page = doc[0]
blocks = page.get_text("dict")["blocks"]

for b in blocks[:8]:
    for l in b.get("lines", []):
        line_str = "".join(s.get("text", "") for s in l.get("spans", []))
        spans_info = [(s.get("text", ""), s.get("color"), s.get("flags"), s.get("font")) for s in l.get("spans", [])]
        print(f"Line: {line_str.strip()} | Spans: {spans_info}")

