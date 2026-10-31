import re

s = "A. Liver\nB. Esophagus C.Oropharynx D.Pancreas"
s_norm = re.sub(r"(?:\s*|^)([A-Ea-e])[\.\)]\s*", r"\n\1. ", s)
print("Normalized:\n", s_norm)

opt_parts = re.split(r"(?:\n|^)\s*([A-Ea-e])[\.\)]\s*", "\n" + s_norm)
options = []
for j in range(1, len(opt_parts), 2):
    options.append((opt_parts[j], opt_parts[j+1].strip()))
print("Extracted options:", options)
