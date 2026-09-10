/**
 * SKTECH EXAM — Combined Multi-Paper & Multi-Exam Full Length Mocks
 * Implements Section 12 requirements:
 * MPPSC Prelims (Paper 1 + Paper 2 CSAT), Banking Complete, SSC CGL/CHSL, Railways NTPC/Group D, Police/SI.
 * Patterns and durations are configuration-driven.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

export interface CombinedMockPaperSection {
  paperNameEn: string;
  paperNameHi: string;
  durationMinutes: number;
  questionCount: number;
  totalMarks: number;
  marksPositive: number;
  marksNegative: number;
  subjects: string[];
  subjectsHi: string[];
}

export interface CombinedMockPackage {
  id: string;
  code: string;
  examCategory: 'STATE_PSC' | 'BANKING' | 'SSC' | 'RAILWAYS' | 'POLICE';
  examTarget: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  totalPapers: number;
  combinedDurationMinutes: number;
  combinedTotalQuestions: number;
  combinedTotalMarks: number;
  papers: CombinedMockPaperSection[];
  isFree: boolean;
  priceInr?: number;
  attemptsCount: number;
  passingScore?: number;
}

export const COMBINED_MOCKS_DATA: CombinedMockPackage[] = [
  // ==========================================
  // 1. MPPSC PRELIMS COMBINED (PAPER 1 + PAPER 2)
  // ==========================================
  {
    id: 'comb_mppsc_prelims_01',
    code: 'MPPSC-COMB-01',
    examCategory: 'STATE_PSC',
    examTarget: 'MPPSC State Service & Forest Service',
    titleEn: 'MPPSC State Services Prelims: Combined Full Mock (Paper 1 + Paper 2)',
    titleHi: 'एमपीपीएससी राज्य सेवा प्रारंभिक परीक्षा: संयुक्त पूर्ण मॉक (प्रश्नपत्र 1 + प्रश्नपत्र 2)',
    descriptionEn: 'Official simulation combining Morning Session General Studies & MP GK (Paper 1) and Afternoon Session CSAT General Aptitude (Paper 2).',
    descriptionHi: 'प्रातःकालीन सत्र सामान्य अध्ययन व एमपी जीके (पेपर 1) तथा दोपहर सत्र सीसैट सामान्य अभियोग्यता (पेपर 2) का वास्तविक परीक्षा संयोजन।',
    totalPapers: 2,
    combinedDurationMinutes: 240, // 120 + 120
    combinedTotalQuestions: 200,
    combinedTotalMarks: 400,
    isFree: true,
    attemptsCount: 8430,
    papers: [
      {
        paperNameEn: 'Paper 1: General Studies & MP GK',
        paperNameHi: 'प्रश्नपत्र 1: सामान्य अध्ययन एवं मध्य प्रदेश सामान्य ज्ञान',
        durationMinutes: 120,
        questionCount: 100,
        totalMarks: 200,
        marksPositive: 2.0,
        marksNegative: 0.0,
        subjects: ['History of MP & India', 'Geography of MP', 'Indian Polity & Economy', 'Science & Environment', 'Current Events'],
        subjectsHi: ['म.प्र. एवं भारत का इतिहास', 'म.प्र. का भूगोल', 'भारतीय राजव्यवस्था व अर्थव्यवस्था', 'विज्ञान एवं पर्यावरण', 'समसामयिक घटनाएं'],
      },
      {
        paperNameEn: 'Paper 2: General Aptitude Test (CSAT)',
        paperNameHi: 'प्रश्नपत्र 2: सामान्य अभिरुचि परीक्षण (सीसैट)',
        durationMinutes: 120,
        questionCount: 100,
        totalMarks: 200,
        marksPositive: 2.0,
        marksNegative: 0.0,
        subjects: ['Comprehension', 'Interpersonal Skills', 'Logical Reasoning', 'Decision Making', 'Basic Numeracy (Class X)', 'Hindi Language (Class X)'],
        subjectsHi: ['बोधगम्यता', 'संचार कौशल', 'तार्किक क्षमता', 'निर्णयन क्षमता', 'आधारभूत संख्यन', 'हिंदी भाषा ज्ञान'],
      },
    ],
  },

  // ==========================================
  // 2. BANKING COMBINED FULL MOCK (IBPS / SBI / RRB PO)
  // ==========================================
  {
    id: 'comb_banking_po_01',
    code: 'BANK-COMB-01',
    examCategory: 'BANKING',
    examTarget: 'IBPS PO / SBI PO / RRB PO',
    titleEn: 'Banking Complete Combined Mock: Prelims + Mains Foundation Drill',
    titleHi: 'बैंकिंग सम्पूर्ण संयुक्त मॉक: प्रारंभिक + मुख्य आधारभूत अभ्यास',
    descriptionEn: 'Integrated assessment covering Quantitative Aptitude, Data Interpretation, Reasoning, High-Level Puzzles, English, and Banking & Financial Awareness.',
    descriptionHi: 'संख्यात्मक अभियोग्यता, डीआई, तार्किक पहेलियां, अंग्रेजी भाषा एवं बैंकिंग व वित्तीय जागरूकता का समग्र परीक्षण।',
    totalPapers: 2,
    combinedDurationMinutes: 180,
    combinedTotalQuestions: 155,
    combinedTotalMarks: 200,
    isFree: true,
    attemptsCount: 14120,
    papers: [
      {
        paperNameEn: 'Phase 1: Speed & Numerical Reasoning Section',
        paperNameHi: 'चरण 1: स्पीड एवं सांख्यिकीय तर्क क्षमता अनुभाग',
        durationMinutes: 60,
        questionCount: 100,
        totalMarks: 100,
        marksPositive: 1.0,
        marksNegative: 0.25,
        subjects: ['Quantitative Aptitude', 'Reasoning & Puzzles', 'English Language'],
        subjectsHi: ['संख्यात्मक अभियोग्यता', 'तर्कशक्ति एवं पहेलियां', 'अंग्रेजी भाषा'],
      },
      {
        paperNameEn: 'Phase 2: Advanced Banking, DI & Economy Section',
        paperNameHi: 'चरण 2: उच्च स्तरीय बैंकिंग, आंकड़ा निर्वचन एवं वित्तीय जागरूकता',
        durationMinutes: 120,
        questionCount: 55,
        totalMarks: 100,
        marksPositive: 1.81,
        marksNegative: 0.45,
        subjects: ['Data Analysis & Interpretation', 'Banking Awareness', 'Financial Economics', 'Computer Aptitude'],
        subjectsHi: ['आंकड़ा विश्लेषण', 'बैंकिंग जागरूकता', 'वित्तीय अर्थशास्त्र', 'कंप्यूटर अभियोग्यता'],
      },
    ],
  },

  // ==========================================
  // 3. SSC CGL / CHSL COMBINED MOCK
  // ==========================================
  {
    id: 'comb_ssc_cgl_01',
    code: 'SSC-COMB-01',
    examCategory: 'SSC',
    examTarget: 'SSC CGL Tier-1 & Tier-2',
    titleEn: 'SSC CGL Tier-1 & Tier-2 Comprehensive Combined Mock Series',
    titleHi: 'एसएससी सीजीएल टियर-1 एवं टियर-2 व्यापक संयुक्त मॉक श्रृंखला',
    descriptionEn: 'Full syllabus coverage across Quantitative Aptitude, General Intelligence, Reasoning, English Comprehension, and General Awareness.',
    descriptionHi: 'क्वांट, सामान्य बुद्धिमत्ता एवं तर्कशक्ति, अंग्रेजी समझ एवं सामान्य जागरूकता का पूर्ण पाठ्यक्रम परीक्षण।',
    totalPapers: 2,
    combinedDurationMinutes: 120,
    combinedTotalQuestions: 150,
    combinedTotalMarks: 300,
    isFree: true,
    attemptsCount: 19850,
    papers: [
      {
        paperNameEn: 'Tier-1 CBT All 4 Sections Simulation',
        paperNameHi: 'टियर-1 सीबीटी समस्त 4 अनुभाग अनुकरण',
        durationMinutes: 60,
        questionCount: 100,
        totalMarks: 200,
        marksPositive: 2.0,
        marksNegative: 0.5,
        subjects: ['Quantitative Aptitude', 'General Intelligence & Reasoning', 'English Comprehension', 'General Awareness'],
        subjectsHi: ['संख्यात्मक अभियोग्यता', 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति', 'अंग्रेजी भाषा', 'सामान्य जागरूकता'],
      },
      {
        paperNameEn: 'Tier-2 Mathematical & Reasoning Sprint',
        paperNameHi: 'टियर-2 गणितीय एवं तार्किक गति स्प्रिंट',
        durationMinutes: 60,
        questionCount: 50,
        totalMarks: 100,
        marksPositive: 2.0,
        marksNegative: 0.66,
        subjects: ['Advanced Mathematics', 'Analytical Reasoning', 'Computer Knowledge Module'],
        subjectsHi: ['उच्च गणित', 'विश्लेषणात्मक तर्कशक्ति', 'कंप्यूटर ज्ञान'],
      },
    ],
  },

  // ==========================================
  // 4. RAILWAYS RRB NTPC & GROUP D COMBINED MOCK
  // ==========================================
  {
    id: 'comb_rrb_ntpc_01',
    code: 'RRB-COMB-01',
    examCategory: 'RAILWAYS',
    examTarget: 'RRB NTPC & Group D (CBT 1 & 2)',
    titleEn: 'Railways RRB NTPC & Group D All-India Combined Mock',
    titleHi: 'रेलवे आरआरबी एनटीपीसी एवं ग्रुप डी अखिल भारतीय संयुक्त मॉक',
    descriptionEn: 'Official 90-minute railway pattern covering Mathematics, General Intelligence, Reasoning, General Science, and Current Awareness with 1/3rd negative marking.',
    descriptionHi: 'गणित, सामान्य बुद्धिमत्ता, सामान्य विज्ञान एवं समसामयिकी युक्त रेलवे का आधिकारिक 90 मिनट का परीक्षण (1/3rd नकारात्मक अंकन)।',
    totalPapers: 1,
    combinedDurationMinutes: 90,
    combinedTotalQuestions: 100,
    combinedTotalMarks: 100,
    isFree: true,
    attemptsCount: 22100,
    papers: [
      {
        paperNameEn: 'Stage-1 CBT Computer Based Test',
        paperNameHi: 'स्टेज-1 सीबीटी कंप्यूटर आधारित परीक्षा',
        durationMinutes: 90,
        questionCount: 100,
        totalMarks: 100,
        marksPositive: 1.0,
        marksNegative: 0.33,
        subjects: ['Mathematics', 'General Intelligence & Reasoning', 'General Science (Physics, Chemistry, Biology)', 'General Awareness'],
        subjectsHi: ['गणित', 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति', 'सामान्य विज्ञान (भौतिकी, रसायन, जीव)', 'सामान्य जागरूकता'],
      },
    ],
  },

  // ==========================================
  // 5. POLICE / SUB-INSPECTOR COMBINED MOCK
  // ==========================================
  {
    id: 'comb_police_si_01',
    code: 'POLICE-COMB-01',
    examCategory: 'POLICE',
    examTarget: 'MP Police Sub Inspector (SI) & Constable',
    titleEn: 'MP Police SI Combined Mock: Hindi, GK, Science & Aptitude',
    titleHi: 'एमपी पुलिस सब इंस्पेक्टर (SI) संयुक्त मॉक: सामान्य हिंदी, विज्ञान, जीके व गणित',
    descriptionEn: 'Rigorous state exam structure including 70-mark General Hindi Grammar, Legal Awareness, MP History, General Science, and Elementary Math.',
    descriptionHi: '70 अंकों की सामान्य हिंदी व्याकरण, विधि जागरूकता, मध्य प्रदेश का इतिहास, सामान्य विज्ञान एवं अंकगणित का संयुक्त प्रारूप।',
    totalPapers: 2,
    combinedDurationMinutes: 180,
    combinedTotalQuestions: 200,
    combinedTotalMarks: 200,
    isFree: true,
    attemptsCount: 16740,
    papers: [
      {
        paperNameEn: 'Paper 1: Proficiency in Hindi & English',
        paperNameHi: 'प्रश्नपत्र 1: हिंदी एवं अंग्रेजी भाषा में दक्षता',
        durationMinutes: 90,
        questionCount: 100,
        totalMarks: 100,
        marksPositive: 1.0,
        marksNegative: 0.0,
        subjects: ['General Hindi Grammar (70 Qs)', 'English Language (30 Qs)'],
        subjectsHi: ['सामान्य हिंदी व्याकरण (70 प्रश्न)', 'अंग्रेजी भाषा (30 प्रश्न)'],
      },
      {
        paperNameEn: 'Paper 2: General Knowledge, Science & Aptitude',
        paperNameHi: 'प्रश्नपत्र 2: सामान्य ज्ञान, विज्ञान एवं गणितीय अभिरुचि',
        durationMinutes: 90,
        questionCount: 100,
        totalMarks: 100,
        marksPositive: 1.0,
        marksNegative: 0.0,
        subjects: ['MP General Knowledge', 'Physics, Chemistry & Biology', 'Quantitative Aptitude & Reasoning'],
        subjectsHi: ['म.प्र. सामान्य ज्ञान', 'भौतिकी, रसायन एवं जीव विज्ञान', 'अंकगणित एवं तर्कशक्ति'],
      },
    ],
  },
];
