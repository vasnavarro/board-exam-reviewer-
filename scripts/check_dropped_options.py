import json

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

import re
m = re.search(r"(\[.*\])", text, re.DOTALL)
qs = json.loads(m.group(1))

print(f"Total questions: {len(qs)}")

# Check for questions with < 4 options or where options might be missing
suspects = []
for q in qs:
    opts = q["options"]
    if len(opts) < 4:
        suspects.append((q["id"], q["category"], len(opts), q["question"][:60], opts))

print(f"Questions with less than 4 options: {len(suspects)}")
for s in suspects[:25]:
    print(f"[{s[0]}] ({s[1]} - {s[2]} opts): {s[3]} -> {s[4]}")
