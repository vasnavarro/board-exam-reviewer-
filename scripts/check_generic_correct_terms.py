import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# Check the correct answer text for questions where explanation still has "is the designated correct"
generic_qs = [q for q in questions if "is the designated correct" in q.get("explanation", "")]
print(f"Total questions with 'is the designated correct': {len(generic_qs)}")

# Let's inspect some of these correct answers
samples = []
for q in generic_qs[:20]:
    c_idx = q["correctIndex"]
    c_txt = q["options"][c_idx]
    samples.append((q["id"], q["question"][:50], c_txt))

for sid, sq, sc in samples:
    print(f"- [{sid}] {sq} => {sc}")
