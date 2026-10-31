import json, re

with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
qs = json.loads(m.group(1))

# Enhance dle-gp-006 specifically
gp6 = next(q for q in qs if q["id"] == "dle-gp-006")
gp6["explanation"] = (
    "Option A (Decreased plasma protein concentration) is the primary Starling force cause of edema. "
    "Plasma albumin generates colloid osmotic (oncotic) pressure (~25 mmHg) which opposes hydrostatic pressure "
    "and pulls water into the capillary lumen. Severe hypoalbuminemia (from nephrotic syndrome, liver cirrhosis, "
    "or protein malnutrition/kwashiorkor) decreases plasma oncotic pressure below critical threshold, allowing massive "
    "fluid extravasation into interstitial spaces."
)
gp6["keyTakeaway"] = (
    "Starling Forces in Edema: 1) Increased capillary hydrostatic pressure (CHF), 2) Decreased plasma oncotic pressure (Hypoalbuminemia), "
    "3) Lymphatic obstruction (Lymphedema), 4) Increased endothelial permeability (Inflammation)."
)

# Enhance dle-pharma-001 through dle-pharma-005 specifically
pharma_fixes = {
    "dle-pharma-001": {
        "correctIndex": 3,
        "explanation": "Option D (Recipe) is correct. In prescription writing, 'Rx' is the Superscription, originating from the Latin imperative 'recipe' meaning 'take thou' or 'you take'. It is the clinician's direct instruction to the pharmacist to prepare and dispense the specified drug.",
        "distractors": {
            "0": "Option A (Radiograph) refers to diagnostic x-ray imaging examinations, colloquially called 'x-rays', but has no relation to the pharmacological prescription abbreviation Rx.",
            "1": "Option B (Patient) is documented in the Patient Information block (name, age, sex, address, date) located above the superscription.",
            "2": "Option C (Drug) constitutes the Inscription (the main active ingredient, strength, and dosage form), which follows below the Rx symbol."
        },
        "pearl": "Prescription Parts: Superscription = Rx (Recipe - Take thou); Inscription = Drug name & dose; Subscription = Dispensing directions; Signa = Patient instructions."
    },
    "dle-pharma-002": {
        "correctIndex": 4,
        "explanation": "Option E (Suprascription) is correct because it is a fictitious distractor. The four authentic components of a prescription are: 1) Superscription (Rx), 2) Inscription (medication name and dosage), 3) Subscription (pharmacist compounding/dispensing directions), and 4) Signa / Transcription (patient directions).",
        "distractors": {
            "0": "Option A (Superscription) is the official opening part containing the Rx symbol.",
            "1": "Option B (Inscription) is the vital body of the prescription designating the medication name, strength, and unit dose.",
            "2": "Option C (Subscription) provides explicit instructions to the pharmacist regarding total quantity to dispense.",
            "3": "Option D (Signa) contains instructions labeled 'Sig:' for patient usage frequency, route, and timing."
        },
        "pearl": "Prescription Components: Superscription (Rx), Inscription (Drug & dose), Subscription (Dispensing instructions to pharmacist), Signa (Patient instructions)."
    },
    "dle-pharma-003": {
        "correctIndex": 0,
        "explanation": "Option A (Pc) is correct. 'pc' represents the Latin term 'post cibum', meaning 'after meals'. This is commonly prescribed for gastric-irritating medications such as NSAIDs (Mefenamic acid, Ibuprofen) or corticosteroids to minimize mucosal injury.",
        "distractors": {
            "1": "Option B (Po) represents 'per os', instructing the patient to take the medication orally / by mouth.",
            "2": "Option C (Pr) stands for 'per rectum', indicating administration of rectal suppositories or enemas.",
            "3": "Option D (Ac) represents 'ante cibum', instructing the patient to administer the dose 'before meals' (e.g. Proton pump inhibitors or hungry-stomach antibiotics like ampicillin)."
        },
        "pearl": "Prescription Latin Abbreviations: ac = ante cibum (before meals); pc = post cibum (after meals); po = per os (by mouth); prn = pro re nata (as needed)."
    }
}

for q in qs:
    qid = q["id"]
    if qid in pharma_fixes:
        f = pharma_fixes[qid]
        q["correctIndex"] = f["correctIndex"]
        q["explanation"] = f["explanation"]
        q["distractorRationales"] = f["distractors"]
        q["keyTakeaway"] = f["pearl"]

print("Applied high-yield clinical enhancements.")

# Save updated dentalQuestions.js
output_js = "export const dentalQuestions = " + json.dumps(qs, indent=2, ensure_ascii=False) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(output_js)

print("Saved enriched dentalQuestions.js successfully!")
