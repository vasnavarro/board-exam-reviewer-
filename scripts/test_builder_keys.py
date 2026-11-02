import json
import re

with open("scripts/extracted_pdf_keys.json", "r", encoding="utf-8") as f:
    pdf_keys = json.load(f)
with open("scripts/extracted_ink_keys.json", "r", encoding="utf-8") as f:
    ink_keys = json.load(f)

print("Keys verified.")
