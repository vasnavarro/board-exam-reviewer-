// Philippine Dental Licensure Examination (DLE) Official Schedule & GWA Engine
// Regulated by the PRC Professional Regulatory Board of Dentistry (RA 9484)
// Official Written Phase Program: November 22, 23 and 24, 2026

export const PRC_OFFICIAL_PROGRAM = {
  commission: "Professional Regulation Commission Manila",
  board: "Professional Regulatory Board of Dentistry",
  title: "Program of the Dentists Licensure Examination (Written Phase)",
  examDates: "November 22, 23 and 24, 2026",
  totalWeight: 100,
  passingGwa: 75.0,
  minimumSubjectGrade: 50.0,
  generalInstructions: [
    "Check or verify your school/building assignments at the official PRC website (www.prc.gov.ph).",
    "Report to the school/building assignment before 6:30 a.m. on the first day of examination to verify your room and seat number. Be punctual. Late examinees will not be admitted.",
    "Examinees are required to wear their school uniform per Resolution No. 311 dated May 18, 1994."
  ],
  days: [
    {
      id: "day1",
      dayNumber: 1,
      dateString: "Sunday, November 22, 2026",
      shortDate: "Nov 22 (Sun)",
      dayTitle: "General & Oral Sciences, Restorative & Public Health",
      totalDayWeight: 40, // 15% + 15% + 10%
      icon: "🔬",
      slots: [
        {
          time: "7:00 A.M. – 7:45 A.M.",
          subject: "General Instructions and Filling out of Forms",
          weight: 0,
          description: "Verification of examinee IDs, PRC notice of admission, and filling out of official examination forms."
        },
        {
          time: "8:00 A.M. – 10:00 A.M.",
          subject: "General and Oral Anatomy and Physiology",
          weight: 15,
          categories: ["General Anatomy & Physiology", "Oral Anatomy & Occlusion"],
          dmfChapters: [
            { title: "General Anatomy, Physiology, and Histology", pages: "p. 1–33", startPage: 1 },
            { title: "Oral Anatomy, Physiology & Occlusion", pages: "p. 85–91", startPage: 85 }
          ],
          description: "Gross head & neck anatomy, cranial nerves, circulatory & nervous systems, systemic organ physiology, tooth morphology, and occlusion."
        },
        {
          time: "11:00 A.M. – 1:00 P.M.",
          subject: "General and Oral Pathology, General and Oral Microscopic Anatomy and Embryology and Microbiology",
          weight: 15,
          categories: ["General Pathology", "General Histology & Microbiology", "Oral Histology & Embryology", "Oral Pathology & Diagnosis"],
          dmfChapters: [
            { title: "General Pathology and Microbiology", pages: "p. 34–56", startPage: 34 },
            { title: "Oral Pathology", pages: "p. 153–176", startPage: 153 },
            { title: "Cells and Tissues (General Anatomy & Histology)", pages: "p. 286–313", startPage: 286 },
            { title: "High-Yield Visual Cheat Sheets (Embryology, Odontogenesis, Histology)", pages: "p. 314–318", startPage: 314 }
          ],
          description: "Cell injury, acute/chronic inflammation, systemic & oral neoplasms, cysts, bacteriology, virology, mycology, immunology, and microscopic tissue histology."
        },
        {
          time: "2:00 P.M. – 4:00 P.M.",
          subject: "Restorative Dentistry, Community Dentistry and Public Health",
          weight: 10,
          categories: ["Restorative Dentistry", "Community Dentistry"],
          dmfChapters: [
            { title: "Restorative Dentistry", pages: "p. 137–152", startPage: 137 },
            { title: "Community Dentistry", pages: "p. 261–285", startPage: 261 }
          ],
          description: "G.V. Black cavity preparation, caries management, restorative composite/amalgam, bonding agents, epidemiology, indices (DMFT), and public health administration."
        }
      ]
    },
    {
      id: "day2",
      dayNumber: 2,
      dateString: "Monday, November 23, 2026",
      shortDate: "Nov 23 (Mon)",
      dayTitle: "Prosthodontics, Materials, Surgery & Pharmacology",
      totalDayWeight: 30, // 10% + 10% + 10%
      icon: "🦷",
      slots: [
        {
          time: "8:00 A.M. – 10:00 A.M.",
          subject: "Fixed, Removable Partial, Complete Denture Prosthodontics and Dental Materials",
          weight: 10,
          categories: ["Dental Materials"],
          dmfChapters: [
            { title: "Dental Materials", pages: "p. 114–136", startPage: 114 }
          ],
          description: "Gypsum products, impression materials (alginate, elastomeric), dental cements, composite resins, dental alloys, RPD design, and complete denture mechanics."
        },
        {
          time: "11:00 A.M. – 1:00 P.M.",
          subject: "Roentgenology, Oral Diagnosis and Oral Surgery",
          weight: 10,
          categories: ["Oral Surgery", "Oral Radiology & Roentgenology"],
          dmfChapters: [
            { title: "Oral Radiology", pages: "p. 177–198", startPage: 177 },
            { title: "Oral Surgery", pages: "p. 199–211", startPage: 199 }
          ],
          description: "X-ray physics, radiation biology, intraoral/panoramic landmarks, radiological artifacts, surgical exodontia, impactions, biopsying, and maxillofacial trauma."
        },
        {
          time: "2:00 P.M. – 4:00 P.M.",
          subject: "Anesthesiology and Pharmacology",
          weight: 10,
          categories: ["Pharmacology & Anesthesiology"],
          dmfChapters: [
            { title: "Pharmacology & Local Anesthesia", pages: "p. 57–84", startPage: 57 }
          ],
          description: "Local anesthetics (esters vs amides), Malamed nerve block techniques, vasoconstrictor limits, analgesics (NSAIDs/opioids), antibiotics, ANS pharmacology, and emergency drugs."
        }
      ]
    },
    {
      id: "day3",
      dayNumber: 3,
      dateString: "Tuesday, November 24, 2026",
      shortDate: "Nov 24 (Tue)",
      dayTitle: "Pediatric, Orthodontics, Jurisprudence, Perio & Endo",
      totalDayWeight: 30, // 10% + 10% + 10%
      icon: "⚖️",
      slots: [
        {
          time: "8:00 A.M. – 10:00 A.M.",
          subject: "Pediatric Dentistry and Orthodontics",
          weight: 10,
          categories: ["Orthodontics & Pediatric Dentistry"],
          dmfChapters: [
            { title: "Orthodontics & Growth Development", pages: "p. 92–101", startPage: 92 },
            { title: "Pediatric Dentistry", pages: "p. 102–113", startPage: 102 }
          ],
          description: "Primary dentition eruption chronology, behavior guidance (Frankl scale), pulp therapy in children, space maintainers, Angle classifications, and cephalometrics."
        },
        {
          time: "11:00 A.M. – 1:00 P.M.",
          subject: "Dental Jurisprudence and Ethics and Practice Management",
          weight: 10,
          categories: ["Practice Management & Jurisprudence"],
          dmfChapters: [
            { title: "Dental Jurisprudence", pages: "p. 241–260", startPage: 241 }
          ],
          description: "Republic Act No. 9484 (Philippine Dental Act of 2007), PRC Dental Code of Ethics, legal liabilities, malpractice, consent, and clinic practice management."
        },
        {
          time: "2:00 P.M. – 4:00 P.M.",
          subject: "Periodontics and Endodontics",
          weight: 10,
          categories: ["Periodontics", "Endodontics"],
          dmfChapters: [
            { title: "Endodontics", pages: "p. 212–224", startPage: 212 },
            { title: "Periodontics", pages: "p. 225–240", startPage: 225 }
          ],
          description: "Periodontal pathogenesis, gingivitis vs periodontitis, surgical/non-surgical therapy, pulp testing, canal preparation, obturation, and periapical pathology."
        }
      ]
    }
  ]
};

export const PRC_DAYS = {
  day1: {
    id: "day1",
    name: "PRC Day 1: General & Oral Sciences, Restorative & Community (40%)",
    shortName: "Day 1 (40% Weight)",
    weight: 0.40, // Official PRC Weight: 15% + 15% + 10% = 40%
    dateString: "Sunday, Nov 22, 2026",
    categories: [
      "General Anatomy & Physiology",
      "Oral Anatomy & Occlusion",
      "General Histology & Microbiology",
      "Oral Histology & Embryology",
      "General Pathology",
      "General Pathology & Microbiology",
      "Oral Pathology & Diagnosis",
      "Restorative Dentistry",
      "Community Dentistry",
      "Restorative Dentistry & Community Health"
    ],
    description: "Anatomy (15%), Pathology/Microbiology/Embryology (15%), and Restorative & Community Dentistry (10%)."
  },
  day2: {
    id: "day2",
    name: "PRC Day 2: Prosthodontics, Materials, Surgery & Pharmacology (30%)",
    shortName: "Day 2 (30% Weight)",
    weight: 0.30, // Official PRC Weight: 10% + 10% + 10% = 30%
    dateString: "Monday, Nov 23, 2026",
    categories: [
      "Dental Materials",
      "Prosthodontics & Dental Materials",
      "Oral Surgery",
      "Oral Radiology & Roentgenology",
      "Roentgenology, Oral Diagnosis & Oral Surgery",
      "Pharmacology & Anesthesiology"
    ],
    description: "Prosthodontics & Materials (10%), Radiology & Oral Surgery (10%), and Anesthesiology & Pharmacology (10%)."
  },
  day3: {
    id: "day3",
    name: "PRC Day 3: Pedia, Ortho, Jurisprudence, Perio & Endo (30%)",
    shortName: "Day 3 (30% Weight)",
    weight: 0.30, // Official PRC Weight: 10% + 10% + 10% = 30%
    dateString: "Tuesday, Nov 24, 2026",
    categories: [
      "Orthodontics & Pediatric Dentistry",
      "Practice Management & Jurisprudence",
      "Periodontics",
      "Endodontics",
      "Periodontics & Endodontics"
    ],
    description: "Pediatric Dentistry & Orthodontics (10%), Jurisprudence & Ethics (10%), and Periodontics & Endodontics (10%)."
  }
};

/**
 * Calculates projected PRC General Weighted Average (GWA) from exam history
 * Requirements under Philippine RA 9484 & PRC Board of Dentistry:
 * 1. Overall GWA must be >= 75.0%
 * 2. No individual day or subject rating below 50.0%
 * 3. Day 1 Weight = 40%, Day 2 Weight = 30%, Day 3 Weight = 30%
 */
export function calculatePRCGwa(examHistory = []) {
  if (!examHistory || examHistory.length === 0) {
    return {
      hasData: false,
      gwa: 75.0,
      day1Score: 75.0,
      day2Score: 75.0,
      day3Score: 75.0,
      isPassing: true,
      meetsThresholds: true,
      safetyBuffer: 0.0
    };
  }

  // Calculate day-specific performance from exams
  let day1Scores = [];
  let day2Scores = [];
  let day3Scores = [];
  let generalScores = [];

  examHistory.forEach(exam => {
    const score = Number(exam.scorePercent || exam.score || 0);
    if (exam.simulationDay === "day1") day1Scores.push(score);
    else if (exam.simulationDay === "day2") day2Scores.push(score);
    else if (exam.simulationDay === "day3") day3Scores.push(score);
    else generalScores.push(score);
  });

  const avg = (arr, fallback) => arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length) : fallback;

  // Use general exam average as baseline if day-specific exam not yet taken
  const baseAvg = avg(generalScores, 75.0);
  const day1Score = Math.round(avg(day1Scores, baseAvg));
  const day2Score = Math.round(avg(day2Scores, baseAvg));
  const day3Score = Math.round(avg(day3Scores, baseAvg));

  // GWA weighted according to official PRC weights: 40% Day 1, 30% Day 2, 30% Day 3
  const gwa = Number(((day1Score * 0.40) + (day2Score * 0.30) + (day3Score * 0.30)).toFixed(1));
  const meetsThresholds = day1Score >= 50 && day2Score >= 50 && day3Score >= 50;
  const isPassing = gwa >= 75.0 && meetsThresholds;
  const safetyBuffer = Number((gwa - 75.0).toFixed(1));

  return {
    hasData: true,
    gwa,
    day1Score,
    day2Score,
    day3Score,
    isPassing,
    meetsThresholds,
    safetyBuffer
  };
}

export const DSP_PRACTICAL_SCHEDULE = {
  title: "Dr. Leane's DSP Practical & Evening DLE Sprint",
  subtitle: "Designed specifically for Dr. Leane's 8:00 AM – 5:00 PM DSP Practical School",
  schoolHours: "8:00 AM – 5:00 PM (Monday to Friday)",
  description: "Dr. Leane is attending DSP (Dental Specialists Practical School) every day from 8:00 AM to 5:00 PM. Practical manual skills (cavity preparation, crown prep margins, typodonts, endo access, complete denture waxing) require intense hand-eye coordination. Theoretical DLE board review is concentrated into a high-efficiency 3.5-hour evening sprint (6:30 PM – 10:15 PM) to prevent physical burnout while ensuring 100% board mastery.",
  dailyRoutine: [
    {
      time: "8:00 AM – 5:00 PM",
      label: "DSP Practical School (Hands-On Training)",
      icon: "🦷",
      badge: "In-Person DSP",
      color: "#a855f7",
      details: "Focus 100% on motor skills: Class II cavity preps, Full Veneer/PFM crown margins, MOD onlays, typodont setup, and endo access. Zero theory stress during practical hours!"
    },
    {
      time: "5:00 PM – 6:30 PM",
      label: "Commute Home, Hot Shower & Dinner with Angelo",
      icon: "🍲",
      badge: "Decompress & Reset",
      color: "#ec4899",
      details: "Mental reset! Hot shower, physical relaxation, delicious nutritious dinner with Angelo, zero study pressure. Essential for cognitive recovery."
    },
    {
      time: "6:30 PM – 8:00 PM",
      label: "Evening Block 1: High-Yield Practice Drills (90 mins)",
      icon: "⚡",
      badge: "50 Qs Sprint",
      color: "#3b82f6",
      details: "50 targeted CEU Revalida questions on the designated PRC subject. Immediate feedback with rich clinical rationales."
    },
    {
      time: "8:00 PM – 8:15 PM",
      label: "Rest & Wrist / Hand Stretches (15 mins)",
      icon: "🧘‍♀️",
      badge: "Body Care",
      color: "#10b981",
      details: "Hydration break and forearm/wrist extensor stretches to relieve handpiece muscle strain from 8 hours at DSP."
    },
    {
      time: "8:15 PM – 9:45 PM",
      label: "Evening Block 2: LeaneNotes Review & Weakness Focus (90 mins)",
      icon: "📓",
      badge: "Active Recall",
      color: "#f59e0b",
      details: "Deep dive into missed questions and review High-Yield Visual Cheat Sheets (General Embryology, Odontogenesis, Oral Histology)."
    },
    {
      time: "9:45 PM – 10:15 PM",
      label: "Evening Block 3: Bedtime Dental Decks (30 mins)",
      icon: "🃏",
      badge: "Bedtime Recall",
      color: "#8b5cf6",
      details: "Passive spaced-repetition flashcards in bed. Low cognitive strain, high memory consolidation before sleep."
    },
    {
      time: "10:15 PM – 10:30 PM",
      label: "Love Chests, Angelo's Notes & Sleep by 10:30 PM",
      icon: "💜",
      badge: "Restful Sleep",
      color: "#d8b4fe",
      details: "Unlock love milestones and wind down. Minimum 7.5 hours of sleep to wake up refreshed for 8:00 AM DSP practicals!"
    }
  ],
  twelveDayCountdown: [
    { day: 12, date: "Nov 11 (Wed)", subject: "PRC Day 1: General & Oral Anatomy", questions: "CEU Revalida Qs 1–50", focus: "Cranial nerves, head & neck fascia, tongue muscles, tooth morphology" },
    { day: 11, date: "Nov 12 (Thu)", subject: "PRC Day 1: Histology, Embryo & Pathology", questions: "CEU Revalida Qs 51–100", focus: "Odontogenesis, cell organelles, cysts, neoplasms, Peutz-Jeghers, McCune-Albright" },
    { day: 10, date: "Nov 13 (Fri)", subject: "PRC Day 1: Restorative & Community Health", questions: "CEU Revalida Qs 101–150", focus: "G.V. Black preps, bevels, C-factor, bonding agents, ICDAS, DMFT, fluoride" },
    { day: 9, date: "Nov 14 (Sat)", subject: "Weekend Mock: PRC Day 1 Full Simulation", questions: "100-Question Simulated Exam", focus: "PRC Day 1 Simulation Exam (1:30 PM – 5:30 PM) to test speed and stamina" },
    { day: 8, date: "Nov 15 (Sun)", subject: "PRC Day 2: Prosthodontics & Materials", questions: "CEU Revalida Qs 151–200", focus: "Gypsum, alginates, elastomeric impressions, RPD design, complete dentures" },
    { day: 7, date: "Nov 16 (Mon)", subject: "PRC Day 2: Oral Surgery & Radiology", questions: "CEU Revalida Qs 201–250", focus: "Extraction forceps, impaction classes, flaps, radiation biology, landmarks" },
    { day: 6, date: "Nov 17 (Tue)", subject: "PRC Day 2: Anesthesiology & Pharmacology", questions: "CEU Revalida Qs 251–300", focus: "Amide/ester LAs, MRDs, epinephrine, antibiotics, NSAIDs, emergency drugs" },
    { day: 5, date: "Nov 18 (Wed)", subject: "PRC Day 3: Pedodontics & Orthodontics", questions: "CEU Revalida Qs 301–350", focus: "Angle's classification, cephalometrics, primate space, leeway space, habits" },
    { day: 4, date: "Nov 19 (Thu)", subject: "PRC Day 3: Periodontics & Endodontics", questions: "CEU Revalida Qs 351–400", focus: "Red complex pathogens, flap surgery, pulp testing, canal prep, obturation" },
    { day: 3, date: "Nov 20 (Fri)", subject: "PRC Day 3: Jurisprudence & Dental Ethics", questions: "CEU Revalida Qs 401–450", focus: "RA 9484, PRC Code of Ethics, waste management, malpractice, dental contracts" },
    { day: 2, date: "Nov 21 (Sat)", subject: "Final Polish & Pack PRC Exam Bag", questions: "Light Dental Decks only", focus: "Pack NOA, pencils, uniform. Zero cramming! Dinner with Angelo and early sleep." },
    { day: 1, date: "Nov 22 (Sun)", subject: "🎉 PRC DLE WRITTEN EXAM DAY 1!", questions: "Official Board Exam", focus: "General & Oral Anatomy (8 AM), Pathology & Micro (11 AM), Resto (2 PM). You got this Doc Leane!" }
  ]
};

