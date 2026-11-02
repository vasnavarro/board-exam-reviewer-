import fitz

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
page = doc[0]
blocks = page.get_text("dict")["blocks"]

for b in blocks[:8]:
    for l in b.get("lines", []):
        for s in l.get("spans", []):
            txt = s.get("text", "").strip()
            if not txt: continue
            font = s.get("font")
            flags = s.get("flags") # bold is 2**4=16, 2**1=2 etc.
            color = s.get("color")
            size = s.get("size")
            if any(txt.startswith(x) for x in ["A.", "B.", "C.", "D.", "E.", "1.", "2.", "3.", "4."]):
                print(f"{txt[:40]} | font={font} | flags={flags} | color={color} | size={size:.1f}")
