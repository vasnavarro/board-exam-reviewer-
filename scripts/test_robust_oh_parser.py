import fitz
import re

doc = fitz.open("reviewer_materials/7 - Oral Histology and Embryology answer key.pdf")
full_text = ""
for page in doc:
    full_text += page.get_text() + "\n"

# Remove header lines
lines = [l.strip() for l in full_text.split("\n") if l.strip() and "ORAL HISTOLOGY" not in l and "REE t" not in l]
clean_text = "\n".join(lines)

raw_blocks = re.split(r"(?:\n|^)(\d{1,3})\.\s+", "\n" + clean_text)
parsed_oh = []

for i in range(1, len(raw_blocks), 2):
    q_num = int(raw_blocks[i])
    q_body = raw_blocks[i+1].strip()
    
    # Split options using lookahead for option letters: matches A., B., C., D., E. even if inline
    opt_parts = re.split(r"(?:^|\n|\s{2,}|\s(?=[A-Ea-e][\.\)]\s*))([A-Ea-e])[\.\)]\s+", q_body)
    stem = opt_parts[0].strip().replace("\n", " ")
    
    options = []
    for j in range(1, len(opt_parts), 2):
        options.append(opt_parts[j+1].strip().replace("\n", " "))
        
    parsed_oh.append({
        "num": q_num,
        "stem": stem,
        "options": options
    })

print(f"Total OH questions parsed: {len(parsed_oh)}")
# Check Q6 (which was smashed before)
q6 = next(q for q in parsed_oh if q["num"] == 6)
print(f"Q6: {q6['stem']}")
print(f"Q6 Options ({len(q6['options'])}): {q6['options']}")

# Check how many have less than 4 options now
few = [q for q in parsed_oh if len(q["options"]) < 4]
print(f"OH questions with < 4 options: {len(few)}")
for f in few:
    print(f"  Q{f['num']}: {f['options']}")
