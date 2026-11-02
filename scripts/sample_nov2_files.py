import glob

files = sorted([f for f in glob.glob("reviewer_book/IMG_20261102_*.jpg") if not f.endswith(":Zone.Identifier")])
print(f"Total Nov 2 photos: {len(files)}")
# Let's print every 5th file to get an idea of the timeline
for i, f in enumerate(files):
    if i % 5 == 0 or i == len(files) - 1:
        print(f"Index {i:2d}: {f}")
