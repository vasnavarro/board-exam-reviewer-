import pypdf

r = pypdf.PdfReader("reviewer_materials/4 - Oral Anatomy rationale.pdf")
print("OA Annotations check:")
for i, page in enumerate(r.pages):
    annots = page.annotations
    if annots:
        print(f"Page {i+1} has {len(annots)} annotations.")
        for a in annots[:5]:
            obj = a.get_object()
            print("  Type:", obj.get("/Subtype"), "Contents:", obj.get("/Contents"))
    else:
        print(f"Page {i+1} has no annotations.")

