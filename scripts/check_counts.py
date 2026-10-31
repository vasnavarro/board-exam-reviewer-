import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
questions = json.loads(m.group(1))
print("Loaded", len(questions), "questions.")

# Count how many have generic rationales
generic_count = 0
for q in questions:
    dist_str = json.dumps(q.get("distractorRationales", {}))
    if "is ruled out under" in dist_str or "does not match the histopathological" in dist_str:
        generic_count += 1

print(f"{generic_count} questions have boilerplate distractors that need real dental clinical explanations.")

