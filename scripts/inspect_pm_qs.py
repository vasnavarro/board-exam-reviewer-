import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()
m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

pm_qs = [q for q in questions if q["id"].startswith("dle-pm")]
print(f"Total PM questions: {len(pm_qs)}")
for q in pm_qs[:10]:
    print(f"[{q['id']}] {q['question']}")
    for idx, opt in enumerate(q['options']):
        print(f"   {chr(65+idx)}. {opt}")
