import fitz

# 1. Inspect Resto pages 1 to 6
print("=== RESTO SLIDES PREVIEW ===")
doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
for i in range(min(6, len(doc))):
    print(f"--- Resto Slide {i+1} ---")
    print(doc[i].get_text()[:400].strip())

# 2. Inspect Gen Path pages 1 to 6
print("\n=== GEN PATH SLIDES PREVIEW ===")
doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
for i in range(min(6, len(doc))):
    print(f"--- Path Slide {i+1} ---")
    print(doc[i].get_text()[:400].strip())

# 3. Inspect Oral Histo text styling / colors on page 1
print("\n=== ORAL HISTO PREVIEW ===")
doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
page = doc[0]
blocks = page.get_text("dict")["blocks"]
for b in blocks[:5]:
    for l in b.get("lines", []):
        for s in l.get("spans", []):
            if s.get("text", "").strip():
                print(f"Text: {s['text'][:30]} | Color: {s.get('color')} | Flags: {s.get('flags')} | Font: {s.get('font')}")

# 4. Inspect Oral Anatomy text styling on page 1
print("\n=== ORAL ANATOMY PREVIEW ===")
doc = fitz.open("reviewer_materials/4 - Oral Anatomy rationale.pdf")
page = doc[0]
blocks = page.get_text("dict")["blocks"]
for b in blocks[:5]:
    for l in b.get("lines", []):
        for s in l.get("spans", []):
            if s.get("text", "").strip():
                print(f"Text: {s['text'][:30]} | Color: {s.get('color')} | Flags: {s.get('flags')} | Font: {s.get('font')}")

# 5. Inspect Practice Management styling on page 1
print("\n=== PRACTICE MANAGEMENT PREVIEW ===")
doc = fitz.open("reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf")
page = doc[0]
blocks = page.get_text("dict")["blocks"]
for b in blocks[:5]:
    for l in b.get("lines", []):
        for s in l.get("spans", []):
            if s.get("text", "").strip():
                print(f"Text: {s['text'][:30]} | Color: {s.get('color')} | Flags: {s.get('flags')} | Font: {s.get('font')}")

