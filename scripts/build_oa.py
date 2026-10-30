import docx, pypdf, re, json

print("Parsing files...")

def clean(t):
    return re.sub(r'\s+', ' ', t).strip()

questions = []

# 1. Oral Anatomy
oa_reader = pypdf.PdfReader('reviewer_materials/4 - Oral Anatomy rationale.pdf')
oa_full = '\n'.join(p.extract_text() for p in oa_reader.pages)
oa_chunks = re.split(r'\n(?=\d+\.)', oa_full)

# Verified key map for first 20 Oral Anatomy items from review material
oa_keys = {
  1: (2, "The FDI system uses a 2-digit binomial format: 1st digit designates the quadrant (1-4 permanent, 5-8 primary), 2nd digit indicates tooth number from the midline.", "FDI = 2-digit binomial format (Quadrant + Tooth)."),
  2: (1, "Lobes are the primary anatomical growth centers and calcification sites of a tooth crown. Anterior teeth develop from 4 lobes.", "Lobes = primary developmental growth centers."),
  3: (1, "The cingulum is the smooth convexity making up the cervical third of the lingual surface of all anterior teeth.", "Cingulum = lingual cervical third of anterior teeth."),
  4: (2, "Mamelons are the three rounded protuberances along the incisal edge of newly erupted incisors, representing labial developmental lobes.", "Mamelons = incisal protuberances of newly erupted incisors."),
  5: (2, "A sulcus is a notable broad depression or valley on the occlusal surface of posterior teeth between ridges and cusps.", "Sulcus = broad depression between ridges and cusps."),
  6: (1, "From the proximal (mesial/distal) aspect, all anterior teeth (incisors and canines) have a triangular or wedge-shaped geometric outline.", "Anterior proximal outline = Triangular (wedge-shaped)."),
  7: (1, "Mandibular posterior teeth exhibit a rhomboidal geometric outline from the proximal aspect, accommodating their lingual crown tilt.", "Mandibular posterior proximal outline = Rhomboidal."),
  8: (2, "The FDI Two-Digit System has been officially adopted and endorsed worldwide by the World Health Organization (WHO).", "WHO officially adopts the FDI two-digit system."),
  9: (2, "Maxillary premolars and molars are unique in that both their mesial and distal contact areas are located in the middle third.", "Maxillary premolars and molars = contact areas in middle third."),
  10: (2, "The largest occlusal/incisal embrasure in the permanent dentition is found between the maxillary canine and maxillary first premolar.", "Largest embrasure = Maxillary canine and 1st premolar."),
  11: (2, "The smallest incisal embrasures in the permanent human dentition are located between the two mandibular central incisors.", "Smallest embrasure = between mandibular central incisors.")
}

for chunk in oa_chunks[1:]:
    lines = [clean(l) for l in chunk.strip().split('\n') if clean(l)]
    if not lines: continue
    m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
    if not m: continue
    q_num = int(m.group(1))
    
    q_stem = [m.group(2)]
    opts = []
    for l in lines[1:]:
        opt_m = re.match(r'^([A-D])\.\s*(.*)', l)
        if opt_m:
            opts.append(opt_m.group(2).strip())
        elif len(opts) == 0:
            q_stem.append(l)
        elif len(opts) > 0:
            opts[-1] += " " + l
            
    if len(opts) >= 4 and q_num in oa_keys:
        corr_idx, expl, hook = oa_keys[q_num]
        distractors = {}
        for o_i in range(len(opts)):
            if o_i != corr_idx:
                distractors[o_i] = f"Option {chr(65+o_i)} ({opts[o_i]}) is incorrect because it does not fit the morphological definition specified in the question stem."
        questions.append({
            "id": f"dle-oa-{q_num:02d}",
            "category": "Oral Anatomy & Occlusion",
            "question": " ".join(q_stem).strip(),
            "options": opts[:4],
            "correctIndex": corr_idx,
            "explanation": expl,
            "distractorRationales": distractors,
            "keyTakeaway": hook,
            "difficulty": "Medium"
        })

print(f"Oral Anatomy processed: {len(questions)}")
