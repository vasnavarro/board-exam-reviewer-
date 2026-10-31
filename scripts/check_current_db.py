import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
current = json.loads(m.group(1))
print("Current questions count:", len(current))
by_cat = {}
for q in current:
    by_cat[q["category"]] = by_cat.get(q["category"], 0) + 1
print("Categories in dentalQuestions.js:", by_cat)

