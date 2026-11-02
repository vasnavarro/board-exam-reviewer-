import json
import re

# Load questions
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# Let's inspect a few questions from each category to see stems and options
by_cat = {}
for q in questions:
    c = q["category"]
    if c not in by_cat:
        by_cat[c] = []
    by_cat[c].append(q)

print("Categories and counts:")
for c, qs in by_cat.items():
    print(f"  {c}: {len(qs)}")
