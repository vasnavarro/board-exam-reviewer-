from pypdf import PdfReader

reader = PdfReader("reviewer_materials/1-General Physiology rationale.pdf")

# Let's inspect pages 1 and 2 in detail
for p_idx in [0, 1]:
    page = reader.pages[p_idx]
    print(f"=== PAGE {p_idx+1} ===")
    print(page.extract_text())

