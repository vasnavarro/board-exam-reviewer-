import json

with open("scripts/boilerplate_questions.json", "r", encoding="utf-8") as f:
    qs = json.load(f)

for q in qs[50:70]:
    print(f"'{q['id']}': {{")
    print(f"    'stem': {repr(q['question'])},")
    print(f"    'options': {repr(q['options'])},")
    print(f"    'correct': {q['correctIndex']}")
    print("},")
