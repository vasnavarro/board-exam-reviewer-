import json

with open("scripts/boilerplate_questions.json", "r", encoding="utf-8") as f:
    qs = json.load(f)

for i, q in enumerate(qs):
    c = q["correctIndex"]
    opts = q["options"]
    opts_str = " | ".join([f"[{idx}] {o}" for idx, o in enumerate(opts)])
    correct_text = opts[c] if 0 <= c < len(opts) else f"INVALID_INDEX_{c}"
    print(f"{i+1:3d}. [ID: {q['id']}] [{q['category']}]")
    print(f"     Stem: {q['question']}")
    print(f"     Options: {opts_str}")
    print(f"     Correct: [{c}] {correct_text}")
    print()
