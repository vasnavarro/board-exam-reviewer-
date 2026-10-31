from PIL import Image

im = Image.open("reviewer_materials/5 - Pediatric Dentistry answer key.jfif")
im.save("scripts/pedia_key.png")
print("Saved pedia_key.png with size:", im.size)

