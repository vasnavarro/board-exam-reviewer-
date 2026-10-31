import fitz
import re

doc = fitz.open("reviewer_materials/2- General Anatomy rationale.pdf")
print("GA pages:", len(doc))

ga_qs = []
for pno in range(1, len(doc)):
    text = doc[pno].get_text().strip()
    # find question number and stem: e.g. "1. Which among these..."
    m = re.search(r"(\d{1,3})\.\s*\n?([^\n]+(?:\n[^\n]+)?)", text)
    if not m:
        continue
    q_num = int(m.group(1))
    stem = m.group(2).replace("\n", " ").strip()
    
    # Extract options: A, B, C, D, E
    opt_matches = re.findall(r"([A-Ea-e])\.\s*\n?([^\n]+)", text)
    # Deduplicate and sort by letter
    opts_dict = {}
    for letter, val in opt_matches:
        l = letter.upper()
        if l not in opts_dict:
            # make sure val doesn't contain the question stem
            cleaned_val = re.sub(r"\d{1,3}\..*", "", val).strip()
            if cleaned_val:
                opts_dict[l] = cleaned_val
                
    # Sort A, B, C, D, E
    sorted_letters = sorted(opts_dict.keys())
    options = [opts_dict[l] for l in sorted_letters]
    
    if len(options) >= 2:
        ga_qs.append({
            "num": q_num,
            "stem": stem,
            "options": options
        })

print(f"Total GA questions parsed: {len(ga_qs)}")
for q in ga_qs[:5]:
    print(f"Q{q['num']}: {q['stem']} | Options: {q['options']}")
