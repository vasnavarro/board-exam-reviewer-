import json
import re

print("Loading current question bank...")
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))
print(f"Total questions in bank: {len(questions)}")

# Load extracted keys from PDFs
with open("scripts/extracted_pdf_keys.json", "r", encoding="utf-8") as f:
    pdf_keys = json.load(f)
with open("scripts/extracted_ink_keys.json", "r", encoding="utf-8") as f:
    ink_keys = json.load(f)

# Let's see the keys we have
print("PDF keys:", {k: len(v) for k, v in pdf_keys.items()})
print("Ink keys:", {k: len(v) for k, v in ink_keys.items()})
