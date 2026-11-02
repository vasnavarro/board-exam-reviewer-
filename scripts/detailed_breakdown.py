import json
import re

with open("/home/gelo/board-exam-reviewer/src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    content = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", content, re.DOTALL)
questions = json.loads(m.group(1))

good_questions = []
bad_questions = []

for q in questions:
    exp = q.get("explanation", "")
    is_generic = (
        "is the designated correct" in exp or 
        "is the designated operative standard" in exp or
        "is the designated answer under" in exp or
        "statutory definition" in exp
    )
    if is_generic:
        bad_questions.append(q)
    else:
        good_questions.append(q)

print(f"Good/Curated questions: {len(good_questions)}")
print(f"Generic/Broken questions: {len(bad_questions)}")

# Check category breakdown of bad questions
cat_breakdown = {}
for q in bad_questions:
    cat = q.get("category", "Unknown")
    cat_breakdown[cat] = cat_breakdown.get(cat, 0) + 1

print("\nBreakdown of broken questions by category:")
for cat, count in sorted(cat_breakdown.items(), key=lambda x: -x[1]):
    print(f"  {cat}: {count}")
