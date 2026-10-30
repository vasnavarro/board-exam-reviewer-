import pypdf, re

def check_file(fname):
    print("=" * 60)
    print("Checking", fname)
    r = pypdf.PdfReader(f"reviewer_materials/{fname}")
    text = ""
    for i in range(min(5, len(r.pages))):
        text += f"\n--- Page {i+1} ---\n" + (r.pages[i].extract_text() or "")
    print(text[:2500])

check_file("4 - Oral Anatomy rationale.pdf")
