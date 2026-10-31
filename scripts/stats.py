import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    txt = f.read()

match = re.search(r"(\[.*\])", txt, re.DOTALL)
if match:
    data = json.loads(match.group(1))
    print(f"Total questions in dentalQuestions.js: {len(data)}")
    cats = {}
    for q in data:
        c = q.get("category", "Unknown")
        cats[c] = cats.get(c, 0) + 1
    for c, count in sorted(cats.items()):
        print(f"  - {c}: {count}")
    
    # check rationale quality
    sample = data[0]
    print("\nSample question:")
    print("ID:", sample.get("id"))
    print("Q:", sample.get("question")[:100])
    print("Explanation:", sample.get("explanation"))
    print("Distractors:", sample.get("distractorRationales"))
    print("Key takeaway:", sample.get("keyTakeaway"))

