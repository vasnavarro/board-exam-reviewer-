import json
import re

print("Loading dentalQuestions.js...")
with open("src/data/dentalQuestions.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"export const dentalQuestions = (\[.*\]);", text, re.DOTALL)
questions = json.loads(m.group(1))

# 1. Fix the 20 smashed questions
SMASHED_FIXES = {
    "dle-physio-005": {
        "question": "The main function of the central nervous system is to:",
        "options": [
            "Synthesize, produce, and secrete hormones",
            "Receive, integrate, and respond to stimuli",
            "Control the function of the organs through somatic nervous system",
            "Store neurotransmitters"
        ],
        "correctIndex": 1,
        "explanation": "The Central Nervous System (brain and spinal cord) functions primarily to receive afferent sensory input, integrate and process neurological information, and generate coordinated efferent responses to internal and external stimuli.",
        "distractorRationales": {
            "0": "Option A is incorrect because the endocrine glands (pituitary, thyroid, adrenals), not the central nervous system itself, synthesize and secrete systemic hormones.",
            "2": "Option C is incomplete and misleading because the somatic nervous system controls skeletal muscles, whereas autonomic innervation controls viscera and organs.",
            "3": "Option D is incorrect because individual presynaptic neuronal vesicles store neurotransmitters; storage is not the overarching organizational purpose of the CNS."
        },
        "keyTakeaway": "CNS Function: Integration, sensory processing, and coordination of motor and autonomic outputs."
    },
    "dle-physio-057": {
        "question": "All of the following are controlled by the Vagus nerve (CN X), EXCEPT one. Which is the EXCEPTION?",
        "options": [
            "Blood pressure regulation (carotid/aortic baroreceptors)",
            "Intestinal motility",
            "Salivary flow from the submandibular gland",
            "Heart rate reduction"
        ],
        "correctIndex": 2,
        "explanation": "Salivary secretion from the Submandibular (and Sublingual) glands is mediated by the Facial Nerve (CN VII) via chorda tympani and the submandibular ganglion. Parotid salivary flow is controlled by the Glossopharyngeal Nerve (CN IX) via the otic ganglion. The Vagus nerve (CN X) does not innervate major salivary glands.",
        "distractorRationales": {
            "0": "Option A is controlled by CN X: aortic arch baroreceptor fibers travel through the vagus nerve to the medulla to regulate blood pressure.",
            "1": "Option B is controlled by CN X: the vagus nerve provides parasympathetic innervation to gut smooth muscle, stimulating peristalsis from esophagus down to the splenic flexure.",
            "3": "Option D is controlled by CN X: vagal parasympathetic postganglionic fibers release acetylcholine onto M2 muscarinic receptors on SA and AV nodes to decrease heart rate."
        },
        "keyTakeaway": "Salivary Innervation: CN VII (Submandibular & Sublingual via chorda tympani); CN IX (Parotid via glossopharyngeal/otic ganglion). Vagus (CN X) has NO salivary supply."
    },
    "dle-pharma-002": {
        "question": "All are standardized parts of an authentic prescription, EXCEPT one. Which is the EXCEPTION?",
        "options": [
            "Superscription (Rx symbol, patient name, age, date)",
            "Inscription (Name and strength/dose of the prescribed medication)",
            "Subscription (Dispensing directions to the pharmacist)",
            "Signa (Instructions to the patient on dosage and frequency)",
            "Suprascription"
        ],
        "correctIndex": 4,
        "explanation": "There is no such medical prescription component as 'Suprascription'. The four classical parts of a prescription are: 1) Superscription (Rx = 'recipe' / take thou, patient demographics, date), 2) Inscription (drug name, concentration, and dose), 3) Subscription (instructions to the pharmacist, e.g., 'Dispense 20 capsules'), and 4) Signa / Sig (instructions to the patient, e.g., 'Take 1 capsule every 8 hours').",
        "distractorRationales": {
            "0": "Option A (Superscription) is a bona fide component containing the Rx symbol and patient identification details.",
            "1": "Option B (Inscription) is the body of the prescription specifying the therapeutic agent and dose.",
            "2": "Option C (Subscription) is the authentic directive addressed to the dispensing pharmacist.",
            "3": "Option D (Signa) is the required section detailing patient administration instructions."
        },
        "keyTakeaway": "Prescription Anatomy: Superscription (Rx/Info) -> Inscription (Drug) -> Subscription (Pharmacist) -> Signa (Patient instructions)."
    },
    "dle-pharma-044": {
        "question": "Which of the following statements regarding Clindamycin is TRUE?",
        "options": [
            "It is a cell wall synthesis inhibitor",
            "It doesn’t penetrate the bone tissue well",
            "It is usually given together with erythromycin for more effective treatment",
            "It is effective against gram-negative aerobic enteric bacteria only",
            "Its clinical use in dentistry is primarily for anaerobic infections"
        ],
        "correctIndex": 4,
        "explanation": "Clindamycin is a lincosamide antibiotic that reversibly binds to the 50S ribosomal subunit. In dentistry, it is highly prized for its exceptional bone penetration (reaching 50-70% of serum levels in cortical bone) and potent bactericidal/bacteriostatic action against oral anaerobes (Bacteroides, Fusobacterium, Peptostreptococcus) in penicillin-allergic patients.",
        "distractorRationales": {
            "0": "Option A is incorrect because Clindamycin inhibits 50S bacterial protein synthesis; penicillins and cephalosporins inhibit cell wall peptidoglycan synthesis.",
            "1": "Option B is incorrect because Clindamycin exhibits outstanding penetration into bone and osseous tissues, making it an agent of choice in osteomyelitis.",
            "2": "Option C is contraindicated because Clindamycin and Erythromycin compete for the exact same 50S binding site, resulting in mutual antagonism.",
            "3": "Option D is incorrect because Clindamycin has no activity against aerobic Gram-negative bacilli (Pseudomonas, E. coli); it targets Gram-positive cocci and anaerobes."
        },
        "keyTakeaway": "Clindamycin Pearl: 50S ribosome inhibitor; high bone penetration; drug of choice for severe odontogenic anaerobes in penicillin-allergic patients."
    },
    "dle-pharma-056": {
        "question": "All of the following are classified as beta-lactam antibiotics, EXCEPT one. Which is the EXCEPTION?",
        "options": [
            "Penicillins (e.g. Amoxicillin, Ampicillin)",
            "Azithromycin",
            "Cephalosporins (e.g. Cephalexin, Cefuroxime)",
            "Monobactams (e.g. Aztreonam)",
            "Carbapenems (e.g. Meropenem, Imipenem)"
        ],
        "correctIndex": 1,
        "explanation": "Azithromycin is a Macrolide antibiotic (characterized by a 15-membered azalide lactone ring that binds to the 50S ribosomal subunit). The four classic beta-lactam antibiotic families share a four-membered beta-lactam ring: Penicillins, Cephalosporins, Monobactams, and Carbapenems.",
        "distractorRationales": {
            "0": "Option A (Penicillins) is the prototypical beta-lactam class with a thiazolidine ring attached to the beta-lactam core.",
            "2": "Option C (Cephalosporins) are beta-lactams with a six-membered dihydrothiazine ring.",
            "3": "Option D (Monobactams) are monocyclic beta-lactam bactericidal antibiotics targeting Gram-negative aerobes.",
            "4": "Option E (Carbapenems) are ultra-broad spectrum beta-lactams resistant to most beta-lactamases."
        },
        "keyTakeaway": "Beta-Lactam Families: Penicillins, Cephalosporins, Carbapenems, Monobactams. Azithromycin & Clarithromycin are MACROLIDES."
    },
    "dle-pharma-077": {
        "question": "All of the following are laxatives, EXCEPT one. Which is the EXCEPTION?",
        "options": [
            "Psyllium (Bulk-forming laxative)",
            "Lactulose (Osmotic laxative)",
            "Bisacodyl (Stimulant laxative)",
            "Loperamide",
            "Sorbitol (Osmotic laxative)"
        ],
        "correctIndex": 3,
        "explanation": "Loperamide (Imodium) is an ANTIDIARRHEAL agent, not a laxative. It is a peripheral mu-opioid receptor agonist in the myenteric plexus that slows gastrointestinal motility and prolongs transit time. Psyllium, Lactulose, Bisacodyl, and Sorbitol are all established laxatives.",
        "distractorRationales": {
            "0": "Option A (Psyllium) is an insoluble fiber bulk-forming laxative that absorbs water and expands stool volume.",
            "1": "Option B (Lactulose) is a non-absorbable synthetic disaccharide osmotic laxative that retains water in the intestinal lumen.",
            "2": "Option C (Bisacodyl) is a diphenylmethane stimulant laxative that irritates mucosal sensory nerves to promote colonic peristalsis.",
            "4": "Option E (Sorbitol) is a hyperosmotic polyol laxative that draws fluid into the bowel."
        },
        "keyTakeaway": "GI Therapeutics: Loperamide is an antidiarrheal (mu-opioid agonist). Psyllium, Lactulose, Bisacodyl, and Sorbitol treat constipation (laxatives)."
    },
    "dle-ortho-054": {
        "question": "A 9-year-old child with his parent comes into your clinic. Beside the maxillary laterals are the primary canines. There is a 1mm maxillary midline diastema and distal axial inclination of central incisors. Which of the following is most probably true regarding the case?",
        "options": [
            "The patient has a persistent thumb-sucking habit requiring intervention",
            "There is a high chance of a mesiodens present between teeth 11 and 21",
            "The patient has an abnormal tectolabial frenal attachment causing the diastema",
            "The child is exhibiting normal physiological dental development (Ugly Duckling stage)"
        ],
        "correctIndex": 3,
        "explanation": "This clinical presentation describes Broadbent's 'Ugly Duckling' stage (transient physiological malocclusion) occurring typically between ages 7 and 11. As the unerupted permanent maxillary canines develop and descend, their crowns press against the roots of the lateral incisors, tilting lateral and central incisor crowns distally and causing a physiological midline diastema. As the canines fully erupt into the arch, the diastema spontaneously closes without treatment.",
        "distractorRationales": {
            "0": "Option A is unlikely in the absence of anterior open bite, flared proclination, and maxillary arch narrowing characteristic of prolonged finger-sucking.",
            "1": "Option B would typically cause asymmetrical spacing, rotation, or failure of eruption of one or both central incisors, which is not described.",
            "2": "Option C describes a hyperplastic frenum causing blanching on lip traction (positive blanch test), whereas an asymptomatic 1mm diastema at age 9 is classic normal development."
        },
        "keyTakeaway": "Ugly Duckling Stage (Broadbent): Normal transitional mixed dentition phase; canine crowns impinge on lateral incisor roots causing temporary central diastema that closes spontaneously upon canine eruption."
    },
    "dle-oa-070": {
        "question": "Receptors providing sensory and proprioceptive input (such as tactile threshold, biting pressure, and jaw position) are located in the masticatory muscles, TMJ capsule, and the:",
        "options": [
            "Enamel prism matrix",
            "Coronal pulp chamber",
            "Periodontal ligament (PDL)",
            "Acellular cementum layer"
        ],
        "correctIndex": 2,
        "explanation": "The Periodontal Ligament (PDL) contains specialized mechanoreceptors (Ruffini-like endings and Pacinian-like corpuscles) whose cell bodies reside uniquely in the Mesencephalic Nucleus of the Trigeminal Nerve (CN V). These mechanoreceptors detect minute tactile loads (as light as 1-3 grams) and directional chewing forces, mediating the jaw-opening reflex to prevent occlusal overload.",
        "distractorRationales": {
            "0": "Option A is incorrect because mature enamel is completely acellular, avascular, and devoid of nervous tissue or sensory receptors.",
            "1": "Option B contains nociceptive free nerve endings (A-delta and C fibers) that transmit pain, but pulp lacks proprioceptive mechanoreceptors for jaw positioning.",
            "3": "Option D is incorrect because cementum is an avascular mineralized connective tissue layer lacking sensory nerve endings."
        },
        "keyTakeaway": "Proprioception Triad: Muscle spindles, TMJ Golgi-type receptors, and PDL mechanoreceptors (Ruffini endings) send proprioceptive input to Mesencephalic V nucleus."
    },
    "dle-oh-004": {
        "question": "After what stage of zygote development does the zona pellucida disintegrate to allow implantation into the endometrium?",
        "options": [
            "Single-cell Zygote",
            "Cleavage-stage Blastomere",
            "Blastocyst",
            "Late morula",
            "Early morula"
        ],
        "correctIndex": 2,
        "explanation": "The zona pellucida disintegrates during the late Blastocyst stage (approximately day 5-6 after fertilization) in a process termed 'blastocyst hatching'. Enzymatic digestion by trophoblast proteases sheds the rigid glycoprotein zona pellucida, allowing the exposed syncytiotrophoblast to directly contact and invade the receptive uterine endometrium.",
        "distractorRationales": {
            "0": "Option A is incorrect because the newly fertilized zygote is enclosed by a robust, intact zona pellucida that prevents polyspermy.",
            "1": "Option B is incorrect because dividing blastomeres undergo mitotic cleavage entirely within the confining shell of the zona pellucida.",
            "3": "Option D is incorrect because the 16-32 cell solid ball of cells (morula) remains fully encased in the zona pellucida as it traverses the fallopian tube.",
            "4": "Option E represents early tubal transport where the zona pellucida prevents premature ectopic implantation."
        },
        "keyTakeaway": "Blastocyst Hatching: Occurs around Day 5-6 when the blastocyst sheds its zona pellucida to initiate uterine endometrial implantation."
    },
    "dle-oh-019": {
        "question": "In the embryonic development of the face, what biological structure brings about a separation between the lips/cheeks externally and the dental arches/jaws internally?",
        "options": [
            "Tuberculum impar",
            "Buccopharyngeal membrane",
            "Vestibular lamina (Lip furrow band)",
            "Dental lamina",
            "Lateral lingual swellings"
        ],
        "correctIndex": 2,
        "explanation": "The Vestibular Lamina (also known as the lip furrow band) is a band of thickened oral ectoderm that invaginates into the underlying ectomesenchyme just labial/buccal to the dental lamina. The central cells of this lamina degenerate and cleave, creating the oral vestibule (the sulcus separating the lips and cheeks from the alveolar ridge and teeth).",
        "distractorRationales": {
            "0": "Option A (Tuberculum impar) is a median swelling from the first pharyngeal arch that participates in tongue body development.",
            "1": "Option B (Buccopharyngeal membrane) is the transient trilaminar barrier separating the primitive stomodeum from the foregut, rupturing around week 4.",
            "3": "Option D (Dental lamina) is the adjacent epithelial band responsible for initiating the 20 primary tooth buds through localized invagination.",
            "4": "Option E (Lateral lingual swellings) are paired first-arch prominences that overgrow the tuberculum impar to form the anterior 2/3 of the tongue."
        },
        "keyTakeaway": "Embryonic Laminae: Dental Lamina gives rise to tooth buds; Vestibular Lamina hollows out to form the oral vestibule between lips/cheeks and alveolar arches."
    },
    "dle-oh-032": {
        "question": "Tooth enamel is developmentally derived from oral ectoderm.",
        "options": [
            "True",
            "False, it is derived from mesoderm",
            "False, it is derived from endoderm",
            "False, it is derived from neural crest mesenchyme"
        ],
        "correctIndex": 0,
        "explanation": "Statement is TRUE: Enamel is the ONLY dental tissue derived from the embryonic oral ectoderm (via ameloblasts differentiated from the inner enamel epithelium of the enamel organ). All other dental and periodontal tissues (dentin, pulp, cementum, periodontal ligament, and alveolar bone) originate from ectomesenchyme derived from cranial neural crest cells.",
        "distractorRationales": {
            "1": "Option B is incorrect because true somatic mesoderm forms head musculature, but not dental enamel.",
            "2": "Option C is incorrect because endoderm forms the epithelial linings of the respiratory and gastrointestinal tracts, not tooth enamel.",
            "3": "Option D is incorrect because neural crest ectomesenchyme forms dental papilla (dentin and pulp) and dental follicle (cementum, PDL, bone), but NOT enamel."
        },
        "keyTakeaway": "Germ Layer Origins: Enamel = Ectoderm (Enamel organ). Dentin & Pulp = Neural Crest (Dental papilla). Cementum, PDL & Bone = Neural Crest (Dental follicle)."
    },
    "dle-oh-056": {
        "question": "Enamel is semi-permeable and allows fluoride ions to penetrate. The tooth becomes more resistant to acid demineralization because fluorapatite has a higher solubility product than hydroxyapatite. Evaluate these two statements:",
        "options": [
            "Both statements are true",
            "Both statements are false",
            "The first statement is true; the second statement is false",
            "The first statement is false; the second statement is true"
        ],
        "correctIndex": 2,
        "explanation": "The first statement is TRUE (enamel acts as a semi-permeable membrane allowing water, small ions, and fluoride to diffuse through organic pores and prism sheaths). The second statement is FALSE because Fluorapatite has a LOWER solubility product (Ksp ~ 3.19 x 10^-61) than Hydroxyapatite (Ksp ~ 2.35 x 10^-59). A lower solubility product means fluorapatite is thermodynamically less soluble and resists dissolution down to pH 4.5, compared to critical pH 5.5 for hydroxyapatite.",
        "distractorRationales": {
            "0": "Option A is incorrect because claiming fluorapatite has a higher solubility product is scientifically false (a higher Ksp would make it more soluble, not more resistant).",
            "1": "Option B is incorrect because the first proposition regarding enamel semi-permeability is a well-established histochemical fact.",
            "3": "Option D reverses the factual validity of the two statements."
        },
        "keyTakeaway": "Critical pH: Hydroxyapatite demineralizes at pH 5.5; Fluorapatite has a LOWER solubility product (less soluble) and resists demineralization down to pH 4.5."
    },
    "dle-oh-059": {
        "question": "An elastic, avascular, mineralized specialized connective tissue that forms the bulk of the tooth, being harder than bone and cementum but softer than enamel, is:",
        "options": [
            "Dentin",
            "Cementum",
            "Dental Pulp",
            "Periodontal Ligament"
        ],
        "correctIndex": 0,
        "explanation": "Dentin constitutes the primary structural bulk of both tooth crown and root. It is avascular, composed of approximately 70% inorganic mineral (hydroxyapatite), 20% organic collagenous matrix (predominantly type I collagen), and 10% water. Its high modulus of elasticity and resilience cushions overlying brittle enamel during heavy masticatory forces.",
        "distractorRationales": {
            "1": "Option B (Cementum) is softer and less mineralized (approx 50% inorganic, 50% organic/water), resembling bone in density and hardness.",
            "2": "Option C (Dental Pulp) is an unmineralized, highly vascular, and richly innervated loose connective tissue occupying the central pulp cavity.",
            "3": "Option D (Periodontal Ligament) is an unmineralized dense fibrous collagenous connective tissue attaching cementum to alveolar bone."
        },
        "keyTakeaway": "Hardness Hierarchy of Mineralized Tissues: Enamel (96% mineral) > Dentin (70% mineral) > Cementum (50% mineral) = Bone (50-60% mineral)."
    },
    "dle-oh-078": {
        "question": "Which of the following represents the correct sequence of dental tissues arranged from MOST radiopaque to LEAST radiopaque (most radiolucent) on a diagnostic radiograph?",
        "options": [
            "Enamel > Dentin > Bone > Pulp",
            "Enamel > Bone > Dentin > Pulp",
            "Dentin > Enamel > Bone > Pulp",
            "Pulp > Bone > Dentin > Enamel"
        ],
        "correctIndex": 0,
        "explanation": "Radiographic opacity directly correlates with tissue mineral density. Enamel (96% inorganic hydroxyapatite) attenuates X-rays most strongly and appears pure white (most radiopaque), followed by Dentin (70% mineral), then cortical and trabecular Alveolar Bone (50-60% mineral), with unmineralized soft vascular Pulp appearing dark/black (radiolucent).",
        "distractorRationales": {
            "1": "Option B is incorrect because dentin is more mineralized (70%) and thus more radiopaque than spongy/trabecular bone (50-60%).",
            "2": "Option C is incorrect because enamel has significantly higher mineral content than dentin and is distinctly more radiopaque.",
            "3": "Option D reverses the sequence entirely, presenting least radiopaque (radiolucent) to most radiopaque."
        },
        "keyTakeaway": "Radiopacity Hierarchy: Metal/Amalgam > Enamel > Dentin > Bone/Cementum > Soft tissue/Pulp (Radiolucent)."
    },
    "dle-oh-085": {
        "question": "The principal periodontal ligament fiber group attached to cementum immediately apical to the junctional epithelium and running downward into the alveolar crest is the:",
        "options": [
            "Alveolar crest fiber group",
            "Horizontal fiber group",
            "Oblique fiber group",
            "Apical fiber group",
            "Interradicular fiber group"
        ],
        "correctIndex": 0,
        "explanation": "The Alveolar Crest Fiber group originates from cervical root cementum just beneath the junctional epithelium and extends obliquely downward and outward to insert into the rim of the alveolar bone crest. These fibers retain the tooth in its socket and resist lateral, tilting, and extrusive forces.",
        "distractorRationales": {
            "1": "Option B (Horizontal fibers) course at right angles directly across the PDL space from cementum to alveolar bone, resisting lateral/horizontal loads.",
            "2": "Option C (Oblique fibers) constitute the largest and most abundant PDL fiber group, running obliquely upward from cementum to bone to bear axial masticatory vertical stress.",
            "3": "Option D (Apical fibers) radiate irregularly from apical cementum to the fundus of the socket, protecting apical neurovascular structures.",
            "4": "Option E (Interradicular fibers) fan out from the furcation of multirooted teeth into the crest of the interradicular septum."
        },
        "keyTakeaway": "PDL Fiber Orientation: Alveolar Crest (downward to crest); Horizontal (right angles); Oblique (most abundant, upward to bone to resist axial mastication); Apical (radiates at root apex)."
    },
    "dle-ghm-016": {
        "question": "A patient presents with oral thrush characterized by creamy white curd-like plaques on buccal mucosa that wipe off to reveal an erythematous bleeding base. Smear microscopy reveals budding yeast cells and pseudohyphae. The causative pathogen is:",
        "options": [
            "Candida albicans",
            "Clostridium botulinum",
            "Mycobacterium tuberculosis",
            "Vibrio cholerae"
        ],
        "correctIndex": 0,
        "explanation": "Candida albicans is a dimorphic commensal fungal organism responsible for oral candidiasis (pseudomembranous candidiasis / thrush). Pathognomonic microscopic findings on potassium hydroxide (KOH) or Gram stain preparations reveal oval budding blastoconidia (yeasts) and branching pseudohyphae.",
        "distractorRationales": {
            "1": "Option B (Clostridium botulinum) is an anaerobic, spore-forming, Gram-positive bacillus that elaborates lethal neurotoxins causing flaccid paralysis (botulism).",
            "2": "Option C (Mycobacterium tuberculosis) is an acid-fast bacillus causing chronic pulmonary granulomas and indurated, ragged oral ulcers.",
            "3": "Option D (Vibrio cholerae) is a comma-shaped Gram-negative bacillus producing cholera enterotoxin that causes profuse secretory 'rice-water' diarrhea."
        },
        "keyTakeaway": "Candida Albicans: Dimorphic fungus (budding yeast & pseudohyphae); causes wiping-off white curd plaques (thrush); treated with topical Nystatin or oral Fluconazole."
    },
    "dle-ghm-025": {
        "question": "During a microbiology laboratory exercise, a culture medium containing tryptone, glucose, and yeast extract (TGY) is prepared to support the growth of a wide variety of nonfastidious microorganisms. How is this medium classified?",
        "options": [
            "General-purpose nutrient/enriched medium",
            "Selective medium only",
            "Differential medium only",
            "Transport medium"
        ],
        "correctIndex": 0,
        "explanation": "A culture medium containing peptones, glucose, and yeast extract (TGY or nutrient broth/agar) provides a broad nutritional spectrum of amino acids, carbohydrates, vitamins, and minerals without inhibitory agents or diagnostic indicators, classifying it as a General-Purpose (nonselective, enriched) culture medium.",
        "distractorRationales": {
            "1": "Option B (Selective medium) contains specific inhibitory agents (e.g., bile salts, crystal violet, antibiotics) that suppress unwanted flora while permitting desired taxa to grow (e.g. MacConkey agar).",
            "2": "Option C (Differential medium) incorporates diagnostic pH indicators or biochemical substrates (e.g., lactose) to distinguish colonies based on metabolic capabilities.",
            "3": "Option D (Transport medium) is a non-nutritive buffer designed to maintain bacterial viability during clinical transport without supporting active proliferation (e.g., Stuart or Cary-Blair)."
        },
        "keyTakeaway": "Microbiology Media: General-purpose (supports broad nonfastidious growth); Selective (inhibits non-targets); Differential (visually distinguishes species based on biochemical reactions)."
    },
    "dle-ghm-026": {
        "question": "In a standard compound light microscope, which component serves as the primary magnifying lens that gathers light from the specimen and forms the real inverted intermediate image?",
        "options": [
            "Objective lens",
            "Eyepiece (Ocular lens)",
            "Substage Condenser lens",
            "Iris Diaphragm"
        ],
        "correctIndex": 0,
        "explanation": "The Objective lens (located on the rotating nosepiece immediately above the glass slide) collects light transmitted through the specimen and produces the primary magnified, real, and inverted intermediate image within the optical body tube. The ocular lens (eyepiece) then magnifies this real image into a virtual enlarged image.",
        "distractorRationales": {
            "1": "Option B (Eyepiece/Ocular lens) provides secondary magnification (typically 10x) of the intermediate image formed by the objective lens.",
            "2": "Option C (Substage Condenser) focuses and concentrates illumination light rays from the light source directly onto the plane of the specimen without providing magnification.",
            "3": "Option D (Iris Diaphragm) regulates the aperture diameter of the light cone to optimize optical contrast and numerical aperture resolution."
        },
        "keyTakeaway": "Microscope Optics: Objective lens creates the primary real inverted image; Ocular lens magnifies it into the final virtual image. Total Magnification = Objective x Ocular."
    },
    "dle-ghm-046": {
        "question": "In mature compact (cortical) bone, what are the cylindrical concentric mineralized matrix rings arranged around a central neurovascular Haversian canal called?",
        "options": [
            "Concentric Lamellae",
            "Osteons (Haversian systems)",
            "Trabeculae",
            "Canaliculi"
        ],
        "correctIndex": 0,
        "explanation": "Concentric Lamellae are the parallel, concentric circular rings or plates of calcified collagenous bone matrix that encircle the central Haversian canal. The entire structural cylindrical unit—comprising the central canal, surrounding concentric lamellae, osteocytes within lacunae, and radiating canaliculi—is termed an Osteon (Haversian system).",
        "distractorRationales": {
            "1": "Option B (Osteons) is the name of the entire composite cylindrical structural functional unit, not the individual concentric layers themselves.",
            "2": "Option C (Trabeculae) are the branching anastomosing bony plates and struts that compose cancellous (spongy/trabecular) bone.",
            "3": "Option D (Canaliculi) are tiny microscopic tunnels traversing the lamellae through which osteocytic dendritic processes communicate via gap junctions."
        },
        "keyTakeaway": "Bone Histology: Concentric Lamellae = individual mineralized rings. Osteon = complete Haversian cylinder. Canaliculi = communication tunnels for osteocyte dendrites."
    },
    "dle-pm-032": {
        "question": "What is the standard time, temperature, and pressure parameters required for steam under pressure (autoclave) sterilization of packaged dental instruments?",
        "options": [
            "121°C (250°F) at 15 psi for 15-30 minutes",
            "160°C (320°F) for 2 hours (Dry Heat)",
            "170°C (340°F) for 1 hour (Dry Heat)",
            "134°C (273°F) at 30 psi for 3 minutes (Unwrapped Flash)"
        ],
        "correctIndex": 0,
        "explanation": "The standard CDC and ADA benchmark for steam autoclaving of wrapped dental instrument cassettes is 121°C (250°F) at 15 pounds per square inch (psi) of gauge pressure for 15 to 30 minutes. Saturated steam under pressure rapidly coagulates and denatures essential microbial proteins and destroys bacterial endospores (Geobacillus stearothermophilus).",
        "distractorRationales": {
            "1": "Option B (160°C for 2 hours) represents dry heat sterilization parameters for materials damaged by moisture.",
            "2": "Option C (170°C for 1 hour) represents rapid dry heat oven sterilization.",
            "3": "Option D (134°C for 3 minutes) represents unwrapped immediate-use 'flash' autoclaving, which is restricted to emergency use and not recommended for routine wrapped instrument packs."
        },
        "keyTakeaway": "Autoclave Benchmark: 121°C (250°F) at 15 psi for 15-30 mins; Biological spore indicator: Geobacillus stearothermophilus."
    }
}

# Apply smashed fixes
for idx, q in enumerate(questions):
    qid = q["id"]
    if qid in SMASHED_FIXES:
        fix = SMASHED_FIXES[qid]
        for k, v in fix.items():
            q[k] = v
        print(f"Repaired smashed question: {qid}")

# Write back
output_js = "export const dentalQuestions = " + json.dumps(questions, indent=2, ensure_ascii=False) + ";\n"
with open("src/data/dentalQuestions.js", "w", encoding="utf-8") as f:
    f.write(output_js)

print("Saved updated dentalQuestions.js!")
