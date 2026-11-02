import json
import re

# Load questions
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# Load keys
from generate_all_verified_rationales import MASTER_KEYS

print(f"Total questions: {len(questions)}")
print(f"Total verified master keys: {len(MASTER_KEYS)}")
