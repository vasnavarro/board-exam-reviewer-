import fitz

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")
page = doc[0]
annots = list(page.annots() or [])
print(f"Total annots on page 1: {len(annots)}")
types = {}
for a in annots:
    t = a.type[1]
    types[t] = types.get(t, 0) + 1
    if a.info.get("content"):
        print(f"Annot content: {a.info.get('content')}")
print("Annot types:", types)

words = page.get_text("words")
opt_words = [w for w in words if w[4] in ["A.", "B.", "C.", "D.", "A", "B", "C", "D"]]
print("\nOption words found:")
for ow in opt_words[:16]:
    ow_rect = fitz.Rect(ow[:4])
    hit_annots = [a for a in annots if fitz.Rect(a.rect).intersects(ow_rect + (-3, -3, 3, 3))]
    print(f"Option {ow[4]} at ({ow[0]:.1f}, {ow[1]:.1f}): {len(hit_annots)} intersecting annots")
