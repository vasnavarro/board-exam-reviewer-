import fitz

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")
print("Page count:", len(doc))
for pno in range(min(5, len(doc))):
    page = doc[pno]
    annots = list(page.annots() or [])
    drawings = page.get_drawings()
    print(f"Page {pno+1}: annots={len(annots)}, drawings={len(drawings)}")
    # check text for rationales
    text = page.get_text()
    print(f"Text length: {len(text)}")
    for line in text.split("\n")[:10]:
        print("  ", line)
