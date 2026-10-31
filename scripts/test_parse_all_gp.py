import fitz
import re

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
print("Total pages in Gen Path:", len(doc))

parsed_questions = []

for pno in range(1, len(doc)):
    page = doc[pno]
    text = page.get_text()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if not lines: continue
    
    # Check if first line or second line has question number
    m = re.match(r"^(\d{1,3})\.\s*(.*)", lines[0])
    if not m:
        continue
    q_num = int(m.group(1))
    first_stem_line = m.group(2)
    
    stem_lines = [first_stem_line] if first_stem_line else []
    curr_line_idx = 1
    
    # Accumulate stem lines until we hit an option line starting with A. or A)
    while curr_line_idx < len(lines):
        line = lines[curr_line_idx]
        if re.match(r"^[A-Ea-e][\.\)]\s*", line):
            break
        stem_lines.append(line)
        curr_line_idx += 1
        
    stem = " ".join(stem_lines).strip()
    
    # Now extract options A, B, C, D, E
    options_dict = {}
    while curr_line_idx < len(lines):
        line = lines[curr_line_idx]
        opt_match = re.match(r"^([A-Ea-e])[\.\)]\s*(.*)", line)
        if opt_match:
            letter = opt_match.group(1).upper()
            val = opt_match.group(2).strip()
            # If val is empty, it might be on the next line
            if not val and curr_line_idx + 1 < len(lines):
                val = lines[curr_line_idx + 1].strip()
                curr_line_idx += 1
            options_dict[letter] = val
            curr_line_idx += 1
        else:
            # Reached lecture notes / drawings
            break
            
    # Remaining lines are the lecture notes!
    notes_lines = lines[curr_line_idx:]
    notes_text = " | ".join(notes_lines)
    
    # Detect green highlight for correct answer
    green_letter = None
    drawings = page.get_drawings()
    green_drawings = [d for d in drawings if d.get("color") and len(d["color"]) >= 3 and d["color"][1] > 0.8 and d["color"][2] < 0.2]
    if green_drawings:
        words = page.get_text("words")
        for gd in green_drawings:
            g_rect = fitz.Rect(gd["rect"])
            for w in words:
                if w[4] in ["A.", "B.", "C.", "D.", "E."]:
                    if abs(w[1] - g_rect.y0) < 25:
                        green_letter = w[4][0]
                        break
            if green_letter:
                break
                
    sorted_letters = sorted(options_dict.keys())
    options = [options_dict[l] for l in sorted_letters]
    
    if len(options) >= 2:
        parsed_questions.append({
            "num": q_num,
            "stem": stem,
            "options": options,
            "letters": sorted_letters,
            "green_key": green_letter,
            "notes": notes_text
        })

print(f"Total clean Gen Path questions parsed: {len(parsed_questions)}")
for q in parsed_questions[:5]:
    print(f"\nQ{q['num']}: {q['stem']}")
    print(f"  Options: {q['options']}")
    print(f"  Green Key: {q['green_key']}")
    print(f"  Notes preview: {q['notes'][:80]}")

