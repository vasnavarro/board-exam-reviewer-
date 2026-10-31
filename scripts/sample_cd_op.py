import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
questions = json.loads(m.group(1))

cd_sample = [q for q in questions if q["category"] == "Community Dentistry"][:10]
op_sample = [q for q in questions if q["category"] == "Oral Pathology & Diagnosis"][:10]

print("=== COMMUNITY DENTISTRY FIRST 5 ===")
for q in cd_sample[:5]:
    print(f"[{q['id']}] Q: {q['question']}")
    print(f"     Options: {q['options']}")
    print(f"     Correct: {q['options'][q['correctIndex']]}")

print("\n=== ORAL PATHOLOGY FIRST 5 ===")
for q in op_sample[:5]:
    print(f"[{q['id']}] Q: {q['question']}")
    print(f"     Options: {q['options']}")
    print(f"     Correct: {q['options'][q['correctIndex']]}")
