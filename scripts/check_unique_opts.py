import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# Check unique options
broken_qs = [q for q in questions if not (q["id"].startswith("dle-cd-") or q["id"].startswith("dle-op-") or q["id"].startswith("dle-dmf-"))]
print(f"Total questions needing real rationales: {len(broken_qs)}")

all_opts = set()
for q in broken_qs:
    for o in q["options"]:
        all_opts.add(o.strip().lower())

print(f"Total unique option strings: {len(all_opts)}")
