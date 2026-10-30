import docx, pypdf, re, json, os

print("Assembling comprehensive board exam reviewer dataset...")

def clean(t):
    if not t: return ""
    return re.sub(r'\s+', ' ', t).strip()

all_questions = []

# Load already compiled from dentalQuestions.js as base
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"(\[.*\])", text, re.DOTALL)
if m:
    existing = json.loads(m.group(1))
    print(f"Loaded {len(existing)} existing questions from dentalQuestions.js")
    all_questions.extend(existing)

# Track existing IDs
existing_ids = {q["id"] for q in all_questions}

# ----------------- ADD HIGH YIELD GENERAL PATHOLOGY -----------------
gen_path_items = [
    {
        "id": "dle-gp-001",
        "category": "General Pathology",
        "question": "A patient presents with severe polyostotic fibrous dysplasia involving nearly the entire skeletal framework, cutaneous café-au-lait pigmentations, and endocrine abnormalities (precocious puberty). What is this syndrome known as?",
        "options": [
            "McCune-Albright Syndrome",
            "Weil's Disease",
            "Gardner Syndrome",
            "Treacher-Collins Syndrome"
        ],
        "correctIndex": 0,
        "explanation": "McCune-Albright Syndrome is the triad of polyostotic fibrous dysplasia, café-au-lait macules ('coast of Maine' ragged borders), and autonomous endocrine hyperfunction (most commonly precocious puberty in females) caused by GNAS gene mutations.",
        "distractorRationales": {
            "1": "Weil's disease is severe leptospirosis presenting with jaundice, renal failure, and hemorrhage, unrelated to fibrous dysplasia.",
            "2": "Gardner syndrome presents with intestinal adenomatous polyps, multiple osteomas (mandible/skull), and epidermal cysts.",
            "3": "Treacher-Collins syndrome (mandibulofacial dysostosis) is a branchial arch malformation with hypoplastic zygomas and ear defects."
        },
        "keyTakeaway": "McCune-Albright = Polyostotic fibrous dysplasia + Café-au-lait macules + Precocious puberty (GNAS mutation).",
        "difficulty": "Medium"
    },
    {
        "id": "dle-gp-002",
        "category": "General Pathology",
        "question": "Peutz-Jeghers Syndrome is characterized by mucocutaneous melanic macules of the lips and oral mucosa, intestinal hamartomatous polyps, and carries an elevated risk of malignancy primarily in the:",
        "options": [
            "Liver",
            "Gastrointestinal tract (colon, stomach, pancreas)",
            "Kidney",
            "Adrenal gland"
        ],
        "correctIndex": 1,
        "explanation": "Peutz-Jeghers Syndrome is an autosomal dominant STK11/LKB1 mutation causing perioral freckling and benign hamartomatous polyps throughout the GI tract, with a marked lifetime risk of carcinomas of the colon, pancreas, and stomach.",
        "distractorRationales": {
            "0": "Primary hepatic malignancy is not the characteristic cancer risk in Peutz-Jeghers.",
            "2": "Renal cell carcinomas are associated with Von Hippel-Lindau disease, not Peutz-Jeghers.",
            "3": "Adrenal tumors are typical of MEN syndromes or Li-Fraumeni, not Peutz-Jeghers."
        },
        "keyTakeaway": "Peutz-Jeghers = Perioral lip melanin spots + GI hamartomatous polyps + Colon/GI carcinoma risk (STK11 mutation).",
        "difficulty": "Medium"
    },
    {
        "id": "dle-gp-003",
        "category": "General Pathology",
        "question": "Which category of tissues contains stem cells that continuously divide throughout life to replace lost or sloughed cells (e.g. bone marrow, oral epithelium, gastrointestinal mucosa)?",
        "options": [
            "Labile Tissues",
            "Stable (Quiescent) Tissues",
            "Permanent (Non-dividing) Tissues",
            "Necrotic Tissues"
        ],
        "correctIndex": 0,
        "explanation": "Labile tissues (e.g., surface epithelia of skin/mouth, gut lining, hematopoietic cells) continuously proliferate throughout life from resident adult stem cells and possess immense regenerative capacity.",
        "distractorRationales": {
            "1": "Stable tissues (liver, renal parenchyma, vascular endothelium) reside in G0 phase but can enter the cell cycle upon injury.",
            "2": "Permanent tissues (neurons, cardiac myocytes) are terminally differentiated, cannot re-enter the cell cycle, and heal via fibrous scar.",
            "3": "Necrotic tissue represents non-viable cells that have undergone irreversible injury."
        },
        "keyTakeaway": "Tissue regenerative capacity: Labile = Continuously dividing; Stable = Enters cycle on demand; Permanent = Never divides.",
        "difficulty": "Easy"
    },
    {
        "id": "dle-gp-004",
        "category": "General Pathology",
        "question": "Histopathological examination of lung tissue from a patient with chronic congestive left-sided heart failure reveals 'heart failure cells'. What are these cells?",
        "options": [
            "Neutrophils laden with bacteria",
            "Hemosiderin-laden alveolar macrophages",
            "Eosinophils containing Charcot-Leyden crystals",
            "Hypertrophic bronchial goblet cells"
        ],
        "correctIndex": 1,
        "explanation": "'Heart failure cells' are pulmonary alveolar macrophages that have phagocytosed extravasated erythrocytes escaping congested alveolar capillaries, accumulating brown-golden hemosiderin pigment visible with Prussian blue stain.",
        "distractorRationales": {
            "0": "Neutrophils indicate acute suppurative bacterial pneumonia, not chronic left ventricular failure.",
            "2": "Eosinophils and Charcot-Leyden crystals are typical of allergic asthma.",
            "3": "Goblet cell hyperplasia occurs in chronic bronchitis, not congestive heart failure."
        },
        "keyTakeaway": "Heart-failure cells = Hemosiderin-filled alveolar macrophages in congested lung tissue.",
        "difficulty": "Medium"
    },
    {
        "id": "dle-gp-005",
        "category": "General Pathology",
        "question": "A patient with multiple odontogenic keratocysts (OKCs) of the jaws, bifid ribs, palmar/plantar pitting, and multiple basal cell carcinomas has which condition?",
        "options": [
            "Gorlin-Goltz Syndrome (Nevoid Basal Cell Carcinoma Syndrome)",
            "Sturge-Weber Syndrome",
            "Gardner Syndrome",
            "Cleidocranial Dysplasia"
        ],
        "correctIndex": 0,
        "explanation": "Gorlin-Goltz Syndrome (NBCCS) is an autosomal dominant PTCH1 mutation resulting in multiple OKCs/KCOTs, basal cell carcinomas, palmar/plantar pits, bifid ribs, and calcification of the falx cerebri.",
        "distractorRationales": {
            "1": "Sturge-Weber presents with facial port-wine stains in V1 distribution and leptomeningeal angiomas.",
            "2": "Gardner syndrome features multiple osteomas, supernumerary teeth, and familial adenomatous polyposis, not OKCs.",
            "3": "Cleidocranial dysplasia involves hypoplastic/absent clavicles, retained primary teeth, and multiple unerupted supernumerary teeth."
        },
        "keyTakeaway": "Gorlin-Goltz = Multiple OKCs + Basal cell carcinomas + Bifid ribs + Palmar pits (PTCH1 mutation).",
        "difficulty": "Medium"
    }
]

for item in gen_path_items:
    if item["id"] not in existing_ids:
        all_questions.append(item)
        existing_ids.add(item["id"])

# ----------------- ADD HIGH YIELD GENERAL HISTOLOGY & MICROBIOLOGY -----------------
micro_items = [
    {
        "id": "dle-micro-001",
        "category": "General Histology & Microbiology",
        "question": "Which spherical membrane-bound cell organelles contain catalase and oxidative enzymes to break down hydrogen peroxide (H2O2) and detoxify harmful substances?",
        "options": [
            "Lysosomes",
            "Peroxisomes (Microbodies)",
            "Ribosomes",
            "Proteasomes"
        ],
        "correctIndex": 1,
        "explanation": "Peroxisomes contain urate oxidase, amino acid oxidase, and catalase. Catalase decomposes toxic hydrogen peroxide into water and oxygen, protecting the cell from oxidative damage.",
        "distractorRationales": {
            "0": "Lysosomes contain acid hydrolases operating at pH ~4.5-5.0 for digestive degradation of cellular debris and phagocytosed particles.",
            "2": "Ribosomes consist of rRNA and proteins dedicated to polypeptide and protein synthesis.",
            "3": "Proteasomes are multi-protein complexes that degrade ubiquitin-tagged misfolded proteins."
        },
        "keyTakeaway": "Peroxisomes = Catalase & oxidases (H2O2 decomposition). Lysosomes = Acid hydrolases (digestion).",
        "difficulty": "Easy"
    },
    {
        "id": "dle-micro-002",
        "category": "General Histology & Microbiology",
        "question": "Which bacterial species is most classically and strongly associated with Localized Aggressive Periodontitis (Juvenile Periodontitis) in adolescents?",
        "options": [
            "Porphyromonas gingivalis",
            "Aggregatibacter actinomycetemcomitans",
            "Fusobacterium nucleatum",
            "Prevotella intermedia"
        ],
        "correctIndex": 1,
        "explanation": "Aggregatibacter actinomycetemcomitans (formerly Actinobacillus actinomycetemcomitans) produces leukotoxin (LtxA) that kills neutrophils and monocytes, leading to rapid attachment loss in permanent incisors and first molars in teenagers.",
        "distractorRationales": {
            "0": "Porphyromonas gingivalis is the keystone pathogen in chronic generalized periodontitis via gingipains.",
            "2": "Fusobacterium nucleatum acts as a bridging organism in dental plaque biofilms connecting early and late colonizers.",
            "3": "Prevotella intermedia is associated with pregnancy gingivitis and Necrotizing Ulcerative Gingivitis (NUG)."
        },
        "keyTakeaway": "Aggressive/Juvenile Periodontitis = Aggregatibacter actinomycetemcomitans (Aa). Chronic = P. gingivalis.",
        "difficulty": "Easy"
    },
    {
        "id": "dle-micro-003",
        "category": "General Histology & Microbiology",
        "question": "Which bacterial component found in the outer membrane of Gram-negative bacteria is responsible for endotoxic shock, fever, and bone resorption?",
        "options": [
            "Lipopolysaccharide (Lipid A)",
            "Teichoic acid",
            "Peptidoglycan murein layer",
            "Mycolic acid"
        ],
        "correctIndex": 0,
        "explanation": "Lipopolysaccharide (LPS) is the major surface antigen of Gram-negative bacteria; its Lipid A moiety is the endotoxin responsible for triggering macrophage release of TNF-alpha, IL-1, and IL-6, causing septic shock and osteoclastic bone resorption.",
        "distractorRationales": {
            "1": "Teichoic acid and lipoteichoic acid are antigenic cell wall components unique to Gram-positive bacteria.",
            "2": "Peptidoglycan provides osmotic structural rigidity to bacterial cell walls but is not the primary endotoxin.",
            "3": "Mycolic acid is the lipid-rich waxy cell wall component of acid-fast Mycobacterium tuberculosis."
        },
        "keyTakeaway": "LPS (Lipid A) = Gram-negative endotoxin that activates osteoclasts and drives alveolar bone loss.",
        "difficulty": "Medium"
    }
]

for item in micro_items:
    if item["id"] not in existing_ids:
        all_questions.append(item)
        existing_ids.add(item["id"])

# ----------------- ADD HIGH YIELD ORAL HISTOLOGY & EMBRYOLOGY -----------------
oral_histo_items = [
    {
        "id": "dle-oh-001",
        "category": "Oral Histology & Embryology",
        "question": "In prenatal craniofacial development, bilateral cleft lip occurs due to failure of fusion between which embryonic processes?",
        "options": [
            "Maxillary prominence and Medial Nasal prominence",
            "Two Medial Nasal prominences",
            "Medial and Lateral Nasal prominences",
            "Intermaxillary segment and Mandibular prominence"
        ],
        "correctIndex": 0,
        "explanation": "Cleft lip (unilateral or bilateral) results from failure of the maxillary prominence to merge with the medial nasal prominence at weeks 6 to 7 of embryogenesis.",
        "distractorRationales": {
            "1": "Failure of fusion of the two medial nasal prominences results in a rare median (midline) cleft lip.",
            "2": "Fusion between medial and lateral nasal prominences is not the primary cause of cleft lip; the cleft forms at the Philtrum-maxilla boundary.",
            "3": "The mandibular prominence merges with its opposite partner to form the lower jaw and lower lip."
        },
        "keyTakeaway": "Cleft Lip = Failure of Maxillary prominence + Medial Nasal prominence merger (6th-7th week).",
        "difficulty": "Medium"
    },
    {
        "id": "dle-oh-002",
        "category": "Oral Histology & Embryology",
        "question": "What is the primary formative cell of the periodontal ligament (PDL) responsible for synthesizing and remodeling both collagen fibers and ground substance?",
        "options": [
            "Odontoblast",
            "Cementoblast",
            "Fibroblast",
            "Ameloblast"
        ],
        "correctIndex": 2,
        "explanation": "Fibroblasts are the predominant and formative cells of the periodontal ligament, possessing a uniquely rapid turnover rate capable of both synthesizing and degrading type I collagen fibers.",
        "distractorRationales": {
            "0": "Odontoblasts are located at the dental pulp periphery and form dentin.",
            "1": "Cementoblasts form cementum on the tooth root surface.",
            "3": "Ameloblasts form enamel and undergo apoptosis before tooth eruption."
        },
        "keyTakeaway": "PDL formative cell = Fibroblast (highest collagen remodeling rate in the body).",
        "difficulty": "Easy"
    },
    {
        "id": "dle-oh-003",
        "category": "Oral Histology & Embryology",
        "question": "The terminal ends of principal periodontal ligament collagen fibers that embed deeply into cementum on one side and alveolar bone proper on the other are called:",
        "options": [
            "Tomes' fibers",
            "Sharpey's fibers",
            "Korff's fibers",
            "Oxytalan fibers"
        ],
        "correctIndex": 1,
        "explanation": "Sharpey's fibers are the terminal mineralized insertions of PDL principal fiber bundles embedded within both root cementum and bundle bone (lamina dura) of the alveolar socket.",
        "distractorRationales": {
            "0": "Tomes' fibers (processes) are the secretory extensions of ameloblasts during enamel matrix formation.",
            "2": "von Korff's fibers are initial corkscrew-like collagen fibers in the mantle dentin matrix.",
            "3": "Oxytalan fibers are immature elastic-like fibers in the PDL that run parallel to the root surface."
        },
        "keyTakeaway": "Sharpey's fibers = Terminal collagen insertions anchoring PDL into cementum and alveolar bone.",
        "difficulty": "Easy"
    },
    {
        "id": "dle-oh-004",
        "category": "Oral Histology & Embryology",
        "question": "The Junctional Epithelium (JE) attached to the tooth enamel surface is derived embryologically from the:",
        "options": [
            "Reduced Enamel Epithelium (REE) joining the Oral Epithelium",
            "Dental Follicle / Sac",
            "Hertwig's Epithelial Root Sheath (HERS)",
            "Vestibular Lamina"
        ],
        "correctIndex": 0,
        "explanation": "During tooth eruption, the Reduced Enamel Epithelium (REE) fuses with the overlying oral mucosal epithelium to establish the initial junctional epithelium, attaching to enamel via internal basal lamina and hemidesmosomes.",
        "distractorRationales": {
            "1": "The dental follicle forms the cementum, PDL, and alveolar bone.",
            "2": "HERS directs root development and induces odontoblast differentiation along roots.",
            "3": "Vestibular lamina hollows out to form the oral vestibule between cheeks/lips and alveolar ridges."
        },
        "keyTakeaway": "Junctional Epithelium = Derived from Reduced Enamel Epithelium (REE) + Oral Epithelium.",
        "difficulty": "Medium"
    }
]

for item in oral_histo_items:
    if item["id"] not in existing_ids:
        all_questions.append(item)
        existing_ids.add(item["id"])

print(f"Final master database contains {len(all_questions)} questions across all subjects!")

# Sort questions by category then ID
all_questions.sort(key=lambda x: (x["category"], x["id"]))

js_output = "export const dentalQuestions = " + json.dumps(all_questions, indent=2) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(js_output)

print("Saved to src/data/dentalQuestions.js successfully!")
