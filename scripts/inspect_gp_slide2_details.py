import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
page = doc[1] # slide 2

annots = list(page.annots() or [])
print("Annots:", len(annots))
for a in annots:
    print("Annot:", a.type, a.rect, a.colors)

images = page.get_images()
print("Images:", len(images))

# Check text spans
dict_data = page.get_text("dict")
for b in dict_data["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                if "Albright" in s["text"] or "Weil" in s["text"]:
                    print("Span text:", s["text"], "color:", hex(s["color"]), "flags:", s["flags"], "bbox:", s["bbox"])

