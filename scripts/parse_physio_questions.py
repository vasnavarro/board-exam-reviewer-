import fitz # PyMuPDF
import re

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")

full_text = ""
for page in doc:
    full_text += page.get_text() + "\n"

# Let's find all question numbers: e.g. "1.", "2.", ... "100."
q_matches = list(re.finditer(r"\n(\d{1,3})\.\s+([^\n]+)", full_text))
print(f"Found {len(q_matches)} question headers in General Physiology PDF text!")
for m in q_matches[:15]:
    print(f"Q{m.group(1)}: {m.group(2)[:70]}")

print("...")
for m in q_matches[-5:]:
    print(f"Q{m.group(1)}: {m.group(2)[:70]}")

