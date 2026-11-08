const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("=== BUILDING COMPREHENSIVE DENTAL DECKS DATASET ===");

function extractVar(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*(\\[[\\s\\S]*?\\]);\\s*(?:let|const|var|function|<)`, 'm');
  let match = content.match(regex);
  if (!match) {
    const altRegex = new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*(\\[[\\s\\S]*?\\]);`, 'm');
    match = content.match(altRegex);
  }
  if (!match) throw new Error(`Could not find ${varName} in ${filePath}`);
  return vm.runInNewContext(`(() => ${match[1]})()`);
}

// 1. Radiology (65 cards)
const rawRad = extractVar('/tmp/tokki-s-board-prep/decks/radiology.html', 'deckData');
const radCards = rawRad.map((c, idx) => ({
  id: `deck-rad-${String(idx + 1).padStart(3, '0')}`,
  deckId: 'radiology',
  deckName: 'Oral Radiology (2017 Decks)',
  category: c.category || 'Radiology',
  front: c.front || '',
  answer: c.answer || '',
  rationale: c.rationale || '',
  type: 'dental-deck'
}));

// 2. Testlets Part 1 (100 cards)
const rawTestlet = extractVar('/tmp/tokki-s-board-prep/decks/testlet-part1.html', 'deckData');
const testletCards = rawTestlet.map((c, idx) => ({
  id: `deck-testlet-${String(idx + 1).padStart(3, '0')}`,
  deckId: 'testlets',
  deckName: 'Clinical Testlets Part 1',
  category: c.category || 'Case Testlet',
  front: c.front || '',
  answer: c.answer || '',
  rationale: c.rationale || '',
  type: 'testlet'
}));

// 3. Oral Surgery & Anesthesia (102 cards)
const rawSurg = extractVar('/tmp/tokki-s-board-prep/decks/mock-exam-surgery.html', 'deckData');
const surgCards = rawSurg.map((c, idx) => {
  let frontText = c.front || '';
  if (c.options && !frontText.includes(c.options)) {
    frontText += `<br><br><div class="deck-options">${c.options}</div>`;
  }
  return {
    id: `deck-surg-${String(idx + 1).padStart(3, '0')}`,
    deckId: 'surgery',
    deckName: 'Oral Surgery & Anesthesia',
    category: c.category || 'Oral Surgery',
    front: frontText,
    rawOptions: c.options || '',
    answer: c.answer || '',
    rationale: c.rationale || '',
    type: 'dental-deck'
  };
});

// 4. Glossary (42 terms)
const rawGloss = extractVar('/tmp/tokki-s-board-prep/glossary.html', 'glossaryData');
const glossCards = rawGloss.map((g, idx) => ({
  id: `deck-gloss-${String(idx + 1).padStart(3, '0')}`,
  deckId: 'glossary',
  deckName: 'High-Yield Dental Glossary',
  category: 'Terminology',
  front: `<div style="font-size: 1.4rem; font-weight: 800; text-align: center; color: #fbcfe8;">${g.term}</div><br><p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">What is the clinical definition, etiology, and significance?</p>`,
  term: g.term,
  answer: g.term,
  rationale: g.definition,
  type: 'glossary'
}));

// 5. 900 Global Question Bank from search.html
const rawGqb = extractVar('/tmp/tokki-s-board-prep/search.html', 'globalQuestionBank');

const BLOCK_INFOS = [
  { id: 'day1_block1', name: 'Day 1 Block 1: General & Oral Anatomy and Physiology', shortTitle: 'D1: Anatomy & Physio', day: 'Day 1 (8:00 AM – 10:00 AM • 15%)', icon: '🔬', color: '#ec4899', cat: 'Anatomy & Physiology' },
  { id: 'day1_block2', name: 'Day 1 Block 2: Pathology, Micro, Embryo & Histology', shortTitle: 'D1: Path & Micro', day: 'Day 1 (11:00 AM – 1:00 PM • 15%)', icon: '🦠', color: '#a855f7', cat: 'Pathology & Microbiology' },
  { id: 'day1_block3', name: 'Day 1 Block 3: Restorative & Community Dentistry', shortTitle: 'D1: Resto & Public Health', day: 'Day 1 (2:00 PM – 4:00 PM • 10%)', icon: '🪥', color: '#f43f5e', cat: 'Restorative & Community' },
  { id: 'day2_block1', name: 'Day 2 Block 1: Prosthodontics & Dental Materials', shortTitle: 'D2: Prostho & Materials', day: 'Day 2 (8:00 AM – 10:00 AM • 10%)', icon: '🧪', color: '#06b6d4', cat: 'Prostho & Materials' },
  { id: 'day2_block2', name: 'Day 2 Block 2: Roentgenology, Diagnosis & Oral Surgery', shortTitle: 'D2: Radiology & Surgery', day: 'Day 2 (11:00 AM – 1:00 PM • 10%)', icon: '☢️', color: '#3b82f6', cat: 'Roentgenology & Surgery' },
  { id: 'day2_block3', name: 'Day 2 Block 3: Anesthesiology & Pharmacology', shortTitle: 'D2: Anesthesia & Pharma', day: 'Day 2 (2:00 PM – 4:00 PM • 10%)', icon: '💊', color: '#10b981', cat: 'Anesthesia & Pharmacology' },
  { id: 'day3_block1', name: 'Day 3 Block 1: Pediatric Dentistry & Orthodontics', shortTitle: 'D3: Pedia & Ortho', day: 'Day 3 (8:00 AM – 10:00 AM • 10%)', icon: '👶', color: '#eab308', cat: 'Pediatric & Orthodontics' },
  { id: 'day3_block2', name: 'Day 3 Block 2: Dental Jurisprudence, Ethics & Practice', shortTitle: 'D3: Jurisprudence & Law', day: 'Day 3 (11:00 AM – 1:00 PM • 10%)', icon: '⚖️', color: '#f97316', cat: 'Jurisprudence & Ethics' },
  { id: 'day3_block3', name: 'Day 3 Block 3: Periodontics & Endodontics', shortTitle: 'D3: Perio & Endo', day: 'Day 3 (2:00 PM – 4:00 PM • 10%)', icon: '📍', color: '#8b5cf6', cat: 'Periodontics & Endodontics' }
];

const blockDecks = BLOCK_INFOS.map((bInfo, bIdx) => {
  const start = bIdx * 100;
  const end = start + 100;
  const blockQuestions = rawGqb.slice(start, end);
  
  const cards = blockQuestions.map((q, qIdx) => {
    const correctLetter = String.fromCharCode(65 + q.correct);
    const correctText = q.options[q.correct] || '';
    
    // Format front with choices
    const optionsHtml = q.options.map((opt, oIdx) => {
      const letter = String.fromCharCode(65 + oIdx);
      return `<div style="margin-bottom: 4px;"><strong>${letter}.</strong> ${opt}</div>`;
    }).join('');
    
    const frontText = `${q.question}<br><br><div style="background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">${optionsHtml}</div>`;
    const answerText = `Correct Answer: ${correctLetter}. ${correctText}`;
    
    return {
      id: `deck-${bInfo.id}-${String(qIdx + 1).padStart(3, '0')}`,
      deckId: bInfo.id,
      deckName: bInfo.name,
      category: bInfo.cat,
      front: frontText,
      options: q.options,
      correctIndex: q.correct,
      answer: answerText,
      rationale: q.rationale || '',
      type: 'prc-block'
    };
  });
  
  return {
    id: bInfo.id,
    name: bInfo.name,
    shortTitle: bInfo.shortTitle,
    icon: bInfo.icon,
    badge: bInfo.day,
    color: bInfo.color,
    description: `Official 100-card licensure exam deck covering ${bInfo.name}.`,
    totalCards: cards.length,
    cards: cards
  };
});

// Master Decks Array
const DENTAL_DECKS = [
  {
    id: 'testlets',
    name: 'Clinical Testlets Part 1',
    shortTitle: 'Clinical Testlets',
    icon: '🗂️',
    badge: 'Case Scenarios (100 Cards)',
    color: '#ec4899',
    description: '100 Case-based clinical scenario testlets with complete medical histories, patient examinations, radiographic findings, and diagnostic rationales.',
    totalCards: testletCards.length,
    cards: testletCards
  },
  {
    id: 'radiology',
    name: 'Oral Radiology (2017 Dental Decks)',
    shortTitle: 'Oral Radiology',
    icon: '☢️',
    badge: '2017 Dental Decks (65 Cards)',
    color: '#3b82f6',
    description: '65 Authentic 2017 Dental Decks covering radiation physics, anode/cathode target mechanics, image sharpness, dosimetry, landmarks, and radiographic pathology.',
    totalCards: radCards.length,
    cards: radCards
  },
  {
    id: 'surgery',
    name: 'Oral Surgery & Local Anesthesia',
    shortTitle: 'Surgery & Anesthesia',
    icon: '🩺',
    badge: 'Surgery & Anesthesia (102 Cards)',
    color: '#10b981',
    description: '102 High-yield flashcards covering local anesthetic pharmacology, rapid depolarization mechanisms, Malamed block techniques, exodontia, and complications.',
    totalCards: surgCards.length,
    cards: surgCards
  },
  {
    id: 'glossary',
    name: 'High-Yield Clinical Glossary',
    shortTitle: 'Dental Glossary',
    icon: '📖',
    badge: '42 Core Definitions',
    color: '#f59e0b',
    description: '42 Essential board-tested clinical terms, lesions, classifications, and principles with clear, memorable definitions.',
    totalCards: glossCards.length,
    cards: glossCards
  },
  ...blockDecks
];

const totalCardsCount = DENTAL_DECKS.reduce((acc, d) => acc + d.totalCards, 0);
console.log(`Successfully assembled ${DENTAL_DECKS.length} decks with ${totalCardsCount} total cards!`);

// Write to src/data/dentalDecksData.js
const fileOutput = `// Official Dental Decks & Clinical Flashcards Database
// Sourced from Angelo's Tokki Board Prep Project for Dr. Leane
// Includes 2017 Radiology Decks, Clinical Testlets, Oral Surgery Decks, Glossary & 9 PRC Exam Blocks

export const DENTAL_DECKS = ${JSON.stringify(DENTAL_DECKS, null, 2)};

export const ALL_DENTAL_DECK_CARDS = DENTAL_DECKS.flatMap(d => d.cards);

export const TOTAL_DENTAL_DECK_CARDS = ${totalCardsCount};

/**
 * Get a specific deck by ID
 */
export function getDeckById(deckId) {
  return DENTAL_DECKS.find(d => d.id === deckId) || DENTAL_DECKS[0];
}

/**
 * Search across all dental decks
 */
export function searchDentalDecks(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  return ALL_DENTAL_DECK_CARDS.filter(c => {
    const frontMatch = c.front && c.front.toLowerCase().includes(q);
    const answerMatch = c.answer && c.answer.toLowerCase().includes(q);
    const ratMatch = c.rationale && c.rationale.toLowerCase().includes(q);
    const catMatch = c.category && c.category.toLowerCase().includes(q);
    const deckMatch = c.deckName && c.deckName.toLowerCase().includes(q);
    return frontMatch || answerMatch || ratMatch || catMatch || deckMatch;
  });
}
`;

fs.writeFileSync('src/data/dentalDecksData.js', fileOutput, 'utf-8');
console.log(`Wrote src/data/dentalDecksData.js successfully!`);
