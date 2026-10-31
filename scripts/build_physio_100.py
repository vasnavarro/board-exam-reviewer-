import re

with open("scripts/physio_full_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

lines = text.split("\n")
clean_lines = []
for line in lines:
    l = line.strip()
    if not l: continue
    if "DMF DENTAL TRAINING CENTER" in l or "General Physiology" in l or "By: Mickhail" in l or "---PAGE_" in l:
        continue
    clean_lines.append(l)

clean_text = "\n".join(clean_lines)
raw_blocks = re.split(r"(?:\n|^)(\d{1,3})\.\s+", "\n" + clean_text)

questions = []
for i in range(1, len(raw_blocks), 2):
    q_num = int(raw_blocks[i])
    q_body = raw_blocks[i+1].strip()
    opt_parts = re.split(r"(?:\n|^)([A-Da-d])[\.\)]\s+", "\n" + q_body)
    stem = opt_parts[0].strip().replace("\n", " ")
    options = []
    for j in range(1, len(opt_parts), 2):
        options.append(opt_parts[j+1].strip().replace("\n", " "))
    questions.append({
        "num": q_num,
        "stem": stem,
        "options": options
    })

print(f"Total extracted: {len(questions)}")
with open("scripts/physio_parsed_100.json", "w", encoding="utf-8") as f:
    import json
    json.dump(questions, f, indent=2)
print("Saved to scripts/physio_parsed_100.json")

