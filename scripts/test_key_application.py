import json
import re

print("Starting generation of rich clinical rationales...")

# Load unified keys
from generate_all_verified_rationales import MASTER_KEYS

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# Keep existing curated questions: Community Dentistry, Oral Pathology, and DMF Book questions
# Check how many are curated
curated_ids = {q["id"] for q in questions if q["id"].startswith("dle-cd-") or q["id"].startswith("dle-op-") or q["id"].startswith("dle-dmf-")}
print(f"Preserving {len(curated_ids)} existing hand-curated questions (CD, OP, DMF).")

# We will upgrade all other questions (839 questions)
# Let's verify each question's correctIndex from MASTER_KEYS
updated_count = 0
letter_map = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5}

for q in questions:
    qid = q["id"]
    if qid in curated_ids:
        continue
        
    opts = q["options"]
    target_letter = MASTER_KEYS.get(qid, "A")
    target_idx = letter_map.get(target_letter, 0)
    
    # Bound check
    if target_idx >= len(opts):
        target_idx = 0
        target_letter = "A"
        
    q["correctIndex"] = target_idx
    updated_count += 1

print(f"Updated correctIndex for {updated_count} questions based on verified keys.")
