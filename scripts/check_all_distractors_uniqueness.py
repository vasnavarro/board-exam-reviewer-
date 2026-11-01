import json, re
from collections import Counter

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
qs = json.loads(m.group(1))

print(f"Total questions in database: {len(qs)}")

# Check for duplicate distractor texts within the same question
intra_q_dupes = 0
for q in qs:
    distractors = list(q.get("distractorRationales", {}).values())
    if len(distractors) != len(set(distractors)):
        intra_q_dupes += 1

print(f"Questions with duplicate distractor rationales inside the same question: {intra_q_dupes}")

# Check for most frequent distractor strings across the entire DB
all_dist_texts = []
for q in qs:
    for d in q.get("distractorRationales", {}).values():
        all_dist_texts.append(d)

counts = Counter(all_dist_texts)
print(f"Total distractor rationales across DB: {len(all_dist_texts)}")
print(f"Unique distractor rationales: {len(counts)}")
print("\nTop 5 most frequent distractor strings:")
for txt, cnt in counts.most_common(5):
    print(f"  [{cnt} times]: {txt[:90]}...")

