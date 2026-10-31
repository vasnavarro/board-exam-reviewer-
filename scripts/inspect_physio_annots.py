from pypdf import PdfReader

reader = PdfReader("reviewer_materials/1-General Physiology rationale.pdf")

print("Checking annotations across all pages...")
for i, page in enumerate(reader.pages):
    annots = page.annotations
    if annots:
        print(f"Page {i+1} has {len(annots)} annotations!")

# Check if there are other pages or text streams
print("\nChecking last page text:")
print(reader.pages[-1].extract_text())

