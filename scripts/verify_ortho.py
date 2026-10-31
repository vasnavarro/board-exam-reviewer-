import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
questions = json.loads(m.group(1))

q = [x for x in questions if x["id"] == "dle-ortho-002"][0]
print(json.dumps(q, indent=2))

