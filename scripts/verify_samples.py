import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
qs = json.loads(m.group(1))

print("=== SAMPLE 1: dle-cd-001 ===")
cd1 = next(q for q in qs if q['id'] == 'dle-cd-001')
print(json.dumps(cd1, indent=2))

print("\n=== SAMPLE 2: dle-op-001 ===")
op1 = next(q for q in qs if q['id'] == 'dle-op-001')
print(json.dumps(op1, indent=2))

print("\n=== SAMPLE 3: dle-dmf-001 ===")
dmf1 = next(q for q in qs if q['id'] == 'dle-dmf-001')
print(json.dumps(dmf1, indent=2))

print("\n=== SAMPLE 4: dle-pharma-001 ===")
pharma1 = next(q for q in qs if q['id'] == 'dle-pharma-001')
print(json.dumps(pharma1, indent=2))

