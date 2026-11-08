import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MockExam } from "./components/MockExam";
import { Flashcards } from "./components/Flashcards";
import { PracticeMode } from "./components/PracticeMode";
import { WeaknessFocus } from "./components/WeaknessFocus";
import { QuestionBank } from "./components/QuestionBank";
import { NotesCheatSheet } from "./components/NotesCheatSheet";
import { BookReader } from "./components/BookReader";
import { GoodNotes } from "./components/GoodNotes";
import { SettingsModal } from "./components/SettingsModal";
import { QuickDrills } from "./components/QuickDrills";
import { MilestoneRewards } from "./components/MilestoneRewards";
import { StudyStation } from "./components/StudyStation";
import { ZenAntiPanicModal } from "./components/ZenAntiPanicModal";
import { PRCScheduleModal } from "./components/PRCScheduleModal";
import { MILESTONES } from "./data/milestones";
import { defaultQuestions } from "./data/defaultQuestions";
import { sound } from "./utils/audio";
import {
  fetchCloudProfile,
  saveCloudProfile,
  mergeProfiles,
  scheduleAutoSync,
  getDeviceName
} from "./services/cloudSync";

const DEFAULT_NOTES = `# High-Yield Dental Board (DLE) Strategies & Mnemonics 🦷✨

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
  - 4% formulation. Only dental amide local anesthetic containing a thiophene ring and an ester link; metabolized in **blood plasma by pseudocholinesterase** (elimination half-life ~20 mins).

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
Every tooth morphology line angle, every cranial nerve pathway, and every diagnostic criteria you study today is building your future clinic. You are going to be such an incredible, compassionate, licensed dentist. Take a deep breath, trust your clinical instinct, and remember Angelo is always here cheering you on! 🦷💜

---

### 7. DMF Reviewer: General Anatomy, Physiology & Histology (Pages 1–30) 🔬
* **Integumentary System**:
  - **Keratinocytes**: >90% of cells; produces keratin.
  - **Melanocytes**: Neural crest origin; synthesizes melanin; nucleus shielded from UV rays.
  - **Langerhans cells**: Bone marrow monocyte lineage; dendritic antigen-presenting cells in Stratum spinosum.
  - **Merkel cells**: Stratum basale; light touch mechanoreceptors ('Merkel tactile discs').
  - **Malpighian layer** (Stratum germinativum) = Stratum basale + Stratum spinosum (highest mitotic activity!).
  - **Stratum lucidum**: Clear translucent layer with eleidin found ONLY in thick skin (palms and soles).
* **Mechanoreceptors Summary**:
  - **Pacinian corpuscles**: Deep pressure & vibration (concentric 'onion-like' lamellae).
  - **Meissner corpuscles**: Light touch & flutter located in dermal papillae.
  - **Ruffini corpuscles**: Heat & skin stretch.
  - **End-bulbs of Krause**: Cold sensation.
* **Vitamin D Synthesis Cascade**:
  - Skin: 7-dehydrocholesterol + solar UVB -> Cholecalciferol (Vitamin D3).
  - Liver: 25-hydroxylase -> Calcidiol (25-OH-D3).
  - Kidney: 1α-hydroxylase -> Calcitriol (1,25-(OH)2-D3) = Active form enabling intestinal Ca2+ absorption.
* **Muscle Physiology & Sarcomere**:
  - **Sarcomere** = Functional contractile unit of muscle (spanning Z-disc to Z-disc).
  - **Z line** bisects I (light) band; **M line** bisects H zone / A (dark) band.
  - **Sarcoplasmic Reticulum (SR)** terminal cisternae = Primary intracellular storage of Calcium (Ca2+).
  - **Cross-bridge cycle**: Myosin binds actin -> Power stroke releases ADP + Pi -> Binding of NEW ATP detaches myosin head (lack of ATP = Rigor Mortis!).
* **Cranial Nerves & Tongue Innervation**:
  - **Anterior 2/3 of tongue**: General sensation = Lingual nerve (V3); Taste = Chorda tympani (CN VII).
  - **Posterior 1/3 of tongue**: General sensation & Taste = Glossopharyngeal (CN IX).
  - **Base of tongue / Vallecula**: General sensation & Taste = Internal laryngeal (CN X).
  - **Motor to all tongue muscles**: Hypoglossal nerve (CN XII) (except palatoglossus: CN X).
  - **Posterior division of V3**: Has ONE motor branch = **Mylohyoid nerve** (supplies mylohyoid & anterior digastric).
* **Lingual Papillae**:
  - **Filiform**: Most numerous; keratinized; ONLY papillae WITHOUT taste buds.
  - **Fungiform**: Mushroom-shaped; located on tip and lateral margins; has taste buds.
  - **Circumvallate**: 8-12 large papillae in V-shaped sulcus terminalis; cleansed by purely serous **Glands of Von Ebner**.
* **Stomach & Digestive Histology**:
  - **Parietal (Oxyntic) cells**: Secrete HCl + Intrinsic Factor (essential for Vit B12 absorption; deficiency = Pernicious Anemia).
  - **Chief (Peptic) cells**: Secrete Pepsinogen (zymogen for protein digestion).
  - **G cells**: Secrete Gastrin in gastric antrum.
  - **Hepatic Portal Triad**: Hepatic Artery branch + Portal Vein branch + Bile Ductule.
  - **Pancreatic Ducts**: Duct of Wirsung (major/main duct) + Duct of Santorini (accessory duct).

---

### 8. DMF Reviewer: General Pathology, Microbiology & Hematology (Pages 31–56) 🔬🩸
* **Hematologic Pathology & Anemias**:
  - **Sickle Cell Anemia**: Autosomal recessive point mutation substituting **Glutamic acid with Valine** at position 6 of the beta-globin chain.
    - Radiographic hallmark: **"Crewcut" / "Hair-on-end" appearance** of the skull calvarium due to marrow expansion.
  - **Erythroblastosis Fetalis** (Hemolytic Disease of the Newborn):
    - **Rh-negative mother** with an **Rh-positive fetus**; maternal IgG antibodies cross placenta lysing fetal RBCs.
    - Clinical hallmark: Jaundice, severe anemia, and **"Blue baby syndrome"** with intrinsic green/blue-brown staining of primary teeth.
  - **Agranulocytosis**: Extreme reduction in granulocytes (neutrophils <500/uL); presents with necrotic pharyngitis and deep ragged oral ulcers lacking erythema.
* **Leukemias & Diagnostic Hallmarks**:
  - **CLL (Chronic Lymphocytic Leukemia)**: Most common overall leukemia in older adults; indolent course.
  - **ALL (Acute Lymphocytic Leukemia)**: Most common leukemia in **CHILDREN** (peak age 2–5 years); null cell / pre-B cell proliferation; high cure rate.
  - **AML (Acute Myelocytic Leukemia)**: Characterized by **Auer rods** in myeloid blasts. Hallmark oral manifestation: **severe, boggy gingival hyperplasia** and spontaneous mucosal hemorrhage!
  - **CML (Chronic Myelogenous Leukemia)**: Diagnostic hallmark is the **Philadelphia chromosome** formed by a balanced reciprocal translocation t(9;22)(q34;q11), creating the constitutively active **BCR-ABL** fusion tyrosine kinase!

---

### 9. DMF Reviewer: Dental Pharmacology & Toxicology (Pages 57–75) 💊
* **Pharmacokinetics vs. Pharmacodynamics**:
  - **Pharmacokinetics (ADME)**: What the body does to the drug (Absorption -> Distribution -> Metabolism in Liver -> Excretion in Kidneys).
  - **Pharmacodynamics**: What the drug does to the body (mechanism of action, receptor binding, and clinical physiological effects).
* **High-Yield Board Toxicology Antidotes**:
  - **Activated Charcoal**: Relies on **adsorption** (binding toxins to porous surface); drug of choice for acute poisonings.
  - **Syrup of Ipecac**: Induces emesis/vomiting (contraindicated with caustics or hydrocarbons).
  - **Gastric Lavage**: Mechanical stomach pumping with tube (indicated within 1–2 hours of ingestion).
* **DMF "REMEMBER" Pearls (Top Board Questions)**:
  - **Contraindicated in Glaucoma**: **Anticholinergic drugs** (e.g. Atropine, Scopolamine) cause pupil dilation (mydriasis), blocking Schlemm's canal and precipitating acute angle-closure glaucoma!
  - **Most Allergenic Antibiotic**: **Penicillin** (Type I IgE-mediated anaphylaxis).
    - Safe alternatives for penicillin-allergic dental patients: **Clindamycin 300 mg**, **Azithromycin 500 mg**, or Cephalosporins (caution if true anaphylaxis).
  - **Safe During Pregnancy**: Local anesthetics (Lidocaine, Prilocaine - FDA Category B), Paracetamol / Acetaminophen (analgesic of choice).
  - **Teratogens to AVOID**:
    - **Tetracycline**: Incorporates into mineralizing teeth and bones; causes permanent intrinsic yellow-brown banding and enamel hypoplasia.
    - **Phenytoin (Dilantin)**: Fetal hydantoin syndrome; drug-induced gingival enlargement.
    - **Thalidomide**: Causes phocomelia (seal limbs / absent long bones).
  - **Antabuse Drug for Alcoholism**: **Disulfiram** (inhibits aldehyde dehydrogenase; ingesting alcohol causes violent nausea, flushing, and tachycardia).
* **Antidepressant Classes**:
  - **SSRI** (Fluoxetine, Sertraline): First-line; increases serotonin in synaptic cleft.
  - **SNRI** (Venlafaxine, Duloxetine): Increases both serotonin and norepinephrine.
  - **Tricyclics / TCA** (Imipramine - prototype, Amitriptyline): Potentiates catecholamines; strict epinephrine limits in dental carpules.
  - **MAO Inhibitors**: Blocks monoamine oxidase; fatal hypertensive crisis if combined with tyramine-containing foods ("cheese effect") or meperidine.

---

### 10. DMF Reviewer: Dental Anesthesiology & Local Anesthesia Science (Pages 76–80) 💉
* **Mechanism of Action**:
  - Reversibly binds and blocks the intracellular portion of **voltage-gated Sodium (Na+) channels**, preventing inward sodium flux, axonal depolarization, and conduction of nerve action potentials.
* **Chemical Forms: Ionized vs. Unionized**:
  - **Unionized Base (RN)**: Uncharged, **lipid-soluble**; the ONLY form capable of diffusing across the lipophilic nerve sheath and axonal cell membrane.
  - **Ionized Cation (RNH+)**: Positively charged, **water-soluble**; the active form that physically plugs the inner sodium channel receptor.
* **pKa & The Chemistry of Onset**:
  - **pKa**: The pH at which a local anesthetic is **50% ionized and 50% unionized**.
  - The closer the pKa is to physiological tissue pH (7.4), the higher the percentage of unionized base -> **faster onset of anesthesia** (e.g. Mepivacaine pKa=7.6, Lidocaine pKa=7.8).
* **Why Anesthesia Fails in Infected / Abscessed Tissue (Acidosis)**:
  - Normal tissue pH = **7.4**.
  - Inflamed / purulent tissue pH drops to **4.0–5.5** (acidic).
  - In acidic tissue, the Henderson-Hasselbalch equation shifts heavily toward the **ionized form (>99%)**; less than 1% remains as lipid-soluble base!
  - The drug cannot penetrate the nerve sheath, causing complete anesthesia failure!
  - Clinical solution: Perform a **nerve block** away from the infected site, or buffer the anesthetic cartridge with **Sodium Bicarbonate** to raise pH!
* **Exact Order of Sensation Loss**:
  1. **Pain** (small unmyelinated C fibers & small myelinated A-delta fibers lost FIRST)
  2. **Temperature** (cold lost before warmth)
  3. **Touch**
  4. **Pressure**
  5. **Motor / Skeletal Muscle Tone** (large myelinated A-alpha motor fibers lost LAST).

---

### 11. DMF Reviewer: Primary Dentition Morphology & Differences (Pages 81–90) 🦷
* **Primary vs. Permanent Anatomical Distinctions**:
  - **Crowns**: Shorter cervico-occlusally relative to mesiodistal width ("squat", bulbous appearance).
  - **Cervical Ridge**: Marked cervical ridge bulge on buccal surfaces of primary molars and labial/lingual of anterior teeth.
  - **Cervical Constriction**: Marked constriction at the cervical line (neck) of primary teeth.
  - **Enamel & Dentin**: Thinner (enamel is uniformly only ~1 mm thick) with large pulp chambers and high pulp horns -> high risk of mechanical pulp exposure during cavity preparation!
  - **Enamel Rods**: Cervical enamel rods slope **occlusally/incisally** in primary teeth (compared to gingivally/apically in permanent teeth). Do NOT bevel gingival floors!
  - **Color**: Less pigmented, milky-white / bluish-white (due to lower mineral density and light refraction).
* **Primary Root Distinctions**:
  - Primary molar roots are **narrower, longer, and widely flared** with virtually **no root trunk**, extending directly from the crown to accommodate the developing permanent premolar tooth buds beneath them!
* **Key Tooth Identification Pearls**:
  - **Mandibular Central Incisor (O & P / 71 & 81)**: Bilaterally symmetrical, smallest tooth; incisal edge occludes **ONLY with the maxillary central incisor**!
  - **Permanent Mandibular 1st Molar (#19, #30 / 36, 46)**:
    - Largest and widest tooth in the mandibular arch.
    - 5 cusps with specific size order: **MB > ML > DL > DB > Distal**.
    - Tallest cusp: **Mesiolingual (ML)**.
    - 2 roots: Mesial (broad, curved, containing 2 canals) and Distal (1 canal).

---

### 12. DMF Reviewer: Orthodontics & Craniofacial Growth Theories (Pages 91–100) 📐
* **Cortical Drift vs. Displacement**:
  - **Cortical Drift**: Bone deposition on one side and resorption on the opposite surface, remodeling the bone through space.
  - **Nasomaxillary Complex (Maxilla)**:
    - Growth center: **Nasal Septum** (cartilage).
    - Cortical drift direction: **Superior-Posterior** (Upward and Backward).
    - Spatial displacement: **Downward and Forward** (Inferior-Anterior).
  - **Mandible**:
    - Growth center: **Condylar Cartilage**.
    - Cortical drift direction: **Superior-Posterior** (Upward and Backward on posterior ramus border).
    - Spatial displacement: **Downward and Forward** (Inferior-Anterior).
  - **Age 6 Growth Milestone**: At age 6, the greatest increase in size of the mandible occurs **distal to the first molar** to provide necessary arch length for the eruption of the second and third molars!
* **Piezoelectric Theory of Tooth Movement**:
  - Mechanical deformation of bone creates electric polarization:
  - **Negative ions (-)** at concave/compression sites -> **Bone Deposition (Osteoblasts)**!
  - **Positive ions (+)** at convex/tension sites -> **Bone Resorption (Osteoclasts)**!
* **The 6 Craniofacial Growth Theories**:
  1. **Genetic Theory**: Growth is strictly predetermined by intrinsic genetic factors.
  2. **Sicher's Theory (Sutural)**: Sutures of the craniofacial complex are primary growth centers driving bone expansion.
  3. **Scott's Theory (Cartilage / Nasal Septum)**: Cartilage is the primary pacemaker (nasal septum drives maxilla; condylar cartilage drives mandible).
  4. **Moss' Theory (Functional Matrix Hypothesis)**: Bone and cartilage have NO innate growth potential; growth is entirely a secondary, compensatory response to functional matrices (brain, eyes, tongue, airway, mastication).
  5. **Van Limborg's Theory**: Comprehensive synthesis incorporating genetic, cartilaginous, and functional matrix controls.
  6. **Petrovic's Theory (Servosystem)**: Cybernetic feedback loops and hormonal inputs regulate condylar cartilage growth.
* **Cranial Base Synchondroses Closure Sequence (Essential Board Timeline)**:
  - **Intersphenoidal synchondrosis**: Closes **at birth**.
  - **Intraoccipital synchondrosis**: Closes at **3–5 years old**.
  - **Spheno-ethmoidal synchondrosis**: Closes at **6–7 years old**.
  - **Spheno-occipital synchondrosis**: Closes at **18–20 years old** (the primary cranial base growth site that remains active into late adolescence!).
`;

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("pb_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pb_theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    sound.playClick();
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // LocalStorage state initialization
  const [girlfriendName, setGirlfriendName] = useState(() => {
    return localStorage.getItem("pb_name") || "Leane";
  });

  const [examDate, setExamDate] = useState(() => {
    const saved = localStorage.getItem("pb_date");
    if (!saved || saved === "2026-11-25" || saved === "2026-11-20") {
      localStorage.setItem("pb_date", "2026-11-22");
      return "2026-11-22";
    }
    return saved;
  });

  const [personalMessage, setPersonalMessage] = useState(() => {
    return localStorage.getItem("pb_msg") || "Hi Leane! I have watched how hard and dedicated you are every single day. The board exam doesn't stand a chance against you. The license already has your name on it, Dr. Leane! Made with all my love by Angelo 💖";
  });

  const [passingScore, setPassingScore] = useState(() => {
    return Number(localStorage.getItem("pb_passing")) || 75;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("pb_sound") !== "false";
  });

  const DENTAL_VERSION = "dle_v10_rich_clinical_rationales";

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
  });

  const [examHistory, setExamHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("pb_history");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem("pb_flagged");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("pb_notes");
    if (!saved || !saved.includes("Craniofacial Growth")) {
      localStorage.setItem("pb_notes", DEFAULT_NOTES);
      return DEFAULT_NOTES;
    }
    return saved;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("pb_streak")) || 1;
  });

  const [currentTab, setCurrentTab] = useState("dashboard");
  const [bookTargetPage, setBookTargetPage] = useState(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isZenOpen, setIsZenOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [mockDay, setMockDay] = useState("all");

  // Calculate unlocked milestone love chests count
  const unlockedRewardsCount = MILESTONES.filter(m => m.checkUnlock({
    streak,
    examHistory,
    flaggedQuestions
  })).length;

  // Cloud Sync State (Cross-Device Sync between Laptop and iPad)
  const [syncStatus, setSyncStatus] = useState("synced"); // 'synced' | 'syncing' | 'offline'
  const [lastSyncTime, setLastSyncTime] = useState(() => localStorage.getItem("pb_sync_updated_at") || null);
  const [syncDevice, setSyncDevice] = useState(() => localStorage.getItem("pb_sync_last_device") || getDeviceName());
  const [syncToast, setSyncToast] = useState(null);

  const showToast = (message, type = "success") => {
    setSyncToast({ message, type });
    setTimeout(() => setSyncToast(null), 3600);
  };

  const triggerCloudSync = () => {
    setSyncStatus("syncing");
    scheduleAutoSync(({ success }) => {
      if (success) {
        setSyncStatus("synced");
        setLastSyncTime(new Date().toISOString());
      } else {
        setSyncStatus("offline");
      }
    });
  };

  const handleManualSync = async (forcePush = false) => {
    setSyncStatus("syncing");
    try {
      if (forcePush) {
        const res = await saveCloudProfile();
        setSyncStatus("synced");
        setLastSyncTime(res.updatedAt);
        setSyncDevice(res.device);
        showToast("Device progress uploaded to cloud! 🚀", "success");
        return;
      }

      const cloudData = await fetchCloudProfile();
      if (cloudData) {
        const localProfile = {
          streak,
          lastLogin: localStorage.getItem("pb_last_login"),
          examHistory,
          flaggedQuestions,
          notes,
          settings: { girlfriendName, examDate, personalMessage, passingScore, theme }
        };
        const merged = mergeProfiles(localProfile, cloudData);

        if (merged.streak !== streak) setStreak(merged.streak);
        if (JSON.stringify(merged.examHistory) !== JSON.stringify(examHistory)) setExamHistory(merged.examHistory);
        if (JSON.stringify(merged.flaggedQuestions) !== JSON.stringify(flaggedQuestions)) setFlaggedQuestions(merged.flaggedQuestions);
        if (merged.notes && merged.notes !== notes) setNotes(merged.notes);

        if (merged.settings) {
          if (merged.settings.girlfriendName && merged.settings.girlfriendName !== girlfriendName) setGirlfriendName(merged.settings.girlfriendName);
          if (merged.settings.examDate && merged.settings.examDate !== examDate) setExamDate(merged.settings.examDate);
          if (merged.settings.personalMessage && merged.settings.personalMessage !== personalMessage) setPersonalMessage(merged.settings.personalMessage);
          if (merged.settings.passingScore && merged.settings.passingScore !== passingScore) setPassingScore(merged.settings.passingScore);
          if (merged.settings.theme && merged.settings.theme !== theme) setTheme(merged.settings.theme);
        }

        // Notify GoodNotes to reload notebooks from updated localStorage
        window.dispatchEvent(new CustomEvent("pb_cloud_synced"));

        await saveCloudProfile();
        setSyncStatus("synced");
        setLastSyncTime(new Date().toISOString());
        setSyncDevice(cloudData.device || getDeviceName());
        showToast(`Synced with ${cloudData.device || "iPad/Laptop"}! ☁️`, "success");
      } else {
        await saveCloudProfile();
        setSyncStatus("synced");
        setLastSyncTime(new Date().toISOString());
        showToast("Cloud backup active! ☁️", "success");
      }
    } catch (err) {
      console.warn("Sync warning:", err);
      setSyncStatus("offline");
      showToast("Working in local mode. Saved locally.", "warning");
    }
  };

  // Mount effect: Auto-sync on startup & visibility change (when unlocking iPad or returning to tab)
  useEffect(() => {
    handleManualSync();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleManualSync();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onTriggerSync = () => {
      triggerCloudSync();
    };
    window.addEventListener("pb_trigger_sync", onTriggerSync);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pb_trigger_sync", onTriggerSync);
    };
  }, []);

  // Sync sound setting
  useEffect(() => {
    sound.enabled = soundEnabled;
    localStorage.setItem("pb_sound", String(soundEnabled));
  }, [soundEnabled]);

  // Sync streak on daily visit
  useEffect(() => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem("pb_last_login");

    if (lastLogin !== today) {
      if (lastLogin) {
        const lastDate = new Date(lastLogin);
        const diffDays = Math.round((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          const nextStreak = streak + 1;
          setStreak(nextStreak);
          localStorage.setItem("pb_streak", String(nextStreak));
          triggerCloudSync();
        } else if (diffDays > 1) {
          setStreak(1);
          localStorage.setItem("pb_streak", "1");
          triggerCloudSync();
        }
      }
      localStorage.setItem("pb_last_login", today);
    }
  }, []);

  // Save changes handler
  const handleSaveSettings = (settings) => {
    setGirlfriendName(settings.girlfriendName);
    setExamDate(settings.examDate);
    setPersonalMessage(settings.personalMessage);
    setPassingScore(settings.passingScore);

    localStorage.setItem("pb_name", settings.girlfriendName);
    localStorage.setItem("pb_date", settings.examDate);
    localStorage.setItem("pb_msg", settings.personalMessage);
    localStorage.setItem("pb_passing", String(settings.passingScore));
    triggerCloudSync();
  };

  // Flag toggle handler
  const handleToggleFlag = (qId) => {
    setFlaggedQuestions(prev => {
      const exists = prev.includes(qId);
      const updated = exists ? prev.filter(id => id !== qId) : [...prev, qId];
      localStorage.setItem("pb_flagged", JSON.stringify(updated));
      triggerCloudSync();
      return updated;
    });
  };

  // Exam result handler
  const handleSaveExamResult = (result) => {
    setExamHistory(prev => {
      const updated = [result, ...prev];
      localStorage.setItem("pb_history", JSON.stringify(updated));
      triggerCloudSync();
      return updated;
    });
  };

  // Question bank handlers
  const handleAddQuestion = (newQ) => {
    setQuestions(prev => {
      const updated = [newQ, ...prev];
      localStorage.setItem("pb_questions", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteQuestion = (qId) => {
    setQuestions(prev => {
      const updated = prev.filter(q => q.id !== qId);
      localStorage.setItem("pb_questions", JSON.stringify(updated));
      return updated;
    });
  };

  const handleImportQuestions = (imported) => {
    setQuestions(imported);
    localStorage.setItem("pb_questions", JSON.stringify(imported));
  };

  const handleResetQuestions = () => {
    if (confirm("Reset question bank back to standard board exam curriculum?")) {
      setQuestions(defaultQuestions);
      setFlaggedQuestions([]);
      localStorage.setItem("pb_questions", JSON.stringify(defaultQuestions));
      localStorage.removeItem("pb_flagged");
      triggerCloudSync();
      sound.playSuccess();
    }
  };

  const handleResetAllProgress = async () => {
    if (confirm("Reset all study progress (streak, exam history, flagged questions, and love chest rewards) to a fresh Day 1 start for Dr. Leane?")) {
      localStorage.setItem("pb_streak", "1");
      localStorage.setItem("pb_last_login", new Date().toDateString());
      localStorage.removeItem("pb_history");
      localStorage.removeItem("pb_flagged");
      localStorage.removeItem("pb_redeemed_milestones");

      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith("leane_sticky_")) {
          localStorage.removeItem(k);
        }
      }

      setStreak(1);
      setExamHistory([]);
      setFlaggedQuestions([]);

      localStorage.removeItem("leane_notes_notebooks");
      window.dispatchEvent(new CustomEvent("pb_cloud_synced"));

      setSyncStatus("syncing");
      try {
        const freshProfile = {
          streak: 1,
          lastLogin: new Date().toDateString(),
          examHistory: [],
          flaggedQuestions: [],
          notes,
          redeemedRewards: {},
          settings: { girlfriendName, examDate, personalMessage, passingScore, theme }
        };
        await saveCloudProfile(freshProfile);
        setSyncStatus("synced");
        setLastSyncTime(new Date().toISOString());
        showToast("Reviewer progress reset to Day 1! Fresh start active 🌸", "success");
      } catch (e) {
        showToast("Progress reset locally.", "warning");
      }

      sound.playSuccess();
    }
  };

  const handleSaveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("pb_notes", newNotes);
    triggerCloudSync();
  };

  // Days left calculation
  const targetTime = new Date(examDate).getTime();
  const now = new Date().getTime();
  const daysLeft = Math.max(0, Math.ceil((targetTime - now) / (1000 * 60 * 60 * 24)));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar
        girlfriendName={girlfriendName}
        daysLeft={daysLeft}
        streak={streak}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        syncStatus={syncStatus}
        onManualSync={handleManualSync}
        lastSyncTime={lastSyncTime}
        onOpenRewards={() => setIsRewardsOpen(true)}
        unlockedRewardsCount={unlockedRewardsCount}
        onOpenZen={() => setIsZenOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1 }}>
        {currentTab === "dashboard" && (
          <Dashboard
            girlfriendName={girlfriendName}
            examDate={examDate}
            personalMessage={personalMessage}
            questions={questions}
            examHistory={examHistory}
            flaggedCount={flaggedQuestions.length}
            streak={streak}
            passingScore={passingScore}
            onStartMode={(mode, day) => {
              if (day) setMockDay(day);
              setCurrentTab(mode);
            }}
            onOpenRewards={() => setIsRewardsOpen(true)}
            unlockedRewardsCount={unlockedRewardsCount}
            onOpenSchedule={() => setIsScheduleOpen(true)}
          />
        )}

        {currentTab === "drills" && (
          <QuickDrills
            girlfriendName={girlfriendName}
          />
        )}

        {currentTab === "practice" && (
          <PracticeMode
            questions={questions}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            girlfriendName={girlfriendName}
          />
        )}

        {currentTab === "goodnotes" && (
          <GoodNotes
            girlfriendName={girlfriendName}
            theme={theme}
          />
        )}

        {currentTab === "mock" && (
          <MockExam
            questions={questions}
            passingScore={passingScore}
            girlfriendName={girlfriendName}
            initialDay={mockDay}
            onSaveExamResult={handleSaveExamResult}
            onToggleFlag={handleToggleFlag}
            flaggedQuestions={flaggedQuestions}
            onExit={() => setCurrentTab("dashboard")}
          />
        )}

        {currentTab === "flashcards" && (
          <Flashcards
            questions={questions}
            girlfriendName={girlfriendName}
          />
        )}

        {currentTab === "weakness" && (
          <WeaknessFocus
            questions={questions}
            flaggedQuestions={flaggedQuestions}
            onToggleFlag={handleToggleFlag}
            girlfriendName={girlfriendName}
          />
        )}

        {currentTab === "bank" && (
          <QuestionBank
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onImportQuestions={handleImportQuestions}
            onResetQuestions={handleResetQuestions}
          />
        )}

        {currentTab === "book" && (
          <BookReader
            girlfriendName={girlfriendName}
            initialPage={bookTargetPage}
            onOpenCheatSheet={() => setCurrentTab("notes")}
          />
        )}

        {currentTab === "notes" && (
          <NotesCheatSheet
            girlfriendName={girlfriendName}
            notes={notes}
            onSaveNotes={handleSaveNotes}
            onSelectTab={setCurrentTab}
            onNavigateToBookPage={(page) => {
              setBookTargetPage(page);
              setCurrentTab("book");
            }}
          />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        girlfriendName={girlfriendName}
        examDate={examDate}
        personalMessage={personalMessage}
        passingScore={passingScore}
        onSave={handleSaveSettings}
        onResetData={handleResetQuestions}
        onResetAllProgress={handleResetAllProgress}
        syncStatus={syncStatus}
        lastSyncTime={lastSyncTime}
        syncDevice={syncDevice}
        onManualSync={handleManualSync}
      />

      {/* Milestone Rewards & Love Chests Modal */}
      <MilestoneRewards
        isOpen={isRewardsOpen}
        onClose={() => setIsRewardsOpen(false)}
        stats={{ streak, examHistory, flaggedQuestions }}
        girlfriendName={girlfriendName}
      />

      {/* Emergency Zen Anti-Panic Breathing Modal */}
      <ZenAntiPanicModal
        isOpen={isZenOpen}
        onClose={() => setIsZenOpen(false)}
        girlfriendName={girlfriendName}
        stats={{ streak, examHistory }}
      />

      {/* Official PRC DLE Program & Examination Schedule Modal */}
      <PRCScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onNavigateToBook={(pageNum) => {
          setBookTargetPage(pageNum);
          setCurrentTab("book");
        }}
        girlfriendName={girlfriendName}
      />

      {/* Pomodoro Study Station & Ambient Synthesizer Dock */}
      <StudyStation />

      {/* Floating Cloud Sync Notification Toast */}
      {syncToast && (
        <div className={`sync-toast ${syncToast.type}`}>
          <span>{syncToast.message}</span>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border-color)",
        background: "var(--footer-bg)",
        padding: "1.25rem 1.5rem",
        textAlign: "center",
        fontSize: "0.85rem",
        color: "var(--text-muted)"
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span>PassBoard ✨ Dedicated Dentist Licensure Exam Reviewer</span>
          <span>Made with all my love by <strong>Angelo</strong> for <strong style={{ color: "var(--accent-rose)" }}>{girlfriendName}</strong> • Future Topnotcher! 🦷💜🎓</span>
        </div>
      </footer>
    </div>
  );
}