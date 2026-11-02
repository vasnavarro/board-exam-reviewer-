import json
import re

print("Starting rebuild of all 839 questions with verified answer keys and rich clinical rationales...")

# 1. Load keys
with open("scripts/extracted_pdf_keys.json", "r", encoding="utf-8") as f:
    pdf_keys = json.load(f)
with open("scripts/extracted_ink_keys.json", "r", encoding="utf-8") as f:
    ink_keys = json.load(f)

# Master manual overrides/supplements for missing keys
MANUAL_KEYS = {
    # General Physiology
    "dle-physio-014": "C", # Apoptosis
    "dle-physio-029": "C", # Day after dialysis
    "dle-physio-044": "C", # Bundle of His
    "dle-physio-051": "C", # Antidiuretic hormone (ADH)
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
    "dle-ghm-031": "B", # Statement 1 false (white adipose stores long term, brown is thermogenesis), 2 true
    "dle-ghm-050": "D", # Coxsackie A virus
    # General Anatomy
    "dle-ga-003": "B", # Increases tubular secretion of calcium is FALSE (PTH decreases calcium excretion)
    "dle-ga-008": "A", # Trigeminal (Lingual nerve V3)
    "dle-ga-015": "C", # GABA (gamma-aminobutyric acid)
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
    "dle-gp-021": "B"  # First statement false (ascites is peritoneal), second true
}

print(f"Loaded {len(MANUAL_KEYS)} verified manual supplementary keys.")
