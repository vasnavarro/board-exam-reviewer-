import json
import re

# Load parsed physio questions
with open("scripts/physio_parsed_100.json", "r", encoding="utf-8") as f:
    raw_qs = json.load(f)

print(f"Loaded {len(raw_qs)} raw physio questions.")

# Known keys and clinical rationale data for General Physiology Final Coaching
physio_curation = {
    1: {"correct": 1, "topic": "Endocrine / Osmoregulation", "pearl": "Diabetes insipidus = deficiency of ADH (vasopressin); Diabetes mellitus = insulin deficiency/resistance.",
        "distractors": {
            0: "Addison disease is primary adrenal insufficiency (cortisol/aldosterone deficiency) presenting with skin hyperpigmentation, fatigue, and hypotension.",
            2: "Cushing syndrome is hypercortisolemia characterized by central obesity, moon facies, buffalo hump, and hypertension.",
            3: "Hyperthyroidism manifests with elevated metabolic rate, palpitations, weight loss, and heat intolerance, not isolated polyuria/polydipsia."
        },
        "expl": "Option B (Diabetes insipidus) is characteristically marked by extreme polyuria (dilute urine) and compensatory intense polydipsia due to deficient antidiuretic hormone (ADH) secretion or renal resistance to ADH."
    },
    2: {"correct": 2, "topic": "Airway Management", "pearl": "Secure endotracheal/nasotracheal tubes with medical adhesive tape or dedicated tube holders to prevent dislodgement.",
        "distractors": {
            0: "A tourniquet is used to occlude venous outflow during venipuncture or control extremity hemorrhages.",
            1: "A cervical collar stabilizes the cervical spine in suspected spinal trauma, not the airway tube.",
            3: "A facemask delivers non-invasive positive pressure or bag-valve ventilation, not tube stabilization."
        },
        "expl": "Option C (Adhesive tape) is standard clinical protocol for firmly anchoring and stabilizing a nasotracheal tube to the maxillary skin/upper lip."
    },
    3: {"correct": 2, "topic": "Neuroanatomy", "pearl": "Temporal lobe = primary auditory cortex (Heschl gyri) and Wernicke area (speech comprehension).",
        "distractors": {
            0: "Frontal lobe houses the primary motor cortex, prefrontal executive centers, and Broca speech area.",
            1: "Parietal lobe processes somatosensory modalities including touch, pain, temperature, and proprioception.",
            3: "Occipital lobe houses the primary visual cortex (Brodmann area 17)."
        },
        "expl": "Option C (Temporal lobe) contains the primary auditory receiving area responsible for acoustic tone perception and auditory processing."
    },
    4: {"correct": 1, "topic": "Cardiovascular Dynamics", "pearl": "Cardiac Output = Stroke Volume x Heart Rate (normal resting adult CO is ~5.0 L/min).",
        "distractors": {
            0: "Stroke volume is the volume of blood pumped from one ventricle of the heart with each individual contraction (beat), averaging 70 mL.",
            2: "Heart rate is the frequency of cardiac contractions expressed in beats per minute (bpm).",
            3: "Pulse pressure is the difference between systolic and diastolic blood pressure readings."
        },
        "expl": "Option B (Cardiac output) is physiologically defined as the volume of blood ejected by each ventricle into the systemic or pulmonary circulation per minute."
    },
    5: {"correct": 1, "topic": "Neurophysiology", "pearl": "CNS is the master integrator: afferent input -> central integration -> efferent command.",
        "distractors": {
            0: "Hormone synthesis, production, and systemic secretion is the primary hallmark of the endocrine system.",
            2: "Visceral organ control is mediated predominantly by the autonomic (sympathetic and parasympathetic) nervous system, not somatic.",
            3: "Storage of neurotransmitters occurs peripherally and centrally in synaptic vesicles of axon terminals, not the overarching CNS organ function."
        },
        "expl": "Option B (Receive, integrate, and respond to stimuli) defines the fundamental integrative function of the central nervous system."
    },
    6: {"correct": 2, "topic": "Osteology & Bone Physiology", "pearl": "Medullary cavity within the diaphysis contains bone marrow (red in children, yellow/fatty in adults).",
        "distractors": {
            0: "Periosteum is the fibrous outer vascular sheath covering external bone surfaces.",
            1: "Epiphysis refers to the rounded end of a long bone containing spongy cancellous bone.",
            3: "Endosteum is the cellular lining layer covering the internal trabecular surfaces and medullary cavity."
        },
        "expl": "Option C (Medullary cavity) is the central cylindrical lumen hollowed within the diaphysis of long bones containing marrow."
    },
    7: {"correct": 3, "topic": "Renal Physiology", "pearl": "Proximal convoluted tubule (PCT) reabsorbs 100% of filtered glucose and amino acids via secondary active transport with Na+.",
        "distractors": {
            0: "The distal convoluted tubule fine-tunes sodium, potassium, and calcium under aldosterone and PTH control.",
            1: "The Loop of Henle creates the countercurrent hyperosmotic medullary gradient for water concentration.",
            2: "Collecting ducts primarily regulate final water resorption under ADH and urea recycling."
        },
        "expl": "Option D (Proximal convoluted tubule) accomplishes near-complete (~100%) reabsorption of filtered amino acids and glucose via sodium-cotransporters."
    },
    8: {"correct": 1, "topic": "Head & Neck Lymphatics", "pearl": "Buccal (facial) lymph nodes lie directly on the buccinator muscle and drain the cheek and upper lip.",
        "distractors": {
            0: "Deep cervical nodes form a chain along the internal jugular vein beneath the sternocleidomastoid.",
            2: "Jugulodigastric node (sentinel node) lies deep to the posterior belly of digastric and drains the palatine tonsils.",
            3: "Submental nodes lie beneath the chin in the submental triangle and drain the tip of the tongue and mandibular incisors."
        },
        "expl": "Option B (Buccal node) sits superficially on the outer surface of the buccinator muscle along the facial vein."
    },
    9: {"correct": 2, "topic": "Head & Neck Lymphatics", "pearl": "Deep cervical chain is divided by the omohyoid tendon into superior (jugulodigastric) and inferior (jugulo-omohyoid) nodes.",
        "distractors": {
            0: "Submental nodes are confined strictly to the submental triangle between anterior bellies of digastric.",
            1: "Buccal nodes are small facial nodes limited to the cheek region.",
            3: "Parotid nodes reside within and around the capsule of the parotid gland."
        },
        "expl": "Option C (Deep cervical node) chain extends along the entire length of the internal jugular vein from the skull base down to the cervical root."
    },
    10: {"correct": 1, "topic": "Cardiovascular & Lymphatics", "pearl": "Thoracic duct enters the left venous angle (Pirogoff angle); right lymphatic duct enters the right venous angle.",
        "distractors": {
            0: "The right venous angle receives lymph from the right upper quadrant via the right lymphatic duct.",
            2: "External jugular veins drain into the subclavian vein more laterally and do not receive the primary thoracic duct terminus.",
            3: "The right external jugular junction does not receive major trunk lymphatic drainage."
        },
        "expl": "Option B (Left subclavian and left internal jugular veins) forms the left venous angle where the thoracic duct empties all chyle/lymph from the lower body and left upper body."
    }
}

# Auto-complete remaining questions up to 100 with comprehensive accurate medical keys and rationales
with open("scripts/physio_parsed_100.json", "r", encoding="utf-8") as f:
    raw_qs = json.load(f)

print(f"Total raw questions available: {len(raw_qs)}")

