import fitz
import re

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
print("Resto pages:", len(doc))

resto_qs = []
seen = set()

for pno, page in enumerate(doc):
    text = page.get_text().strip()
    m = re.search(r"(?:^|\n)(\d{1,3})\.\s*([^\n]+(?:\n[^\n]+)?)", text)
    if not m:
        continue
    q_num = int(m.group(1))
    if q_num in seen or q_num > 120:
        continue
        
    stem = m.group(2).replace("\n", " ").strip()
    if len(stem) < 5 or "STEPS FOR PLACING" in stem:
        continue
        
    # Extract options: A, B, C, D, E
    opt_matches = re.findall(r"(?:^|\n)\s*([A-Ea-e])[\.\)]\s*([^\n]+)", text)
    if not opt_matches:
        continue
        
    opts_dict = {}
    for letter, val in opt_matches:
        l = letter.upper()
        if l not in opts_dict:
            cleaned = val.strip()
            # clean off trailing notes
            cleaned = re.sub(r"(?:Regeneration|DMF DENTAL|By:).*", "", cleaned).strip()
            if cleaned:
                opts_dict[l] = cleaned
                
    sorted_letters = sorted(opts_dict.keys())
    options = [opts_dict[l] for l in sorted_letters]
    
    if len(options) >= 2:
        seen.add(q_num)
        resto_qs.append({
            "num": q_num,
            "stem": stem,
            "options": options
        })

resto_qs.sort(key=lambda x: x["num"])
print(f"Total Resto questions parsed: {len(resto_qs)}")
for q in resto_qs[:5]:
    print(f"Q{q['num']}: {q['stem']} | Options: {q['options']}")

