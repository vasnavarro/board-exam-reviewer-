import json, re

# High-yield board exam questions directly compiled from DMF Reviewer Book Pages 1-30
DMF_QUESTIONS = [
    {
        "id": "dle-dmf-001",
        "category": "General Anatomy & Physiology",
        "question": "The combination of Stratum basale and Stratum spinosum in the epidermis is collectively designated as the:",
        "options": [
            "Stratum lucidum",
            "Malpighian layer (Stratum germinativum)",
            "Stratum corneum",
            "Dermal papillae"
        ],
        "correctIndex": 1,
        "explanation": "The Stratum basale and Stratum spinosum are collectively referred to as the Malpighian layer (or Stratum germinativum) because they represent the metabolically active, proliferating, and mitotic layers of the stratified squamous epithelium responsible for regenerating the epidermis.",
        "distractorRationales": {
            "0": "Option A (Stratum lucidum) is the clear, translucent layer containing eleidin found exclusively in thick skin (palms and soles).",
            "2": "Option C (Stratum corneum) is the outermost non-viable, anucleate, fully keratinized horny layer of the epidermis.",
            "3": "Option D (Dermal papillae) are finger-like connective tissue projections of the papillary dermis that interdigitate with epidermal rete pegs."
        },
        "keyTakeaway": "Epidermis Layers: Basale + Spinosum = Malpighian layer (active germinative zone with highest mitotic activity).",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-002",
        "category": "General Anatomy & Physiology",
        "question": "Which of the following cell types in the epidermis originates from neural crest cells and is responsible for producing melanin pigment?",
        "options": [
            "Keratinocytes",
            "Langerhans cells",
            "Melanocytes",
            "Merkel cells"
        ],
        "correctIndex": 2,
        "explanation": "Melanocytes originate embryologically from neural crest ectoderm. They migrate into the Stratum basale and synthesize melanin (eumelanin and pheomelanin) inside melanosomes, which are transferred to neighboring keratinocytes to protect their nuclei from UV radiation.",
        "distractorRationales": {
            "0": "Option A (Keratinocytes) originate from surface ectoderm and constitute the most numerous (>90%) cell type of the epidermis, producing keratin.",
            "1": "Option B (Langerhans cells) originate from bone marrow monocyte lineage and act as dendritic antigen-presenting macrophages predominantly in the Stratum spinosum.",
            "3": "Option C (Merkel cells) are modified neuroendocrine cells in the Stratum basale that function as slow-adapting mechanoreceptors for light touch."
        },
        "keyTakeaway": "Epidermal Cells: Melanocytes = Neural crest origin, produce melanin; Langerhans = Bone marrow/macrophage; Merkel = Touch mechanoreceptors.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-003",
        "category": "General Anatomy & Physiology",
        "question": "Which cutaneous mechanoreceptors are specifically encapsulated in an 'onion-like' layered structure and detect deep pressure and high-frequency vibration?",
        "options": [
            "Meissner corpuscles",
            "Ruffini corpuscles",
            "Pacinian corpuscles",
            "End-bulbs of Krause"
        ],
        "correctIndex": 2,
        "explanation": "Pacinian corpuscles (lamellar corpuscles) are large, oval, onion-shaped mechanoreceptors located deep in the dermis and hypodermis. Their concentric lamellae of flattened Schwann cells detect rapid deep pressure changes and high-frequency vibration.",
        "distractorRationales": {
            "0": "Option A (Meissner corpuscles) are superficial elongated encapsulated receptors in dermal papillae that detect light touch and low-frequency flutter.",
            "1": "Option B (Ruffini corpuscles) are spindle-shaped receptors in the deep dermis that detect skin stretch and continuous heat.",
            "3": "Option D (End-bulbs of Krause) are localized mechanoreceptors historically associated with cold sensation and mucosal touch."
        },
        "keyTakeaway": "Mechanoreceptors: Pacinian = Pressure & vibration ('onion-shaped'); Meissner = Light touch (dermal papillae); Ruffini = Heat & stretch; Krause = Cold.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-004",
        "category": "General Anatomy & Physiology",
        "question": "During the synthesis of active Vitamin D, the initial photochemical conversion of 7-dehydrocholesterol into Cholecalciferol (Vitamin D3) takes place in the:",
        "options": [
            "Skin (activated by solar UVB radiation)",
            "Liver parenchyma",
            "Renal proximal convoluted tubules",
            "Intestinal enterocytes"
        ],
        "correctIndex": 0,
        "explanation": "Endogenous Vitamin D synthesis begins in the Stratum basale and Stratum spinosum of the Skin, where solar ultraviolet B (UVB, 290-315 nm) photochemically cleaves 7-dehydrocholesterol into previtamin D3, which isomerizes to Cholecalciferol (Vitamin D3).",
        "distractorRationales": {
            "1": "Option B (Liver) is the site of the first enzymatic hydroxylation, converting Vitamin D3 into 25-hydroxycholecalciferol (Calcidiol).",
            "2": "Option C (Kidney) is the site of the second 1-alpha-hydroxylation, converting Calcidiol into 1,25-dihydroxycholecalciferol (Calcitriol, the active hormone).",
            "3": "Option D (Intestine) is the target organ where Calcitriol binds nuclear receptors to stimulate enterocyte calcium and phosphate absorption."
        },
        "keyTakeaway": "Vitamin D Cascade: Skin (7-DHC -> D3 via UVB) -> Liver (25-OH Calcidiol) -> Kidney (1,25-(OH)2 Calcitriol - Active form).",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-005",
        "category": "General Anatomy & Physiology",
        "question": "In skeletal muscle tissue, the Sarcoplasmic Reticulum (SR) specifically functions as the primary intracellular storage site for which crucial ion required for contraction?",
        "options": [
            "Sodium (Na+)",
            "Potassium (K+)",
            "Calcium (Ca2+)",
            "Magnesium (Mg2+)"
        ],
        "correctIndex": 2,
        "explanation": "The Sarcoplasmic Reticulum (SR) and its dilated Terminal Cisternae sequester and store Calcium ions (Ca2+) at high concentration via SERCA pumps. When an action potential depolarizes the T-tubules, Ca2+ is released into the sarcoplasm to initiate cross-bridge cycling.",
        "distractorRationales": {
            "0": "Option A (Sodium) is the principal extracellular cation whose influx through sarcolemmal voltage-gated channels mediates the muscle action potential.",
            "1": "Option B (Potassium) is the principal intracellular cation whose efflux mediates repolarization of the muscle membrane.",
            "3": "Option D (Magnesium) is an essential cofactor for ATPase activity, but not the regulatory ion stored in the SR terminal cisternae."
        },
        "keyTakeaway": "Muscle Physiology: Calcium (Ca2+) stored in Sarcoplasmic Reticulum terminal cisterns is the indispensable trigger for muscle contraction.",
        "difficulty": "Easy"
    },
    {
        "id": "dle-dmf-006",
        "category": "General Anatomy & Physiology",
        "question": "In the microscopic architecture of a skeletal muscle sarcomere, the structural boundary that passes through the center of the I (light) band is the:",
        "options": [
            "A band",
            "M line",
            "H zone",
            "Z disc (Z line)"
        ],
        "correctIndex": 3,
        "explanation": "The Z disc (Z line) bisects the I (isotropic/light) band and serves as the anchoring matrix for thin actin filaments. A Sarcomere is anatomically defined as the contractile segment spanning from one Z disc to the next Z disc.",
        "distractorRationales": {
            "0": "Option A (A band) represents the anisotropic dark band corresponding to the full length of thick myosin filaments.",
            "1": "Option B (M line) is the proteinaceous line in the dead center of the A band / H zone that anchors thick filaments.",
            "2": "Option C (H zone) is the central region of the A band containing thick myosin filaments with NO overlapping thin actin filaments."
        },
        "keyTakeaway": "Sarcomere Bands: Z line bisects I band (light); M line bisects H zone / A band (dark); Sarcomere = Z disc to Z disc.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-007",
        "category": "General Anatomy & Physiology",
        "question": "During the sliding filament mechanism of skeletal muscle contraction, what event directly causes the detachment of the myosin head from the actin binding site?",
        "options": [
            "Binding of a new ATP molecule to the myosin head",
            "Hydrolysis of ATP into ADP and Inorganic Phosphate",
            "Release of Calcium from the troponin complex",
            "Depolarization of the T-tubule membrane"
        ],
        "correctIndex": 0,
        "explanation": "The binding of a fresh ATP molecule to the nucleotide-binding pocket of the myosin head causes a conformational change that instantly reduces its affinity for actin, causing Detachment. In the absence of ATP (as after death), myosin remains locked to actin, resulting in Rigor Mortis.",
        "distractorRationales": {
            "1": "Option B (ATP Hydrolysis to ADP + Pi) 'cocks' the myosin head into a high-energy state ready to bind actin, but does not cause detachment.",
            "2": "Option C (Release of Calcium) allows tropomyosin to cover actin binding sites during muscle relaxation, but does not mediate cross-bridge detachment.",
            "3": "Option D (T-tubule depolarization) triggers calcium release to initiate cross-bridging, not detachment."
        },
        "keyTakeaway": "Cross-Bridge Detachment: Binding of NEW ATP detaches myosin from actin. (Lack of ATP = Rigor Mortis!).",
        "difficulty": "Hard"
    },
    {
        "id": "dle-dmf-008",
        "category": "General Anatomy & Physiology",
        "question": "Which branch of the posterior division of the Mandibular Nerve (CN V3) is purely MOTOR and innervates the mylohyoid muscle and anterior belly of the digastric?",
        "options": [
            "Inferior alveolar nerve",
            "Mylohyoid nerve",
            "Auriculotemporal nerve",
            "Lingual nerve"
        ],
        "correctIndex": 1,
        "explanation": "The Mylohyoid Nerve branches off the inferior alveolar nerve immediately prior to entering the mandibular foramen. It is the only motor branch of the posterior division of V3, running in the mylohyoid groove to innervate both the mylohyoid muscle and the anterior belly of the digastric.",
        "distractorRationales": {
            "0": "Option A (Inferior alveolar nerve) is primarily sensory to all mandibular teeth, gingiva anterior to mental foramen, and lower lip/chin.",
            "2": "Option C (Auriculotemporal nerve) is sensory to the TMJ, external auditory meatus, parotid capsule, and temporal scalp.",
            "3": "Option D (Lingual nerve) is sensory to the anterior two-thirds of the tongue and lingual gingiva."
        },
        "keyTakeaway": "Mandibular Nerve (V3): Posterior division has ONE motor branch: Mylohyoid Nerve (supplies mylohyoid & anterior digastric).",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-009",
        "category": "General Anatomy & Physiology",
        "question": "Special sensory innervation for TASTE from the anterior two-thirds of the tongue is conveyed by which cranial nerve pathway?",
        "options": [
            "Lingual nerve of Trigeminal Nerve (CN V3)",
            "Chorda tympani of Facial Nerve (CN VII)",
            "Glossopharyngeal Nerve (CN IX)",
            "Internal branch of Superior Laryngeal Nerve (CN X)"
        ],
        "correctIndex": 1,
        "explanation": "Taste buds on the anterior 2/3 of the tongue (fungiform papillae) are innervated by the Chorda Tympani branch of the Facial Nerve (CN VII), which hitches a ride with the lingual nerve. General somatic sensation (pain, touch, temperature) from the same area is carried by the Lingual Nerve (CN V3).",
        "distractorRationales": {
            "0": "Option A (Lingual nerve of V3) conveys GENERAL somatic sensation (touch, pain, hot/cold) from anterior 2/3 of tongue, NOT taste.",
            "2": "Option C (Glossopharyngeal CN IX) conveys BOTH general sensation and taste from the POSTERIOR ONE-THIRD of the tongue.",
            "3": "Option D (CN X) conveys general sensation and taste from the base of the tongue, epiglottis, and vallecula."
        },
        "keyTakeaway": "Tongue Innervation Rule: Anterior 2/3 = Lingual (V3 - General) + Chorda Tympani (VII - Taste); Posterior 1/3 = Glossopharyngeal (IX - Both); Base = Vagus (X - Both); Motor = CN XII.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-010",
        "category": "General Anatomy & Physiology",
        "question": "Which lingual papillae are the most numerous on the dorsal surface of the tongue, yet are the ONLY papillae that contain NO taste buds?",
        "options": [
            "Fungiform papillae",
            "Foliate papillae",
            "Circumvallate papillae",
            "Filiform papillae"
        ],
        "correctIndex": 3,
        "explanation": "Filiform papillae are small, cone-shaped, keratinized projections that cover the vast majority of the dorsal tongue. They provide mechanical friction for food manipulation but contain ZERO taste buds.",
        "distractorRationales": {
            "0": "Option A (Fungiform papillae) are mushroom-shaped red spots scattered on the tip and lateral margins containing taste buds.",
            "1": "Option B (Foliate papillae) form vertical folds on the posterolateral tongue borders containing functional taste buds.",
            "2": "Option C (Circumvallate papillae) are 8-12 large dome-shaped papillae arranged in a V-shaped sulcus terminalis containing hundreds of taste buds and Von Ebner serous glands."
        },
        "keyTakeaway": "Tongue Papillae: Filiform = Most numerous, keratinized, NO taste buds; Circumvallate = Largest, least numerous, V-shaped sulcus, Von Ebner glands.",
        "difficulty": "Easy"
    },
    {
        "id": "dle-dmf-011",
        "category": "General Anatomy & Physiology",
        "question": "In the gastric mucosa, which specialized epithelial cells secrete Hydrochloric Acid (HCl) and Intrinsic Factor (essential for Vitamin B12 absorption)?",
        "options": [
            "Chief (peptic) cells",
            "Parietal (oxyntic) cells",
            "G cells",
            "Mucous neck cells"
        ],
        "correctIndex": 1,
        "explanation": "Parietal (oxyntic) cells located in the fundic and body gastric glands contain abundant mitochondria and intracellular canaliculi with H+/K+ ATPase pumps that secrete Hydrochloric Acid (HCl) and Intrinsic Factor. Deficiency of intrinsic factor leads to Pernicious Anemia.",
        "distractorRationales": {
            "0": "Option A (Chief cells) secrete Pepsinogen (the inactive zymogen precursor to pepsin) and gastric lipase for protein and fat digestion.",
            "2": "Option C (G cells) are neuroendocrine cells located in the gastric antrum that secrete the peptide hormone Gastrin into the bloodstream.",
            "3": "Option D (Mucous neck cells) secrete protective alkaline mucus that coats and shields the gastric lining against luminal acid autodigestion."
        },
        "keyTakeaway": "Stomach Cells: Parietal/Oxyntic = HCl + Intrinsic Factor (B12); Chief = Pepsinogen; G cells = Gastrin; Mucous neck = Mucus barrier.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-012",
        "category": "General Anatomy & Physiology",
        "question": "The three microscopic structures that constitute the classic 'Portal Triad' situated at the corners of a hepatic liver lobule are:",
        "options": [
            "Hepatic artery branch, Portal vein branch, and Bile ductule",
            "Central vein, Hepatic artery, and Lymphatic vessel",
            "Cystic duct, Hepatic vein, and Sinusoid",
            "Splenic vein, Superior mesenteric vein, and Inferior vena cava"
        ],
        "correctIndex": 0,
        "explanation": "A classic Portal Triad (portal tract) found in the connective tissue at the corners of liver lobules consists of three vessels: 1) Branch of the Hepatic Artery (oxygenated blood), 2) Branch of the Hepatic Portal Vein (nutrient-rich deoxygenated blood), and 3) Bile Ductule (draining bile).",
        "distractorRationales": {
            "1": "Option B (Central vein) is situated at the exact CENTER of the hepatic classic lobule, draining blood away toward hepatic veins.",
            "2": "Option C (Cystic duct) drains the gallbladder into the common bile duct, not part of hepatic lobular portal triads.",
            "3": "Option D (Splenic and superior mesenteric veins) unite extrahepatically to form the main Portal Vein trunk."
        },
        "keyTakeaway": "Hepatic Portal Triad: 1) Hepatic Artery branch, 2) Portal Vein branch, 3) Bile Ductule.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-013",
        "category": "General Anatomy & Physiology",
        "question": "The most permeable, leaky capillaries in the human circulatory system, characterized by wide intercellular gaps and discontinuous basement membranes (found in the liver, spleen, and bone marrow), are known as:",
        "options": [
            "Continuous capillaries",
            "Fenestrated capillaries",
            "Sinusoids (discontinuous capillaries)",
            "Arteriovenous anastomoses"
        ],
        "correctIndex": 2,
        "explanation": "Sinusoidal (discontinuous) capillaries have large endothelial fenestrae without diaphragms, wide intercellular gaps, and incomplete or absent basement membranes, allowing whole red blood cells, plasma proteins, and large molecules to pass freely (found in liver, spleen, bone marrow, and lymphoid tissue).",
        "distractorRationales": {
            "0": "Option A (Continuous capillaries) have complete, unbroken endothelial linings and continuous basement membranes joined by tight junctions (found in muscle, skin, brain/BBB).",
            "1": "Option B (Fenestrated capillaries) contain small pores with thin diaphragms for rapid fluid/solute exchange (found in kidneys, small intestine, endocrine glands).",
            "3": "Option D (Arteriovenous anastomoses) are direct vascular shunts connecting arterioles directly to venules bypassing capillary beds."
        },
        "keyTakeaway": "Capillary Permeability: Continuous (least permeable) < Fenestrated (pores for solutes) < Sinusoids (most permeable/discontinuous for cells & proteins).",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-014",
        "category": "General Anatomy & Physiology",
        "question": "The major excretory duct of the pancreas that runs the entire length of the gland and empties into the duodenum at the Major Duodenal Papilla is the:",
        "options": [
            "Duct of Santorini",
            "Duct of Wirsung",
            "Duct of Rivinus",
            "Wharton's duct"
        ],
        "correctIndex": 1,
        "explanation": "The Duct of Wirsung is the Main (Major) Pancreatic Duct. It traverses the pancreas from tail to head, joins the common bile duct to form the Hepatopancreatic Ampulla (Ampulla of Vater), and discharges pancreatic enzymes through the Major Duodenal Papilla (controlled by the Sphincter of Oddi).",
        "distractorRationales": {
            "0": "Option A (Duct of Santorini) is the Accessory Pancreatic Duct that branches from the main duct and empties into the Minor Duodenal Papilla.",
            "2": "Option C (Duct of Rivinus) refers to the minor sublingual ducts opening along the sublingual fold in the floor of the mouth.",
            "3": "Option D (Wharton's duct) is the main excretory duct of the Submandibular salivary gland opening at the sublingual caruncle."
        },
        "keyTakeaway": "Ducts of the Pancreas: Duct of Wirsung = Major/main pancreatic duct; Duct of Santorini = Accessory pancreatic duct.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-dmf-015",
        "category": "General Anatomy & Physiology",
        "question": "Which of the following salivary or serous glands empty directly into the circular trench surrounding the Circumvallate Papillae to flush away food particles from taste buds?",
        "options": [
            "Glands of Blandin-Nuhn",
            "Glands of Luschka",
            "Glands of Von Ebner",
            "Parotid glands"
        ],
        "correctIndex": 2,
        "explanation": "Von Ebner's Glands are purely serous minor salivary glands embedded in the tongue musculature beneath Circumvallate (and foliate) papillae. Their watery serous secretion flushes the circumvallate moat/trench, cleansing taste receptors to allow immediate detection of new gustatory stimuli.",
        "distractorRationales": {
            "0": "Option A (Glands of Blandin-Nuhn) are mixed anterior lingual salivary glands located near the ventral tip of the tongue.",
            "1": "Option B (Glands of Luschka) are developmental mucosal outpouchings or bile ductules found in the wall of the gallbladder.",
            "3": "Option D (Parotid glands) are major salivary glands emptying into the buccal mucosa opposite the maxillary second molar via Stensen's duct."
        },
        "keyTakeaway": "Glands of Von Ebner: Purely serous lingual glands emptying into the trenches of Circumvallate papillae to flush taste buds.",
        "difficulty": "Medium"
    }
]

# Read dentalQuestions.js
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
questions = json.loads(m.group(1))

# Check which IDs already exist
existing_ids = {q["id"] for q in questions}
added = 0
for dmf_q in DMF_QUESTIONS:
    if dmf_q["id"] not in existing_ids:
        questions.append(dmf_q)
        added += 1

print(f"Added {added} new high-yield questions from DMF Reviewer Book Pages 1-30.")
print(f"Total question bank size is now: {len(questions)} items!")

# Save to dentalQuestions.js
output_js = "export const dentalQuestions = " + json.dumps(questions, indent=2, ensure_ascii=False) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(output_js)

print("Saved successfully to src/data/dentalQuestions.js!")
