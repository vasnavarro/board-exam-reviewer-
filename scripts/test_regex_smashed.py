import re

s = "A. Liver B. Esophagus C.Oropharynx D.Pancreas"
parts = re.split(r"(?:^|\n|\s+|(?<=[a-zA-Z0-9\)]\s*))([A-Ea-e])[\.\)]\s*", s)
print("Parts:", parts)
options = []
for j in range(1, len(parts), 2):
    options.append((parts[j], parts[j+1].strip()))
print("Extracted options:", options)
