import json, re

print("Adding high-yield oral anatomy, practice management, and pharmacology items...")

high_yield = [
  {
    "id": "dle-oa-001",
    "category": "Oral Anatomy & Occlusion",
    "question": "Which tooth numbering system uses a two-digit binomial format where the first number represents the quadrant and the second represents the tooth?",
    "options": [
      "Universal Numbering System",
      "Palmer's Notation",
      "FDI Two-Digit System",
      "Zsigmondy System"
    ],
    "correctIndex": 2,
    "explanation": "The FDI (Fédération Dentaire Internationale) system uses a 2-digit binomial code: the 1st digit designates the quadrant (1–4 for permanent, 5–8 for primary) and the 2nd digit designates the tooth position (1–8 for permanent from midline; 1–5 for primary).",
    "distractorRationales": {
      "0": "The Universal Numbering System uses sequential integers 1–32 for permanent teeth (starting at upper right 3rd molar #1) and letters A–T for primary teeth, not two-digit binomial pairs.",
      "1": "Palmer's Notation uses a four-quadrant bracket grid symbol (┘ └ ┐ ┌) with tooth numbers 1–8 or letters A–E inside, not a two-digit decimal format.",
      "3": "The Zsigmondy System is the historical European grid notation preceding Palmer; it does not use a two-digit binomial system."
    },
    "keyTakeaway": "FDI: 1st digit = Quadrant (1-4 perm, 5-8 primary); 2nd digit = Tooth position from midline (1-8).",
    "difficulty": "Easy"
  },
  {
    "id": "dle-oa-002",
    "category": "Oral Anatomy & Occlusion",
    "question": "What are the primary developmental growth centers of a tooth crown called?",
    "options": [
      "Cusps",
      "Lobes",
      "Tubercles",
      "Cingula"
    ],
    "correctIndex": 1,
    "explanation": "Lobes are the primary morphological growth centers and initial calcification sites of a tooth crown. All anterior teeth develop from 4 lobes (3 labial + 1 lingual).",
    "distractorRationales": {
      "0": "A cusp is a mature anatomical elevation on the occlusal table resulting from lobe development, not the initial embryonic growth center itself.",
      "2": "A tubercle is a localized extra enamel formation (e.g. Carabelli), not a primary growth center.",
      "3": "A cingulum is specifically the lingual cervical convexity of an anterior tooth derived from the lingual lobe."
    },
    "keyTakeaway": "Lobes = primary developmental centers. All anterior teeth have 4 lobes (3 labial, 1 lingual).",
    "difficulty": "Easy"
  },
  {
    "id": "dle-oa-003",
    "category": "Oral Anatomy & Occlusion",
    "question": "A smooth rounded convexity located specifically on the lingual cervical third of an anterior tooth is the:",
    "options": [
      "Mamelon",
      "Cingulum",
      "Tubercle",
      "Ridge"
    ],
    "correctIndex": 1,
    "explanation": "The cingulum is the prominent convexity constituting the cervical third of the lingual surface of all maxillary and mandibular anterior teeth, representing the lingual developmental lobe.",
    "distractorRationales": {
      "0": "Mamelons are rounded protuberances along the incisal edge of newly erupted incisors.",
      "2": "A tubercle is a minor accessory elevation of enamel, such as on the ML cusp of maxillary first molars.",
      "3": "Ridges are linear elevations of enamel (e.g., marginal, triangular, or transverse ridges)."
    },
    "keyTakeaway": "Cingulum = lingual cervical third of anterior teeth.",
    "difficulty": "Easy"
  },
  {
    "id": "dle-pm-001",
    "category": "Practice Management & Jurisprudence",
    "question": "Under RA 9484 (The Philippine Dental Act of 2007), within how many days after the last examination day must the Board post the official results of the Dentist Licensure Examination (DLE)?",
    "options": [
      "15 days",
      "20 days",
      "30 days",
      "60 days"
    ],
    "correctIndex": 2,
    "explanation": "Under Section 16 of Republic Act No. 9484, the Professional Regulatory Board of Dentistry must submit the examination ratings and officially post the results within thirty (30) days from the last day of examination.",
    "distractorRationales": {
      "0": "15 days is too short for complete psychometric evaluation by PRC.",
      "1": "20 days is not the statutory timeline mandated in RA 9484.",
      "3": "60 days violates the statutory 30-day mandate for posting DLE results."
    },
    "keyTakeaway": "RA 9484 Sec 16: DLE results must be officially released within 30 days.",
    "difficulty": "Medium"
  },
  {
    "id": "dle-pm-002",
    "category": "Practice Management & Jurisprudence",
    "question": "In dental healthcare waste management, which color-coded waste container is designated for expired pharmaceuticals, used carpules, and chemical wastes?",
    "options": [
      "Red (Puncture-proof Sharps)",
      "Yellow (Infectious/Pathological)",
      "Yellow with Black Band (Chemical / Pharmaceutical)",
      "Green (Biodegradable/Wet)"
    ],
    "correctIndex": 2,
    "explanation": "According to DOH healthcare waste management protocols, Yellow with a Black Band is reserved for chemical and expired pharmaceutical wastes (e.g., expired anesthetic carpules, chemical disinfectants, heavy metals).",
    "distractorRationales": {
      "0": "Red is exclusively for sharps (injection needles, scalpel blades, suture needles, burs).",
      "1": "Yellow without black band is for pathological and infectious waste (extracted teeth, blood-soaked gauze).",
      "3": "Green is for non-infectious wet biodegradable waste."
    },
    "keyTakeaway": "Waste colors: Red=Sharps, Yellow=Pathological, Yellow w/ Black Band=Chemicals/Expired Drugs.",
    "difficulty": "Medium"
  },
  {
    "id": "dle-gp-001",
    "category": "General Physiology & Pharmacology",
    "question": "Which local anesthetic agent used in clinical dentistry uniquely undergoes primary metabolic biotransformation in blood plasma by pseudocholinesterase?",
    "options": [
      "Lidocaine",
      "Articaine",
      "Mepivacaine",
      "Bupivacaine"
    ],
    "correctIndex": 1,
    "explanation": "Articaine contains a thiophene ring and an ester side-chain, allowing ~90-95% of the drug to be rapidly hydrolyzed in blood plasma by plasma pseudocholinesterase. This produces an exceptionally short elimination half-life (~20 min) and reduced systemic liver burden.",
    "distractorRationales": {
      "0": "Lidocaine is a pure amide metabolized entirely by liver microsomal enzymes (CYP3A4/CYP1A2).",
      "2": "Mepivacaine is an amide metabolized strictly in the liver, with mild vasoconstricting properties.",
      "3": "Bupivacaine is a long-acting amide metabolized exclusively in the liver."
    },
    "keyTakeaway": "Articaine = only dental amide with ester group; 90% plasma pseudocholinesterase breakdown.",
    "difficulty": "Hard"
  }
]

# Read existing questions
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

# Extract json array
json_match = re.search(r'export const dentalQuestions =\s*(\[.*\]);', text, re.DOTALL)
if json_match:
    existing = json.loads(json_match.group(1))
    # prepend high yield items
    combined = high_yield + existing
    out_text = "export const dentalQuestions = " + json.dumps(combined, indent=2) + ";\n"
    with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as out_f:
        out_f.write(out_text)
    print(f"Combined total: {len(combined)} questions in src/data/dentalQuestions.js!")
