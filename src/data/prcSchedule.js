// Philippine Dental Licensure Examination (DLE) Official Schedule & GWA Engine
// Regulated by the PRC Professional Regulatory Board of Dentistry (RA 9484)

export const PRC_DAYS = {
  day1: {
    id: "day1",
    name: "PRC Day 1: Basic Medical & Biological Sciences",
    shortName: "Day 1 (Basic Sciences)",
    weight: 0.20, // 20% of GWA
    categories: [
      "General Anatomy & Physiology",
      "General Histology & Microbiology",
      "General Pathology"
    ],
    description: "Cranial nerves, muscle origins/insertions, systemic physiology, inflammation, and bacteriology."
  },
  day2: {
    id: "day2",
    name: "PRC Day 2: Pre-Clinical Sciences & Dental Tissues",
    shortName: "Day 2 (Dental Tissues)",
    weight: 0.30, // 30% of GWA
    categories: [
      "Oral Anatomy & Occlusion",
      "Oral Histology & Embryology",
      "Oral Pathology & Diagnosis",
      "Pharmacology & Anesthesiology"
    ],
    description: "Tooth morphology, pulp biology, odontogenesis, local anesthetics (Malamed), and oral lesions."
  },
  day3: {
    id: "day3",
    name: "PRC Day 3: Clinical Dentistry & Public Health",
    shortName: "Day 3 (Clinical Dentistry)",
    weight: 0.50, // 50% of GWA
    categories: [
      "Restorative Dentistry",
      "Orthodontics & Pediatric Dentistry",
      "Practice Management & Jurisprudence",
      "Community Dentistry"
    ],
    description: "G.V. Black cavity prep, dental materials, cephalometrics, primary dentition, and RA 9484."
  }
};

/**
 * Calculates projected PRC General Weighted Average (GWA) from exam history
 * Requirements under Philippine RA 9484:
 * 1. Overall GWA must be >= 75.0%
 * 2. No individual day or subject rating below 50.0%
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

  // GWA weighted according to official PRC weights: 20% Day 1, 30% Day 2, 50% Day 3
  const gwa = Number(((day1Score * 0.20) + (day2Score * 0.30) + (day3Score * 0.50)).toFixed(1));
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

