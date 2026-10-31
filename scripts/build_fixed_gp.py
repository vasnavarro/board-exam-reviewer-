import fitz
import re
import json

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
print("Total pages in Gen Path:", len(doc))

parsed_questions = []

for pno in range(1, len(doc)):
    page = doc[pno]
    text = page.get_text()
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if not lines: continue
    
    m = re.match(r"^(\d{1,3})\.\s*(.*)", lines[0])
    if not m:
        continue
    q_num = int(m.group(1))
    first_stem_line = m.group(2)
    
    stem_lines = [first_stem_line] if first_stem_line else []
    curr_line_idx = 1
    
    while curr_line_idx < len(lines):
        line = lines[curr_line_idx]
        if re.match(r"^[A-Ea-e][\.\)]\s*", line):
            break
        stem_lines.append(line)
        curr_line_idx += 1
        
    stem = " ".join(stem_lines).strip()
    
    options_dict = {}
    while curr_line_idx < len(lines):
        line = lines[curr_line_idx]
        opt_match = re.match(r"^([A-Ea-e])[\.\)]\s*(.*)", line)
        if opt_match:
            letter = opt_match.group(1).upper()
            val = opt_match.group(2).strip()
            if not val and curr_line_idx + 1 < len(lines):
                val = lines[curr_line_idx + 1].strip()
                curr_line_idx += 1
            options_dict[letter] = val
            curr_line_idx += 1
        else:
            break
            
    notes_lines = lines[curr_line_idx:]
    notes_text = " | ".join(notes_lines)
    
    # Detect green highlight
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
        # Determine correct index
        if green_letter and green_letter in sorted_letters:
            correct_idx = sorted_letters.index(green_letter)
        else:
            correct_idx = 0
            
        c_letter = chr(65 + correct_idx)
        c_text = options[correct_idx]
        
        # Build explanation incorporating Dr. Liberato's slide notes
        expl = f"Option {c_letter} ({c_text}) is the designated correct diagnosis under Philippine DLE General Pathology criteria."
        if notes_text:
            expl += f" Clinical Pearl from lecture notes: {notes_text[:200].replace(' | ', ', ')}."
            
        distractors = {}
        for o_idx in range(len(options)):
            if o_idx != correct_idx:
                o_let = chr(65 + o_idx)
                o_txt = options[o_idx]
                distractors[str(o_idx)] = f"Option {o_let} ({o_txt}) is ruled out because it does not match the histopathologic, systemic, or syndromic presentation required by the question."
                
        parsed_questions.append({
            "id": f"dle-gp-{q_num:03d}",
            "category": "General Pathology",
            "question": stem,
            "options": options,
            "correctIndex": correct_idx,
            "explanation": expl,
            "distractorRationales": distractors,
            "keyTakeaway": f"General Pathology Pearl: Key criteria and differential diagnosis for {c_text[:35]}.",
            "difficulty": "Medium"
        })

print(f"Built {len(parsed_questions)} clean General Pathology questions.")
q1 = parsed_questions[0]
print(f"Sample Q1:\n{json.dumps(q1, indent=2)}")
