import fitz
import re

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")

# Print questions 1 to 20 slides
curr_q = 0
for pno in range(4, 35):
    page = doc[pno]
    txt = page.get_text().strip()
    m = re.search(r"^(\d{1,2})\.\s*(.*)", txt)
    if m:
        curr_q = int(m.group(1))
        print(f"\n[SLIDE {pno+1}] === Q{curr_q} ===")
        print(txt[:250].replace('\n', ' '))
    else:
        print(f"  [SLIDE {pno+1} EXPLANATION for Q{curr_q}]:")
        print("  ", txt[:200].replace('\n', ' '))
