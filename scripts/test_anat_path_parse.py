import fitz
import re

for filename in ["2- General Anatomy rationale.pdf", "3 - General Pathology rationale.pdf"]:
    doc = fitz.open(f"reviewer_materials/{filename}")
    text = ""
    for page in doc:
        text += page.get_text() + "\n"
    q_matches = list(re.finditer(r"(?:\n|^)(\d{1,3})\.\s+([^\n]+)", text))
    print(f"{filename} | Pages: {len(doc)} | Questions: {len(q_matches)}")
    print(f"  First: Q{q_matches[0].group(1)}: {q_matches[0].group(2)[:50]}")
    print(f"  Last:  Q{q_matches[-1].group(1)}: {q_matches[-1].group(2)[:50]}")

