import json

with open("scripts/physio_parsed_100.json", "r", encoding="utf-8") as f:
    qs = json.load(f)

for q in qs:
    if len(q["options"]) != 4:
        print(f"Q{q['num']}: has {len(q['options'])} options: {q['options']}")

