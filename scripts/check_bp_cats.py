import json

with open("scripts/boilerplate_questions.json", "r", encoding="utf-8") as f:
    qs = json.load(f)

cats = {}
for q in qs:
    c = q["category"]
    cats[c] = cats.get(c, 0) + 1

for c, count in sorted(cats.items()):
    print(f"{c}: {count}")

