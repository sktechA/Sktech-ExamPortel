/**
 * SKTECH EXAM — Speed Boosters Catalog
 * Supports Track 1 (Solving & Calculation: 90 Min / 100 Qs)
 * and Track 2 (Reading & General Knowledge: 45 Min / 100 Qs)
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

export interface SpeedBoosterTrack {
  id: string;
  code: string;
  trackType: 'TRACK_1_SOLVING' | 'TRACK_2_READING';
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  defaultDurationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  marksPositive: number;
  marksNegative: number;
  subjects: string[];
  subjectsHi: string[];
  tags: string[];
  icon: string;
  attemptsCount: number;
}

export const SPEED_BOOSTER_TRACKS: SpeedBoosterTrack[] = [
  // ==========================================
  // TRACK 1: SOLVING & CALCULATION (90 MIN / 100 Qs)
  // ==========================================
  {
    id: 'sb_track1_all',
    code: 'SB-TRK1-CALC',
    trackType: 'TRACK_1_SOLVING',
    titleEn: 'Track 1: Solving & Calculation Speed Booster',
    titleHi: 'ट्रैक 1: हल एवं गणना स्पीड बूस्टर (Solving & Calculation)',
    descriptionEn: 'Intense 90-minute timed simulation focusing on calculation speed, arithmetic shortcuts, data analysis, analytical puzzles, and technical problem-solving.',
    descriptionHi: 'गणना गति, अंकगणित शॉर्टकट, डेटा विश्लेषण, पहेली एवं तकनीकी समस्या समाधान पर केंद्रित गहन 90 मिनट का समयबद्ध परीक्षण।',
    defaultDurationMinutes: 90,
    totalQuestions: 100,
    totalMarks: 100,
    marksPositive: 1.0,
    marksNegative: 0.25,
    subjects: [
      'Quantitative Aptitude',
      'Data Interpretation',
      'Reasoning Puzzle',
      'Seating Arrangement',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electronics/ECE Engineering',
    ],
    subjectsHi: [
      'संख्यात्मक अभियोग्यता (Quantitative)',
      'आंकड़ा निर्वचन (Data Interpretation)',
      'तार्किक पहेली (Puzzles)',
      'बैठक व्यवस्था (Seating Arrangement)',
      'विद्युत अभियांत्रिकी (EE)',
      'यांत्रिक अभियांत्रिकी (ME)',
      'सिविल अभियांत्रिकी (CE)',
      'इलेक्ट्रॉनिक्स (ECE)',
    ],
    tags: ['Calculation', 'DI', 'Puzzles', 'Engineering Tech', 'High Speed'],
    icon: 'Zap',
    attemptsCount: 14250,
  },
  {
    id: 'sb_track1_quant_di',
    code: 'SB-TRK1-QUANT',
    trackType: 'TRACK_1_SOLVING',
    titleEn: 'Track 1 Special: Quant & DI Sprint (Speed Math)',
    titleHi: 'ट्रैक 1 स्पेशल: क्वांट एवं डीआई स्प्रिंट (Speed Math)',
    descriptionEn: 'Focus on simplification, approximation, quadratic equations, missing series, arithmetic, and caselet DI under timed pressure.',
    descriptionHi: 'समयबद्ध दबाव में सरलीकरण, अनुमान, द्विघात समीकरण, लुप्त श्रृंखला एवं कैसलेट डीआई पर केंद्रित विशेष अभ्यास।',
    defaultDurationMinutes: 90,
    totalQuestions: 100,
    totalMarks: 100,
    marksPositive: 1.0,
    marksNegative: 0.25,
    subjects: ['Quantitative Aptitude', 'Data Interpretation'],
    subjectsHi: ['संख्यात्मक अभियोग्यता', 'आंकड़ा निर्वचन'],
    tags: ['Speed Math', 'Quadratic', 'Number Series', 'Arithmetic'],
    icon: 'Target',
    attemptsCount: 9800,
  },
  {
    id: 'sb_track1_engineering',
    code: 'SB-TRK1-ENGG',
    trackType: 'TRACK_1_SOLVING',
    titleEn: 'Track 1 Special: Engineering Technical Calculation Booster',
    titleHi: 'ट्रैक 1 स्पेशल: इंजीनियरिंग तकनीकी गणना बूस्टर (EE, ME, CE, ECE)',
    descriptionEn: 'Fast-paced numerical calculation problems across Circuits, SOM, Fluid Mechanics, Structural Analysis, and Digital Electronics.',
    descriptionHi: 'परिपथ, सोम, द्रव यांत्रिकी, संरचनात्मक विश्लेषण एवं डिजिटल इलेक्ट्रॉनिक्स से संबंधित त्वरित सांख्यिकीय प्रश्न।',
    defaultDurationMinutes: 90,
    totalQuestions: 100,
    totalMarks: 100,
    marksPositive: 1.0,
    marksNegative: 0.25,
    subjects: ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics/ECE Engineering'],
    subjectsHi: ['विद्युत अभियांत्रिकी', 'यांत्रिक अभियांत्रिकी', 'सिविल अभियांत्रिकी', 'इलेक्ट्रॉनिक्स'],
    tags: ['GATE JE', 'Technical Numerical', 'Formulas', 'Speed'],
    icon: 'Layers',
    attemptsCount: 6540,
  },

  // ==========================================
  // TRACK 2: READING & GENERAL KNOWLEDGE (45 MIN / 100 Qs)
  // ==========================================
  {
    id: 'sb_track2_all',
    code: 'SB-TRK2-GK',
    trackType: 'TRACK_2_READING',
    titleEn: 'Track 2: Reading & General Knowledge Speed Booster',
    titleHi: 'ट्रैक 2: पठन एवं सामान्य ज्ञान स्पीड बूस्टर (Reading & GK)',
    descriptionEn: 'High-speed 45-minute rapid-fire drill across Hindi Grammar, English Comprehension, History, Geography, MP GK, Polity, Science, and Banking Awareness.',
    descriptionHi: 'हिंदी व्याकरण, अंग्रेजी कॉम्प्रिहेंशन, इतिहास, भूगोल, एमपी जीके, राजव्यवस्था, विज्ञान एवं बैंकिंग पर आधारित 45 मिनट का तीव्र अभ्यास।',
    defaultDurationMinutes: 45,
    totalQuestions: 100,
    totalMarks: 100,
    marksPositive: 1.0,
    marksNegative: 0.25,
    subjects: [
      'General Hindi',
      'English Language',
      'History',
      'Geography',
      'MP GK',
      'State General Knowledge',
      'Indian Polity',
      'Science & Technology',
      'Banking Awareness',
      'Financial Awareness',
      'Computer Knowledge',
    ],
    subjectsHi: [
      'सामान्य हिंदी (Hindi Grammar)',
      'अंग्रेजी भाषा (English)',
      'इतिहास (History)',
      'भूगोल (Geography)',
      'मध्य प्रदेश सामान्य ज्ञान (MP GK)',
      'राज्य सामान्य ज्ञान (State GK)',
      'भारतीय राजव्यवस्था (Polity)',
      'विज्ञान एवं प्रौद्योगिकी (Science)',
      'बैंकिंग एवं वित्तीय जागरूकता (Banking Awareness)',
      'कंप्यूटर ज्ञान (Computer Knowledge)',
    ],
    tags: ['Rapid Fire', 'Memory Recall', 'Hindi', 'English', 'MP GK'],
    icon: 'BookOpen',
    attemptsCount: 18920,
  },
  {
    id: 'sb_track2_hindi_english',
    code: 'SB-TRK2-LANG',
    trackType: 'TRACK_2_READING',
    titleEn: 'Track 2 Special: Bilingual Language Mastery (Hindi + English)',
    titleHi: 'ट्रैक 2 स्पेशल: द्विभाषी भाषा दक्षता (सामान्य हिंदी + English)',
    descriptionEn: 'Grammar rules, vocabulary, error spotting, antonyms-synonyms, idioms, and reading comprehension passages.',
    descriptionHi: 'व्याकरण नियम, शब्दावली, त्रुटि पहचान, विलोम-पर्यायवाची, मुहावरे एवं अपठित गद्यांश का त्वरित अभ्यास।',
    defaultDurationMinutes: 45,
    totalQuestions: 100,
    totalMarks: 100,
    marksPositive: 1.0,
    marksNegative: 0.25,
    subjects: ['General Hindi', 'English Language'],
    subjectsHi: ['सामान्य हिंदी', 'अंग्रेजी भाषा'],
    tags: ['Grammar', 'Vocab', 'Bilingual', 'Speed Reading'],
    icon: 'PenTool',
    attemptsCount: 11200,
  },
  {
    id: 'sb_track2_state_mp',
    code: 'SB-TRK2-MP',
    trackType: 'TRACK_2_READING',
    titleEn: 'Track 2 Special: MP GK & State Services Rapid Drill',
    titleHi: 'ट्रैक 2 स्पेशल: मध्य प्रदेश सामान्य ज्ञान एवं राज्य सेवा त्वरित ड्रिल',
    descriptionEn: 'Exhaustive rapid quiz on MP geography, rivers, monuments, tribal culture, state budget, schemes, and forest data.',
    descriptionHi: 'मध्य प्रदेश भूगोल, नदियां, स्मारक, जनजातीय संस्कृति, राज्य बजट, योजनाएं एवं वन सर्वेक्षण पर आधारित त्वरित क्विज।',
    defaultDurationMinutes: 45,
    totalQuestions: 100,
    totalMarks: 100,
    marksPositive: 1.0,
    marksNegative: 0.0,
    subjects: ['MP GK', 'History', 'Geography', 'Indian Polity'],
    subjectsHi: ['मध्य प्रदेश जीके', 'इतिहास', 'भूगोल', 'राजव्यवस्था'],
    tags: ['MPPSC', 'MP Police', 'State GK', 'Zero Negative'],
    icon: 'Award',
    attemptsCount: 13400,
  },
];
