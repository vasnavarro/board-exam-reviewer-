import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
questions = json.loads(m.group(1))

cats = {}
for q in questions:
    c = q["category"]
    cats[c] = cats.get(c, 0) + 1

for c, count in sorted(cats.items()):
    print(f"{c}: {count}")
