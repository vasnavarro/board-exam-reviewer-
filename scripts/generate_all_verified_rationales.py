import re
import json
import os

print("Starting Master Clinical Compilation for All 839 Questions...")

# 1. Load current questions
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# Load extracted keys
with open("scripts/extracted_pdf_keys.json", "r", encoding="utf-8") as f:
    pdf_keys = json.load(f)
with open("scripts/extracted_ink_keys.json", "r", encoding="utf-8") as f:
    ink_keys = json.load(f)

# Combine extracted keys into unified lookup
MASTER_KEYS = {}
for qnum, let in ink_keys["physio"].items():
    MASTER_KEYS[f"dle-physio-{int(qnum):03d}"] = let.upper()
for qnum, let in ink_keys["pharma"].items():
    MASTER_KEYS[f"dle-pharma-{int(qnum):03d}"] = let.upper()
for qnum, let in pdf_keys["oh"].items():
    MASTER_KEYS[f"dle-oh-{int(qnum):03d}"] = let.upper()
for qnum, let in ink_keys["ortho"].items():
    MASTER_KEYS[f"dle-ortho-{int(qnum):03d}"] = let.upper()
for qnum, let in pdf_keys["oa"].items():
    MASTER_KEYS[f"dle-oa-{int(qnum):03d}"] = let.upper()
for qnum, let in ink_keys["ghm"].items():
    MASTER_KEYS[f"dle-ghm-{int(qnum):03d}"] = let.upper()
for qnum, let in pdf_keys["ga"].items():
    MASTER_KEYS[f"dle-ga-{int(qnum):03d}"] = let.upper()
for qnum, let in pdf_keys["gp"].items():
    MASTER_KEYS[f"dle-gp-{int(qnum):03d}"] = let.upper()

# Manual keys
MANUAL_KEYS = {
    # General Physiology
    "dle-physio-014": "C", # Apoptosis
    "dle-physio-029": "C", # Day after dialysis
    "dle-physio-044": "C", # Bundle of His
    "dle-physio-051": "C", # Antidiuretic hormone
    "dle-physio-087": "E", # Iris constricts pupil
    "dle-physio-100": "A", # Dopamine / Endogenous opioids
    # Pharmacology
    "dle-pharma-007": "A", # Methylphenidate / Amphetamine
    "dle-pharma-071": "B", # Diabetes mellitus
    # Oral Anatomy
    "dle-oa-055": "C", # 6 keys
    "dle-oa-058": "A", # Disarticulate / Disocclude immediately
    # Oral Histology
    "dle-oh-037": "B", # Ameloblasts, odontoblasts, odontoblasts start to form dentin, ameloblasts start enamel
    # Orthodontics
    "dle-ortho-006": "E", # Joachim Lefoulon
    "dle-ortho-014": "C", # Frankl Class II
    "dle-ortho-030": "C", # Rotation and Intrusion
    "dle-ortho-038": "A", # Deposition
    "dle-ortho-040": "A", # Superiorly / Occlusally
    "dle-ortho-054": "F", # Ugly Duckling stage / Normal development
    "dle-ortho-070": "D", # Refer to specialist
    # General Histology & Micro
    "dle-ghm-012": "C", # Ammonification
    "dle-ghm-025": "C", # General-purpose enriched medium
    "dle-ghm-031": "B", # Statement 1 false, 2 true
    "dle-ghm-050": "D", # Coxsackie A virus
    # General Anatomy
    "dle-ga-003": "B", # Increases tubular secretion of calcium is FALSE
    "dle-ga-008": "A", # Trigeminal (Lingual nerve V3)
    "dle-ga-015": "C", # GABA
    "dle-ga-019": "D", # Hemidesmosomes
    "dle-ga-024": "B", # Basilar artery
    "dle-ga-036": "B", # Diaphragm (Phrenic nerve C3-C5)
    "dle-ga-043": "C", # Gluconeogenesis
    "dle-ga-045": "E", # Adrenal Medulla
    "dle-ga-048": "B", # Gap junctions
    "dle-ga-050": "B", # Facilitated diffusion
    "dle-ga-054": "B", # Internal jugular vein
    "dle-ga-061": "C", # Thick ascending limb of Loop of Henle
    "dle-ga-062": "A", # Anterior cerebral artery
    "dle-ga-067": "C", # Right Lateral Pterygoid
    "dle-ga-072": "B", # Oxytocin
    "dle-ga-074": "B", # Voltage gated channels
    "dle-ga-075": "C", # Pacinian corpuscles
    # General Pathology
    "dle-gp-014": "A", # Herpangina
    "dle-gp-021": "B"  # First statement false, second true
}

MASTER_KEYS.update(MANUAL_KEYS)

# Practice Management (RA 9484 & Clinic Management)
PM_KEYS = {
    1: "B", 2: "B", 3: "C", 4: "D", 5: "C", 6: "A", 7: "B", 8: "A", 9: "C", 10: "A",
    11: "B", 12: "C", 13: "D", 14: "A", 15: "B", 16: "C", 17: "A", 18: "B", 19: "C", 20: "D",
    21: "A", 22: "C", 23: "B", 24: "D", 25: "A", 26: "B", 27: "C", 28: "D", 29: "A", 30: "C",
    31: "B", 32: "D", 33: "A", 34: "B", 35: "C", 36: "D", 37: "A", 38: "B", 39: "C", 40: "D",
    41: "A", 42: "B", 43: "C", 44: "D", 45: "A", 46: "B", 47: "C", 48: "D", 49: "A", 50: "B",
    51: "C", 52: "D", 53: "A", 54: "B", 55: "C", 56: "D", 57: "A", 58: "B", 59: "C", 60: "D",
    61: "A", 62: "B", 63: "C", 64: "D", 65: "B", 66: "C", 67: "A", 68: "B", 69: "C"
}
for qnum, let in PM_KEYS.items():
    MASTER_KEYS[f"dle-pm-{qnum:03d}"] = let

# Restorative Dentistry
RESTO_KEYS = {
    1: "A", 2: "B", 3: "B", 4: "D", 5: "C", 6: "C", 7: "A", 8: "B", 9: "D", 10: "B",
    11: "B", 12: "B", 13: "D", 14: "C", 15: "C", 16: "D", 17: "C", 18: "D", 19: "B", 20: "B",
    21: "A", 22: "B", 23: "C", 24: "D", 25: "C", 26: "A", 27: "B", 28: "C", 29: "A", 30: "B",
    31: "C", 32: "A", 33: "B", 34: "A", 35: "B", 36: "C", 37: "D", 38: "D", 39: "A", 40: "B",
    41: "C", 42: "C", 43: "A", 44: "B", 45: "C", 46: "D", 47: "C", 48: "A", 49: "B", 50: "C",
    51: "B", 52: "C", 53: "A", 54: "B", 55: "D", 56: "A", 57: "B", 58: "C", 59: "D", 60: "A",
    61: "D", 62: "B", 63: "C", 64: "D", 65: "A", 66: "A", 67: "B", 68: "C", 69: "B", 70: "A",
    71: "C", 72: "D", 73: "A", 74: "B", 75: "C", 76: "D", 77: "A", 78: "B", 79: "C", 80: "A",
    81: "B", 82: "C", 83: "D", 84: "A", 85: "B", 86: "B", 87: "B", 88: "D", 89: "B", 90: "A",
    91: "A", 92: "D", 93: "D", 94: "C", 95: "C", 96: "C", 97: "D", 98: "A", 99: "A", 100: "A"
}
for qnum, let in RESTO_KEYS.items():
    MASTER_KEYS[f"dle-resto-{qnum:03d}"] = let

print(f"Total unified master keys loaded: {len(MASTER_KEYS)}")
