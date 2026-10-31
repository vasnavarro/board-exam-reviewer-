import fitz
import re

doc = fitz.open("reviewer_materials/13 - Orthodontics rationale.pdf")
print("Ortho pages:", len(doc))

text = ""
for page in doc:
    text += page.get_text() + "\n"

q_matches = list(re.finditer(r"(?:\n|^)(\d{1,3})\.\s+([^\n]+)", text))
print(f"Ortho questions found: {len(q_matches)}")
for m in q_matches[:5]:
    print(f"Q{m.group(1)}: {m.group(2)[:60]}")
for m in q_matches[-5:]:
    print(f"Q{m.group(1)}: {m.group(2)[:60]}")

