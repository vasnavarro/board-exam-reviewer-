import json

with open("src/data/dmfBookData.js", "r", encoding="utf-8") as f:
    code = f.read()

# We can update the dmfBookData.js file directly
# First load current pages
import re
match = re.search(r'export const DMF_BOOK_PAGES = (\[.*?\]);\s*export const DMF_CHAPTERS', code, re.DOTALL)
if not match:
    print("Could not find DMF_BOOK_PAGES in file")
    exit(1)

pages = json.loads(match.group(1))

# Update page 54
for p in pages:
    if p["pageNumber"] == 54:
        p["title"] = "General Pathology: Sjogren's Syndrome, Cirrhosis & Genitourinary Pathologies"
        p["subject"] = "General Pathology"
        p["day"] = "Day 1 - Basic Sciences"
        p["keywords"] = ["sjogrens syndrome", "sicca syndrome", "pancreatitis", "cirrhosis", "laennecs", "glomerulonephritis", "nephritic", "nephrotic", "prostate cancer"]
        p["summary"] = "High-yield systemic pathologies: Sjogren's Syndrome ('Sicca syndrome': autoimmune destruction of salivary and lacrimal glands, triad of xerostomia, keratoconjunctivitis sicca, rheumatoid arthritis; treated with Pilocarpine and immunosuppressants). Acute Pancreatitis (autodigestion, elevated serum amylase and lipase). Cirrhosis types: Alcoholic (Laennec's with Mallory bodies), Biliary (bile duct obstruction), Cardiac (R-CHF). Genitourinary: Glomerulonephritis (post-streptococcal), Nephritic syndrome (hematuria, RBC casts) vs Nephrotic syndrome (massive proteinuria >3.5g/day, severe hypoalbuminemia, anasarca), Prostate cancer (elevated acid phosphatase and PSA)."

    # Update pages 81 to 84 (Pharmacology & Local Anesthesia)
    if p["pageNumber"] == 81:
        p["title"] = "Local Anesthesia: Adverse Reactions, Systemic Toxicity & Vasoconstrictors"
        p["subject"] = "Dental Pharmacology"
        p["day"] = "Day 2 - Clinical & Pharma"
        p["keywords"] = ["anesthesia toxicity", "cns toxicity", "cardiac toxicity", "methylparaben", "sodium bisulfite", "amides vs esters", "epinephrine limits"]
        p["summary"] = "Adverse local anesthetic reactions: 1) Systemic Toxicity (vessel deposition or overdosage; early CNS signs: talkativeness, anxiety, slurred speech, dizziness; severe: seizures, coma, respiratory arrest; cardiac: bradycardia, hypotension). 2) Allergic Reactions: mediated by histamine; caused by preservatives (Methylparaben) or antioxidants (Sodium Bisulfite in vasoconstrictors). Esters (metabolized by plasma pseudocholinesterase to PABA, high allergy rate) vs Amides (metabolized by liver CYP450). Vasoconstrictors reduce systemic absorption and bleeding (Max Epi: healthy ASA I = 0.2mg; cardiac ASA III/IV = 0.04mg)."

    if p["pageNumber"] == 82:
        p["title"] = "Local Anesthesia: Topical Agents, Ester Classifications & Needle Gauges"
        p["subject"] = "Local Anesthesia"
        p["day"] = "Day 2 - Clinical & Pharma"
        p["keywords"] = ["topical anesthesia", "emla", "needle length", "needle gauge", "25 gauge", "27 gauge", "30 gauge", "nitrogen bubble", "warm anesthesia"]
        p["summary"] = "Anesthetic delivery equipment & pharmacology: Topical Anesthesia (EMLA combination of Lidocaine + Prilocaine). Ester local anesthetics: Cocaine, Procaine (Novocaine), Benzocaine (Anbesol), Tetracaine, Propoxycaine. Most dental LAs are tertiary amines. Dental Needles: Ultra-short (<20mm, intraligamentary), Short (20mm), Long (32mm). Gauges: 30G (smallest), 27G, 25G (larger lumen, mandatory for high-risk positive aspiration like IAN blocks). Pain reduction occurs when anesthetic is warmed to body temperature (42°C). The 2mm bubble in the carpule is Nitrogen gas."

    if p["pageNumber"] == 83:
        p["title"] = "Local Anesthesia: Maxillary & Mandibular Nerve Block Techniques"
        p["subject"] = "Local Anesthesia"
        p["day"] = "Day 2 - Clinical & Pharma"
        p["keywords"] = ["psa block", "msa block", "asa block", "infraorbital block", "nasopalatine block", "greater palatine block", "ian block", "lingual nerve block"]
        p["summary"] = "Dental nerve block anatomy: 1) PSA: blocks maxillary 2nd and 3rd molars and DB/palatal roots of 1st molar (NOT the MB root!). 2) MSA: blocks maxillary 1st molar MB root and 1st/2nd premolars. 3) ASA: blocks maxillary canines and incisors. 4) Infraorbital: blocks ASA + MSA and anterior facial soft tissues. 5) Nasopalatine: incisive foramen, blocks anterior 1/3 of hard palate canine to canine. 6) Greater Palatine: blocks posterior 2/3 of hard palate. 7) Classic Mandibular Block (IAN + Lingual): anesthetizes all mandibular teeth on injection side, buccal tissue anterior to 1st molar, anterior 2/3 of tongue, and floor of mouth."

    if p["pageNumber"] == 84:
        p["title"] = "Local Anesthesia: Advanced Mandibular Nerve Blocks (Gow-Gates & Akinosi)"
        p["subject"] = "Local Anesthesia"
        p["day"] = "Day 2 - Clinical & Pharma"
        p["keywords"] = ["gow gates technique", "akinosi vazirani", "closed mouth mandibular block", "trismus", "high mandibular block", "neck of condyle", "v3 main trunk"]
        p["summary"] = "Advanced mandibular block techniques: 1) Gow-Gates Technique: true mandibular nerve block targeting the lateral neck of the condyle just below the insertion of the lateral pterygoid muscle. Syringe aligned from contralateral premolar; blocks IAN, Lingual, Auriculotemporal, Mylohyoid, and Buccal nerves (entire V3 distribution!). Highest success rate, lowest aspiration rate. 2) Vazirani-Akinosi Technique: closed-mouth mandibular block indicated for patients with severe trismus or limited mouth opening where coronoid notch cannot be visualized; needle placed parallel to maxillary occlusal plane at level of mucogingival junction of maxillary 3rd molar."

    # Update pages 85 to 91 (Oral Anatomy, Physiology & Occlusion)
    if p["pageNumber"] == 85:
        p["title"] = "Oral Anatomy: Tooth Numbering Systems & Anatomical Landmarks"
        p["subject"] = "Oral Anatomy"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["numbering systems", "universal numbering", "palmer notation", "fdi system", "ada system", "who", "quadrants"]
        p["summary"] = "Dental numbering systems: 1) Universal Numbering System (ADA): Permanent teeth numbered 1 to 32 (starts upper right 3rd molar #1 to upper left #16, down to lower left #17 to lower right #32); Primary teeth designated A to T (upper right primary 2nd molar A to upper left J, lower left K to lower right T). 2) Palmer's Notation (Zsigmondy): 4 quadrants with brackets; permanent teeth 1 to 8 per quadrant; primary teeth A to E. 3) FDI Two-Digit System (WHO): First digit = quadrant (1 to 4 permanent, 5 to 8 primary); Second digit = tooth position from midline (1 to 8 permanent, 1 to 5 primary)."

    if p["pageNumber"] == 86:
        p["title"] = "Tooth Physiology: Contact Areas, Embrasures, Height of Contour & CEJ"
        p["subject"] = "Oral Anatomy"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["contact areas", "embrasures", "spillways", "height of contour", "cej curvature", "mesial vs distal cej", "interproximal spaces"]
        p["summary"] = "Tooth physiology & architecture: Contact areas stabilize arches and prevent food impaction. Embrasures (Spillways): Largest occlusal embrasure is between Maxillary Canine and 1st Premolar; Largest incisal embrasure is between Maxillary Lateral and Canine; Smallest incisal embrasure is between Mandibular Central Incisors. Height of Contour: Anteriors at cervical third facially and lingually; Posteriors at cervical third facially, middle third lingually (except mandibular molars at cervical/middle junction facially, and mandibular 2nd premolar at occlusal third lingually). CEJ curvature is greater on anterior teeth than posteriors, and always greater on the MESIAL than the DISTAL (greatest on mesial of maxillary central incisor!)."

    if p["pageNumber"] == 87:
        p["title"] = "Permanent Dentition Morphology: Maxillary Teeth (Incisors, Canines, Premolars, Molars)"
        p["subject"] = "Oral Anatomy"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["maxillary incisors", "maxillary canine", "maxillary premolars", "maxillary molars", "cusp of carabelli", "oblique ridge", "mesial concavity"]
        p["summary"] = "Maxillary tooth morphology guide: Central Incisor (widest anterior MD, sharp 90° mesioincisal angle). Lateral Incisor (most variable crown after 3rd molar, peg lateral, dens invaginatus, deep lingual pit). Canine (longest root, cornerstone, canine eminence, mesial cusp ridge shorter than distal). 1st Premolar (only premolar with 2 roots in 60%, deep mesial crown and root concavity, mesial marginal groove). 2nd Premolar (single root, equal cusp heights, wrinkled occlusal surface). 1st Molar (largest maxillary tooth, 4 cusps + Cusp of Carabelli on ML cusp, prominent oblique ridge, 3 divergent roots, MB root has MB2 canal in >60%)."

    if p["pageNumber"] == 88:
        p["title"] = "Permanent Dentition Morphology: Mandibular Teeth & Eruption"
        p["subject"] = "Oral Anatomy"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["mandibular incisors", "mandibular canine", "mandibular premolars", "mandibular molars", "snake eyes", "y shape groove", "smallest tooth"]
        p["summary"] = "Mandibular tooth morphology guide: Central Incisor (smallest permanent tooth, bilaterally symmetrical, occludes with only ONE tooth: maxillary central). Lateral Incisor (distolingual incisal edge twist following arch curvature). Canine (longest crown height, smooth cingulum, occasional bifurcated facial/lingual roots). 1st Premolar (smallest premolar, tiny non-functional lingual cusp, 'snake eyes' occlusal pits, mesiolingual developmental groove). 2nd Premolar (frequently 3 cusps with 'Y' groove pattern, most commonly congenitally missing premolar). Maxillary 2nd Molar (rhomboidal or heart-shaped) & 3rd Molar."

    if p["pageNumber"] == 89:
        p["title"] = "Mandibular Molars & Primary Dentition Morphology"
        p["subject"] = "Oral Anatomy"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["mandibular 1st molar", "mandibular 2nd molar", "five cusps", "primary teeth", "whiter enamel", "slender roots", "pulp horns"]
        p["summary"] = "Posterior teeth and primary morphology: Mandibular 1st Molar (largest mandibular tooth, widest MD dimension of all teeth, 5 cusps [MB, DB, Distal, ML, DL], hexagonal occlusal outline, 2 broad roots M & D). Mandibular 2nd Molar (4 cusps of equal height, rectangular outline, cruciform '+' groove). Primary Dentition general hallmarks: crowns wider MD than crown height, prominent cervical bulges (Tubercle of Zuckerkandl), enamel and dentin half as thick as permanent teeth, pulp chambers relatively larger with high pulp horns, roots longer, more slender, and widely flared to encompass premolar buds."

    if p["pageNumber"] == 90:
        p["title"] = "Primary Molars & Concepts of Occlusion (Andrews 6 Keys & Jaw Relations)"
        p["subject"] = "Oral Anatomy"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["concepts of occlusion", "working cusps", "non working cusps", "andrews 6 keys", "centric relation", "postural position", "rest vertical dimension"]
        p["summary"] = "Occlusal concepts & morphology: Primary Canines & Molars. Working cusps (Maxillary Lingual, Mandibular Buccal) contact marginal ridges and central fossae; Non-working cusps (Maxillary Buccal, Mandibular Lingual) contact grooves and embrasures. Andrews 6 Keys to Normal Occlusion: 1) Class I molar relationship, 2) Crown angulation (mesiodistal tip), 3) Crown inclination (buccolingual torque), 4) No tooth rotation, 5) Tight proximal contacts, 6) Flat or mild Curve of Spee. Basic Jaw Relations: 1) Postural Position (muscle-guided, vertical dimension at rest, no tooth contact), 2) Centric Relation (CR: most superoanterior position of condyles in glenoid fossa, ligament-guided position)."

    if p["pageNumber"] == 91:
        p["title"] = "Centric Occlusion, Mandibular Movements & Compensating Curvatures"
        p["subject"] = "Oral Anatomy"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["centric occlusion", "maximum intercuspation", "canine guidance", "group function", "curve of spee", "curve of wilson", "bonwill triangle", "curve of monson"]
        p["summary"] = "Mandibular kinematics & occlusal curves: Centric Occlusion (CO / MI: complete tooth contact, tooth-guided position). Mandibular movements: Protrusive (forward movement, posterior teeth disarticulate: Christensen's phenomenon) and Lateral movement (working vs non-working sides). Guidance: Canine-guided (vertical overlap discludes all posterior teeth) vs Group function (multiple teeth contact on working side). Compensating Curvatures: Bonwill Equilateral Triangle (4 inches between condyles and incisal contact), Curve of Spee (anteroposterior curvature), Curve of Wilson (mediolateral curvature), Curve of Monson (3D sphere combining Spee and Wilson). Functions of stomatognathic system: Mastication, Deglutition, Respiration, Speech, Proprioception."

    # Update pages 92 to 100 (Orthodontics & Growth Development)
    if p["pageNumber"] == 92:
        p["title"] = "Orthodontics: Angle's Classification of Malocclusion & Incipient Signs"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["orthodontics", "angles classification", "class i neutroclusion", "class ii distocclusion", "class iii mesiocclusion", "division 1", "division 2", "dewey classification", "incipient malocclusion"]
        p["summary"] = "DMF Orthodontics Chapter Start by Dr. Mickhail Q. Francisco: Classification of Malocclusion according to Edward Angle: 1) Class I (Neutroclusion): MB cusp of maxillary 1st molar occludes in buccal groove of mandibular 1st molar; Dewey types 1-5 (anterior crowding, labioversion, anterior crossbite, posterior crossbite, mesial drift). 2) Class II (Distocclusion / Retrognathism): MB cusp of max 1st molar falls between mand 1st molar and 2nd premolar; Div 1 (extreme labioversion/overjet), Div 2 (palatally tipped centrals, labially tipped laterals, deep bite). 3) Class III (Mesiocclusion / Prognathism): MB cusp falls between mand 1st and 2nd molars. Signs of Incipient Malocclusion: lack of interdental spacing in primary dentition, crowding of permanent incisors in mixed dentition, premature loss of primary canines."

    if p["pageNumber"] == 93:
        p["title"] = "Orthodontics: Speech Disorders, Cephalometric Landmarks & Planes"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["cephalometrics", "sella", "nasion", "point a", "point b", "frankfort horizontal plane", "mandibular plane", "speech difficulties", "sibilants", "poor mans cephalometrics"]
        p["summary"] = "Orthodontic diagnostics & cephalometrics: Malocclusion and Speech difficulties (S, Z sibilants associated with anterior open bite / excessive overjet; T, D with irregular incisors; F, V with skeletal Class III; B, P, M with cleft lip). Cephalometrics intro ('Poor-man's cephalometrics' = facial profile analysis). Key Cephalometric Landmarks: S (Sella, most stable landmark in cranial base), N (Nasion), Bo (Bolton), Ba (Basion), Ar (Articulare), Po (Porion), Or (Orbitale), Point A (Subspinale: premaxilla base), Point B (Supramentale: mandible base), Pog (Pogonion: most anterior chin), Me (Menton: most inferior symphysis), Go (Gonion). Planes: Frankfort Horizontal Plane (Porion to Orbitale), Sella-Nasion Plane, Mandibular Plane (Menton to Gonion)."

    if p["pageNumber"] == 94:
        p["title"] = "Orthodontics: Cephalometric Angles (FMA, ANB), Removable Appliances & Headgears"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["fma angle", "anb angle", "sna", "snb", "headgears", "high pull headgear", "cervical pull headgear", "reverse pull headgear", "chin cup", "adams clasp"]
        p["summary"] = "Cephalometric angles & orthopedic headgears: FMA (Frankfort Mandibular Plane Angle, normal 28.7° ± 5.8°; steep = open bite / Class II; flat = deep bite / Class III). ANB angle (normal 2.5° ± 2.5°; >5° = Skeletal Class II; <0° = Skeletal Class III). SNA & SNB. Tweed's Triangle (FMA, IMPA, FMIA). Removable appliances: produce tipping movements; components: Adams clasp, ball clasp, baseplate, finger springs. Extraoral Headgears for Skeletal Class II: High-pull (distal & intrusive on molars/maxilla), Cervical-pull (distal & extrusive), Straight-pull. Reverse-pull Headgear (Facemask) for Skeletal Class III to protract maxilla; Chin Cup to redirect mandibular growth."

    if p["pageNumber"] == 95:
        p["title"] = "Orthodontics: Functional Appliances, Wire Bending Orders & Fixed Appliances"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["functional appliances", "activator", "bionator", "herbst", "frankel", "first order bends", "second order bends", "third order torque", "edgewise", "phosphoric acid"]
        p["summary"] = "Growth modification & fixed mechanics: Functional Appliances: Tooth-borne (Activator advances mandible edge-to-edge; Bionator trimmed down; Herbst telescopic pin-and-tube; Twin Block) vs Tissue-borne (Frankel Functional Regulator: ONLY tissue-borne appliance, alters facial soft tissue posture). Wire Bending Orders: 1st order (in/out, facial/lingual, rotational), 2nd order (tip, mesial/distal), 3rd order (torque, root inclination). Fixed Appliances history: Pin and tube (1910), Ribbon arch (1915), Begg, Edgewise (1925), PEA / Straight-wire brackets. Banding with Glass Ionomer; Bonding with 35-50% Phosphoric acid etch (Buonocore 1955) and Bis-GMA resin (Bowen 1962)."

    if p["pageNumber"] == 96:
        p["title"] = "Orthodontics: Archwire Metallurgy, Elastics & Crossbite Corrections"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["archwires", "stainless steel 18 8", "nitinol", "beta ti", "elastics class ii", "crossbites", "palatal expansion", "quad helix", "rapid palatal expander"]
        p["summary"] = "Biomaterials & crossbite mechanics: Archwire properties (high strength, low stiffness, high range, high formability): Stainless Steel (18% Cr, 8% Ni; high stiffness), Cobalt-Chromium (Elgiloy), Ni-Ti (Nitinol shape memory and superelasticity), Beta-Titanium (TMA: excellent formability and moderate force). Intermaxillary Elastics: Class I (space closure), Class II (treats Class II), Class III (treats Class III). Crossbites: Buccal, Lingual, Posterior (abnormal buccolingual relation). Treatment by Palatal Expansion: Pre-adolescents (<12y: W-arch, Quad-Helix, split plates with jackscrew); Adolescents (>12y: Rapid Palatal Expanders / Hyrax). Anterior Crossbite: Dental (1-2 teeth: tongue blade, inclined plane, Hawley with springs), Skeletal (>3 teeth: Class III protraction), Functional (pseudoclass III)."

    if p["pageNumber"] == 97:
        p["title"] = "Orthodontics: Oral Habits (Thumbsucking, Tongue Thrusting) & Space Maintainers"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["thumbsucking", "tongue thrusting", "anterior openbite", "bluegrass appliance", "palatal crib", "space maintainer", "band and loop"]
        p["summary"] = "Deleterious habits & habit appliances: Thumbsucking habit triad: Duration, Frequency, Intensity. Age <=4 years: observe, no treatment; Age 4-6 years: habit must cease before permanent incisors erupt. Consequence: anterior open bite, constricted maxilla, Class II malocclusion. Appliances: Bluegrass appliance, Palatal crib, thumb guard. Tongue Thrusting: tongue protrudes during swallowing/speech/rest (infantile swallowing persists beyond 18 mo); treated with Tongue crib. Space Maintainers: passive appliances preventing mesial drifting of permanent 1st molars. Best space maintainer is a well-restored natural tooth! Band and Loop: unilateral single tooth loss."

    if p["pageNumber"] == 98:
        p["title"] = "Pediatric Orthodontics: Space Maintainers, Primary Terminal Planes & Leeway Space"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["lingual holding arch", "distal shoe", "flush terminal plane", "mesial step", "distal step", "nance leeway space", "primate space"]
        p["summary"] = "Space management & mixed dentition milestones: Space maintainers: Lingual Holding Arch (bilateral mandibular tooth loss, requires erupted permanent incisors), Distal Shoe (early loss of primary 2nd molar BEFORE permanent 1st molar erupts; intra-alveolar guide blade), Transpalatal Arch (TPA), Nance appliance. Primary Molar Relationships: Flush terminal plane (normal cusp-to-cusp permanent 6; shifts into Class I by mesial shift), Distal step (leads to Class II), Mesial step (leads to Class I). Nance Leeway Space: MD width difference between primary C-D-E and permanent 3-4-5 (Mandible = 1.7–2.5mm per quad; Maxilla = 0.9–1.5mm per quad). Primate Spaces: Maxillary = MESIAL to canine; Mandibular = DISTAL to canine."

    if p["pageNumber"] == 99:
        p["title"] = "Orthodontics & Growth: Diastema, Supernumerary Teeth & Growth Curves"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["diastema", "ugly duckling stage", "supernumerary teeth", "gardners syndrome", "cleidocranial dysostosis", "cephalocaudal", "growth spurt", "enlows v principle"]
        p["summary"] = "Developmental milestones & craniofacial biology: Maxillary Midline Diastema: <=2mm usually closes spontaneously after maxillary canine erupts ('Ugly Duckling stage', Broadbent); >2mm unlikely to close, suspect supernumerary tooth / mesiodens. Golden rule: ALWAYS WAIT FOR THE CANINE BEFORE TREATING DIASTEMA! Supernumerary conditions: Gardner's syndrome, Cleidocranial dysostosis/dysplasia, Down's, Sturge-Weber. Most common supernumerary is Mesiodens (initiation stage anomaly). Growth Curves (Scammon): Cephalocaudal curve (structures farther from brain grow more but later), Lymphoid curve (peaks at puberty then regresses). Timing of Growth Spurts: Females (3, 6-7, 11-12 yrs), Males (3, 7-9, 14-15 yrs). Enlow's V-Principle of Growth: bone deposition on inner side of 'V', resorption on outer side."

    if p["pageNumber"] == 100:
        p["title"] = "Orthodontics: Cortical Drift, Piezoelectric Theory, Growth Theories & Synchondroses"
        p["subject"] = "Orthodontics"
        p["day"] = "Day 3 - Clinical Dentistry"
        p["keywords"] = ["cortical drift", "piezoelectric theory", "theories of growth", "sicher", "scott", "moss", "synchondroses", "spheno occipital", "crowding"]
        p["summary"] = "Craniofacial growth mechanisms: Cortical Drift (deposition on side facing growth direction [+], resorption on opposite side [-]). Piezoelectric Theory: rhythmic bone deformation creates electrical potentials (Deposition = negative ions; Resorption = positive ions). Maxillary & Mandibular growth: Cortical drift direction is Superior-Posterior (Upward-Backward), while whole-bone Displacement is Downward-Forward (Inferior-Anterior!). Greatest increase in mandibular size occurs distal to the 1st molar at age 6. Theories of Growth: Sicher (sutural), Scott (cartilaginous: nasal septum & condyle), Moss (functional matrix: soft tissue airway/brain drives bone), Petrovic (servosystem). Cranial Base Synchondroses: Spheno-occipital synchondrosis remains active until ~20 years old. Management of Crowding: Observation, Disking of primary teeth, Serial extraction, Corrective orthodontics."

# Correct DMF_CHAPTERS
new_chapters = [
  { "title": "General Histology & Embryology", "startPage": 1, "endPage": 15, "subject": "General Histology", "day": "Day 1 - Basic Sciences", "icon": "🔬" },
  { "title": "General & Head/Neck Anatomy", "startPage": 16, "endPage": 28, "subject": "General Anatomy", "day": "Day 1 - Basic Sciences", "icon": "💀" },
  { "title": "General Physiology", "startPage": 29, "endPage": 39, "subject": "General Physiology", "day": "Day 1 - Basic Sciences", "icon": "🫀" },
  { "title": "Microbiology & Pathology", "startPage": 40, "endPage": 56, "subject": "Oral Pathology", "day": "Day 1 - Basic Sciences", "icon": "🦠" },
  { "title": "Pharmacology & Local Anesthesia", "startPage": 57, "endPage": 84, "subject": "Dental Pharmacology", "day": "Day 2 - Clinical & Pharma", "icon": "💊" },
  { "title": "Oral Anatomy, Physiology & Occlusion", "startPage": 85, "endPage": 91, "subject": "Oral Anatomy", "day": "Day 3 - Clinical Dentistry", "icon": "🦷" },
  { "title": "Orthodontics & Growth Development", "startPage": 92, "endPage": 100, "subject": "Orthodontics", "day": "Day 3 - Clinical Dentistry", "icon": "📐" }
]

new_content = f"""// Dr. Leane's DMF Board Exam Reviewer Book - Digital Library Index (Pages 1 to 100)
// Complete high-yield metadata, authentic summaries, and instant keyword search index
// Autogenerated and optimized for Dr. Leane & Angelo

export const DMF_TOTAL_PAGES = 100;
export const DMF_BOOK_PAGES = {json.dumps(pages, indent=2)};

export const DMF_CHAPTERS = {json.dumps(new_chapters, indent=2)};
"""

with open("src/data/dmfBookData.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated src/data/dmfBookData.js successfully!")
