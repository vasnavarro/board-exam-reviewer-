import json

# Compile all 100 pages into structured data
pages_data = [
    # Pages 1 to 15: General Histology & Embryology
    {
        "pageNumber": 1,
        "title": "General Histology: Epithelial Tissue Classification",
        "subject": "General Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["epithelium", "simple squamous", "stratified squamous", "endothelium", "mesothelium", "transitional epithelium", "keratinized", "urinary bladder"],
        "summary": "Covers primary epithelial classifications: Simple squamous (endothelium lining blood vessels, mesothelium lining body cavities), Stratified squamous (keratinized on masticatory oral mucosa/skin; non-keratinized on lining mucosa), and Transitional epithelium (urothelium of urinary bladder capable of stretching)."
    },
    {
        "pageNumber": 2,
        "title": "General Histology: Connective Tissue & Collagen Types",
        "subject": "General Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["connective tissue", "collagen", "type i collagen", "type ii collagen", "type iii collagen", "type iv collagen", "fibroblasts", "mast cells", "histamine", "heparin"],
        "summary": "Connective tissue elements: Fibroblasts (primary matrix-producing cells) and Mast cells (granules containing histamine and heparin). Collagen hierarchy: Type I (skin, bone, dentin, cementum, tendon), Type II (cartilage), Type III (reticular fibers, granulation tissue), Type IV (basement membrane / basal lamina)."
    },
    {
        "pageNumber": 3,
        "title": "General Histology: Cartilage Types & Characteristics",
        "subject": "General Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["cartilage", "hyaline cartilage", "elastic cartilage", "fibrocartilage", "tmj disc", "articular disc", "chondrocytes", "perichondrium", "intervertebral disc"],
        "summary": "Three cartilage types: 1) Hyaline (most abundant, precursor in endochondral bone formation, costal/nasal/articular), 2) Elastic (ear pinna, epiglottis, cuneiform/corniculate of larynx), 3) Fibrocartilage (strongest tensile strength, no perichondrium; TMJ articular disc, intervertebral discs, pubic symphysis)."
    },
    {
        "pageNumber": 4,
        "title": "General Histology: Bone Formation & Cell Biology",
        "subject": "General Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["bone", "osteoblasts", "osteoclasts", "osteocytes", "intramembranous ossification", "endochondral ossification", "howship lacunae", "trabeculae", "haversian system"],
        "summary": "Bone biology: Osteoblasts (secrete osteoid collagen matrix), Osteocytes (mature bone cells inside lacunae), Osteoclasts (multinucleated resorption cells residing in Howship's lacunae with ruffled borders). Mechanisms: Intramembranous ossification (maxilla, mandible, clavicle) vs Endochondral ossification (long bones, cranial base)."
    },
    {
        "pageNumber": 5,
        "title": "General Histology: Muscle Types & Architecture",
        "subject": "General Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["muscle", "skeletal muscle", "cardiac muscle", "smooth muscle", "intercalated discs", "striated", "involuntary", "spindle-shaped"],
        "summary": "Muscle tissue comparison: Skeletal muscle (striated, voluntary, multinucleated with peripheral nuclei), Cardiac muscle (striated, involuntary, branched fibers with central nuclei and pathognomonic intercalated discs with gap junctions), Smooth muscle (non-striated, involuntary, spindle-shaped with single central nucleus)."
    },
    {
        "pageNumber": 6,
        "title": "General Physiology: Sarcomere & Muscle Contraction",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["sarcomere", "actin", "myosin", "z line", "a band", "i band", "h zone", "sarcoplasmic reticulum", "troponin", "tropomyosin", "calcium"],
        "summary": "Molecular mechanics of muscle contraction: Sarcomere extends from Z-line to Z-line. Actin (thin filament) and Myosin (thick filament). A-band remains constant during contraction while I-band and H-zone shorten. Sarcoplasmic reticulum releases Ca2+ which binds Troponin C, shifting Tropomyosin to expose myosin-binding sites."
    },
    {
        "pageNumber": 7,
        "title": "Embryology: Meckel's Cartilage & Mandibular Development",
        "subject": "General Embryology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["meckels cartilage", "mandible", "first branchial arch", "malleus", "incus", "sphenomandibular ligament", "intramembranous"],
        "summary": "Meckel's cartilage (1st pharyngeal arch cartilage): Serves as the structural framework around which the mandible develops, but the mandible itself forms lateral to it by intramembranous ossification! Dorsal end gives rise to the Malleus, Incus, and Sphenomandibular ligament."
    },
    {
        "pageNumber": 8,
        "title": "Embryology: 1st & 2nd Pharyngeal (Branchial) Arches",
        "subject": "General Embryology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["branchial arches", "pharyngeal arches", "mandibular arch", "hyoid arch", "cn v", "cn vii", "facial nerve", "muscles of mastication", "stapes", "styloid"],
        "summary": "1st Pharyngeal Arch (Mandibular): CN V3 (trigeminal), muscles of mastication, mylohyoid, anterior digastric, tensor veli palatini, tensor tympani, malleus, incus. 2nd Arch (Hyoid): CN VII (facial), muscles of facial expression, stapedius, stylohyoid, posterior digastric, stapes, styloid process, lesser horn of hyoid."
    },
    {
        "pageNumber": 9,
        "title": "Embryology: 3rd, 4th & 6th Pharyngeal Arches",
        "subject": "General Embryology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["third arch", "fourth arch", "sixth arch", "cn ix", "cn x", "glossopharyngeal", "vagus", "stylopharyngeus", "laryngeal cartilages", "hyoid bone"],
        "summary": "3rd Pharyngeal Arch: CN IX (glossopharyngeal), stylopharyngeus muscle, greater horn and lower body of hyoid. 4th Arch: CN X superior laryngeal branch, pharyngeal constrictors, cricothyroid. 6th Arch: CN X recurrent laryngeal nerve, intrinsic muscles of larynx, laryngeal cartilages (thyroid, cricoid, arytenoid)."
    },
    {
        "pageNumber": 10,
        "title": "Embryology: Pharyngeal Pouches & Clefts Derivatives",
        "subject": "General Embryology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["pharyngeal pouches", "pharyngeal clefts", "eustachian tube", "palatine tonsil", "thymus", "inferior parathyroid", "superior parathyroid", "external auditory meatus"],
        "summary": "Endodermal pouches: 1st pouch (middle ear cavity, Eustachian tube), 2nd pouch (palatine tonsil crypts), 3rd pouch (inferior parathyroid glands, thymus), 4th pouch (superior parathyroid glands, ultimobranchial body). 1st ectodermal cleft forms the external auditory meatus; clefts 2-4 obliterate to form cervical sinus."
    },
    {
        "pageNumber": 11,
        "title": "Embryology & Anatomy: Tongue Development & Innervation",
        "subject": "Oral Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["tongue", "lingual nerve", "chorda tympani", "cn v3", "cn vii", "cn ix", "cn xii", "hypoglossal", "anterior two thirds", "posterior third", "circumvallate"],
        "summary": "Tongue innervation mapping: Anterior 2/3 (1st arch: general sensory via Lingual nerve CN V3, taste via Chorda Tympani CN VII). Posterior 1/3 (3rd arch: sensory and taste via Glossopharyngeal CN IX). Base/epiglottis (4th arch: CN X). Motor innervation: CN XII Hypoglossal to all tongue muscles except Palatoglossus (CN X pharyngeal plexus)."
    },
    {
        "pageNumber": 12,
        "title": "Oral Histology: Salivary Glands Architecture & Secretion",
        "subject": "Oral Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["salivary glands", "parotid", "submandibular", "sublingual", "serous acini", "mucous acini", "whartons duct", "stensens duct", "demilunes"],
        "summary": "Major salivary glands: Parotid (largest gland, purely serous, Stensen's duct opening opposite maxillary 2nd molar, CN IX via otic ganglion), Submandibular (produces 60-65% of resting saliva, mixed predominantly serous with demilunes, Wharton's duct), Sublingual (smallest, mixed predominantly mucous, ducts of Rivinus/Bartholin)."
    },
    {
        "pageNumber": 13,
        "title": "Oral Embryology: Stages of Odontogenesis (Tooth Development)",
        "subject": "Oral Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["odontogenesis", "dental lamina", "bud stage", "cap stage", "bell stage", "enamel organ", "dental papilla", "dental follicle", "ameloblasts", "odontoblasts"],
        "summary": "Tooth development progression: Dental lamina -> Bud stage -> Cap stage (triad: enamel organ forms enamel, dental papilla forms dentin and pulp, dental sac/follicle forms cementum, PDL, and alveolar bone) -> Bell stage (morphodifferentiation & histodifferentiation: IEE cells differentiate into ameloblasts, outer dental papilla into odontoblasts)."
    },
    {
        "pageNumber": 14,
        "title": "Oral Histology: Enamel Composition & Microstructure",
        "subject": "Oral Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["enamel", "hydroxyapatite", "enamel rods", "striae of retzius", "neonatal line", "hunter schreger bands", "gnarled enamel", "enamel lamellae", "enamel tufts", "enamel spindles"],
        "summary": "Enamel histology: 96% inorganic hydroxyapatite, 4% organic matrix and water. Structural units: Enamel rods/prisms. Incremental growth lines: Striae of Retzius (accentuated at birth as Neonatal line). Optical phenomena: Hunter-Schreger bands. Hypomineralized structures: Enamel tufts (grass-like), Enamel lamellae (fault lines), Enamel spindles (odontoblast processes extending into enamel)."
    },
    {
        "pageNumber": 15,
        "title": "Oral Histology: Dentin-Pulp Complex & Structural Zones",
        "subject": "Oral Histology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["dentin", "pulp", "primary dentin", "secondary dentin", "tertiary dentin", "dentinal tubules", "zone of weil", "raschkow plexus", "odontoblasts"],
        "summary": "Dentin composition: 70% inorganic, 20% organic (Type I collagen), 10% water. Primary dentin (forms before root completion), Secondary dentin (physiological slow formation throughout life), Tertiary/reparative dentin (response to noxious stimuli/caries). Pulp zones: Odontoblast layer -> Cell-free zone of Weil -> Cell-rich zone -> Pulp core (Plexus of Raschkow nerve fibers)."
    },
    # Pages 16 to 28: General Anatomy & Head/Neck
    {
        "pageNumber": 16,
        "title": "Head & Neck Anatomy: Twelve Cranial Nerves Overview",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["cranial nerves", "olfactory", "optic", "oculomotor", "trochlear", "trigeminal", "abducens", "facial", "vestibulocochlear", "glossopharyngeal", "vagus", "accessory", "hypoglossal"],
        "summary": "Comprehensive cranial nerve summary (CN I–XII), modality (sensory, motor, or mixed), foramen of exit from cranium, and primary head/neck distributions. High-yield board mnemonics for cranial nerve exit foramina: Superior orbital fissure (III, IV, V1, VI), Foramen rotundum (V2), Foramen ovale (V3), Internal acoustic meatus (VII, VIII), Jugular foramen (IX, X, XI), Hypoglossal canal (XII)."
    },
    {
        "pageNumber": 17,
        "title": "Head & Neck Anatomy: Trigeminal Nerve (CN V) Divisions",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["trigeminal nerve", "cn v", "ophthalmic v1", "maxillary v2", "mandibular v3", "superior orbital fissure", "foramen rotundum", "foramen ovale", "foramen spinosum"],
        "summary": "Three divisions of Trigeminal Nerve: V1 Ophthalmic (purely sensory, exits superior orbital fissure into orbit), V2 Maxillary (purely sensory, exits foramen rotundum into pterygopalatine fossa), V3 Mandibular (sensory AND motor, exits foramen ovale into infratemporal fossa). Foramen spinosum transmits middle meningeal artery adjacent to foramen ovale."
    },
    {
        "pageNumber": 18,
        "title": "Head & Neck Anatomy: Mandibular Nerve (CN V3) Branching",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["mandibular nerve", "cn v3", "auriculotemporal", "lingual nerve", "inferior alveolar nerve", "buccal nerve", "nerve to mylohyoid", "chorda tympani"],
        "summary": "Mandibular nerve trunks: Anterior trunk (motor to masseter, temporalis, lateral pterygoid; sensory is long buccal nerve). Posterior trunk (sensory: Auriculotemporal nerve encircling middle meningeal artery; Lingual nerve joined by Chorda tympani; Inferior alveolar nerve entering mandibular foramen, giving off motor nerve to mylohyoid before canal)."
    },
    {
        "pageNumber": 19,
        "title": "Dental Anatomy & Anesthesia: Inferior Alveolar Nerve Block Landmarks",
        "subject": "Local Anesthesia",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["ian block", "inferior alveolar nerve", "pterygomandibular raphe", "coronoid notch", "mandibular foramen", "lingula", "lingual nerve anesthesia"],
        "summary": "Anatomic landmarks for standard Halsted IAN injection: Coronoid notch, Pterygomandibular raphe, Pterygomandibular space, Mandibular foramen, Lingula, Occlusal plane of mandibular molars (needle placed 6-10mm superior to occlusal plane). Tissues anesthetized: mandibular teeth to midline, buccal periosteum anterior to 1st molar, anterior 2/3 of tongue, and floor of mouth."
    },
    {
        "pageNumber": 20,
        "title": "Head & Neck Anatomy: Muscles of Mastication",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["muscles of mastication", "temporalis", "masseter", "medial pterygoid", "lateral pterygoid", "protrusion", "elevation", "mandibular opening"],
        "summary": "Four primary muscles of mastication (all innervated by CN V3): 1) Temporalis (elevates and retracts mandible), 2) Masseter (elevates mandible, powerful chewing), 3) Medial Pterygoid (elevates mandible, forms pterygomasseteric sling with masseter), 4) Lateral Pterygoid (PROTRUDES and DEPRESSES mandible to open mouth; only masticatory muscle that opens the jaw!)."
    },
    {
        "pageNumber": 21,
        "title": "Head & Neck Anatomy: Temporomandibular Joint (TMJ) Structure",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["tmj", "articular disc", "condyle", "mandibular fossa", "articular eminence", "ginglymoarthrodial", "bilaminar zone", "retrodiscal pad", "fibrocartilage"],
        "summary": "TMJ anatomy: Ginglymoarthrodial joint (lower compartment: hinge/rotation; upper compartment: gliding/translation). Articular surfaces covered by FIBROCARTILAGE (not hyaline!). Articular disc is biconcave, avascular, and aneural centrally. Bilaminar zone (retrodiscal tissue) is richly vascularized and innervated by auriculotemporal nerve."
    },
    {
        "pageNumber": 22,
        "title": "Head & Neck Anatomy: Cervical Triangles & Carotid Sheath",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["triangles of neck", "carotid triangle", "submandibular triangle", "submental triangle", "carotid sheath", "internal jugular vein", "vagus nerve", "common carotid artery"],
        "summary": "Anterior neck triangles: Submental (unpaired, bounded by digastric bellies), Submandibular (digastric triangle: submandibular gland, facial artery/vein), Carotid triangle (boundaries: SCM, posterior digastric, superior omohyoid). Carotid sheath contents: Common carotid artery (medial), Internal jugular vein (lateral), Vagus nerve (posterior)."
    },
    {
        "pageNumber": 23,
        "title": "Head & Neck Anatomy: External Carotid Artery Branches",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["external carotid artery", "superior thyroid", "lingual artery", "facial artery", "maxillary artery", "superficial temporal", "branches", "salfopms"],
        "summary": "Eight branches of External Carotid Artery (mnemonic: Some Anatomists Like Freaking Out Poor Medical Students): Superior thyroid, Ascending pharyngeal, Lingual, Facial, Occipital, Posterior auricular, Maxillary, Superficial temporal. Terminal branches: Maxillary artery and Superficial temporal artery inside parotid gland."
    },
    {
        "pageNumber": 24,
        "title": "Head & Neck Anatomy: Maxillary Artery Three Portions",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["maxillary artery", "middle meningeal", "inferior alveolar artery", "infraorbital", "sphenopalatine artery", "pterygopalatine fossa", "epistaxis"],
        "summary": "Maxillary artery segments: 1st / Mandibular part (deep auricular, anterior tympanic, Middle meningeal artery entering foramen spinosum, Inferior alveolar artery), 2nd / Pterygoid part (muscular branches: masseteric, deep temporal, pterygoid, buccal), 3rd / Pterygopalatine part (PSA, Infraorbital, Greater palatine, Sphenopalatine artery - source of severe posterior nosebleeds)."
    },
    {
        "pageNumber": 25,
        "title": "Head & Neck Anatomy: Pterygoid Venous Plexus & Danger Triangle",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["pterygoid plexus", "danger area", "cavernous sinus", "facial vein", "emissary veins", "thrombosis", "valveless veins"],
        "summary": "Venous drainage & clinical hazards: Facial vein connects to Pterygoid venous plexus via deep facial vein and ophthalmic veins to Cavernous sinus. Because facial and ophthalmic veins lack valves, infections within the 'danger triangle of the face' (corners of mouth to bridge of nose) can travel retrogradely, causing fatal Cavernous Sinus Thrombosis."
    },
    {
        "pageNumber": 26,
        "title": "Head & Neck Anatomy: Facial Nerve (CN VII) Path & Branches",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["facial nerve", "cn vii", "stylomastoid foramen", "parotid gland", "bells palsy", "chorda tympani", "temporal", "zygomatic", "buccal", "mandibular", "cervical"],
        "summary": "Facial nerve anatomy: Exits skull via Stylomastoid foramen, gives off posterior auricular nerve, pierces parotid gland without innervating it, divides into 5 terminal motor branches (To Zanzibar By Motor Car: Temporal, Zygomatic, Buccal, Marginal mandibular, Cervical). Bell's Palsy: lower motor neuron lesion resulting in paralysis of all ipsilateral facial muscles."
    },
    {
        "pageNumber": 27,
        "title": "Head & Neck Anatomy: Pharynx & Laryngeal Muscles Innervation",
        "subject": "General Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["pharynx", "larynx", "constrictor muscles", "recurrent laryngeal nerve", "superior laryngeal nerve", "cricothyroid", "stylopharyngeus", "swallowing"],
        "summary": "Pharyngeal & laryngeal innervation: Pharyngeal constrictor muscles innervated by CN X (vagus) via pharyngeal plexus; Stylopharyngeus is only pharyngeal muscle innervated by CN IX (glossopharyngeal). Laryngeal muscles: all intrinsic muscles innervated by Recurrent laryngeal nerve EXCEPT Cricothyroid (external branch of Superior laryngeal nerve)."
    },
    {
        "pageNumber": 28,
        "title": "General Physiology: Gastrointestinal Sphincters & Digestive Enzymes",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["digestion", "pyloric sphincter", "lower esophageal sphincter", "sphincter of oddi", "salivary amylase", "ptyalin", "pepsin", "gastric acid"],
        "summary": "Digestive physiology: Sphincters regulate flow through GI tract (LES prevents gastroesophageal reflux; Pyloric sphincter controls gastric chyme delivery to duodenum; Sphincter of Oddi controls bile and pancreatic juice flow through ampulla of Vater). Salivary amylase (ptyalin) initiates starch breakdown in mouth; Gastric chief cells secrete pepsinogen (activated to pepsin by HCl)."
    },
    # Pages 29 to 39: General Physiology
    {
        "pageNumber": 29,
        "title": "Cardiovascular Physiology: Cardiac Conduction & Cardiac Cycle",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["cardiac cycle", "sa node", "av node", "purkinje fibers", "pacemaker", "systole", "diastole", "frank starling", "stroke volume"],
        "summary": "Cardiac electrical sequence: Sinoatrial (SA) node is intrinsic pacemaker (60-100 bpm) -> AV node (40-60 bpm, causes 0.1s delay allowing complete atrial emptying into ventricles) -> Bundle of His -> Purkinje fibers. Frank-Starling mechanism: cardiac output increases in direct proportion to end-diastolic volume (preload stretch)."
    },
    {
        "pageNumber": 30,
        "title": "Cardiovascular Physiology: Blood Pressure Regulation & RAAS",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["blood pressure", "baroreceptors", "carotid sinus", "raas", "renin", "angiotensin", "aldosterone", "mean arterial pressure", "tpr"],
        "summary": "Blood pressure control systems: Short-term regulation via arterial baroreceptors in carotid sinus (CN IX) and aortic arch (CN X). Long-term regulation via Renin-Angiotensin-Aldosterone System (RAAS): Kidney juxtaglomerular cells release Renin in response to decreased renal perfusion -> converts angiotensinogen to Angiotensin I -> ACE converts to Angiotensin II (potent vasoconstrictor) -> Aldosterone."
    },
    {
        "pageNumber": 31,
        "title": "Respiratory Physiology: Lung Volumes, Capacities & Chemoreceptors",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["lung volumes", "tidal volume", "vital capacity", "residual volume", "chemoreceptors", "hypercapnia", "respiratory center", "medulla"],
        "summary": "Respiratory mechanics: Tidal Volume (TV ~500mL), Vital Capacity (VC = TV + IRV + ERV ~4600mL), Residual Volume (RV cannot be measured by spirometry). Control of breathing: Central chemoreceptors in medulla oblongata are exquisitely sensitive to changes in PaCO2 and pH of cerebrospinal fluid; peripheral chemoreceptors in carotid/aortic bodies respond to hypoxia (PaO2 < 60 mmHg)."
    },
    {
        "pageNumber": 32,
        "title": "Respiratory Physiology: Oxygen-Hemoglobin Dissociation Curve",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["oxygen hemoglobin curve", "bohr effect", "right shift", "left shift", "2 3 dpg", "acidosis", "carbon monoxide", "fetal hemoglobin"],
        "summary": "Oxygen-Hemoglobin dissociation dynamics: Right shift (Bohr effect = decreased Hb affinity, enhances O2 release to tissues): increased H+ / decreased pH (acidosis), increased PaCO2, increased temperature, increased 2,3-DPG. Left shift (increased Hb affinity, holds O2 tighter): alkalosis, hypothermia, decreased 2,3-DPG, Fetal hemoglobin (HbF), and Carbon Monoxide (CO)."
    },
    {
        "pageNumber": 33,
        "title": "Renal Physiology: Nephron Anatomy, Filtration & Tubular Transport",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["nephron", "bowmans capsule", "glomerulus", "pct", "loop of henle", "dct", "furosemide", "reabsorption", "podocytes"],
        "summary": "Nephron structural segments: Bowman's capsule with podocytes encasing glomerular capillaries. Proximal Convoluted Tubule (PCT: reabsorbs 65-70% of filtered water, sodium, potassium, and 100% of glucose and amino acids). Loop of Henle: thin descending limb permeable to water; thick ascending limb impermeable to water with Na-K-2Cl cotransporter (inhibited by Loop Diuretics like Furosemide)."
    },
    {
        "pageNumber": 34,
        "title": "Renal Physiology & Acid-Base: Clearance & Acid-Base Balance",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["renal clearance", "inulin", "pah", "gfr", "acid base", "metabolic acidosis", "respiratory acidosis", "hco3", "pco2"],
        "summary": "Renal clearances: Inulin clearance measures Glomerular Filtration Rate (GFR); PAH (para-aminohippuric acid) clearance measures effective Renal Plasma Flow (RPF). Acid-base balance (normal arterial pH 7.35–7.45): Metabolic acidosis (low HCO3-), Metabolic alkalosis (high HCO3-), Respiratory acidosis (high PaCO2), Respiratory alkalosis (low PaCO2)."
    },
    {
        "pageNumber": 35,
        "title": "Endocrine Physiology: Pituitary & Thyroid Hormones",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["pituitary", "anterior pituitary", "posterior pituitary", "adh", "oxytocin", "t3", "t4", "calcitonin", "pth", "calcium homeostasis"],
        "summary": "Pituitary gland: Anterior pituitary produces GH, TSH, ACTH, FSH, LH, Prolactin. Posterior pituitary stores and secretes ADH (vasopressin) and Oxytocin synthesized in hypothalamus. Calcium regulation: Parathyroid Hormone (PTH) raises serum calcium by stimulating osteoclast resorption and activating vitamin D; Calcitonin (thyroid C-cells) lowers serum calcium."
    },
    {
        "pageNumber": 36,
        "title": "Endocrine Physiology: Adrenal Gland Layers & Pancreatic Islets",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["adrenal cortex", "adrenal medulla", "aldosterone", "cortisol", "epinephrine", "insulin", "glucagon", "islets of langerhans", "gfr"],
        "summary": "Adrenal gland anatomy: Cortex layers (mnemonic: GFR - Salt, Sugar, Sex): Zona Glomerulosa (Aldosterone), Zona Fasciculata (Cortisol), Zona Reticularis (Androgens). Adrenal Medulla: Chromaffin cells produce Epinephrine (80%) and Norepinephrine (20%). Endocrine pancreas: Beta cells secrete Insulin, Alpha cells secrete Glucagon, Delta cells secrete Somatostatin."
    },
    {
        "pageNumber": 37,
        "title": "Neurophysiology: Membrane Potentials & Synaptic Transmission",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["action potential", "resting membrane potential", "sodium potassium pump", "depolarization", "repolarization", "saltatory conduction", "nodes of ranvier"],
        "summary": "Nerve electrophysiology: Resting membrane potential (-70 mV) maintained by Na+/K+ ATPase pump (3 Na+ out, 2 K+ in). Depolarization: rapid opening of voltage-gated Na+ channels and Na+ influx. Repolarization: closure of Na+ channels and opening of voltage-gated K+ channels with K+ efflux. Saltatory conduction occurs along Nodes of Ranvier in myelinated nerve fibers."
    },
    {
        "pageNumber": 38,
        "title": "Metabolic Physiology: Liver Glycogenolysis & Gluconeogenesis",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["gluconeogenesis", "glycogenolysis", "glycolysis", "cori cycle", "liver", "lactate", "glucose", "insulin vs glucagon"],
        "summary": "Carbohydrate metabolism: Glycolysis (breakdown of glucose to pyruvate/lactate), Glycogenolysis (glycogen breakdown in liver to maintain fasting blood glucose), Gluconeogenesis (de novo synthesis of glucose from lactate, glycerol, and amino acids in the liver during prolonged fasting). Cori cycle: converts muscle lactic acid back into glucose in the liver."
    },
    {
        "pageNumber": 39,
        "title": "Hematology & Hemostasis: Coagulation Cascade & Clotting Factors",
        "subject": "General Physiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["coagulation cascade", "extrinsic pathway", "intrinsic pathway", "pt inr", "aptt", "vitamin k dependent", "warfarin", "heparin", "factors"],
        "summary": "Hemostatic pathways: Extrinsic pathway (Tissue factor / Factor VII, monitored by PT/INR, inhibited by Warfarin), Intrinsic pathway (Factors XII, XI, IX, VIII, monitored by aPTT, inhibited by Heparin), Common pathway (Factor X, V, Prothrombin/II, Fibrinogen/I). Vitamin K-dependent clotting factors: II, VII, IX, X, Protein C, and Protein S (mnemonic: 1972)."
    },
    # Pages 40 to 56: General Pathology & Microbiology
    {
        "pageNumber": 40,
        "title": "Oral Microbiology: Dental Plaque Biofilm & Cariogenic Bacteria",
        "subject": "Oral Microbiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["dental plaque", "biofilm", "streptococcus mutans", "pellicle", "glucosyltransferase", "dextran", "lactobacillus", "acidogenic"],
        "summary": "Cariology & biofilm succession: Acquired pellicle (salivary glycoproteins) -> Pioneer colonizers (Streptococcus sanguinis, S. mitis) -> Secondary colonizers (Actinomyces, Fusobacterium nucleatum) -> Mature biofilm with Streptococcus mutans. S. mutans produces insoluble extracellular glucans/dextran from sucrose using glucosyltransferase; Lactobacillus drives caries progression deeper into dentin."
    },
    {
        "pageNumber": 41,
        "title": "Medical Microbiology: Actinomyces Species & Actinomycosis",
        "subject": "Oral Microbiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["actinomyces", "actinomycosis", "sulfur granules", "lumpy jaw", "anaerobic", "filamentous", "penicillin", "cervicofacial"],
        "summary": "Actinomyces israelii: Gram-positive, branching, filamentous, facultative/obligate anaerobe found in normal oral flora. Causes Actinomycosis ('Lumpy Jaw'): chronic suppurative and granulomatous infection featuring indurated soft tissue swelling and multiple sinus tracts discharging macroscopic yellow 'Sulfur granules'. Treatment requires high-dose, long-term Penicillin."
    },
    {
        "pageNumber": 42,
        "title": "Medical Microbiology: Clostridium Genus & Associated Pathologies",
        "subject": "Medical Microbiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["clostridium", "c tetani", "c botulinum", "c perfringens", "c difficile", "pseudomembranous colitis", "tetanospasmin", "trismus", "gas gangrene"],
        "summary": "Clostridium species (Gram-positive, spore-forming obligate anaerobes): C. tetani (tetanospasmin blocks GABA/glycine release -> trismus/lockjaw, spastic paralysis), C. botulinum (blocks ACh release -> flaccid paralysis), C. perfringens (alpha-toxin lecithinase -> gas gangrene), Clostridioides difficile (toxins A & B cause pseudomembranous colitis following antibiotic use, especially Clindamycin; treated with oral Vancomycin)."
    },
    {
        "pageNumber": 43,
        "title": "General Pathology: Cellular Injury, Necrosis & Apoptosis",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["cell injury", "necrosis", "coagulative necrosis", "liquefactive necrosis", "caseous necrosis", "pyknosis", "karyorrhexis", "karyolysis", "apoptosis"],
        "summary": "Reversible cellular injury (cellular swelling, fatty change) vs Irreversible injury (nuclear changes: Pyknosis = shrinkage, Karyorrhexis = fragmentation, Karyolysis = dissolution). Necrosis patterns: Coagulative (ischemic infarctions except brain), Liquefactive (brain infarcts and bacterial abscesses), Caseous (tuberculosis granulomas), Fat necrosis (pancreatitis). Apoptosis is programmed, ATP-dependent, caspase-mediated, with NO inflammation."
    },
    {
        "pageNumber": 44,
        "title": "General Pathology: Acute & Chronic Inflammation",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["inflammation", "cardinal signs", "neutrophils", "macrophages", "histamine", "granuloma", "langhans giant cells", "triple response"],
        "summary": "Inflammatory response: Cardinal signs of acute inflammation: Rubor (redness), Tumor (swelling), Calor (heat), Dolor (pain), Functio laesa (loss of function). Cellular hallmark of acute: Neutrophils (PMNs). Chronic inflammation hallmarks: Macrophages, Lymphocytes, Plasma cells, Fibrosis. Granulomatous inflammation characterized by clusters of epithelioid macrophages surrounded by a lymphocyte collar and Langhans multinucleated giant cells."
    },
    {
        "pageNumber": 45,
        "title": "General Pathology: Hemodynamics - Edema, Transudate & Exudate",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["edema", "transudate", "exudate", "hydrostatic pressure", "oncotic pressure", "shock", "anaphylactic shock", "starling forces"],
        "summary": "Starling forces and edema mechanisms: Increased capillary hydrostatic pressure (CHF), Decreased plasma oncotic pressure (hypoalbuminemia, cirrhosis, nephrotic syndrome), Lymphatic obstruction, Increased vascular permeability (inflammation). Transudate: low protein (<3 g/dL), low specific gravity, non-inflammatory. Exudate: high protein (>3 g/dL), high cellular content, inflammatory."
    },
    {
        "pageNumber": 46,
        "title": "General Pathology: Thrombosis, Embolism & Virchow's Triad",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["thrombosis", "virchows triad", "embolism", "pulmonary embolism", "dvt", "lines of zahn", "infarction"],
        "summary": "Thrombogenesis and Virchow's Triad: 1) Endothelial injury (most critical), 2) Alterations in normal blood flow (stasis or turbulence), 3) Hypercoagulability. Lines of Zahn (alternating pale platelet/fibrin layers and red cell layers) distinguish antemortem thrombi from postmortem clots. Pulmonary emboli typically arise from Deep Vein Thrombosis (DVT) of the lower extremities."
    },
    {
        "pageNumber": 47,
        "title": "General Pathology: Neoplasia - Benign vs Malignant Tumors",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["neoplasia", "benign", "malignant", "differentiation", "anaplasia", "metastasis", "carcinoma", "sarcoma", "invasion"],
        "summary": "Neoplasia classification: Benign tumors are well-differentiated, slow-growing, encapsulated, and do not metastasize. Malignant neoplasms exhibit anaplasia (loss of differentiation), pleomorphism, hyperchromatic nuclei, high nuclear-to-cytoplasmic ratio, atypical mitotic figures, local tissue invasion, and metastasis (the definitive hallmark of malignancy). Carcinomas metastasize via lymphatics; Sarcomas via hematogenous routes."
    },
    {
        "pageNumber": 48,
        "title": "General Pathology: Oncogenes & Tumor Suppressor Genes",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["oncogenes", "tumor suppressor genes", "tp53", "rb gene", "kras", "myc", "bcr abl", "two hit hypothesis", "li fraumeni"],
        "summary": "Molecular genetics of cancer: Proto-oncogenes (gain of function, dominant, single allele mutation: KRAS, MYC, HER2, BCR-ABL). Tumor Suppressor Genes (loss of function, recessive, Knudson's two-hit hypothesis: TP53 guardian of the genome, RB retinoblastoma gene regulating G1/S checkpoint, APC gene in familial adenomatous polyposis, BRCA1/BRCA2)."
    },
    {
        "pageNumber": 49,
        "title": "Medical Microbiology: Protozoan & Opportunistic Parasites",
        "subject": "Medical Microbiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["protozoa", "trichomonas vaginalis", "giardia lamblia", "entamoeba histolytica", "pneumocystis jirovecii", "strawberry cervix", "flagellated"],
        "summary": "Protozoan parasites: Trichomonas vaginalis (flagellated protozoan causing trichomoniasis, foul-smelling frothy green discharge, 'strawberry cervix'), Giardia lamblia (flagellated protozoan causing foul-smelling fatty diarrhea and malabsorption), Entamoeba histolytica (amebic dysentery with flask-shaped colonic ulcers and liver abscesses), Pneumocystis jirovecii (opportunistic fungal pneumonia in immunocompromised/AIDS)."
    },
    {
        "pageNumber": 50,
        "title": "Oral Microbiology & Pathology: Candida Albicans & Oral Candidiasis",
        "subject": "Oral Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["candida albicans", "candidiasis", "thrush", "pseudomembranous", "erythematous", "hyperplastic", "angular cheilitis", "nystatin", "wipes off"],
        "summary": "Candida albicans (dimorphic opportunistic fungal yeast). Four classic clinical presentations: 1) Pseudomembranous ('Thrush': white curd-like plaques that WIPE OFF leaving an erythematous bleeding base), 2) Erythematous (painful red patches, denture stomatitis, median rhomboid glossitis), 3) Hyperplastic (white plaques that DO NOT wipe off, premalignant potential), 4) Angular cheilitis (cracking at labial commissures). Treatment: Nystatin, Clotrimazole, Fluconazole."
    },
    {
        "pageNumber": 51,
        "title": "Oral Microbiology & Pathology: Herpes Simplex Virus & VZV",
        "subject": "Oral Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["herpes simplex", "hsv 1", "herpetic gingivostomatitis", "herpes labialis", "varicella zoster", "shingles", "tzanck smear", "cowdry bodies", "keratinized mucosa"],
        "summary": "Herpesviruses: HSV-1 Primary Herpetic Gingivostomatitis (multiple vesicles/ulcers throughout keratinized and non-keratinized oral mucosa with systemic fever in children) vs Recurrent Intraoral Herpes (strictly localized to KERATINIZED mucosa bound to periosteum: hard palate and attached gingiva!). Tzanck smear reveals multinucleated giant cells with Cowdry A inclusion bodies. VZV causes Chickenpox and unilateral dermatomal Shingles (Herpes Zoster)."
    },
    {
        "pageNumber": 52,
        "title": "Oral Microbiology: EBV, CMV, Coxsackie & Viral Infections",
        "subject": "Oral Microbiology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["epstein barr virus", "ebv", "oral hairy leukoplakia", "infectious mononucleosis", "coxsackievirus", "herpangina", "hand foot mouth", "cytomegalovirus"],
        "summary": "Viral oral lesions: Epstein-Barr Virus (EBV) causes Infectious Mononucleosis (fever, pharyngitis, lymphadenopathy, atypical Downey cells), Oral Hairy Leukoplakia (corrugated non-wiping white lateral tongue patches in HIV/AIDS), and Burkitt Lymphoma. Coxsackievirus causes Herpangina (vesicles on soft palate/tonsillar pillars) and Hand-Foot-and-Mouth disease (vesicles on hands, feet, and anterior mouth)."
    },
    {
        "pageNumber": 53,
        "title": "Oral Pathology: Premalignant Oral Lesions & Conditions",
        "subject": "Oral Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["leukoplakia", "erythroplakia", "oral submucous fibrosis", "proliferative verrucous", "dysplasia", "squamous cell carcinoma", "biopsy"],
        "summary": "Potentially malignant oral disorders: Leukoplakia (white patch that cannot be rubbed off or characterized as another disease; high risk sites: ventrolateral tongue, floor of mouth; 5-25% dysplasia rate). Erythroplakia (velvety red plaque with >90% displaying severe dysplasia, carcinoma in situ, or invasive squamous cell carcinoma!). Oral Submucous Fibrosis (betel nut/areca nut chewing, subepithelial fibrosis, progressive trismus)."
    },
    {
        "pageNumber": 54,
        "title": "Oral Pathology: Odontogenic Cysts & Ameloblastoma",
        "subject": "Oral Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["radicular cyst", "dentigerous cyst", "okc", "odontogenic keratocyst", "ameloblastoma", "gorlin goltz", "soap bubble", "rests of malassez"],
        "summary": "Odontogenic lesions: Radicular Cyst (most common, non-vital tooth, rests of Malassez). Dentigerous Cyst (surrounds crown of unerupted tooth attached at CEJ). Odontogenic Keratocyst (OKC: high recurrence, corrugated parakeratinized lining, palisaded basal nuclei, daughter cysts, associated with Gorlin-Goltz syndrome / PTCH mutation). Ameloblastoma (aggressive benign odontogenic tumor with 'soap bubble' / multilocular appearance, follicular pattern with reverse polarity)."
    },
    {
        "pageNumber": 55,
        "title": "General Pathology: Edema Classification & Hemorrhage Types",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["edema", "ascites", "hydrothorax", "cardiac tamponade", "anasarca", "pulmonary edema", "petechiae", "purpura", "ecchymoses", "hematoma"],
        "summary": "Fluid accumulation classifications: Peritoneal cavity (Ascites), Pleural cavity (Hydrothorax / Pleural effusion), Pericardial cavity (Cardiac tamponade / Hemopericardium), Generalized subcutaneous edema (Anasarca), Lung spaces (Pulmonary edema). Hemorrhage gradations: Petechiae (1-2 mm pinpoint), Purpura (3-5 mm), Ecchymoses (>1-2 cm subcutaneous bruise changing color from hemoglobin -> biliverdin -> bilirubin)."
    },
    {
        "pageNumber": 56,
        "title": "General Pathology & Hematology: Anemias, Agranulocytosis & Multiple Myeloma",
        "subject": "General Pathology",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["sickle cell anemia", "erythroblastosis fetalis", "agranulocytosis", "multiple myeloma", "bence jones", "hair on end", "rhogham", "plasma cells"],
        "summary": "Hematologic disorders: Sickle Cell Anemia (point mutation replacing glutamic acid with valine on beta-globin chain; 'hair-on-end' radiographic skull pattern). Erythroblastosis Fetalis (Rh-negative mother pregnant with Rh-positive fetus, prevented by RhoGAM). Agranulocytosis (severe drop in circulating neutrophils <500/uL resulting in necrotizing oral ulcers). Multiple Myeloma (plasma cell malignancy with 'punched-out' osteolytic skull lesions and Bence-Jones proteinuria)."
    },
    # Pages 57 to 80: Pharmacology & Anesthesia
    {
        "pageNumber": 57,
        "title": "Pharmacology Principles & Autonomic Nervous System Receptors",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["pharmacodynamics", "pharmacokinetics", "autonomic nervous system", "sympathetic", "parasympathetic", "alpha receptors", "beta receptors", "muscarinic", "pilocarpine"],
        "summary": "Pharmacology fundamentals: Pharmacokinetics (Absorption, Distribution, Metabolism, Excretion - what body does to drug) vs Pharmacodynamics (receptor binding, biochemical effects - what drug does to body). Autonomic receptors: Alpha-1 (vasoconstriction), Beta-1 (increased heart rate and contractility), Beta-2 (bronchodilation and skeletal muscle vasodilation), Muscarinic cholinergic receptors (stimulated by Pilocarpine to promote salivary secretion)."
    },
    {
        "pageNumber": 58,
        "title": "Dental Pharmacology: Mechanism of Action of Local Anesthetics",
        "subject": "Local Anesthesia",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["local anesthetic mechanism", "sodium channels", "depolarization", "rn uncharged base", "rnh+ cation", "tissue ph", "inflammation acidosis"],
        "summary": "Local anesthetic pharmacology: Reversibly bind to specific receptors inside voltage-gated sodium channels on the inner nerve axolemma, blocking sodium influx and action potential propagation. The uncharged lipophilic free base (RN) crosses the nerve sheath; the charged cationic form (RNH+) binds the intracellular channel receptor. In tissue inflammation (acidic pH < 6.0), more drug exists in the ionized RNH+ form, failing to penetrate nerve membranes and causing anesthesia failure!"
    },
    {
        "pageNumber": 59,
        "title": "Dental Pharmacology: Chemical Classes of Local Anesthetics (Amides vs Esters)",
        "subject": "Local Anesthesia",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["amides", "esters", "lidocaine", "mepivacaine", "articaine", "bupivacaine", "procaine", "paba", "pseudocholinesterase", "liver metabolism"],
        "summary": "Amides vs Esters differentiation: Amides have two 'i's in their generic name (Lidocaine, Mepivacaine, Prilocaine, Articaine, Bupivacaine); Esters have only one 'i' (Procaine, Tetracaine, Benzocaine, Cocaine). Esters metabolized in plasma by pseudocholinesterase to PABA (responsible for frequent allergic reactions); Amides metabolized primarily in liver by CYP450 (true allergy to amides is extremely rare). Articaine possesses an ester side chain, enabling 90% plasma hydrolysis and superior safety."
    },
    {
        "pageNumber": 60,
        "title": "Pharmacology Principles: Therapeutic Index & Drug Safety Margins",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["therapeutic index", "ld50", "ed50", "td50", "margin of safety", "digoxin", "warfarin", "dose response curve", "potency vs efficacy"],
        "summary": "Therapeutic safety metrics: Therapeutic Index (TI) = LD50 / ED50 (or TD50 / ED50). A higher TI represents a wide margin of safety. Drugs with narrow therapeutic indices (Digoxin, Warfarin, Lithium, Theophylline, Phenytoin) require tight therapeutic monitoring. Crucial clinical rule: Doubling the dose does NOT double the clinical effect; it increases duration and toxicity exponentially!"
    },
    {
        "pageNumber": 61,
        "title": "Dental Pharmacology: Sedative-Hypnotics Classification",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["sedatives", "hypnotics", "benzodiazepines", "barbiturates", "gaba", "flumazenil", "diazepam", "midazolam", "triazolam", "chloride channel"],
        "summary": "Sedative-hypnotics: Benzodiazepines (Diazepam, Midazolam, Triazolam) enhance GABA-A receptor action by increasing the FREQUENCY of chloride channel opening, producing sedation, anxiolysis, muscle relaxation, and anterograde amnesia. High safety ceiling; reversed by Flumazenil. Barbiturates (Phenobarbital, Thiopental) increase the DURATION of chloride channel opening and can open channels directly at high doses, carrying severe risk of fatal respiratory depression."
    },
    {
        "pageNumber": 62,
        "title": "Local Anesthesia: Cartridge Volume & Milligram Calculations",
        "subject": "Local Anesthesia",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["cartridge calculation", "1.8 ml carpule", "2% lidocaine", "3% mepivacaine", "4% articaine", "0.5% bupivacaine", "epinephrine calculation"],
        "summary": "Anesthetic math for 1.8 mL standard dental cartridge: Percentage x 10 x 1.8 mL = total mg per carpule. 1) 2% Lidocaine = 20 mg/mL x 1.8 = 36 mg/carpule. 2) 3% Mepivacaine = 30 mg/mL x 1.8 = 54 mg/carpule. 3) 4% Articaine = 40 mg/mL x 1.8 = 72 mg/carpule. 4) 0.5% Bupivacaine = 5 mg/mL x 1.8 = 9 mg/carpule. Vasoconstrictor math: 1:100,000 epinephrine contains 0.01 mg/mL = 0.018 mg epi per carpule; 1:200,000 contains 0.009 mg epi per carpule."
    },
    {
        "pageNumber": 63,
        "title": "Local Anesthesia: Malamed Maximum Recommended Doses (MRD)",
        "subject": "Local Anesthesia",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["malamed mrd", "maximum recommended dose", "lidocaine mrd", "mepivacaine mrd", "articaine mrd", "bupivacaine mrd", "prilocaine mrd", "carpule limits"],
        "summary": "Malamed Board MRDs for dental local anesthetics: 1) Lidocaine (with epi): 7.0 mg/kg (3.2 mg/lb), absolute max = 500 mg (~13.8 carpules). 2) Mepivacaine 3% plain: 6.6 mg/kg (3.0 mg/lb), absolute max = 400 mg (~7.4 carpules). 3) Articaine 4%: 7.0 mg/kg (3.2 mg/lb), absolute max = 500 mg (~6.9 carpules). 4) Bupivacaine 0.5%: 2.0 mg/kg (0.9 mg/lb), absolute max = 90 mg (~10 carpules). 5) Prilocaine 4%: 8.0 mg/kg (3.6 mg/lb), absolute max = 600 mg (~8.3 carpules; risk of methemoglobinemia)."
    },
    {
        "pageNumber": 64,
        "title": "Local Anesthesia: Vasoconstrictor Dosages & Cardiac Patient Limits",
        "subject": "Local Anesthesia",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["vasoconstrictors", "epinephrine limits", "cardiac dose", "healthy dose", "0.2 mg", "0.04 mg", "levonordefrin", "propranolol interaction", "thyroid storm"],
        "summary": "Vasoconstrictor dosing rules: Healthy patient (ASA I): Maximum Epinephrine = 0.2 mg per appointment (~11 carpules of 1:100,000). Cardiac patient (ASA III/IV, ischemic heart disease, hypertension): Maximum Epinephrine = 0.04 mg (~2 carpules of 1:100,000 or ~4 carpules of 1:200,000). Absolute contraindications: uncontrolled hypertension, unstable angina, recent MI <6 months, refractory arrhythmias, pheochromocytoma, non-selective beta-blockers (Propranolol: severe hypertensive crisis risk), TCAs."
    },
    {
        "pageNumber": 65,
        "title": "Local Anesthesia: Systemic Toxicity (LAST) Progression & Management",
        "subject": "Local Anesthesia",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["last", "local anesthetic toxicity", "intralipid", "lipid emulsion", "seizures", "cns toxicity", "cardiovascular collapse", "midazolam"],
        "summary": "Local Anesthetic Systemic Toxicity (LAST) clinical stages: 1) Initial CNS excitation: circumoral numbness, tongue paresthesia, metallic taste, tinnitus, slurred speech, shivering, muscle twitching, generalized tonic-clonic convulsions. 2) Secondary CNS depression: unconsciousness, respiratory arrest. 3) Cardiovascular collapse: bradycardia, severe hypotension, ventricular fibrillation, asystole. Emergency protocol: Stop injection, call 911, hyperventilate with 100% O2, Midazolam for seizures, administer 20% Lipid Emulsion (Intralipid)."
    },
    {
        "pageNumber": 66,
        "title": "Dental Pharmacology: Non-Opioid Analgesics (NSAIDs & Acetaminophen)",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["nsaids", "ibuprofen", "acetaminophen", "paracetamol", "cox 1", "cox 2", "napqi", "n acetylcysteine", "peptic ulcer", "hepatotoxicity"],
        "summary": "Non-opioid pain therapeutics: NSAIDs (Ibuprofen, Naproxen, Ketorolac) inhibit COX-1 and COX-2 enzymes to block prostaglandin synthesis; provide analgesic, anti-inflammatory, and antipyretic actions; side effects include GI ulceration, bleeding, renal impairment. Acetaminophen (Paracetamol) acts centrally to provide analgesia and antipyresis with NO peripheral anti-inflammatory action; maximum dose 3-4 g/day; overdose causes fatal hepatic necrosis via toxic metabolite NAPQI (antidote: N-acetylcysteine / NAC)."
    },
    {
        "pageNumber": 67,
        "title": "Dental Pharmacology: Opioid Analgesics & Overdose Reversal",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["opioids", "codeine", "tramadol", "hydrocodone", "oxycodone", "naloxone", "narcan", "respiratory depression", "miosis", "pinpoint pupils"],
        "summary": "Opioid pharmacology: Mu-opioid receptor agonists in CNS (Codeine, Hydrocodone, Oxycodone, Tramadol, Morphine). Therapeutic effects: analgesia, sedation, euphoria, antitussive. Adverse effects: respiratory depression (cause of death), constipation, nausea, physical dependence. Pathognomonic triad of opioid overdose: CNS depression/coma, respiratory depression, and pinpoint pupils (miosis; tolerance never develops to miosis or constipation!). Specific competitive antagonist: Naloxone (Narcan)."
    },
    {
        "pageNumber": 68,
        "title": "Dental Pharmacology: Beta-Lactam Antibiotics (Penicillins & Cephalosporins)",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["penicillins", "amoxicillin", "augmentin", "cephalosporins", "beta lactam", "cell wall synthesis", "clavulanic acid", "pbp"],
        "summary": "Beta-lactam antibiotics: Bactericidal mechanism inhibiting bacterial cell wall synthesis by binding Penicillin-Binding Proteins (PBPs) and blocking peptidoglycan cross-linking. Amoxicillin: drug of choice for odontogenic infections and infective endocarditis prophylaxis. Augmentin (Amoxicillin + Clavulanic acid): clavulanate irreversibly inhibits beta-lactamase (penicillinase) enzymes. Cephalosporins have 1-5% cross-allergenicity with penicillins."
    },
    {
        "pageNumber": 69,
        "title": "Dental Pharmacology: Non-Beta-Lactam Antibiotics & C. Difficile",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["macrolides", "azithromycin", "clindamycin", "metronidazole", "tetracyclines", "pseudomembranous colitis", "disulfiram reaction", "tooth staining"],
        "summary": "Non-beta-lactams: Macrolides (Azithromycin, Clarithromycin) inhibit 50S ribosomes, bacteriostatic, excellent for penicillin allergy. Clindamycin inhibits 50S ribosomes, penetrates bone well, but carries highest risk of C. difficile colitis. Metronidazole (Flagyl) breaks anaerobic DNA, creates severe Disulfiram-like reaction with alcohol. Tetracyclines (Doxycycline) bind 30S ribosomes, chelate calcium causing intrinsic tooth staining in children under 8."
    },
    {
        "pageNumber": 70,
        "title": "Dental Therapeutics: AHA Guidelines for Infective Endocarditis Prophylaxis",
        "subject": "Dental Therapeutics",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["antibiotic prophylaxis", "aha guidelines", "infective endocarditis", "prosthetic valve", "amoxicillin 2g", "azithromycin 500mg", "cephalexin 2g"],
        "summary": "AHA Antibiotic Prophylaxis indications: 1) Prosthetic cardiac valves or valve repairs, 2) Previous history of infective endocarditis, 3) Congenital heart disease (unrepaired cyanotic CHD, repaired with prosthesis for first 6 months, repaired with residual defect), 4) Cardiac transplant recipients with valvulopathy. Standard regimen: Amoxicillin 2.0 g orally 30-60 min prior (peds: 50 mg/kg). Penicillin allergy: Cephalexin 2.0 g or Azithromycin 500 mg (peds: 15 mg/kg)."
    },
    {
        "pageNumber": 71,
        "title": "Dental Therapeutics: Dental Procedures Requiring vs Not Requiring Prophylaxis",
        "subject": "Dental Therapeutics",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["prophylaxis procedures", "extractions", "scaling and root planing", "routine injections", "dental radiographs", "orthodontic brackets"],
        "summary": "Prophylaxis requirement breakdown: REQUIRED for dental procedures involving manipulation of gingival tissue or periapical region or perforation of oral mucosa (tooth extractions, periodontal scaling/root planing, subgingival placement of bands/cords, implant placement, periapical endodontic instrumentation). NOT REQUIRED for routine local anesthetic injections through non-infected tissue, taking dental radiographs, placing removable appliances/brackets, or shedding of primary teeth."
    },
    {
        "pageNumber": 72,
        "title": "Medical Emergencies: Syncope, Angina Pectoris & Myocardial Infarction",
        "subject": "Medical Emergencies",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["syncope", "vasovagal", "angina pectoris", "nitroglycerin", "myocardial infarction", "trendelenburg", "mona protocol", "viagra contraindication"],
        "summary": "Medical emergencies in dental office: Vasovagal Syncope (most common dental emergency; management: Trendelenburg position, loosen tight clothing, oxygen). Angina Pectoris (substernal chest pain; management: sit upright, sublingual Nitroglycerin 0.4mg every 5 min up to 3 doses; CONTRAINDICATED with PDE-5 inhibitors like Viagra/Cialis). Myocardial Infarction (pain unrelieved by nitroglycerin; MONA protocol: Morphine, Oxygen, Nitroglycerin, Aspirin 325mg chewed, activate EMS)."
    },
    {
        "pageNumber": 73,
        "title": "Medical Emergencies: Hypoglycemia & Tonic-Clonic Seizures",
        "subject": "Medical Emergencies",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["hypoglycemia", "diabetic emergency", "glucose", "glucagon", "seizures", "epilepsy", "status epilepticus", "midazolam", "rule of 15"],
        "summary": "Endocrine & neurological emergencies: Hypoglycemia (blood glucose <70 mg/dL in diabetic patients; diaphoresis, tachycardia, tremor, confusion). Conscious patient: oral glucose / juice / candy following Rule of 15; Unconscious patient: Glucagon 1 mg IM or 50% Dextrose (D50W) 50 mL IV. Seizures: Protect patient from injury, maintain airway, do NOT place anything in mouth! Status epilepticus (>5 min): Midazolam 5mg IM/buccal or Diazepam 5-10mg IV, call EMS."
    },
    {
        "pageNumber": 74,
        "title": "Medical Emergencies: Acute Anaphylaxis & Severe Asthmatic Attack",
        "subject": "Medical Emergencies",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["anaphylaxis", "epinephrine 1 1000", "epipen", "asthma", "albuterol", "bronchospasm", "angioedema", "stridor"],
        "summary": "Life-threatening allergic & respiratory crises: Acute Anaphylaxis (Type I IgE hypersensitivity: urticaria, facial angioedema, stridor, bronchospasm, profound hypotension). First and most vital medication: Epinephrine 1:1,000 (0.3-0.5 mg IM into anterolateral thigh, repeat every 5-15 min; peds: 0.15 mg IM). Adjuncts: Diphenhydramine 50mg, Hydrocortisone. Acute Asthma: Albuterol inhaler 2 puffs, oxygen; if refractory, Epinephrine IM."
    },
    {
        "pageNumber": 75,
        "title": "Dental Pharmacology: Critical Drug-Drug Interactions in Dentistry",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["drug interactions", "epinephrine propranolol", "metronidazole alcohol", "metronidazole warfarin", "nsaids ace inhibitors", "tetracyclines antacids"],
        "summary": "High-yield adverse interactions: 1) Non-selective beta-blockers (Propranolol) + Epinephrine -> unchecked alpha-1 vasoconstriction causing hypertensive spike and reflex bradycardia. 2) Metronidazole + Alcohol -> severe disulfiram reaction. 3) Metronidazole + Warfarin -> CYP2C9 inhibition causing extreme INR elevation and bleeding. 4) NSAIDs + ACE inhibitors/Diuretics -> renal failure and blunted antihypertensive effect. 5) Tetracyclines + Divalent cations (milk, antacids, iron) -> chelation and zero absorption."
    },
    {
        "pageNumber": 76,
        "title": "Endodontic Therapeutics: Root Canal Irrigants & Intracanal Medicaments",
        "subject": "Endodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["sodium hypochlorite", "naocl", "edta", "chlorhexidine", "calcium hydroxide", "hypochlorite accident", "smear layer", "parachloroaniline"],
        "summary": "Endodontic chemical preparation: Sodium Hypochlorite (NaOCl 0.5-5.25%: primary antibacterial irrigant and only solution capable of dissolving vital and necrotic pulp tissue; accident management: saline irrigation, analgesics, cold compress). EDTA 17% (chelator that removes inorganic smear layer). Chlorhexidine 2% (effective against E. faecalis; mixing with NaOCl precipitates toxic parachloroaniline). Calcium Hydroxide (high pH 12.5 intracanal medicament)."
    },
    {
        "pageNumber": 77,
        "title": "Periodontal Therapeutics: Chemical Plaque Control & Host Modulation",
        "subject": "Periodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["chlorhexidine 0.12%", "peridex", "arestin", "atridox", "periochip", "subantimicrobial doxycycline", "periostat", "host modulation", "substantivity"],
        "summary": "Periodontal pharmacology: Chlorhexidine Gluconate 0.12% mouthrinse (gold standard anti-plaque agent with 12-hour substantivity; side effects: brown tooth staining, dysgeusia, calculus increase). Local delivery antimicrobials: Arestin (Minocycline microspheres), Atridox (Doxycycline gel), PerioChip (Chlorhexidine chip). Host Modulation Therapy: Periostat (Subantimicrobial dose Doxycycline 20mg twice daily) inhibits host MMP-8 collagenase without inducing antibiotic resistance."
    },
    {
        "pageNumber": 78,
        "title": "Pediatric Dental Pharmacology: Dosage Calculation Rules & Toxicity",
        "subject": "Pediatric Dentistry",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["pediatric dosing", "clarks rule", "youngs rule", "cowlings rule", "local anesthetic toxicity children", "reyes syndrome", "acetaminophen peds"],
        "summary": "Pediatric medication rules: Clark's Rule: (Weight in lbs / 150) x Adult Dose. Young's Rule: (Age / [Age + 12]) x Adult Dose. Pediatric Local Anesthetic MRD: Children represent the highest risk demographic for fatal LA overdose due to low body weight; absolute carpule limits must be calculated prior to injection. Acetaminophen pediatric dose: 10-15 mg/kg every 4-6h. Ibuprofen pediatric dose: 5-10 mg/kg every 6-8h. Aspirin CONTRAINDICATED in viral illnesses due to Reye's Syndrome."
    },
    {
        "pageNumber": 79,
        "title": "Geriatric Pharmacology: Pharmacokinetic Alterations & Polypharmacy",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["geriatric pharmacology", "reduced gfr", "cyp450 clearance", "polypharmacy", "anticholinergic burden", "xerostomia", "start low go slow"],
        "summary": "Geriatric pharmacokinetic shifts: Decreased GFR and renal drug clearance, reduced hepatic blood flow and Phase I CYP450 oxidation, increased percentage of adipose tissue (prolongs half-life of lipid-soluble drugs like Diazepam), decreased serum albumin (increases free active fraction of Warfarin and NSAIDs). Clinical principle: 'Start low and go slow'. Severe anticholinergic burden from multiple medications induces severe xerostomia, caries, and confusion."
    },
    {
        "pageNumber": 80,
        "title": "Dental Pharmacology: Emergency Antidotes & Reversal Agents Summary",
        "subject": "Dental Pharmacology",
        "day": "Day 2 - Clinical & Pharma",
        "keywords": ["antidotes", "naloxone", "flumazenil", "n acetylcysteine", "protamine sulfate", "vitamin k", "methylene blue", "intralipid", "atropine"],
        "summary": "Comprehensive Board Exam Antidote Table: 1) Opioid toxicity -> Naloxone (Narcan). 2) Benzodiazepine toxicity -> Flumazenil (Romazicon). 3) Acetaminophen toxicity -> N-acetylcysteine (NAC). 4) Heparin toxicity -> Protamine sulfate. 5) Warfarin toxicity -> Vitamin K (Phytonadione). 6) Local Anesthetic Systemic Toxicity -> 20% Lipid Emulsion (Intralipid). 7) Methemoglobinemia -> Methylene Blue. 8) Organophosphate / Cholinergic crisis -> Atropine + Pralidoxime."
    },
    # Pages 81 to 92: Oral Anatomy, Histology & Occlusion
    {
        "pageNumber": 81,
        "title": "Dental Anatomy: Permanent Incisors Morphology & Diagnostic Traits",
        "subject": "Oral Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["incisors", "maxillary central", "maxillary lateral", "mandibular central", "mandibular lateral", "peg lateral", "dens in dente", "smallest tooth"],
        "summary": "Permanent incisor anatomy: Maxillary Central (widest anterior crown mesiodistally, sharp 90-degree mesioincisal angle). Maxillary Lateral (most variation in form after 3rd molars: peg lateral, dens invaginatus, deep lingual pit). Mandibular Central (smallest permanent tooth, bilaterally symmetrical, occludes with only ONE opposing tooth: maxillary central!). Mandibular Lateral (incisal edge is twisted distolingually to follow the mandibular dental arch arch curvature)."
    },
    {
        "pageNumber": 82,
        "title": "Dental Anatomy: Permanent Canines Morphology & Root Dimensions",
        "subject": "Oral Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["canines", "maxillary canine", "mandibular canine", "longest root", "canine eminence", "cornerstone", "cusp slopes", "bifurcated root"],
        "summary": "Permanent canine morphology: Maxillary Canine ('cornerstone of dental arch', longest root in permanent dentition, prominent canine eminence supporting facial profile; mesial cusp ridge is shorter than distal cusp ridge). Mandibular Canine (longest crown height in permanent dentition, straight mesial crown outline continuous with root outline, smooth lingual cingulum, root occasionally bifurcated into buccal and lingual root tips)."
    },
    {
        "pageNumber": 83,
        "title": "Dental Anatomy: Premolars Morphology & Diagnostic Distinctions",
        "subject": "Oral Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["premolars", "maxillary 1st premolar", "maxillary 2nd premolar", "mandibular 1st premolar", "mandibular 2nd premolar", "mesial concavity", "bifurcated", "snake eyes", "y shape"],
        "summary": "Premolar morphology: Maxillary 1st Premolar (bifurcated roots in 60%, deep mesial crown and root concavity, mesial marginal developmental groove; mesial buccal cusp slope is LONGER than distal). Maxillary 2nd Premolar (single root, equal cusp heights, wrinkled occlusal surface). Mandibular 1st Premolar (tiny non-functional lingual cusp, 'snake eyes' occlusal pits). Mandibular 2nd Premolar (frequently 3 cusps with 'Y' groove pattern, most commonly missing premolar)."
    },
    {
        "pageNumber": 84,
        "title": "Dental Anatomy: Maxillary Molars Morphology & Cusp of Carabelli",
        "subject": "Oral Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["maxillary molars", "maxillary 1st molar", "cusp of carabelli", "oblique ridge", "three roots", "mb2 canal", "rhomboidal"],
        "summary": "Maxillary molar characteristics: Maxillary 1st Molar (largest tooth in maxillary arch, rhomboidal occlusal outline, 4 functional cusps + 5th non-functional Cusp of Carabelli on mesiolingual cusp, Oblique ridge running from DB cusp to ML cusp; 3 roots: Palatal longest, MB, DB; MB root has second canal MB2 in >60-70%). Maxillary 2nd Molar (heart-shaped occlusal outline when DL cusp is diminutive, roots closer together)."
    },
    {
        "pageNumber": 85,
        "title": "Dental Anatomy: Mandibular Molars Morphology & Cusp Patterns",
        "subject": "Oral Anatomy",
        "day": "Day 1 - Basic Sciences",
        "keywords": ["mandibular molars", "mandibular 1st molar", "mandibular 2nd molar", "five cusps", "four cusps", "cruciform", "pentagon", "two roots"],
        "summary": "Mandibular molar traits: Mandibular 1st Molar (5 cusps: 3 buccal [MB, DB, Distal] and 2 lingual [ML, DL]; largest cusp is MB, smallest is Distal; pentagonal occlusal outline; 2 broad roots: Mesial with 2 canals [MB, ML] and Distal with 1-2 canals). Mandibular 2nd Molar (4 cusps separated by cruciform '+' shaped groove pattern; rectangular occlusal outline; roots closer together)."
    },
    {
        "pageNumber": 86,
        "title": "Endodontic Anatomy: Root Canal Configurations & Apical Foramen",
        "subject": "Endodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["root canal anatomy", "vertucci classification", "apical constriction", "apical foramen", "mb2 canal", "weine classification"],
        "summary": "Internal pulp canal morphology: Vertucci canal classifications: Type I (1 canal, 1 foramen), Type II (2 canals join into 1 foramen), Type III (1 canal divides and rejoins into 1 foramen), Type IV (2 independent canals and foramina). Apical constriction (minor apical diameter: 0.5-1.0 mm coronal to anatomical apical foramen, the histological cementodentinal junction and ideal working length termination)."
    },
    {
        "pageNumber": 87,
        "title": "Pediatric Dental Anatomy: Primary vs Permanent Dentition Comparisons",
        "subject": "Pediatric Dentistry",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["primary teeth", "deciduous teeth", "pulp horns", "cervical constriction", "roots flared", "enamel thickness", "tubercle of zuckerkandl"],
        "summary": "Primary dentition morphological hallmarks: 20 primary teeth total (no premolars in primary dentition). Primary crowns are smaller, whiter, with prominent cervical ridges (buccal cervical bulge / Tubercle of Zuckerkandl on primary 1st molars). Enamel and dentin are half as thick as permanent teeth; pulp chambers are relatively larger with prominent pulp horns extending closer to the surface; roots are longer, more slender, and widely flared to encompass developing succedaneous premolar buds."
    },
    {
        "pageNumber": 88,
        "title": "Dental Development: Eruption Sequences & Chronological Timelines",
        "subject": "Pediatric Dentistry",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["eruption sequence", "primary eruption", "permanent eruption", "rule of four", "first molar eruption", "six year molars", "mixed dentition"],
        "summary": "Eruption chronologies: Primary dentition sequence: Central incisor (6-10 mo), Lateral incisor (9-13 mo), 1st Molar (13-19 mo), Canine (16-22 mo), 2nd Molar (25-33 mo) - complete by age 3. Permanent eruption sequences: Mandible (6-1-2-3-4-5-7: 1st molar 6y, central incisor 6-7y, lateral 7-8y, canine 9-10y, 1st premolar 10-12y, 2nd premolar 11-12y, 2nd molar 12y); Maxilla (6-1-2-4-5-3-7: canine erupts AFTER premolars at 11-12y)."
    },
    {
        "pageNumber": 89,
        "title": "Dental Anatomy: Primary Molars & Leeway Space Measurements",
        "subject": "Oral Anatomy",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["leeway space", "nances leeway space", "primary maxillary canine", "primary molars", "late mesial shift", "arch length"],
        "summary": "Primary tooth landmarks & Leeway Space: Primary Maxillary Central Incisor is the only tooth whose crown width exceeds its crown height. Primary Maxillary Canine has a mesial cusp ridge LONGER than distal cusp ridge (opposite of permanent!). Leeway Space: size difference between primary C-D-E and succedaneous 3-4-5. Mandibular leeway space = 1.7–2.5 mm per quadrant (~3.4–4.0 mm total arch); Maxillary leeway space = 0.9–1.5 mm per quadrant (~1.8–2.0 mm total). Enables mandibular permanent 1st molars to shift mesially into Class I relationship (Late Mesial Shift)."
    },
    {
        "pageNumber": 90,
        "title": "Occlusion Science: Centric Relation, Centric Occlusion & Guidance",
        "subject": "Prosthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["centric relation", "centric occlusion", "maximum intercuspation", "curve of spee", "curve of wilson", "canine guidance", "mutually protected"],
        "summary": "Occlusal concepts: Centric Relation (CR: condyles articulate with thinnest avascular portion of discs against anterosuperior articular eminences; independent of tooth contact). Maximum Intercuspation / Centric Occlusion (MI/CO: complete tooth intercuspation). In 90% of individuals, CR does not equal MI (1-2mm anterior slide). Mutually Protected Occlusion: posterior teeth protect anterior teeth in MI; anterior/canine guidance discludes posterior teeth during excursions."
    },
    {
        "pageNumber": 91,
        "title": "Orthodontic Diagnosis: Angle's Classification of Malocclusion",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["angles classification", "class i", "class ii division 1", "class ii division 2", "class iii", "mesiobuccal cusp", "overjet", "deep bite"],
        "summary": "Angle's malocclusion classes based on maxillary 1st molar MB cusp position relative to mandibular 1st molar MB groove: Class I (normal molar relationship). Class II (mandibular arch posterior/distal to maxillary arch; Div 1 has proclined maxillary incisors and large overjet; Div 2 has retroclined central incisors, proclined laterals, and deep bite). Class III (mandibular arch anterior/mesial to maxillary arch; anterior crossbite, prognathic mandible)."
    },
    {
        "pageNumber": 92,
        "title": "Orthodontic Diagnosis: Overjet, Overbite & Crossbite Classifications",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["overjet", "overbite", "open bite", "crossbite", "anterior crossbite", "posterior crossbite", "rapid palatal expansion", "rpe"],
        "summary": "Vertical and horizontal occlusal discrepancies: Overjet (horizontal incisal overlap; normal 2-3 mm). Overbite (vertical incisal overlap; normal 1-3 mm or 20-30% of mandibular crown height). Open Bite (lack of vertical incisal contact: anterior or posterior). Crossbite: Posterior (maxillary buccal cusps occlude lingual to mandibular buccal cusps) vs Anterior (maxillary incisors lingual to mandibular incisors; skeletal crossbites treated with Rapid Palatal Expander / Hyrax)."
    },
    # Pages 93 to 100: Orthodontics & Growth and Development
    {
        "pageNumber": 93,
        "title": "Craniofacial Growth: Theories of Craniofacial Development",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["theories of growth", "sicher sutural theory", "scott cartilaginous theory", "moss functional matrix", "functional matrix theory", "craniofacial"],
        "summary": "Three classic theories of craniofacial growth: 1) Sicher's Sutural Theory (sutures are primary growth determinants - disproven). 2) Scott's Cartilaginous Theory (epiphyses, cranial base synchondroses, and nasal septum are primary genetic growth pacemakers). 3) Melvin Moss's Functional Matrix Theory (bone and cartilage have no intrinsic genetic determinants; skeletal units grow secondarily and adaptively in response to the functional demands of soft tissues and functional spaces like brain growth and airway)."
    },
    {
        "pageNumber": 94,
        "title": "Craniofacial Growth: Growth Centers vs Growth Sites & Synchondroses",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["growth centers", "growth sites", "synchondroses", "spheno occipital", "spheno ethmoidal", "mandibular condyle", "cranial base"],
        "summary": "Growth centers vs growth sites: All growth centers are growth sites, but NOT all growth sites are growth centers! Growth centers possess intrinsic genetic growth potential (cranial base synchondroses, nasal septum). Growth sites merely show adaptive osteogenesis (sutures, alveolar process, mandibular condyle!). Cranial base synchondroses: Intersphenoid (closes at birth), Spheno-ethmoidal (closes at 7-8 years), Spheno-occipital (closes last at 15-20 years; chief growth center of cranial base)."
    },
    {
        "pageNumber": 95,
        "title": "Orthodontic Appliances: Functional Appliances for Class II Skeletal Modification",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["functional appliances", "activator", "bionator", "twin block", "herbst", "frankel", "growth modification", "class ii skeletal"],
        "summary": "Orthopedic and functional appliances: Used to posture mandible forward during peak pubertal growth to stimulate condylar adaptation: 1) Activator (Andresen: loose monobloc acrylic). 2) Bionator (Balters: acrylic with buccal wire shields). 3) Twin Block (Clark: upper and lower interlocking 70-degree bite blocks worn full-time during eating). 4) Herbst (fixed pin-and-tube telescopic appliance). 5) Frankel Functional Regulator (tissue-borne with vestibular shields relieving cheek pressure)."
    },
    {
        "pageNumber": 96,
        "title": "Pediatric Orthodontics: Space Maintainers Indications & Designs",
        "subject": "Pediatric Dentistry",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["space maintainers", "band and loop", "distal shoe", "lingual holding arch", "nance holding arch", "tpa", "premature loss"],
        "summary": "Space maintainer indications following premature primary tooth loss: 1) Band and Loop (unilateral primary molar loss). 2) Distal Shoe (premature loss of primary 2nd molar BEFORE permanent 1st molar erupts; subgingival blade guides permanent molar; contraindicated in medically compromised/endocarditis). 3) Lingual Holding Arch (LHA: bilateral mandibular space loss, requires erupted permanent incisors). 4) Nance Holding Arch / TPA (bilateral maxillary space loss)."
    },
    {
        "pageNumber": 97,
        "title": "Orthodontic Biomechanics: Cellular Response to Force & Tooth Movements",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["orthodontic forces", "frontal resorption", "undermining resorption", "hyalinization", "tipping", "translation", "intrusion", "center of resistance"],
        "summary": "Biology of orthodontic tooth movement: Optimal light continuous force (20-50g) produces Frontal Resorption (direct osteoclast recruitment along the bone surface without cell death). Excessive heavy force crushes PDL, causes ischemia and sterile necrosis (Hyalinization), resulting in Undermining Resorption from marrow spaces with lag phase and root resorption risk. Movements: Tipping, Translation (bodily), Intrusion (lightest forces: 10-20g), Extrusion, Torque."
    },
    {
        "pageNumber": 98,
        "title": "Orthodontic Cephalometrics: Steiner Analysis & Skeletal Relationships",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["cephalometrics", "steiner analysis", "sna", "snb", "anb", "sella", "nasion", "point a", "point b", "skeletal class ii", "class iii"],
        "summary": "Cephalometric landmarks & Steiner Analysis: Sella (S), Nasion (N), Subspinale (Point A: maxillary apical base), Supramentale (Point B: mandibular apical base). Angles: SNA (normal 82 +/- 2 deg: maxillary position relative to cranial base), SNB (normal 80 +/- 2 deg: mandibular position), ANB (normal 2 +/- 2 deg = 0 to 4 deg: sagittal jaw relationship). ANB > 4 deg indicates Skeletal Class II; ANB < 0 deg indicates Skeletal Class III."
    },
    {
        "pageNumber": 99,
        "title": "Interceptive Orthodontics: Serial Extraction Protocol & Bolton Analysis",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["serial extraction", "dewel protocol", "bolton analysis", "mixed dentition", "tooth size discrepancy", "c d 4 extraction"],
        "summary": "Serial Extraction (Dewel sequence for severe mixed dentition crowding >8-10mm): Step 1 (age 8-9) extract primary canines (C) to align crowded incisors -> Step 2 (age 9-10) extract primary 1st molars (D) to accelerate 1st premolar eruption -> Step 3 (age 10-11) extract permanent 1st premolars (4) to allow permanent canines to erupt into space (mnemonic: C -> D -> 4). Bolton Analysis: evaluates tooth size ratio: Overall ratio = 91.3%, Anterior ratio = 77.2%."
    },
    {
        "pageNumber": 100,
        "title": "Craniofacial Growth & Retention: Cortical Drift, Displacement & Relapse",
        "subject": "Orthodontics",
        "day": "Day 3 - Clinical Dentistry",
        "keywords": ["cortical drift", "primary displacement", "secondary displacement", "orthodontic retention", "supracrestal fibers", "fibrotomy", "relapse"],
        "summary": "Craniofacial bone remodeling: Cortical Drift (bone surface movement by deposition on one side and resorption on the opposite). Primary Displacement (bone moves away from contact surfaces as it enlarges). Secondary Displacement (movement of a bone caused by the enlargement of adjacent bones). Retention biology: PDL fibers remodel in 3-4 months; gingival collagen fibers in 4-6 months; Supracrestal gingival fibers take up to 1 year to remodel (high rotational relapse risk; treated with Circumferential Supracrestal Fibrotomy / CSF)."
    }
]

js_content = f"""// Dr. Leane's DMF Board Exam Reviewer Book - Digital Library Index (Pages 1 to 100)
// Complete high-yield metadata, authentic summaries, and instant keyword search index
// Autogenerated and optimized for Dr. Leane & Angelo

export const DMF_TOTAL_PAGES = 100;
export const DMF_BOOK_PAGES = {json.dumps(pages_data, indent=2)};

export const DMF_CHAPTERS = [
  {{ title: "General Histology & Embryology", startPage: 1, endPage: 15, subject: "General Histology", day: "Day 1 - Basic Sciences", icon: "🔬" }},
  {{ title: "General & Head/Neck Anatomy", startPage: 16, endPage: 28, subject: "General Anatomy", day: "Day 1 - Basic Sciences", icon: "💀" }},
  {{ title: "General Physiology", startPage: 29, endPage: 39, subject: "General Physiology", day: "Day 1 - Basic Sciences", icon: "🫀" }},
  {{ title: "Microbiology & Pathology", startPage: 40, endPage: 56, subject: "Oral Pathology", day: "Day 1 - Basic Sciences", icon: "🦠" }},
  {{ title: "Pharmacology & Local Anesthesia", startPage: 57, endPage: 80, subject: "Dental Pharmacology", day: "Day 2 - Clinical & Pharma", icon: "💊" }},
  {{ title: "Oral Anatomy, Histology & Occlusion", startPage: 81, endPage: 92, subject: "Oral Anatomy", day: "Day 3 - Clinical Dentistry", icon: "🦷" }},
  {{ title: "Orthodontics & Growth Development", startPage: 93, endPage: 100, subject: "Orthodontics", day: "Day 3 - Clinical Dentistry", icon: "📐" }}
];
"""

with open("src/data/dmfBookData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated src/data/dmfBookData.js with {len(pages_data)} pages!")
