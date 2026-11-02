import subprocess
import shutil

for cmd in ["tesseract", "easyocr", "pdftotext"]:
    print(f"{cmd}: {shutil.which(cmd)}")
