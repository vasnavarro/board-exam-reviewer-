import glob

files_1031 = sorted([f for f in glob.glob("reviewer_book/IMG_20261031_*.jpg") if not f.endswith(":Zone.Identifier")])
files_1102 = sorted([f for f in glob.glob("reviewer_book/IMG_20261102_*.jpg") if not f.endswith(":Zone.Identifier")])

print(f"Oct 31 photos (Pages 1 to 30): {len(files_1031)}")
print(f"Nov 02 photos (Pages 31 to 100+): {len(files_1102)}")
print(f"Total: {len(files_1031) + len(files_1102)}")
