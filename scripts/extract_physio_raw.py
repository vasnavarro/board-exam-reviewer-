import fitz
import re
import json

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")

full_text = ""
for page_num in range(len(doc)):
    page = doc[page_num]
    full_text += f"\n---PAGE_{page_num+1}---\n" + page.get_text()

# Let's write full_text to a file to examine how questions are formatted
with open("scripts/physio_full_text.txt", "w", encoding="utf-8") as f:
    f.write(full_text)

print(f"Extracted {len(full_text)} characters from General Physiology PDF to scripts/physio_full_text.txt")

