import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
qs = json.loads(m.group(1))

target = next((q for q in qs if "plasma protein concentration" in str(q).lower()), None)
if target:
    print(json.dumps(target, indent=2))
else:
    print("Not found!")

