import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

cats = sorted(list(set(re.findall(r'"category":\s*"([^"]+)"', text))))
print(f"Total categories: {len(cats)}")
for c in cats:
    count = len(re.findall(r'"category":\s*"' + re.escape(c) + r'"', text))
    print(f"  - {c}: {count} questions")
