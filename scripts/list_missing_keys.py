import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()
m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

with open("scripts/extracted_pdf_keys.json", "r", encoding="utf-8") as f:
    pdf_keys = json.load(f)
with open("scripts/extracted_ink_keys.json", "r", encoding="utf-8") as f:
    ink_keys = json.load(f)

all_extracted = {
    "dle-physio": ink_keys["physio"],
    "dle-pharma": ink_keys["pharma"],
    "dle-oh": pdf_keys["oh"],
    "dle-ortho": ink_keys["ortho"],
    "dle-oa": pdf_keys["oa"],
    "dle-ghm": ink_keys["ghm"],
    "dle-ga": pdf_keys["ga"],
    "dle-gp": pdf_keys["gp"]
}

missing_items = {}
for prefix, kdict in all_extracted.items():
    mod_qs = [q for q in questions if q["id"].startswith(prefix)]
    for q in mod_qs:
        num_str = q["id"].split("-")[-1]
        try:
            num = int(num_str)
        except:
            continue
        if str(num) not in kdict and num not in kdict:
            if prefix not in missing_items:
                missing_items[prefix] = []
            missing_items[prefix].append((num, q["question"], q["options"]))

for prefix, items in missing_items.items():
    print(f"\n=== {prefix} Missing Keys ({len(items)}) ===")
    for num, q, opts in items:
        print(f"  Q{num}: {q[:60]}")
        for idx, o in enumerate(opts):
            print(f"     {chr(65+idx)}. {o[:40]}")
