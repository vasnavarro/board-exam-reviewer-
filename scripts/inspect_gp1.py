import json, re
with open('src/data/dentalQuestions.js', 'r', encoding='utf-8') as f:
    text = f.read()
m = re.search(r'(\[.*\])', text, re.DOTALL)
qs = json.loads(m.group(1))
gp1 = next(q for q in qs if q['id'] == 'dle-gp-001')
print(json.dumps(gp1, indent=2))

