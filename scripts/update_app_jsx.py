with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update questions initialization to check version
import re

old_notes_pattern = r'const DEFAULT_NOTES = `[\s\S]*?`;'
new_notes = """const DEFAULT_NOTES = `# High-Yield Dental Board (DLE) Strategies & Mnemonics 🦷✨

### 1. Tooth Numbering & Identification Rules
* **FDI World Dental Federation System**:
  - 1st Digit = Quadrant (1=Maxillary Right, 2=Maxillary Left, 3=Mandibular Left, 4=Mandibular Right)
  - Primary Quadrants = 5 (UR), 6 (UL), 7 (LL), 8 (LR)
  - 2nd Digit = Tooth number from midline (1=Central Incisor to 8=Third Molar; 1 to 5 for primary).
* **Universal System**:
  - Permanent: 1 (UR 3rd molar) to 32 (LR 3rd molar).
  - Primary: A (UR 2nd molar) through T (LR 2nd molar).

---

### 2. Tooth Eruption Sequences
* **Deciduous Teeth (Primary)**:
  - Sequence: **A - B - D - C - E** (Centrals ~6-10 mo -> Laterals ~10-16 mo -> 1st Molars ~14-18 mo -> Canines ~16-23 mo -> 2nd Molars ~23-31 mo).
* **Permanent Dentition**:
  - Mandibular: **6 - 1 - 2 - 3 - 4 - 5 - 7 - 8**
  - Maxillary: **6 - 1 - 2 - 4 - 5 - 3 - 7 - 8** (Canine erupts *after* premolars in maxilla!).

---

### 3. Dental Local Anesthesia & Epinephrine Rules
* **Epinephrine MRD**:
  - Healthy Patient (ASA I): **0.2 mg** (~11 standard 1.8 mL cartridges of 1:100,000 epi).
  - Cardiac / Hypertensive Patient (ASA III/IV): **0.04 mg** (Strict limit: **2 cartridges** of 1:100,000 epi).
* **Articaine (Septocaine)**:
  - 4% formulation. Only dental amide local anesthetic containing an ester link; metabolized in **blood plasma by pseudocholinesterase** (elimination half-life ~20 mins).

---

### 4. G.V. Black Cavity Classifications
* **Class I**: Pits and fissures on occlusal surfaces of molars/premolars, facial/lingual pits of molars, lingual pits of maxillary incisors.
* **Class II**: Proximal surfaces of posterior teeth (premolars and molars).
* **Class III**: Proximal surfaces of anterior teeth (incisors/canines) NOT involving the incisal angle.
* **Class IV**: Proximal surfaces of anterior teeth INVOLVING the incisal angle.
* **Class V**: Gingival / cervical third of facial or lingual surfaces of all teeth.
* **Class VI**: Cavities on incisal edges of anterior teeth or cusp tips of posterior teeth.

---

### 5. RA 9484 (The Philippine Dental Act of 2007)
* **Exam Results**: Must be officially released and posted within **30 days** after the final examination day.
* **Reinstatement of Revoked License**: Allowed upon application after **2 years** following revocation, subject to Board discretion.

---

### 6. Special Note for You 💕
Every tooth morphology line angle, every cranial nerve pathway, and every diagnostic criteria you study today is building your future clinic. You are going to be such an incredible, compassionate, licensed dentist. Take a deep breath, trust your clinical instinct, and remember I am always here cheering you on! 🦷💜
`;"""

content = re.sub(old_notes_pattern, new_notes, content)

# Update questions loading logic to sync dental questions
old_q_pattern = r'const \[questions, setQuestions\] = useState\(\(\) => \{[\s\S]*?return defaultQuestions;\s*\}\);'
new_q = """const DENTAL_VERSION = "dle_v2_dental_bank";

  const [questions, setQuestions] = useState(() => {
    try {
      const savedVersion = localStorage.getItem("pb_dle_version");
      if (savedVersion === DENTAL_VERSION) {
        const saved = localStorage.getItem("pb_questions");
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {}
    localStorage.setItem("pb_dle_version", DENTAL_VERSION);
    localStorage.setItem("pb_questions", JSON.stringify(defaultQuestions));
    return defaultQuestions;
  });"""

content = re.sub(old_q_pattern, new_q, content)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("App.jsx updated with DLE Notes and automatic dental questions sync!")
