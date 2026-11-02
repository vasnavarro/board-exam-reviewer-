import json
import re

with open("src/data/dentalQuestions.js") as f:
    qs = json.loads(re.search(r"(\[.*\])", f.read(), re.DOTALL).group(1))

smashed = []
for q in qs:
    opts = q.get("options", [])
    if len(opts) > 5 or any(len(o.strip()) <= 3 for o in opts if o.strip() not in ["I", "II", "III", "IV", "V", "A", "B", "C", "D", "E"]):
        smashed.append((q["id"], len(opts), opts))

print(f"Total questions with broken/smashed options: {len(smashed)}")
for sid, slen, sopts in smashed[:15]:
    print(f"- [{sid}] ({slen} opts): {sopts}")
