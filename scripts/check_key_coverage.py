import json
import re

# Load extracted keys
with open("scripts/extracted_pdf_keys.json", "r", encoding="utf-8") as f:
    pdf_keys = json.load(f)
with open("scripts/extracted_ink_keys.json", "r", encoding="utf-8") as f:
    ink_keys = json.load(f)

# Load dentalQuestions.js
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()
m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# Check coverage for each module
modules = {
    "dle-physio": ("physio", ink_keys["physio"]),
    "dle-pharma": ("pharma", ink_keys["pharma"]),
    "dle-oh": ("oh", pdf_keys["oh"]),
    "dle-ortho": ("ortho", ink_keys["ortho"]),
    "dle-oa": ("oa", pdf_keys["oa"]),
    "dle-ghm": ("ghm", ink_keys["ghm"]),
    "dle-ga": ("ga", pdf_keys["ga"]),
    "dle-gp": ("gp", pdf_keys["gp"])
}

for prefix, (kname, kdict) in modules.items():
    mod_qs = [q for q in questions if q["id"].startswith(prefix)]
    matched = 0
    missing = []
    for q in mod_qs:
        # get number from id
        num_str = q["id"].split("-")[-1]
        try:
            num = int(num_str)
        except:
            continue
        if str(num) in kdict or num in kdict:
            matched += 1
        else:
            missing.append((num, q["question"][:50]))
    print(f"[{prefix}] Total: {len(mod_qs)} | Extracted keys: {matched} | Missing: {len(missing)}")
    if missing:
        print(f"  First few missing: {missing[:3]}")
