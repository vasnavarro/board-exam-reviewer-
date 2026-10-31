from pypdf import PdfReader
import sys

pdf_path = "reviewer_materials/1-General Physiology rationale.pdf"
reader = PdfReader(pdf_path)

print(f"Total pages in {pdf_path}: {len(reader.pages)}")
for i, page in enumerate(reader.pages[:10]):
    text = page.extract_text() or ""
    print(f"--- PAGE {i+1} (chars: {len(text)}) ---")
    print(text[:300])

