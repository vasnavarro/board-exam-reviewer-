import fitz
import re
import json

# Check how many Resto answers were already found in resto_answers
with open("scripts/resto_answers.json", "w") if False else open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

resto_qs = [q for q in questions if q["id"].startswith("dle-resto")]
print(f"Loaded {len(resto_qs)} resto questions.")

pm_qs = [q for q in questions if q["id"].startswith("dle-pm")]
print(f"Loaded {len(pm_qs)} PM questions.")
