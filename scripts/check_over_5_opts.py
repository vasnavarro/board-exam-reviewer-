import json
import re

with open("src/data/dentalQuestions.js") as f:
    qs = json.loads(re.search(r"(\[.*\])", f.read(), re.DOTALL).group(1))

over_5 = [q for q in qs if len(q.get("options", [])) > 5]
print(f"Total questions with > 5 options: {len(over_5)}")
for q in over_5:
    print(f"[{q['id']}] {q['question'][:50]}")
    for i, o in enumerate(q['options']):
        print(f"  {i}: {o}")
