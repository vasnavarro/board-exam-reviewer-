import re
import json

with open("scripts/physio_full_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Remove page header lines like "---PAGE_1---", "DMF DENTAL TRAINING CENTER 2", etc.
lines = text.split("\n")
clean_lines = []
for line in lines:
    l = line.strip()
    if not l:
        continue
    if "DMF DENTAL TRAINING CENTER" in l or "General Physiology" in l or "By: Mickhail" in l or "---PAGE_" in l:
        continue
    clean_lines.append(l)

clean_text = "\n".join(clean_lines)

# Split by question number: e.g. "1. ", "2. ", ...
# Notice regex: r"(?:\n|^)(\d{1,3})\.\s+"
raw_blocks = re.split(r"(?:\n|^)(\d{1,3})\.\s+", "\n" + clean_text)
# raw_blocks will have [header, "1", text_for_1, "2", text_for_2, ...]

parsed_questions = []
for i in range(1, len(raw_blocks), 2):
    q_num = int(raw_blocks[i])
    q_body = raw_blocks[i+1].strip()
    
    # Extract options: look for A., B., C., D. (or a., b., c., d.)
    # Split options
    opt_parts = re.split(r"(?:\n|^)([A-Da-d])[\.\)]\s+", "\n" + q_body)
    stem = opt_parts[0].strip().replace("\n", " ")
    
    options = []
    for j in range(1, len(opt_parts), 2):
        opt_letter = opt_parts[j].upper()
        opt_val = opt_parts[j+1].strip().replace("\n", " ")
        options.append(opt_val)
        
    parsed_questions.append({
        "q_num": q_num,
        "stem": stem,
        "options": options
    })

print(f"Successfully parsed {len(parsed_questions)} questions from text!")
for q in parsed_questions[:5]:
    print(f"Q{q['q_num']}: {q['stem']}")
    print(f"   Options: {q['options']}")
print("...")
for q in parsed_questions[-5:]:
    print(f"Q{q['q_num']}: {q['stem']}")
    print(f"   Options: {q['options']}")

