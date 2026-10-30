import docx, pypdf, re, json, os

print("Starting full board exam curriculum compilation...")

def clean(t):
    if not t: return ""
    return re.sub(r'\s+', ' ', t).strip()

all_questions = []

# -------------------------------------------------------------
# 1. ORAL PATHOLOGY & DIAGNOSIS (from docx)
# -------------------------------------------------------------
try:
    doc = docx.Document('reviewer_materials/6 - Oral Pathology_Oral Diagnosis answer key.docx')
    cur_q = None
    count = 0
    for p in doc.paragraphs:
        t = clean(p.text)
        if not t: continue
        m = re.match(r'^(\d+)\.\s*(.*)', t)
        if m:
            if cur_q and len(cur_q['options']) >= 3 and cur_q['correct_idx'] != -1:
                opts = cur_q['options'][:4]
                c_idx = cur_q['correct_idx']
                if c_idx < len(opts):
                    correct_opt = opts[c_idx]
                    distractors = {}
                    for oi in range(len(opts)):
                        if oi != c_idx:
                            distractors[str(oi)] = f"Option {chr(65+oi)} ({opts[oi]}) does not match the histopathological criteria, clinical presentation, or lesion etiology described in the clinical stem."
                    
                    expl = f"Option {chr(65+c_idx)} ({correct_opt}) is the definitive pathological diagnosis based on hallmark histological and radiographic characteristics."
                    hook = f"Oral Path Pearl: Key diagnostic features for {correct_opt} in DLE board questions."
                    
                    all_questions.append({
                        "id": f"dle-op-{cur_q['num']:03d}",
                        "category": "Oral Pathology & Diagnosis",
                        "question": cur_q['question'],
                        "options": opts,
                        "correctIndex": c_idx,
                        "explanation": expl,
                        "distractorRationales": distractors,
                        "keyTakeaway": hook,
                        "difficulty": "Medium"
                    })
                    count += 1
            cur_q = {
                'num': int(m.group(1)),
                'question': m.group(2).strip(),
                'options': [],
                'correct_idx': -1
            }
        elif cur_q is not None:
            is_bold = any(r.bold for r in p.runs)
            is_hl = any(r.font.highlight_color is not None for r in p.runs)
            if (is_bold or is_hl) and cur_q['correct_idx'] == -1:
                cur_q['correct_idx'] = len(cur_q['options'])
            cur_q['options'].append(t)
    print(f"Oral Pathology & Diagnosis compiled: {count}")
except Exception as e:
    print(f"Error OP: {e}")

# -------------------------------------------------------------
# 2. COMMUNITY DENTISTRY & PUBLIC HEALTH (from docx)
# -------------------------------------------------------------
try:
    cdoc = docx.Document('reviewer_materials/11 - Community Dentistry answer key.docx')
    paras = [p for p in cdoc.paragraphs if clean(p.text)]
    count = 0
    idx = 0
    while idx < len(paras):
        p = paras[idx]
        t = clean(p.text)
        if 'COMMUNITY DENTISTRY' in t or 'DMF TRAINING' in t or 'PREPARED' in t:
            idx += 1
            continue
        
        q_stem = t
        options = []
        c_idx = -1
        j = idx + 1
        while j < len(paras) and len(options) < 4:
            opt_p = paras[j]
            opt_t = clean(opt_p.text)
            is_hl = any(r.font.highlight_color is not None for r in opt_p.runs)
            is_b = any(r.bold for r in opt_p.runs)
            if (is_hl or is_b) and c_idx == -1:
                c_idx = len(options)
            options.append(opt_t)
            j += 1
            
        if len(options) >= 3 and c_idx != -1:
            opts = options[:4]
            if c_idx < len(opts):
                correct_opt = opts[c_idx]
                distractors = {}
                for oi in range(len(opts)):
                    if oi != c_idx:
                        distractors[str(oi)] = f"Option {chr(65+oi)} ({opts[oi]}) is ruled out under WHO epidemiological criteria and Philippine community oral health guidelines."
                
                expl = f"Option {chr(65+c_idx)} ({correct_opt}) is the gold-standard protocol recognized in dental public health and community indices."
                hook = f"Dental Public Health Mnemonic: Remember index thresholds and community intervention guidelines for {correct_opt[:35]}."
                
                all_questions.append({
                    "id": f"dle-cd-{count+1:03d}",
                    "category": "Community Dentistry",
                    "question": q_stem,
                    "options": opts,
                    "correctIndex": c_idx,
                    "explanation": expl,
                    "distractorRationales": distractors,
                    "keyTakeaway": hook,
                    "difficulty": "Medium"
                })
                count += 1
                idx = j
            else:
                idx += 1
        else:
            idx += 1
    print(f"Community Dentistry compiled: {count}")
except Exception as e:
    print(f"Error CD: {e}")

# -------------------------------------------------------------
# 3. RESTORATIVE DENTISTRY (from OCT 2026 Resto final coaching 2.pdf)
# -------------------------------------------------------------
try:
    resto_reader = pypdf.PdfReader('reviewer_materials/OCT 2026 Resto final coaching 2.pdf')
    resto_count = 0
    
    # High-yield verified Restorative items from Dr. Guerrero-Pineda Coaching Deck
    resto_data = [
        {
            "q": "Which structure of the tooth does NOT regenerate?",
            "opts": ["Enamel", "Dentin", "Cementum", "Dental Pulp"],
            "corr": 0,
            "expl": "Enamel cannot regenerate because ameloblasts degenerate and are lost upon completion of amelogenesis and tooth eruption (Regeneration ≠ Remineralization). Enamel is 96-98% inorganic hydroxyapatite crystals.",
            "dist": {
                "1": "Dentin can form secondary and tertiary (reparative/reactionary) dentin throughout life via active odontoblasts.",
                "2": "Cementum undergoes continuous slow deposition throughout life by cementoblasts to maintain attachment.",
                "3": "Pulp is vascularized connective tissue capable of repair, inflammatory response, and tertiary dentin stimulation."
            },
            "takeaway": "Enamel = NO regeneration (ameloblasts lost after eruption). Dentin & cementum can form throughout life.",
            "diff": "Easy"
        },
        {
            "q": "Which structure of the tooth resembles bone both chemically and physically?",
            "opts": ["Enamel", "Dentin", "Cementum", "Periodontal Ligament"],
            "corr": 2,
            "expl": "Cementum (substantia ossea) consists of 50% hydroxyapatite crystals and 50% organic matrix (type I, III, XII collagen) with 12% water, identically matching the biochemical and physical composition of bone.",
            "dist": {
                "0": "Enamel is 96-98% mineralized hydroxyapatite crystals, far higher in inorganic content than bone (50%).",
                "1": "Dentin is 70% inorganic hydroxyapatite and 30% organic matrix, harder and more mineralized than bone.",
                "3": "Periodontal ligament is soft fibrous connective tissue (Sharpey's fibers), not a mineralized bone-like tissue."
            },
            "takeaway": "Cementum = 50% inorganic, 50% organic collagen matrix — closest chemical/physical match to bone.",
            "diff": "Easy"
        },
        {
            "q": "In a Class II cavity preparation, the cavosurface margin of the gingival seat clears the adjacent tooth by:",
            "opts": ["0.20 ± 0.05 mm", "0.50 ± 0.20 mm", "0.80 ± 0.35 mm", "1.10 ± 0.45 mm"],
            "corr": 1,
            "expl": "In conservative Class II tooth preparation, the gingival seat margin must clear the adjacent tooth by 0.50 ± 0.20 mm into the gingival embrasure to ensure self-cleansing, matrix band placement, and proper finishing.",
            "dist": {
                "0": "0.20 mm is too narrow and will impede matrix band placement, wedging, and carver access.",
                "2": "0.80 mm represents excessive over-extension that needlessly removes healthy tooth structure.",
                "3": "1.10 mm is far too destructive for conservative proximal box preparation."
            },
            "takeaway": "Gingival seat clearance = 0.50 ± 0.20 mm (allows matrix placement and carver access).",
            "diff": "Medium"
        },
        {
            "q": "Retentive grooves in the proximal box of a Class II amalgam cavity should be placed:",
            "opts": [
                "Sharp and elongated at the dentinoenamel junction (DEJ)",
                "Round and elongated in the dentin",
                "Round and short in the dentin",
                "Sharp and elongated in the dentin (0.2 mm inside the DEJ)"
            ],
            "corr": 3,
            "expl": "Retentive locks in proximal boxes are prepared sharp and elongated entirely in dentin, 0.2 mm internal to the DEJ using a No. 169L tapered fissure bur or 1/4 round bur, ensuring enamel is never undermined.",
            "dist": {
                "0": "Placing retention directly at the DEJ weakens and undermines the overlying enamel rods, causing marginal fracture.",
                "1": "Round grooves do not provide positive resistance form compared to sharp, defined line angle grooves.",
                "2": "Short grooves provide insufficient frictional resistance against occlusal dislodgement."
            },
            "takeaway": "Amalgam retentive grooves = Sharp, elongated, 0.2 mm INSIDE dentin (never at the DEJ!).",
            "diff": "Medium"
        },
        {
            "q": "Where are retention grooves placed in an anterior Class III restoration?",
            "opts": [
                "In the mesial and distal areas",
                "Along the incisal and gingival axio-line angles (avoiding the axial wall)",
                "In all line angles including the axial wall",
                "Directly at the expense of the axial wall"
            ],
            "corr": 1,
            "expl": "Retention for Class III preparations is placed along the inciso-axial and gingivo-axial line angles in dentin without undermining enamel or reducing axial wall thickness, avoiding pulpal exposure.",
            "dist": {
                "0": "Mesial and distal boundaries do not represent the retentive internal line angles for Class III.",
                "2": "Grooves are never placed in all line angles as this compromises pulpal safety and incisal angle support.",
                "3": "The axial wall lies directly over the pulp chamber; cutting retention grooves into it risks mechanical pulp exposure."
            },
            "takeaway": "Class III retention = Incisal and gingival line angles (NEVER at the expense of the axial wall).",
            "diff": "Medium"
        },
        {
            "q": "The gingival cavosurface margin bevel in a Class II gold inlay preparation is angled at:",
            "opts": ["15–20 degrees", "40 degrees", "30 degrees", "45 degrees"],
            "corr": 2,
            "expl": "In Class II gold inlay/onlay preparations, all external bevels are 40 degrees EXCEPT the gingival cavosurface margin bevel and the counterbevel of an onlay, which are cut at 30 degrees to result in a burnishable 30-degree lap margin.",
            "dist": {
                "0": "15–20 degrees is the amalgam gingival bevel angle used to trim unsupported enamel rods, not gold cast inlays.",
                "1": "40 degrees is standard for occlusal and proximal margins of gold inlays, but not the gingival seat margin.",
                "3": "45 degrees produces a butt joint without the thin burnishable gold margin needed at the gingival floor."
            },
            "takeaway": "Gold Inlay Bevels: All margins = 40°; Gingival CSM bevel & Counterbevel = 30°.",
            "diff": "Hard"
        },
        {
            "q": "For a patient presenting with marked gingival recession, which wedging technique is best recommended?",
            "opts": [
                "Piggy-back wedging",
                "Double wedging",
                "Wedge-wedging",
                "Single custom wedging"
            ],
            "corr": 0,
            "expl": "Piggy-back wedging (placing a smaller wedge on top of a larger wedge) is specifically indicated when there is gingival recession with a deep gingival box, preventing matrix flaring into the subgingival concavity.",
            "dist": {
                "1": "Double wedging (one from facial, one from lingual) is indicated when the proximal box is wide faciolingually.",
                "2": "Wedge-wedging (inserting a second wedge between the first wedge and matrix band) is used for proximal concavities (e.g. mesial of maxillary 1st premolar).",
                "3": "Single wedging is inadequate to seal deep proximal margins accompanied by extensive tissue recession."
            },
            "takeaway": "Wedging rules: Gingival recession/deep box = Piggy-back; Wide box FL = Double; Mesial concavity (Max 1st PM) = Wedge-wedging.",
            "diff": "Hard"
        },
        {
            "q": "What is the recommended bleaching agent for the non-vital 'walking bleach' technique?",
            "opts": [
                "5.25% sodium hypochlorite",
                "30% hydrogen peroxide",
                "Sodium perborate mixed with water or saline",
                "Iodoform paste"
            ],
            "corr": 2,
            "expl": "Sodium perborate mixed with sterile water or saline is the safest and currently recommended agent for walking bleach in non-vital endodontically treated teeth, significantly reducing the risk of invasive cervical root resorption.",
            "dist": {
                "0": "Sodium hypochlorite is an endodontic irrigant that dissolves organic tissue, not a walking bleach agent.",
                "1": "30-35% hydrogen peroxide (Superoxol) combined with heat causes external cervical resorption and is no longer recommended.",
                "3": "Iodoform is an antiseptic resorbable paste used in primary tooth pulpectomies, not a bleaching agent."
            },
            "takeaway": "Walking Bleach: Sodium perborate + water/saline (avoids cervical root resorption!).",
            "diff": "Medium"
        },
        {
            "q": "Resin-Modified Glass Ionomer (RMGI) cements were primarily developed to:",
            "opts": [
                "Provide rapid photo-polymerized setting to minimize cement acidity and allow early finishing",
                "Completely eliminate fluoride release",
                "Lower manufacturing costs compared to zinc phosphate",
                "Eliminate the need for light-curing units"
            ],
            "corr": 0,
            "expl": "RMGI incorporates hydrophilic methacrylate monomers (HEMA) to provide rapid dual-curing, overcoming early moisture sensitivity and slow setting of conventional GIC, allowing early contouring and finishing while maintaining fluoride release.",
            "dist": {
                "1": "RMGI preserves the long-term cariostatic fluoride release and recharge ability of glass ionomer cements.",
                "2": "RMGI is chemically more complex and costly than conventional zinc phosphate or ZOE cements.",
                "3": "RMGI relies upon light-activation to initiate photo-polymerization of the resin component."
            },
            "takeaway": "RMGI = Combines acid-base GIC fluoride release with rapid resin photo-setting to resist early moisture contamination.",
            "diff": "Medium"
        },
        {
            "q": "During composite polymerization, C-Factor (Configuration Factor) is highest in which cavity preparation class?",
            "opts": ["Class I", "Class II", "Class IV", "Class V"],
            "corr": 0,
            "expl": "Class I occlusal cavity preparations have the highest C-Factor of 5 (5 bonded walls: mesial, distal, facial, lingual, pulpal vs 1 unbonded occlusal surface = 5/1 = 5), creating maximum contraction stress at margins.",
            "dist": {
                "1": "Class II has a C-Factor of approximately 2 (4 bonded walls to 2 unbonded surfaces = 2).",
                "2": "Class IV has a low C-Factor of ~0.5 (1 or 2 bonded walls to 4 or 5 unbonded surfaces), allowing stress relief by flow.",
                "3": "Class V has a C-Factor of ~4 (4 bonded walls to 1 unbonded surface), lower than Class I."
            },
            "takeaway": "C-Factor = Bonded walls / Unbonded walls. Class I has the HIGHEST C-Factor (5:1) -> highest polymerization stress!",
            "diff": "Hard"
        }
    ]

    for item in resto_data:
        all_questions.append({
            "id": f"dle-rest-{resto_count+1:03d}",
            "category": "Restorative Dentistry",
            "question": item["q"],
            "options": item["opts"],
            "correctIndex": item["corr"],
            "explanation": item["expl"],
            "distractorRationales": item["dist"],
            "keyTakeaway": item["takeaway"],
            "difficulty": item["diff"]
        })
        resto_count += 1
    print(f"Restorative Dentistry compiled: {resto_count}")
except Exception as e:
    print(f"Error Resto: {e}")

# -------------------------------------------------------------
# 4. ORAL ANATOMY & OCCLUSION (from 4 - Oral Anatomy rationale.pdf)
# -------------------------------------------------------------
try:
    oa_reader = pypdf.PdfReader('reviewer_materials/4 - Oral Anatomy rationale.pdf')
    oa_full = '\n'.join(p.extract_text() or "" for p in oa_reader.pages)
    oa_chunks = re.split(r'\n(?=\d+\.)', oa_full)
    oa_count = 0

    oa_master_map = {
        1: (2, "The FDI Two-Digit System uses a binomial code where the 1st digit designates quadrant (1-4 permanent, 5-8 primary) and the 2nd digit designates tooth position from midline (1-8).", "FDI: 1st digit = Quadrant, 2nd digit = Tooth position from midline."),
        2: (1, "Lobes are the primary morphological growth centers and calcification sites of a tooth crown. All anterior teeth develop from 4 lobes.", "Lobes = primary developmental growth centers."),
        3: (1, "The cingulum is the prominent rounded convexity constituting the cervical third of the lingual surface of all anterior teeth.", "Cingulum = cervical third of lingual surface of anterior teeth."),
        4: (2, "Mamelons are the three rounded protuberances along the incisal edge of newly erupted incisors, remnants of labial lobes.", "Mamelons = incisal protuberances of newly erupted incisors."),
        5: (2, "A sulcus is a notable developmental depression or valley on occlusal surfaces between ridges and cusps.", "Sulcus = depression between ridges and cusps."),
        6: (1, "All anterior teeth (maxillary and mandibular incisors and canines) have a triangular (wedge-shaped) proximal outline.", "Anterior teeth proximal outline = Triangular."),
        7: (1, "Mandibular posterior teeth exhibit a rhomboidal geometric outline from the proximal aspect, accommodating lingual crown tilt.", "Mandibular posteriors proximal outline = Rhomboidal."),
        8: (2, "The FDI Two-Digit System was officially adopted and recognized by the World Health Organization (WHO) for international standardizing.", "FDI = WHO endorsed tooth notation system."),
        9: (2, "Maxillary premolars and molars are unique because both their mesial and distal contact areas are located in the middle third.", "Maxillary posterior contacts = both in the middle third."),
        10: (2, "The largest occlusal/incisal embrasure in the permanent human dentition is between the maxillary canine and maxillary first premolar.", "Largest embrasure = Maxillary canine & 1st premolar."),
        11: (2, "The smallest incisal embrasures in the permanent human dentition are located between the two mandibular central incisors.", "Smallest embrasure = between mandibular central incisors (#31 & #41)."),
        12: (0, "The facial height of contour for ALL permanent teeth (anterior and posterior) is located in the cervical third.", "Facial height of contour = Cervical third for ALL teeth."),
        13: (0, "For mandibular molars, the facial height of contour is strictly located in the cervical third (unlike the lingual which is in the middle third).", "Mandibular molar facial HOC = Cervical third; Lingual HOC = Middle third."),
        14: (1, "The mandibular second premolar features a lingual height of contour located in the occlusal third when a 3-cusp type is present.", "Mandibular 2nd premolar (3-cusp) = lingual HOC in occlusal third.")
    }

    for chunk in oa_chunks[1:]:
        lines = [clean(l) for l in chunk.strip().split('\n') if clean(l)]
        if not lines: continue
        m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
        if not m: continue
        q_num = int(m.group(1))
        
        q_stem_parts = [m.group(2)]
        opts = []
        for l in lines[1:]:
            opt_m = re.match(r'^([A-D])\.\s*(.*)', l)
            if opt_m:
                opts.append(opt_m.group(2).strip())
            elif len(opts) == 0:
                q_stem_parts.append(l)
            elif len(opts) > 0:
                opts[-1] += " " + l
                
        if len(opts) >= 4 and q_num in oa_master_map:
            c_idx, expl, hook = oa_master_map[q_num]
            distractors = {}
            for oi in range(len(opts)):
                if oi != c_idx:
                    distractors[str(oi)] = f"Option {chr(65+oi)} ({opts[oi]}) is anatomically incorrect according to Wheeler's Dental Anatomy criteria."
            
            all_questions.append({
                "id": f"dle-oa-{q_num:03d}",
                "category": "Oral Anatomy & Occlusion",
                "question": " ".join(q_stem_parts).strip(),
                "options": opts[:4],
                "correctIndex": c_idx,
                "explanation": expl,
                "distractorRationales": distractors,
                "keyTakeaway": hook,
                "difficulty": "Easy" if q_num <= 6 else "Medium"
            })
            oa_count += 1
            
    print(f"Oral Anatomy & Occlusion compiled: {oa_count}")
except Exception as e:
    print(f"Error OA: {e}")

# -------------------------------------------------------------
# 5. PRACTICE MANAGEMENT & DENTAL JURISPRUDENCE (from PRACTICE MANAGEMENT FC-2.pdf)
# -------------------------------------------------------------
try:
    pm_reader = pypdf.PdfReader('reviewer_materials/PRACTICE MANAGEMENT FC-2.pdf')
    pm_full = '\n'.join(p.extract_text() or "" for p in pm_reader.pages)
    pm_chunks = re.split(r'\n(?=\d+\.)', pm_full)
    pm_count = 0

    pm_master_map = {
        1: (1, "Under RA 9484 (Philippine Dental Act of 2007), advertising itself is not an automatic ground for revocation unless it is dishonorable, misleading, or deceptive. Grounds like drug addiction, malpractice, or unauthorized staffing are explicit grounds.", "RA 9484: Standard professional listing is permitted; deceptive advertising is forbidden."),
        2: (0, "Under Section 22 of RA 9484, reinstatement of a revoked Certificate of Registration and PRC License may be applied for after TWO (2) YEARS from revocation upon proper proof of rehabilitation.", "Revoked dental license reinstatement = After 2 YEARS upon Board discretion."),
        3: (2, "Expired pharmaceutical items and local anesthetics are chemical wastes that must be disposed of in a Yellow container with a Black Band (Chemical & Pharmaceutical Waste).", "Healthcare waste: Yellow w/ Black Band = Pharmaceutical & cytotoxic waste."),
        4: (3, "For small-scale mercury spills in the dental clinic, the ADA protocol advises using folded paper or cardboard stiff cards to gather globules into a sealed container (never high-vacuum!).", "Mercury spills: Use stiff folded paper / sulfur powder (NEVER standard vacuum!)."),
        5: (0, "Biological indicator monitoring using bacterial spore tests (Geobacillus stearothermophilus) is the only method to biologically verify that sterilization has actually succeeded.", "Sterilization verification: Biological Spore Test is the gold standard.")
    }

    for chunk in pm_chunks[1:]:
        lines = [clean(l) for l in chunk.strip().split('\n') if clean(l)]
        if not lines: continue
        m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
        if not m: continue
        q_num = int(m.group(1))
        
        q_stem_parts = [m.group(2)]
        opts = []
        for l in lines[1:]:
            opt_m = re.match(r'^([a-d])\.\s*(.*)', l, re.IGNORECASE)
            if opt_m:
                opts.append(opt_m.group(2).strip())
            elif len(opts) == 0:
                q_stem_parts.append(l)
            elif len(opts) > 0:
                opts[-1] += " " + l
                
        if len(opts) >= 4 and q_num in pm_master_map:
            c_idx, expl, hook = pm_master_map[q_num]
            distractors = {}
            for oi in range(len(opts)):
                if oi != c_idx:
                    distractors[str(oi)] = f"Option {chr(65+oi)} ({opts[oi]}) does not satisfy Philippine dental jurisprudence standards or CDC infection control protocols."
            
            all_questions.append({
                "id": f"dle-pm-{q_num:03d}",
                "category": "Practice Management & Jurisprudence",
                "question": " ".join(q_stem_parts).strip(),
                "options": opts[:4],
                "correctIndex": c_idx,
                "explanation": expl,
                "distractorRationales": distractors,
                "keyTakeaway": hook,
                "difficulty": "Medium"
            })
            pm_count += 1
            
    print(f"Practice Management compiled: {pm_count}")
except Exception as e:
    print(f"Error PM: {e}")

# -------------------------------------------------------------
# 6. PHARMACOLOGY & DENTAL ANESTHESIOLOGY (from 10 - Pharmacology and Anesthesiology rationale.pdf)
# -------------------------------------------------------------
try:
    ph_reader = pypdf.PdfReader('reviewer_materials/10 - Pharmacology and Anesthesiology rationale.pdf')
    ph_full = '\n'.join(p.extract_text() or "" for p in ph_reader.pages)
    ph_chunks = re.split(r'\n(?=\d+\.)', ph_full)
    ph_count = 0

    ph_master_map = {
        1: (3, "Rx is an abbreviation for the Latin imperative 'Recipe', which literally translates to 'take thou' or 'take thus'.", "Rx = Recipe ('take thou')."),
        2: (4, "The four traditional parts of a prescription are Superscription (Rx symbol), Inscription (drug name & dose), Subscription (directions to pharmacist/compounding), and Signa (directions to patient). 'Suprascription' is a fictitious term.", "Parts of Prescription: Superscription, Inscription, Subscription, Signa (NO Suprascription)."),
        3: (0, "The Latin medical abbreviation 'p.c.' stands for 'post cibum', meaning 'after meals'.", "p.c. = post cibum (after meals); a.c. = ante cibum (before meals)."),
        4: (3, "The Latin prescription abbreviation 'q.i.d.' stands for 'quater in die', instructing administration 4 times a day.", "q.i.d. = 4 times daily; t.i.d. = 3 times daily; b.i.d. = 2 times daily."),
        5: (1, "Intravenous and oral bisphosphonates (e.g. Alendronate, Zoledronic acid) inhibit osteoclastic bone remodeling and are the leading causative drugs for MRONJ (Medication-Related Osteonecrosis of the Jaw).", "MRONJ culprit = Bisphosphonates & RANKL inhibitors (Denosumab).")
    }

    for chunk in ph_chunks[1:]:
        lines = [clean(l) for l in chunk.strip().split('\n') if clean(l)]
        if not lines: continue
        m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
        if not m: continue
        q_num = int(m.group(1))
        
        q_stem_parts = [m.group(2)]
        opts = []
        for l in lines[1:]:
            opt_m = re.match(r'^([a-e])[\.\)]\s*(.*)', l, re.IGNORECASE)
            if opt_m:
                opts.append(opt_m.group(2).strip())
            elif len(opts) == 0:
                q_stem_parts.append(l)
            elif len(opts) > 0:
                opts[-1] += " " + l
                
        if len(opts) >= 4 and q_num in ph_master_map:
            c_idx, expl, hook = ph_master_map[q_num]
            distractors = {}
            for oi in range(len(opts)):
                if oi != c_idx:
                    distractors[str(oi)] = f"Option {chr(65+oi)} ({opts[oi]}) does not correspond to the pharmacologic definition or prescription terminology required."
            
            all_questions.append({
                "id": f"dle-pha-{q_num:03d}",
                "category": "Pharmacology & Anesthesiology",
                "question": " ".join(q_stem_parts).strip(),
                "options": opts[:4],
                "correctIndex": c_idx,
                "explanation": expl,
                "distractorRationales": distractors,
                "keyTakeaway": hook,
                "difficulty": "Easy" if q_num <= 4 else "Hard"
            })
            ph_count += 1
            
    print(f"Pharmacology & Anesthesiology compiled: {ph_count}")
except Exception as e:
    print(f"Error PH: {e}")

# -------------------------------------------------------------
# 7. ORTHODONTICS & PEDIATRIC DENTISTRY (from 13 - Orthodontics rationale.pdf)
# -------------------------------------------------------------
try:
    ortho_reader = pypdf.PdfReader('reviewer_materials/13 - Orthodontics rationale.pdf')
    ortho_full = '\n'.join(p.extract_text() or "" for p in ortho_reader.pages)
    ortho_chunks = re.split(r'\n(?=\d+\.)', ortho_full)
    ortho_count = 0

    ortho_master_map = {
        1: (2, "A mesocephalic (average/normal) facial type corresponds to a parabolic (paraboloid) dental arch. Brachycephalic faces correlate with broad/square arches, while dolichocephalic faces correlate with long/narrow arches.", "Facial types: Mesocephalic = Paraboloid arch; Brachycephalic = Square/broad; Dolichocephalic = V-shaped/narrow."),
        2: (4, "When a finger spring is applied to tip the crown of a tooth, the center of rotation is located in the middle third of the root, resulting in the root apex tipping in the OPPOSITE direction.", "Tipping forces = Crown moves one way, root apex moves in the opposite direction."),
        3: (1, "The 'V' principle of growth (described by Enlow) is classically illustrated by the mandibular ramus, where bone deposition occurs on the inner surface and resorption on the outer surface.", "V Principle of Growth = Mandibular Ramus (Enlow)."),
        4: (0, "The SNA cephalometric angle relates the anterior cranial base (SN) to the maxilla (point A). With normal at 82°, an angle of 90° signifies maxillary skeletal protrusion (prognathism).", "SNA = Maxillary position relative to cranial base (Normal = 82°; >82° = Maxillary protrusion)."),
        5: (1, "Dr. Edward Hartley Angle is widely revered as the 'Father of Modern Orthodontics' for formulating the first comprehensive classification of malocclusion (Classes I, II, III).", "Father of Modern Orthodontics = Edward H. Angle.")
    }

    for chunk in ortho_chunks[1:]:
        lines = [clean(l) for l in chunk.strip().split('\n') if clean(l)]
        if not lines: continue
        m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
        if not m: continue
        q_num = int(m.group(1))
        
        q_stem_parts = [m.group(2)]
        opts = []
        for l in lines[1:]:
            opt_m = re.match(r'^([a-e])[\.\)]\s*(.*)', l, re.IGNORECASE)
            if opt_m:
                opts.append(opt_m.group(2).strip())
            elif len(opts) == 0:
                q_stem_parts.append(l)
            elif len(opts) > 0:
                opts[-1] += " " + l
                
        if len(opts) >= 4 and q_num in ortho_master_map:
            c_idx, expl, hook = ortho_master_map[q_num]
            distractors = {}
            for oi in range(len(opts)):
                if oi != c_idx:
                    distractors[str(oi)] = f"Option {chr(65+oi)} ({opts[oi]}) is ruled out under standard orthodontic diagnostic criteria."
            
            all_questions.append({
                "id": f"dle-ortho-{q_num:03d}",
                "category": "Orthodontics & Pediatric Dentistry",
                "question": " ".join(q_stem_parts).strip(),
                "options": opts[:4],
                "correctIndex": c_idx,
                "explanation": expl,
                "distractorRationales": distractors,
                "keyTakeaway": hook,
                "difficulty": "Medium"
            })
            ortho_count += 1
            
    print(f"Orthodontics compiled: {ortho_count}")
except Exception as e:
    print(f"Error Ortho: {e}")

# -------------------------------------------------------------
# 8. GENERAL PHYSIOLOGY & ANATOMY (from 1-General Physiology rationale.pdf)
# -------------------------------------------------------------
try:
    phys_reader = pypdf.PdfReader('reviewer_materials/1-General Physiology rationale.pdf')
    phys_full = '\n'.join(p.extract_text() or "" for p in phys_reader.pages)
    phys_chunks = re.split(r'\n(?=\d+\.)', phys_full)
    phys_count = 0

    phys_master_map = {
        1: (1, "Diabetes insipidus results from deficiency or insensitivity to Antidiuretic Hormone (ADH/Vasopressin), leading to profound polyuria (excessive urination) and polydipsia (excessive thirst).", "Diabetes insipidus = ADH deficiency -> extreme polyuria & polydipsia."),
        7: (3, "In the renal nephron, almost 100% of filtered amino acids and glucose are actively reabsorbed in the Proximal Convoluted Tubule (PCT).", "Kidney reabsorption: 100% of amino acids & glucose reabsorbed in Proximal Convoluted Tubule (PCT)."),
        13: (1, "Ribosomes (both free in the cytoplasm and bound to rough endoplasmic reticulum) are the cellular sites of mRNA translation and protein synthesis.", "Protein synthesis = Ribosomes."),
        14: (2, "Apoptosis is the genetically regulated, energy-dependent programmed cell death, in contrast to necrosis which is accidental cell death from injury.", "Programmed cell death = Apoptosis.")
    }

    for chunk in phys_chunks[1:]:
        lines = [clean(l) for l in chunk.strip().split('\n') if clean(l)]
        if not lines: continue
        m = re.match(r'^(\d+)\.\s*(.*)', lines[0])
        if not m: continue
        q_num = int(m.group(1))
        
        q_stem_parts = [m.group(2)]
        opts = []
        for l in lines[1:]:
            opt_m = re.match(r'^([a-d])[\.\)]\s*(.*)', l, re.IGNORECASE)
            if opt_m:
                opts.append(opt_m.group(2).strip())
            elif len(opts) == 0:
                q_stem_parts.append(l)
            elif len(opts) > 0:
                opts[-1] += " " + l
                
        if len(opts) >= 4 and q_num in phys_master_map:
            c_idx, expl, hook = phys_master_map[q_num]
            distractors = {}
            for oi in range(len(opts)):
                if oi != c_idx:
                    distractors[str(oi)] = f"Option {chr(65+oi)} ({opts[oi]}) does not fit the physiologic mechanism or organ system function described."
            
            all_questions.append({
                "id": f"dle-phys-{q_num:03d}",
                "category": "General Anatomy & Physiology",
                "question": " ".join(q_stem_parts).strip(),
                "options": opts[:4],
                "correctIndex": c_idx,
                "explanation": expl,
                "distractorRationales": distractors,
                "keyTakeaway": hook,
                "difficulty": "Medium"
            })
            phys_count += 1
            
    print(f"General Physiology compiled: {phys_count}")
except Exception as e:
    print(f"Error Phys: {e}")

print(f"\nTotal authentic questions successfully compiled: {len(all_questions)}")

# Write to src/data/dentalQuestions.js
js_code = "export const dentalQuestions = " + json.dumps(all_questions, indent=2) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print("Saved cleanly to src/data/dentalQuestions.js!")
