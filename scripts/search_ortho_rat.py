from pypdf import PdfReader

reader = PdfReader("reviewer_materials/13 - Orthodontics rationale.pdf")

for i, page in enumerate(reader.pages):
    txt = page.extract_text() or ""
    if "rationale" in txt.lower() or "answer" in txt.lower() or "explanation" in txt.lower():
        print(f"Page {i+1} mentions answers/rationales!")
