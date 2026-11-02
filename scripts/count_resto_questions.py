import fitz
import re

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
questions = []
for pno in range(len(doc)):
    page = doc[pno]
    txt = page.get_text().strip()
    m = re.match(r"^(\d{1,3})\.\s*(.*)", txt)
    if m:
        qnum = int(m.group(1))
        questions.append((qnum, pno+1, m.group(2)[:40]))

print(f"Total numbered questions found in Resto: {len(questions)}")
print(f"Questions: {[q[0] for q in questions]}")
