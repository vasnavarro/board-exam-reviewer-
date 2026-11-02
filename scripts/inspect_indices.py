# Let's inspect filenames around index 20, 25, 30, 35 in nov2_files
import glob

files = sorted([f for f in glob.glob("reviewer_book/IMG_20261102_*.jpg") if not f.endswith(":Zone.Identifier")])
for i in [15, 20, 25, 30, 35, 40]:
    if i < len(files):
        print(f"File {i}: {files[i]}")
