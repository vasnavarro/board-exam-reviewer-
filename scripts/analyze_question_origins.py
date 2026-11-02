import json
import re
from collections import Counter

with open("/home/gelo/board-exam-reviewer/src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    content = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", content, re.DOTALL)
questions = json.loads(m.group(1))

prefix_counter = Counter()
correct_index_counter = Counter()
generic_by_prefix = Counter()

for q in questions:
    qid = q.get("id", "")
    prefix = qid.split("-")[1] if "-" in qid else "unknown"
    prefix_counter[prefix] += 1
    correct_index_counter[q.get("correctIndex")] += 1
    
    exp = q.get("explanation", "")
    if "designated correct" in exp:
        generic_by_prefix[prefix] += 1

print("Prefix counts:", prefix_counter)
print("Generic explanation counts by prefix:", generic_by_prefix)
print("Correct index distribution:", correct_index_counter)
