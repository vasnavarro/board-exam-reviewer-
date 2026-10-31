import pytesseract
from PIL import Image

try:
    text = pytesseract.image_to_string(Image.open('reviewer_materials/5 - Pediatric Dentistry answer key.jfif'))
    print("OCR text length:", len(text))
    print(text[:400])
except Exception as e:
    print("Error:", e)

