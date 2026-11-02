import os
import glob

files = [f for f in glob.glob("reviewer_book/*.jpg") if not f.endswith(":Zone.Identifier")]
files.sort()
print(f"Total jpg files in reviewer_book: {len(files)}")
print("First 5 files:")
for f in files[:5]:
    print(" ", f)
print("Last 5 files:")
for f in files[-5:]:
    print(" ", f)
