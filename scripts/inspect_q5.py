import json
import re

with open("src/data/dentalQuestions.js") as f:
    qs = json.loads(re.search(r"(\[.*\])", f.read(), re.DOTALL).group(1))

for q in qs:
    if q["id"] == "dle-physio-005":
        print(q["question"])
        for i, o in enumerate(q["options"]):
            print(f"{i}: {o}")
        print("correctIndex:", q["correctIndex"])
