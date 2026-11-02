import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

resto_qs = [q for q in questions if q["id"].startswith("dle-resto")]
with open("scripts/resto_stems_opts.txt", "w", encoding="utf-8") as f:
    for q in resto_qs:
        f.write(f"[{q['id']}] {q['question']}\n")
        for idx, o in enumerate(q['options']):
            f.write(f"   {chr(65+idx)}. {o}\n")
        f.write("\n")

pm_qs = [q for q in questions if q["id"].startswith("dle-pm")]
with open("scripts/pm_stems_opts.txt", "w", encoding="utf-8") as f:
    for q in pm_qs:
        f.write(f"[{q['id']}] {q['question']}\n")
        for idx, o in enumerate(q['options']):
            f.write(f"   {chr(65+idx)}. {o}\n")
        f.write("\n")

print(f"Dumped {len(resto_qs)} resto questions and {len(pm_qs)} PM questions.")
