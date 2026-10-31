import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
qs = json.loads(m.group(1))

generic_patterns = [
    "does not satisfy the diagnostic criteria or statutory definition",
    "ruled out because it represents an alternate anatomical landmark",
    "does not correspond to the specific anatomical landmark",
    "does not represent the correct material property, preparation dimension"
]

generic_count = 0
by_category = {}

for q in qs:
    distractors = q.get("distractorRationales", {})
    # Check if all distractors have the same boilerplate pattern
    texts = list(distractors.values())
    is_generic = False
    if len(texts) > 1 and len(set(texts)) == 1:
        is_generic = True
    elif any(any(pat in t for pat in generic_patterns) for t in texts):
        is_generic = True
        
    if is_generic:
        generic_count += 1
        cat = q["category"]
        by_category[cat] = by_category.get(cat, 0) + 1

print(f"Total questions with generic/repeated distractor rationales: {generic_count} out of {len(qs)}")
print("Breakdown by category:")
for cat, count in by_category.items():
    print(f"  {cat}: {count}")
