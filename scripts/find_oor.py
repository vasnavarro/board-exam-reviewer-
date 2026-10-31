import json

with open("scripts/boilerplate_questions.json", "r", encoding="utf-8") as f:
    qs = json.load(f)

for i, q in enumerate(qs):
    c = q["correctIndex"]
    opts = q["options"]
    if c < 0 or c >= len(opts):
        print(f"OUT OF RANGE at index {i}: id={q['id']}, stem={q['question']}, correctIndex={c}, options={opts}")
