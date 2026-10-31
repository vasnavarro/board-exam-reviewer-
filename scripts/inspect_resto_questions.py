import fitz
import re

doc = fitz.open("reviewer_materials/OCT 2026 Resto final coaching 2.pdf")
print("Total pages in Resto:", len(doc))

# Find all slides that start with a question number
found_qs = {}
for i, page in enumerate(doc):
    text = page.get_text().strip()
    m = re.match(r"^(\d{1,3})\.\s+(.*)", text, re.DOTALL)
    if m:
        q_num = int(m.group(1))
        if q_num not in found_qs:
            found_qs[q_num] = (i, text)

print(f"Total unique question slides found: {len(found_qs)}")
missing = [n for n in range(1, 101) if n not in found_qs]
print(f"Missing numbers in 1-100: {missing[:20]}")
# Print sample of missing numbers
for m_num in missing[:5]:
    # search where m_num is in text
    for i, page in enumerate(doc):
        t = page.get_text()
        if re.search(rf"\b{m_num}\.\s+", t):
            print(f"Found {m_num} on slide {i+1}: {repr(t[:100])}")
            break
