from pypdf import PdfReader

reader = PdfReader("reviewer_materials/13 - Orthodontics rationale.pdf")
print("Total pages in Ortho PDF:", len(reader.pages))

text = ""
for page in reader.pages[:4]:
    text += page.extract_text() or ""

for line in text.split("\n"):
    if "finger spring" in line.lower() or "undesirable" in line.lower() or "side-effect" in line.lower():
        print("MATCH:", line)

print("\n--- FIRST 2000 CHARS OF ORTHO PDF ---")
print(text[:2000])

