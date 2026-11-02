import os
import time
from PIL import Image, ImageOps

start_time = time.time()
oct31 = sorted([f for f in os.listdir("reviewer_book") if "20261031" in f and f.endswith(".jpg")])
nov2 = sorted([f for f in os.listdir("reviewer_book") if "20261102" in f and f.endswith(".jpg")])

page_map = {}

# Pages 1 to 54
for p in range(1, 55):
    if p <= 7:
        idx = p
    elif p <= 44:
        idx = p + 1 # skip oct31[8] (retake of 7)
    else:
        idx = p + 2 # skip oct31[8] and oct31[46] (retake of 44)
    page_map[p] = oct31[idx]

page_map[55] = oct31[61]
page_map[56] = oct31[63]

# Pages 57 to 100
page_map[57] = nov2[0]
page_map[58] = nov2[1]
page_map[59] = nov2[2]
page_map[60] = nov2[3]
page_map[61] = nov2[6]

for p in range(62, 89):
    nov_idx = p - 62 + 7
    page_map[p] = nov2[nov_idx]

page_map[89] = nov2[35]

for p in range(90, 100):
    nov_idx = p - 90 + 36
    page_map[p] = nov2[nov_idx]

page_map[100] = nov2[46]

output_dir = "public/book"
os.makedirs(output_dir, exist_ok=True)

total_bytes = 0
for p in range(1, 101):
    f = page_map[p]
    src_path = os.path.join("reviewer_book", f)
    im = Image.open(src_path)
    im = ImageOps.exif_transpose(im)
    
    # If landscape, rotate 90 degrees counter-clockwise to make upright
    if im.width > im.height:
        im = im.rotate(90, expand=True)
    
    # Resize to max height 1600px while maintaining aspect ratio
    max_h = 1600
    if im.height > max_h:
        new_w = int(im.width * (max_h / im.height))
        im = im.resize((new_w, max_h), Image.Resampling.LANCZOS)
    
    dest_path = os.path.join(output_dir, f"page_{p:03d}.webp")
    im.save(dest_path, "WEBP", quality=82, method=6)
    
    sz = os.path.getsize(dest_path)
    total_bytes += sz
    if p % 10 == 0 or p == 100:
        print(f"Processed Page {p}/100 -> {dest_path} ({sz / 1024:.1f} KB)")

elapsed = time.time() - start_time
print(f"\nAll 100 pages successfully converted!")
print(f"Total size: {total_bytes / (1024 * 1024):.2f} MB")
print(f"Time taken: {elapsed:.2f} seconds")
