import fitz

doc = fitz.open("reviewer_materials/3 - General Pathology rationale.pdf")
page = doc[7]
imgs = page.get_images()
print("Images count on slide 8:", len(imgs))
for img in imgs:
    print(img)
