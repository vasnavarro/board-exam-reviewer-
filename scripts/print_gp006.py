import json
import re

with open("src/data/dentalQuestions.js") as f:
    qs = json.loads(re.search(r"(\[.*\])", f.read(), re.DOTALL).group(1))

for q in qs:
    if q["id"] == "dle-gp-006":
        print(json.dumps(q, indent=2))
