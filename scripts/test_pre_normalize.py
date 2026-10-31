import re

s = "A. Liver\nB. Esophagus C.Oropharynx D.Pancreas"
# Pre-normalize:
# 1. Insert newline if [A-E]. is preceded by non-space
s_norm = re.sub(r"([^\s\n])([A-Ea-e])[\.\)]", r"\1\n\2. ", s)
# 2. Insert space if [A-E]. is followed by non-space
s_norm = re.sub(r"([A-Ea-e])[\.\)]([^\s\n])", r"\1. \2", s_norm)

print("Normalized:\n", s_norm)

opt_parts = re.split(r"(?:\n|^)\s*([A-Ea-e])[\.\)]\s*", "\n" + s_norm)
print("Parts:", opt_parts)
options = []
for j in range(1, len(opt_parts), 2):
    options.append((opt_parts[j], opt_parts[j+1].strip()))
print("Extracted options:", options)

