from pypdf import PdfReader

reader = PdfReader("reviewer_materials/1-General Physiology rationale.pdf")
page = reader.pages[0]

print(f"Total annotations on Page 1: {len(page.annotations)}")
for i, a in enumerate(page.annotations[:30]):
    obj = a.get_object()
    subtype = obj.get("/Subtype")
    contents = obj.get("/Contents")
    rect = obj.get("/Rect")
    color = obj.get("/C")
    print(f"[{i}] Subtype: {subtype} | Rect: {rect} | Color: {color} | Contents: {repr(contents)[:80]}")

