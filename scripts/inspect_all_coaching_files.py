import os, glob, docx
import fitz

files = sorted(glob.glob("reviewer_materials/*"))
print(f"Total files: {len(files)}")

for f in files:
    name = os.path.basename(f)
    ext = os.path.splitext(f)[1].lower()
    if ext == ".pdf":
        doc = fitz.open(f)
        text = ""
        for page in doc:
            text += page.get_text() + "\n"
        # Find question numbers pattern
        import re
        q_nums = re.findall(r"(?:\n|^)(\d{1,3})\.\s+", text)
        unique_nums = len(set(q_nums))
        print(f"[PDF] {name} | Pages: {len(doc)} | Chars: {len(text)} | Question tags found: {len(q_nums)} (unique: {unique_nums})")
    elif ext == ".docx":
        d = docx.Document(f)
        full_text = "\n".join([p.text for p in d.paragraphs])
        import re
        q_nums = re.findall(r"(?:\n|^)(\d{1,3})\.\s+", full_text)
        unique_nums = len(set(q_nums))
        print(f"[DOCX] {name} | Paras: {len(d.paragraphs)} | Chars: {len(full_text)} | Question tags: {len(q_nums)} (unique: {unique_nums})")
    else:
        print(f"[OTHER] {name}")

