import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
questions = json.loads(m.group(1))

boilerplate_qs = []
for q in questions:
    dist_str = json.dumps(q.get("distractorRationales", {}))
    if "is ruled out under" in dist_str or "does not match the histopathological" in dist_str or "does not present the diagnostic" in dist_str:
        boilerplate_qs.append(q)

print(f"Total questions with boilerplate rationales: {len(boilerplate_qs)}")
with open("scripts/boilerplate_questions.json", "w", encoding="utf-8") as f:
    json.dump(boilerplate_qs, f, indent=2)
print("Saved to scripts/boilerplate_questions.json")
