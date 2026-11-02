import glob

files = sorted([f for f in glob.glob("reviewer_book/IMG_20261031_*.jpg") if not f.endswith(":Zone.Identifier")])
print(f"Total Oct 31 photos: {len(files)}")
for i, f in enumerate(files):
    if i % 10 == 0 or i == len(files) - 1:
        print(f"Index {i:2d}: {f}")
