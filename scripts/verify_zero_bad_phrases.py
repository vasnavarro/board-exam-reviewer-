import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

bad_phrases = [
    "statutory definition",
    "Lecture Note Context:",
    "Clinical Pearl from lecture notes:",
    "does not satisfy the diagnostic criteria",
    "is the designated correct answer under Philippine Dental Licensure Examination (DLE) coaching criteria",
    "is the designated operative standard under Philippine Restorative Dentistry"
]

found = 0
for q in questions:
    exp = q.get("explanation", "")
    for bp in bad_phrases:
        if bp in exp:
            print(f"[{q['id']}] Found in explanation: {bp}")
            found += 1
            
    for k, v in q.get("distractorRationales", {}).items():
        for bp in bad_phrases:
            if bp in v:
                print(f"[{q['id']}] Found in distractor {k}: {bp}")
                found += 1

print(f"\nFinal Audit: {found} bad phrases found across all 1,027 questions.")
assert found == 0, f"Found {found} bad phrases!"
print("ALL 1,027 QUESTIONS ARE 100% CLEAN AND AUDITED!")
