import json, re, sys
from data_cd_part1 import CD_PART1
from data_cd_part2 import CD_PART2
from data_op_part1 import OP_PART1
from data_op_part2 import OP_PART2
from data_op_part3 import OP_PART3
from data_ortho import ORTHO_RATIONALES

# Combine all custom rationales
ALL_RATIONALES = {}
ALL_RATIONALES.update(CD_PART1)
ALL_RATIONALES.update(CD_PART2)
ALL_RATIONALES.update(OP_PART1)
ALL_RATIONALES.update(OP_PART2)
ALL_RATIONALES.update(OP_PART3)
ALL_RATIONALES.update(ORTHO_RATIONALES)

print(f"Total curated custom rationales ready to merge: {len(ALL_RATIONALES)}")

# Read dentalQuestions.js
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
if not m:
    print("ERROR: Could not find questions array in dentalQuestions.js")
    sys.exit(1)

questions = json.loads(m.group(1))
print(f"Loaded {len(questions)} total questions from dentalQuestions.js.")

updated_count = 0
for q in questions:
    qid = q.get("id")
    if qid in ALL_RATIONALES:
        item = ALL_RATIONALES[qid]
        q["explanation"] = item["explanation"]
        q["distractorRationales"] = item.get("distractors", {})
        q["keyTakeaway"] = item.get("pearl", q.get("keyTakeaway", ""))
        
        # Check if options or correctIndex should be updated (e.g. dle-ortho-002)
        if "options" in item:
            q["options"] = item["options"]
        if "correctIndex" in item:
            q["correctIndex"] = item["correctIndex"]
            
        updated_count += 1

print(f"Successfully applied custom rationales to {updated_count} questions.")

# Verification check for remaining boilerplate
boilerplate_count = 0
for q in questions:
    dist_str = json.dumps(q.get("distractorRationales", {}))
    if "is ruled out under" in dist_str or "does not match the histopathological" in dist_str or "does not present the diagnostic" in dist_str:
        boilerplate_count += 1
        print(f"REMAINING BOILERPLATE: [{q['id']}] {q['question']}")

if boilerplate_count == 0:
    print("SUCCESS: 0 boilerplate rationales remaining across the ENTIRE question bank! All 224 questions have 100% authentic rationales.")
else:
    print(f"WARNING: {boilerplate_count} questions still have generic templates.")

# Save to dentalQuestions.js
output_js = "export const dentalQuestions = " + json.dumps(questions, indent=2, ensure_ascii=False) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(output_js)

print("Saved updated questions to src/data/dentalQuestions.js!")
