import json
import re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
questions = json.loads(m.group(1))

print(f"Total questions in database: {len(questions)}")

# Check for anomalies:
# 1. Option count < 4
# 2. Options containing "C." or "D." or "B." embedded inside text (smashed options)
# 3. Duplicate options
# 4. Incomplete stems
smashed = []
few_opts = []
incomplete_stems = []

for q in questions:
    qid = q["id"]
    stem = q["question"]
    opts = q["options"]
    
    if len(opts) < 4:
        few_opts.append((qid, len(opts), stem[:50], opts))
        
    for i, opt in enumerate(opts):
        if re.search(r"\b[B-E][\.\)]\s*[A-Z]", opt):
            smashed.append((qid, i, opt))
            
    if stem.strip().endswith((" in", " the", " of", " a", " an", " is", " to")):
        incomplete_stems.append((qid, stem[-20:]))

print(f"\n1. Questions with smashed options (embedded B./C./D.): {len(smashed)}")
for s in smashed[:10]:
    print(f"   [{s[0]}] Opt {s[1]}: {s[2]}")

print(f"\n2. Questions with fewer than 4 options: {len(few_opts)}")
for f in few_opts[:10]:
    print(f"   [{f[0]}] ({f[1]} opts): {f[2]} -> {f[3]}")

print(f"\n3. Incomplete stems (cut off at trailing preposition): {len(incomplete_stems)}")
for inc in incomplete_stems[:10]:
    print(f"   [{inc[0]}]: ...{inc[1]}")

