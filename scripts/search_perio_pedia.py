import glob
import os

print("Searching for any files containing Periodontics or Pediatric Dentistry...")
for root, dirs, files in os.walk("."):
    if "node_modules" in root or ".git" in root or "dist" in root:
        continue
    for f in files:
        if f.endswith((".txt", ".json", ".js", ".jsx", ".md")):
            p = os.path.join(root, f)
            try:
                with open(p, "r", encoding="utf-8", errors="ignore") as fl:
                    cnt = fl.read()
                    if "Periodontics" in cnt or "Periodontal" in cnt:
                        matches = cnt.count("Periodont")
                        print(f"File {p} has {matches} 'Periodont' matches")
            except Exception:
                pass

