import fitz
import json
import re

doc = fitz.open("reviewer_materials/1-General Physiology rationale.pdf")

with open("scripts/physio_parsed_100.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# Let's inspect page by page
# On each page, find the question numbers, find the option positions, and find where blue ink annotations are centered
results = []
for pno in range(len(doc)):
    page = doc[pno]
    annots = [a for a in page.annots() or [] if a.type[0] == 15] # ink annots
    text_page = page.get_text("words")
    
    # print summary
    print(f"Page {pno+1}: {len(annots)} ink annots")

