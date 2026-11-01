// Milestone Rewards & Love Chests Configuration
// Personal surprises and love coupons unlocked by Leane's real study progress

export const MILESTONES = [
  {
    id: "first_steps",
    icon: "🌱",
    title: "First Steps on the Journey",
    category: "Study Kickoff",
    requirementText: "Complete at least 1 mock exam or study session",
    checkUnlock: (stats) => (stats.examHistory && stats.examHistory.length >= 1) || stats.streak >= 1,
    rewardTitle: "Angelo's Iced Coffee & Boba Fuel 🧋",
    rewardDescription: "Redeemable for any iced matcha latte, caramel macchiato, or milk tea delivered to your study desk!",
    couponCode: "LEANE-BOBA-01",
    isLetter: false
  },
  {
    id: "streak_3",
    icon: "🔥",
    title: "3-Day Study Flame",
    category: "Consistency",
    requirementText: "Maintain an unbroken 3-day study streak",
    checkUnlock: (stats) => (stats.streak || 0) >= 3,
    rewardTitle: "Sweet Tooth Bakery Treat 🍰",
    rewardDescription: "Angelo buys your favorite cake slice or box of pastries to celebrate your unstoppable momentum!",
    couponCode: "LEANE-CAKE-03",
    isLetter: false
  },
  {
    id: "benchmark_75",
    icon: "🎯",
    title: "PRC Passing Benchmark",
    category: "Mock Exams",
    requirementText: "Score 75% or higher on a mock exam",
    checkUnlock: (stats) => (stats.examHistory || []).some(e => e.score >= 75),
    rewardTitle: "Cozy Study-Free Movie Night 🎬",
    rewardDescription: "You pick any movie or K-drama episode, and Angelo prepares the dinner, snacks, and cuddles!",
    couponCode: "LEANE-MOVIE-75",
    isLetter: false
  },
  {
    id: "streak_7",
    icon: "💌",
    title: "7-Day Streak Master",
    category: "Consistency",
    requirementText: "Reach a 7-day study streak",
    checkUnlock: (stats) => (stats.streak || 0) >= 7,
    rewardTitle: "Secret Love Letter #1 from Angelo 💜",
    rewardDescription: "A special heartfelt love letter unlocked exclusively for Dr. Leane.",
    couponCode: "LETTER-WEEK-ONE",
    isLetter: true,
    letterTitle: "Why You Inspire Me Every Single Day ✨",
    letterBody: `Hi my love,\n\nSeeing you wake up, open your reviewer, and dedicate yourself to studying day after day fills my heart with so much pride. You don't just study to pass; you study because you genuinely care about being the best, kindest dentist for your future patients.\n\nEvery tooth line angle you memorize, every Starling force equation you solve, and every nerve pathway you trace is paving the way to your license. The board exam is only a temporary hurdle on your way to greatness.\n\nTake this letter as my promise that no matter how tiring or stressful review center days feel, I've always got your back. You are going to be such an incredible, compassionate Dr. Leane!\n\nI love you with all my heart.\n— Angelo 💖`
  },
  {
    id: "high_scorer_85",
    icon: "🌟",
    title: "Top-Tier Clinical Score",
    category: "Mock Exams",
    requirementText: "Score 85% or higher on any mock exam",
    checkUnlock: (stats) => (stats.examHistory || []).some(e => e.score >= 85),
    rewardTitle: "30-Minute Shoulder & Foot Massage 💆",
    rewardDescription: "Post-study tension relief massage by Angelo after a long day of reviewing dental pathology and pharmacology!",
    couponCode: "LEANE-MASSAGE-85",
    isLetter: false
  },
  {
    id: "streak_14",
    icon: "👑",
    title: "14-Day Board Champion",
    category: "Consistency",
    requirementText: "Maintain an unbroken 14-day study streak",
    checkUnlock: (stats) => (stats.streak || 0) >= 14,
    rewardTitle: "Romantic Dinner Date on Angelo 🍽️✨",
    rewardDescription: "A full dinner date at your favorite restaurant to recharge your batteries and celebrate 2 weeks of unbroken dedication!",
    couponCode: "LEANE-DINNER-14",
    isLetter: false
  },
  {
    id: "flag_master",
    icon: "🔍",
    title: "Review Detective",
    category: "Weakness Mastery",
    requirementText: "Flag and review at least 3 difficult questions",
    checkUnlock: (stats) => (stats.flaggedQuestions || []).length >= 3,
    rewardTitle: "Angelo's Favorite Dessert Run 🍨",
    rewardDescription: "Redeemable for any ice cream, waffle, or milk tea craving whenever review gets tough!",
    couponCode: "LEANE-ICE-CREAM",
    isLetter: false
  },
  {
    id: "topnotcher_90",
    icon: "🏆",
    title: "Future Topnotcher!",
    category: "Excellence",
    requirementText: "Score 90% or higher on any mock exam",
    checkUnlock: (stats) => (stats.examHistory || []).some(e => e.score >= 90),
    rewardTitle: "Secret Love Letter #2: The Future Dr. Leane, DMD 🦷🎓",
    rewardDescription: "A letter from Angelo celebrating your dream clinic and license.",
    couponCode: "LETTER-TOPNOTCH-90",
    isLetter: true,
    letterTitle: "Look at You, Future Topnotcher! 🏆",
    letterBody: `Ninety percent! Look at that score, Dr. Leane!\n\nI can already envision the gold-lettered signage on your clinic door: 'Dr. Leane, DMD'. All the late nights, the flashcards, the GoodNotes drawings, and the DMF reviewer questions are coming together into pure mastery.\n\nI cannot wait to be the very first patient sitting in your dental chair, smiling and telling everyone that the brilliant dentist taking care of them is the love of my life.\n\nYou are not just passing this exam — you are conquering it.\n\nForever your biggest fan,\n— Angelo 🦷💜✨`
  }
];

