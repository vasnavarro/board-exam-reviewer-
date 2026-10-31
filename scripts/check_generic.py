import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
data = json.loads(m.group(1))

generic = 0
for q in data:
    s = str(q.get("distractorRationales", {}))
    if "is ruled out under" in s or "does not match the histopathological" in s or "does not present the diagnostic" in s:
        generic += 1

print(f"Generic distractor rationales: {generic} out of {len(data)}")

# Let's inspect the DENV question that the user showed in the screenshot:
for q in data:
    if "DENV" in str(q):
        print("Found DENV question:")
        print("Stem:", q.get("question"))
        print("Options:", q.get("options"))
        print("Distractors:", q.get("distractorRationales"))
        print("Explanation:", q.get("explanation"))
