import json
import re

with open("/home/gelo/board-exam-reviewer/src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    content = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", content, re.DOTALL)
questions = json.loads(m.group(1))

broken_by_cat = {}
for idx, q in enumerate(questions):
    exp = q.get("explanation", "")
    is_broken = (
        "is the designated correct" in exp or 
        "is the designated operative standard" in exp or
        "is the designated answer under" in exp or
        "statutory definition" in exp or
        "Lecture Note Context:" in exp
    )
    if is_broken:
        cat = q.get("category")
        if cat not in broken_by_cat:
            broken_by_cat[cat] = []
        broken_by_cat[cat].append((idx, q["id"], q["question"], q["options"]))

for cat, items in broken_by_cat.items():
    print(f"=== {cat}: {len(items)} items ===")
    print(f"First item: ID={items[0][1]}, Q={items[0][2][:60]}")
    print(f"Last item:  ID={items[-1][1]}, Q={items[-1][2][:60]}")
