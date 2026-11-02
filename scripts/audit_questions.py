import json
import re

with open("/home/gelo/board-exam-reviewer/src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    content = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", content, re.DOTALL)
if not m:
    print("Could not match dentalQuestions")
    exit(1)

questions = json.loads(m.group(1))
print(f"Total questions: {len(questions)}")

generic_exp_count = 0
generic_dist_count = 0
lecture_note_corrupt_count = 0

sample_generic = []

for idx, q in enumerate(questions):
    exp = q.get("explanation", "")
    dist = q.get("distractorRationales", {})
    
    is_gen_exp = False
    if "Lecture Note Context:" in exp:
        lecture_note_corrupt_count += 1
    if "designated correct" in exp or "statutory definition" in exp or "Lecture Note Context:" in exp:
        is_gen_exp = True
        generic_exp_count += 1
        if len(sample_generic) < 10:
            sample_generic.append((q.get("id"), q.get("question"), exp))
            
    is_gen_dist = False
    for k, v in dist.items():
        if ("does not satisfy" in v or "statutory definition" in v or 
            "alternate diagnostic entity" in v or "secondary differential" in v or
            "biological mechanism, anatomical trajectory" in v):
            is_gen_dist = True
            break
    if is_gen_dist:
        generic_dist_count += 1

print(f"Questions with 'Lecture Note Context:' corruption: {lecture_note_corrupt_count}")
print(f"Questions with generic/placeholder explanation: {generic_exp_count}")
print(f"Questions with generic distractor rationales: {generic_dist_count}")
print("\nSample questions with issues:")
for sid, sq, sexp in sample_generic:
    print(f"- [{sid}] {sq[:60]}... => {sexp[:100]}...")
