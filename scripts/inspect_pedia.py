from PIL import Image

im = Image.open("reviewer_materials/5 - Pediatric Dentistry answer key.jfif")
print("Pedia image size:", im.size, "format:", im.format, "mode:", im.mode)

