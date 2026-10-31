import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
qs = json.loads(m.group(1))

for qid in ["dle-oa-027", "dle-oa-058", "dle-oh-008", "dle-oh-065", "dle-oh-074"]:
    q = next((item for item in qs if item["id"] == qid), None)
    if q:
        print(f"=== {qid} ===")
        print("Stem:", q["question"])
        print("Options:", q["options"])
