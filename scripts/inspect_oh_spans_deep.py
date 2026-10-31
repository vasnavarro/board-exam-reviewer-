import fitz

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
page = doc[0]

# Check dict blocks
data = page.get_text("dict")
for b in data["blocks"][:10]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                txt = s["text"].strip()
                if txt and any(txt.startswith(x) for x in ["A.", "B.", "C.", "D.", "E."]):
                    print(f"Option Span: {txt:35} | font: {s['font']} | flags: {s['flags']} | color: {hex(s['color'])} | size: {s['size']:.1f}")

# Check drawings on page 1
print("Drawings on Page 1:", len(page.get_drawings()))
for d in page.get_drawings()[:10]:
    print("Drawing:", d.get("color"), d.get("fill"), d.get("rect"))

