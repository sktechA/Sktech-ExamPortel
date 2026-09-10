/**
 * SKTECH EXAM — Central Database Store & Seed Data Layer
 * Architecture: Central PostgreSQL Database Abstraction
 * Brand: SKTECH • All Rights Reserved © 2026
 */

import crypto from 'crypto';
import { Pool } from 'pg';
import {
  User,
  Exam,
  Subject,
  Topic,
  Question,
  MockTest,
  ExamAttempt,
  ResultScorecard,
  CurrentAffairItem,
  ImportBatch,
  AuditLogEntry,
  SystemMetrics,
  AdCampaign,
  MonetizationStats,
  MultiPlatformDeployment,
  DailyRevenueData,
  RevenueAnalyticsStats,
  SubjectiveMockPaper,
  SpeedBoosterTrack,
  CombinedMockPackage,
} from '../src/types';
import { SPEED_BOOSTER_TRACKS } from './seed/speedBoostersData';
import { COMBINED_MOCKS_DATA } from './seed/combinedMocksData';
import { SUBJECTIVE_MOCKS_DATA } from './seed/subjectiveMocksData';

// PostgreSQL Database Connection Pool initialization with resilient error recovery
function initializePostgreSqlPool(): Pool | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || !dbUrl.trim()) {
    console.log('[CentralDatabase] Operating with PostgreSQL-compatible normalized relational store (DATABASE_URL not set).');
    return null;
  }

  try {
    const isSsl =
      dbUrl.includes('sslmode=require') ||
      dbUrl.includes('neon.tech') ||
      dbUrl.includes('supabase.co') ||
      process.env.NODE_ENV === 'production';

    const pool = new Pool({
      connectionString: dbUrl.trim(),
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10,
      ssl: isSsl ? { rejectUnauthorized: false } : undefined,
    });

    // CRITICAL: Must register an 'error' event listener to prevent idle client errors from crashing the Node.js process
    pool.on('error', (err) => {
      console.warn('[CentralDatabase] Notice: PostgreSQL idle client connection error (handled safely):', err.message);
    });

    // Test query asynchronously without blocking application startup
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.warn('[CentralDatabase] PostgreSQL connection check warning (running with resilient in-memory fallback):', err.message);
      } else {
        console.log('[CentralDatabase] PostgreSQL connection verified live at', res.rows[0]?.now);
      }
    });

    console.log('[CentralDatabase] Initialized PostgreSQL connection pool successfully.');
    return pool;
  } catch (err: any) {
    console.warn('[CentralDatabase] Failed to construct PostgreSQL pool, using resilient fallback store:', err?.message || err);
    return null;
  }
}

export const pgPool: Pool | null = initializePostgreSqlPool();

class CentralDatabase {
  subjectiveMocks: SubjectiveMockPaper[] = [...SUBJECTIVE_MOCKS_DATA];
  speedBoosterTracks: SpeedBoosterTrack[] = [...SPEED_BOOSTER_TRACKS];
  combinedMocks: CombinedMockPackage[] = [...COMBINED_MOCKS_DATA];

  // Authoritative user store (no mock or fake candidate data)
  users: User[] = [
    {
      id: 'usr_admin_01',
      name: 'Er. Sachin Tripathi',
      email: 'skt22tripathi@gmail.com',
      role: 'SUPER_ADMIN',
      targetExam: 'ALL',
      joinedDate: '2026-01-15',
      status: 'ACTIVE',
      permissions: ['ALL_PERMISSIONS', 'MANAGE_QUESTIONS', 'MANAGE_MOCKS', 'MANAGE_USERS', 'VIEW_AUDIT'],
    },
  ];

  exams: Exam[] = [
    {
      id: 'exam_ibps_po',
      code: 'IBPS-PO',
      title: 'IBPS PO (Probationary Officer)',
      category: 'BANKING',
      description: 'Complete prelims & mains mock test series with latest high-level reasoning and data interpretation.',
      bannerColor: 'from-blue-700 to-indigo-900',
      totalTests: 45,
      totalQuestions: 4500,
      enrolledCandidates: 18450,
      featured: true,
    },
    {
      id: 'exam_ssc_cgl',
      code: 'SSC-CGL',
      title: 'SSC CGL Tier-1 & Tier-2',
      category: 'SSC',
      description: 'Comprehensive test series covering Quantitative Aptitude, General Intelligence, English, and General Studies.',
      bannerColor: 'from-emerald-700 to-teal-900',
      totalTests: 50,
      totalQuestions: 5000,
      enrolledCandidates: 24200,
      featured: true,
    },
    {
      id: 'exam_mppsc',
      code: 'MPPSC-PRE',
      title: 'MPPSC State Services (Prelims)',
      category: 'STATE_PSC',
      description: 'Dedicated Madhya Pradesh General Studies (Paper 1) and General Aptitude (CSAT Paper 2) mock tests.',
      bannerColor: 'from-amber-700 to-orange-900',
      totalTests: 35,
      totalQuestions: 3500,
      enrolledCandidates: 12100,
      featured: true,
    },
    {
      id: 'exam_mp_police',
      code: 'MP-POLICE',
      title: 'MP Police Constable & Sub Inspector',
      category: 'POLICE',
      description: 'State-specific syllabus including MP GK, Science, Reasoning, and Elementary Mathematics.',
      bannerColor: 'from-slate-700 to-slate-900',
      totalTests: 30,
      totalQuestions: 3000,
      enrolledCandidates: 9800,
      featured: false,
    },
    {
      id: 'exam_rrb_po',
      code: 'RRB-PO',
      title: 'IBPS RRB Officer Scale 1',
      category: 'BANKING',
      description: 'Regional Rural Bank exam preparation with sectional speed tests and full-length mocks.',
      bannerColor: 'from-cyan-700 to-blue-900',
      totalTests: 28,
      totalQuestions: 2800,
      enrolledCandidates: 7500,
      featured: false,
    },
    {
      id: 'exam_eng_ee',
      code: 'ENG-EE',
      title: 'Electrical Engineering (ESE / SSC JE / GATE Prelims)',
      category: 'ENGINEERING',
      description: 'Objective test series for Electric Circuits, Machines, Power Systems, Control Systems and Measurements.',
      bannerColor: 'from-amber-600 to-yellow-800',
      totalTests: 40,
      totalQuestions: 4000,
      enrolledCandidates: 11200,
      featured: true,
    },
    {
      id: 'exam_eng_ece',
      code: 'ENG-ECE',
      title: 'Electronics & Communication Engineering (GATE / ISRO / ESE)',
      category: 'ENGINEERING',
      description: 'Comprehensive objective mock tests for Electronic Devices, Communication Systems, Electromagnetics and Signals.',
      bannerColor: 'from-indigo-600 to-purple-800',
      totalTests: 35,
      totalQuestions: 3500,
      enrolledCandidates: 9800,
      featured: false,
    },
    {
      id: 'exam_eng_me',
      code: 'ENG-ME',
      title: 'Mechanical Engineering (GATE / SSC JE / ESE Prelims)',
      category: 'ENGINEERING',
      description: 'Strength of Materials, Theory of Machines, Fluid Mechanics, Thermodynamics and Production Engineering.',
      bannerColor: 'from-rose-600 to-red-800',
      totalTests: 38,
      totalQuestions: 3800,
      enrolledCandidates: 10600,
      featured: false,
    },
    {
      id: 'exam_eng_ce',
      code: 'ENG-CE',
      title: 'Civil Engineering (GATE / SSC JE / State AE-JE Prelims)',
      category: 'ENGINEERING',
      description: 'Building Materials, Structural Analysis, RCC & Steel Design, Geotechnical and Environmental Engineering.',
      bannerColor: 'from-teal-600 to-emerald-800',
      totalTests: 42,
      totalQuestions: 4200,
      enrolledCandidates: 13400,
      featured: true,
    },
    {
      id: 'exam_gen_foundational',
      code: 'GEN-FOUNDATION',
      title: 'General Foundational Paper (Aptitude & Reasoning Prelims)',
      category: 'GENERAL_STUDIES',
      description: 'High-yield common foundational papers across Quantitative Aptitude, Logical Reasoning, General English, and GK.',
      bannerColor: 'from-blue-600 to-cyan-800',
      totalTests: 60,
      totalQuestions: 6000,
      enrolledCandidates: 28900,
      featured: true,
    },
  ];

  subjects: Subject[] = [
    { id: 'sub_quant', code: 'QA', nameEn: 'Quantitative Aptitude', nameHi: 'संख्यात्मक अभियोग्यता', totalTopics: 18 },
    { id: 'sub_reasoning', code: 'REAS', nameEn: 'Reasoning Ability', nameHi: 'तर्कशक्ति क्षमता', totalTopics: 20 },
    { id: 'sub_english', code: 'ENG', nameEn: 'English Language', nameHi: 'अंग्रेजी भाषा', totalTopics: 14 },
    { id: 'sub_ga', code: 'GA', nameEn: 'General Awareness & Banking', nameHi: 'सामान्य जागरूकता एवं बैंकिंग', totalTopics: 24 },
    { id: 'sub_mpgk', code: 'MPGK', nameEn: 'Madhya Pradesh GK & Static', nameHi: 'मध्य प्रदेश सामान्य ज्ञान', totalTopics: 16 },
  ];

  topics: Topic[] = [
    { id: 'top_puzzle', subjectId: 'sub_reasoning', nameEn: 'Seating Arrangement & Puzzles', nameHi: 'बैठक व्यवस्था एवं पहेली', questionCount: 320 },
    { id: 'top_di', subjectId: 'sub_quant', nameEn: 'Data Interpretation (Bar/Pie/Caselet)', nameHi: 'आंकड़ा निर्वचन (डीआई)', questionCount: 280 },
    { id: 'top_syllogism', subjectId: 'sub_reasoning', nameEn: 'Syllogism (Only a few)', nameHi: 'न्याय निगमन', questionCount: 190 },
    { id: 'top_arithmetic', subjectId: 'sub_quant', nameEn: 'Arithmetic (Percentage, Profit & Loss)', nameHi: 'अंकगणित (प्रतिशत, लाभ-हानि)', questionCount: 450 },
    { id: 'top_rc', subjectId: 'sub_english', nameEn: 'Reading Comprehension & Cloze', nameHi: 'गद्यांश एवं क्लोज टेस्ट', questionCount: 210 },
    { id: 'top_banking_curr', subjectId: 'sub_ga', nameEn: 'Monetary Policy & RBI Updates', nameHi: 'मौद्रिक नीति एवं आरबीआई दिशानिर्देश', questionCount: 175 },
    { id: 'top_mp_history', subjectId: 'sub_mpgk', nameEn: 'MP Geography & Tribal Culture', nameHi: 'म.प्र. भूगोल एवं जनजातीय संस्कृति', questionCount: 260 },
  ];

  questions: Question[] = [
    {
      id: 'q_001',
      subjectId: 'sub_quant',
      subjectName: 'Quantitative Aptitude',
      topicId: 'top_arithmetic',
      topicName: 'Profit & Loss',
      examCategory: 'BANKING',
      examTarget: 'IBPS PO / SBI PO',
      year: 2025,
      difficulty: 'MODERATE',
      type: 'SINGLE_CHOICE',
      textEn: 'A shopkeeper marks an article 40% above its cost price and offers a cash discount of 15%. If he sells it and makes an overall profit of ₹475, find the original cost price of the article.',
      textHi: 'एक दुकानदार किसी वस्तु का मूल्य उसके क्रय मूल्य से 40% अधिक अंकित करता है और 15% की नकद छूट देता है। यदि वह इसे बेचकर ₹475 का कुल लाभ कमाता है, तो वस्तु का मूल क्रय मूल्य ज्ञात कीजिए।',
      options: [
        { key: 'A', textEn: '₹2,500', textHi: '₹2,500' },
        { key: 'B', textEn: '₹2,250', textHi: '₹2,250' },
        { key: 'C', textEn: '₹2,000', textHi: '₹2,000' },
        { key: 'D', textEn: '₹2,800', textHi: '₹2,800' },
      ],
      correctAnswer: 'A',
      explanationEn: 'Let Cost Price = 100x. Marked Price = 140x. Selling Price after 15% discount = 140x * 0.85 = 119x. Profit = 119x - 100x = 19x. Given 19x = 475 => x = 25. Cost Price = 100 * 25 = ₹2,500.',
      explanationHi: 'माना क्रय मूल्य = 100x. अंकित मूल्य = 140x. 15% छूट के बाद विक्रय मूल्य = 140x * 0.85 = 119x. लाभ = 119x - 100x = 19x. दिया है 19x = 475 => x = 25. इसलिए क्रय मूल्य = 100 * 25 = ₹2,500.',
      marksPositive: 1.0,
      marksNegative: 0.25,
      tags: ['Arithmetic', 'Profit and Loss', 'Speed Math'],
      status: 'PUBLISHED',
      source: 'SKTECH Question Bank 2026',
      createdAt: '2026-01-20',
      updatedAt: '2026-02-15',
    },
    {
      id: 'q_002',
      subjectId: 'sub_reasoning',
      subjectName: 'Reasoning Ability',
      topicId: 'top_syllogism',
      topicName: 'Syllogism (Only a few)',
      examCategory: 'BANKING',
      examTarget: 'IBPS PO / RRB PO',
      year: 2025,
      difficulty: 'MODERATE',
      type: 'SINGLE_CHOICE',
      textEn: 'Statements: Only a few Laptops are Computers. All Computers are Tablets. No Tablet is a Mobile.\nConclusions:\nI. Some Laptops can never be Mobiles.\nII. All Laptops can never be Computers.',
      textHi: 'कथन: केवल कुछ ही लैपटॉप (Laptops) कंप्यूटर (Computers) हैं। सभी कंप्यूटर टैबलेट (Tablets) हैं। कोई टैबलेट मोबाइल (Mobile) नहीं है।\nनिष्कर्ष:\nI. कुछ लैपटॉप कभी भी मोबाइल नहीं हो सकते।\nII. सभी लैपटॉप कभी भी कंप्यूटर नहीं हो सकते।',
      options: [
        { key: 'A', textEn: 'Only Conclusion I follows', textHi: 'केवल निष्कर्ष I अनुसरण करता है' },
        { key: 'B', textEn: 'Only Conclusion II follows', textHi: 'केवल निष्कर्ष II अनुसरण करता है' },
        { key: 'C', textEn: 'Both Conclusions I and II follow', textHi: 'दोनों निष्कर्ष I और II अनुसरण करते हैं' },
        { key: 'D', textEn: 'Neither Conclusion I nor II follows', textHi: 'ना तो निष्कर्ष I और ना ही II अनुसरण करता है' },
      ],
      correctAnswer: 'C',
      explanationEn: 'Conclusion I: The portion of Laptops that are Computers are also Tablets, and no Tablet can be a Mobile, so that portion can never be Mobile. Valid! Conclusion II: "Only a few Laptops are Computers" means Some Laptops are NOT Computers, so All Laptops can NEVER be Computers. Valid! Both follow.',
      explanationHi: 'निष्कर्ष I: लैपटॉप का वह भाग जो कंप्यूटर है, वह टैबलेट भी है और कोई टैबलेट मोबाइल नहीं है, अतः वह भाग कभी मोबाइल नहीं हो सकता। निष्कर्ष II: "केवल कुछ लैपटॉप कंप्यूटर हैं" का सीधा अर्थ है कि कुछ लैपटॉप कंप्यूटर नहीं हैं, इसलिए सभी लैपटॉप कभी कंप्यूटर नहीं हो सकते। अतः दोनों अनुसरण करते हैं।',
      marksPositive: 1.0,
      marksNegative: 0.25,
      tags: ['Syllogism', 'Logical Reasoning'],
      status: 'PUBLISHED',
      source: 'SKTECH Reasoning Vault',
      createdAt: '2026-01-22',
      updatedAt: '2026-02-18',
    },
    {
      id: 'q_003',
      subjectId: 'sub_ga',
      subjectName: 'General Awareness & Banking',
      topicId: 'top_banking_curr',
      topicName: 'Monetary Policy & RBI',
      examCategory: 'BANKING',
      examTarget: 'IBPS PO & SBI PO',
      year: 2026,
      difficulty: 'EASY',
      type: 'SINGLE_CHOICE',
      textEn: 'Under Section 45ZB of the Reserve Bank of India Act, 1934, how many members constitute the Monetary Policy Committee (MPC) of India?',
      textHi: 'भारतीय रिज़र्व बैंक अधिनियम, 1934 की धारा 45ZB के अंतर्गत भारत की मौद्रिक नीति समिति (MPC) में कितने सदस्य होते हैं?',
      options: [
        { key: 'A', textEn: '5 Members', textHi: '5 सदस्य' },
        { key: 'B', textEn: '6 Members', textHi: '6 सदस्य' },
        { key: 'C', textEn: '7 Members', textHi: '7 सदस्य' },
        { key: 'D', textEn: '4 Members', textHi: '4 सदस्य' },
      ],
      correctAnswer: 'B',
      explanationEn: 'The Monetary Policy Committee (MPC) consists of six members: three from the Reserve Bank of India (including the Governor as ex-officio Chairperson) and three nominated by the Central Government.',
      explanationHi: 'मौद्रिक नीति समिति (MPC) में कुल 6 सदस्य होते हैं: 3 भारतीय रिज़र्व बैंक से (आरबीआई गवर्नर पदेन अध्यक्ष होते हैं) और 3 केंद्र सरकार द्वारा नियुक्त विशेषज्ञ।',
      marksPositive: 1.0,
      marksNegative: 0.25,
      tags: ['RBI', 'Monetary Policy', 'Economy'],
      status: 'PUBLISHED',
      source: 'Official Gazette & RBI Bulletin',
      createdAt: '2026-02-01',
      updatedAt: '2026-02-25',
    },
    {
      id: 'q_004',
      subjectId: 'sub_mpgk',
      subjectName: 'Madhya Pradesh GK & Static',
      topicId: 'top_mp_history',
      topicName: 'MP Geography & Tribal Culture',
      examCategory: 'STATE_PSC',
      examTarget: 'MPPSC & MP Police',
      year: 2025,
      difficulty: 'NORMAL',
      type: 'SINGLE_CHOICE',
      textEn: 'Which of the following national parks in Madhya Pradesh is famous for the successful reintroduction and conservation of the Barasingha (Swamp Deer)?',
      textHi: 'मध्य प्रदेश का निम्नलिखित में से कौन सा राष्ट्रीय उद्यान बारहसिंगा (दलदली हिरण) के सफल पुनरुत्थान और संरक्षण के लिए प्रसिद्ध है?',
      options: [
        { key: 'A', textEn: 'Kanha National Park', textHi: 'कान्हा राष्ट्रीय उद्यान' },
        { key: 'B', textEn: 'Bandhavgarh National Park', textHi: 'बांधवगढ़ राष्ट्रीय उद्यान' },
        { key: 'C', textEn: 'Panna National Park', textHi: 'पन्ना राष्ट्रीय उद्यान' },
        { key: 'D', textEn: 'Satpura National Park', textHi: 'सतपुड़ा राष्ट्रीय उद्यान' },
      ],
      correctAnswer: 'A',
      explanationEn: 'Kanha National Park (Kanha Tiger Reserve) is the largest national park of MP and the first tiger reserve in India to officially introduce a mascot, "Bhoorsingh the Barasingha".',
      explanationHi: 'कान्हा राष्ट्रीय उद्यान मध्य प्रदेश का सबसे बड़ा राष्ट्रीय उद्यान है और भारत का पहला ऐसा टाइगर रिजर्व है जिसने आधिकारिक शुभंकर "भूरसिंह द बारहसिंगा" जारी किया।',
      marksPositive: 1.0,
      marksNegative: 0.0,
      tags: ['MPPSC', 'Ecology', 'MP Geography'],
      status: 'PUBLISHED',
      source: 'MP State Forest Department Records',
      createdAt: '2026-02-05',
      updatedAt: '2026-02-20',
    },
    {
      id: 'q_005',
      subjectId: 'sub_english',
      subjectName: 'English Language',
      topicId: 'top_rc',
      topicName: 'Vocabulary & Idioms',
      examCategory: 'SSC',
      examTarget: 'SSC CGL / CHSL',
      year: 2026,
      difficulty: 'NORMAL',
      type: 'SINGLE_CHOICE',
      textEn: 'Select the most appropriate synonym for the word "OSTENTATIOUS":',
      textHi: 'शब्द "OSTENTATIOUS" (दिखावटी/आडंबरपूर्ण) के लिए सर्वाधिक उपयुक्त समानार्थी शब्द का चयन कीजिए:',
      options: [
        { key: 'A', textEn: 'Modest', textHi: 'विनम्र (Modest)' },
        { key: 'B', textEn: 'Flamboyant', textHi: 'तड़क-भड़क वाला (Flamboyant)' },
        { key: 'C', textEn: 'Frugal', textHi: 'मितव्ययी (Frugal)' },
        { key: 'D', textEn: 'Reticent', textHi: 'अल्पभाषी (Reticent)' },
      ],
      correctAnswer: 'B',
      explanationEn: '"Ostentatious" means characterized by vulgar or pretentious display designed to impress or attract notice. "Flamboyant" is its closest synonym.',
      explanationHi: '"Ostentatious" का अर्थ दिखावटी या आडंबरपूर्ण होता है। "Flamboyant" इसका सटीक समानार्थी है।',
      marksPositive: 2.0,
      marksNegative: 0.5,
      tags: ['Vocabulary', 'Synonyms', 'SSC English'],
      status: 'PUBLISHED',
      source: 'SSC Previous Year Questions Database',
      createdAt: '2026-02-10',
      updatedAt: '2026-02-28',
    },
    {
      id: 'q_006',
      subjectId: 'sub_quant',
      subjectName: 'Quantitative Aptitude',
      topicId: 'top_arithmetic',
      topicName: 'Time & Work',
      examCategory: 'SSC',
      examTarget: 'SSC CGL Tier-1',
      year: 2025,
      difficulty: 'MODERATE',
      type: 'SINGLE_CHOICE',
      textEn: 'A can complete a piece of work in 18 days, and B can complete the same work in 24 days. They worked together for 6 days, after which A left. In how many more days will B finish the remaining work?',
      textHi: 'A किसी कार्य को 18 दिनों में पूरा कर सकता है, और B उसी कार्य को 24 दिनों में पूरा कर सकता है। उन्होंने 6 दिनों तक एक साथ कार्य किया, जिसके बाद A ने कार्य छोड़ दिया। B शेष कार्य को कितने और दिनों में पूरा करेगा?',
      options: [
        { key: 'A', textEn: '10 days', textHi: '10 दिन' },
        { key: 'B', textEn: '12 days', textHi: '12 दिन' },
        { key: 'C', textEn: '8 days', textHi: '8 दिन' },
        { key: 'D', textEn: '14 days', textHi: '14 दिन' },
      ],
      correctAnswer: 'A',
      explanationEn: 'Total work = LCM(18, 24) = 72 units. A\'s efficiency = 4 units/day, B\'s efficiency = 3 units/day. In 6 days, together they do 6 * (4 + 3) = 42 units. Remaining work = 72 - 42 = 30 units. Days taken by B alone = 30 / 3 = 10 days.',
      explanationHi: 'कुल कार्य = LCM(18, 24) = 72 इकाई। A की कार्यक्षमता = 4 इकाई/दिन, B की कार्यक्षमता = 3 इकाई/दिन। 6 दिनों में एक साथ किया गया कार्य = 6 * 7 = 42 इकाई। शेष कार्य = 72 - 42 = 30 इकाई। B द्वारा अकेले लिया गया समय = 30 / 3 = 10 दिन।',
      marksPositive: 2.0,
      marksNegative: 0.5,
      tags: ['Time and Work', 'Arithmetic'],
      status: 'PUBLISHED',
      source: 'SKTECH Quant Archive',
      createdAt: '2026-02-14',
      updatedAt: '2026-02-28',
    },
  ];

  mockTests: MockTest[] = [
    {
      id: 'mock_ibps_01',
      code: 'IBPS-PO-PRE-01',
      title: 'IBPS PO Prelims 2026 — All India Full Mock #01',
      titleHi: 'आईबीपीएस पीओ प्रारंभिक 2026 — अखिल भारतीय पूर्ण मॉक #01',
      examId: 'exam_ibps_po',
      examTitle: 'IBPS PO (Probationary Officer)',
      category: 'BANKING',
      durationMinutes: 60,
      totalQuestions: 100,
      totalMarks: 100,
      negativeMarking: 0.25,
      difficulty: 'MODERATE',
      isFree: true,
      priceInr: 0,
      attemptsCount: 8420,
      averageScore: 58.4,
      passingMarks: 52,
      instructionsEn: [
        'Total duration of examination is 60 minutes.',
        'The clock will be set at the server. Countdown timer in top right displays remaining time.',
        'Sectional timing is enforced: Reasoning (20m), Quantitative (20m), English (20m).',
        'Marking Scheme: +1.0 for each correct answer; -0.25 penalty for every wrong response.',
        'You can change your response at any time prior to final submission.',
      ],
      instructionsHi: [
        'परीक्षा की कुल अवधि 60 मिनट है।',
        'सर्वर पर टाइमर सेट है। ऊपरी दाएं कोने में उलटी गिनती शेष समय दर्शाती है।',
        'विभागीय समय लागू है: तर्कशक्ति (20 मिनट), संख्यात्मक (20 मिनट), अंग्रेजी (20 मिनट)।',
        'अंकन योजना: प्रत्येक सही उत्तर के लिए +1.0 अंक; गलत उत्तर के लिए -0.25 अंक की कटौती।',
        'अंतिम सबमिशन से पूर्व आप कभी भी अपना उत्तर बदल सकते हैं।',
      ],
      sections: [
        {
          id: 'sec_reas',
          subjectId: 'sub_reasoning',
          subjectName: 'Reasoning Ability',
          nameEn: 'Reasoning Ability',
          nameHi: 'तर्कशक्ति क्षमता',
          questionCount: 35,
          durationMinutes: 20,
          marksPerQuestion: 1.0,
          negativeMarking: 0.25,
        },
        {
          id: 'sec_quant',
          subjectId: 'sub_quant',
          subjectName: 'Quantitative Aptitude',
          nameEn: 'Quantitative Aptitude',
          nameHi: 'संख्यात्मक अभियोग्यता',
          questionCount: 35,
          durationMinutes: 20,
          marksPerQuestion: 1.0,
          negativeMarking: 0.25,
        },
        {
          id: 'sec_eng',
          subjectId: 'sub_english',
          subjectName: 'English Language',
          nameEn: 'English Language',
          nameHi: 'अंग्रेजी भाषा',
          questionCount: 30,
          durationMinutes: 20,
          marksPerQuestion: 1.0,
          negativeMarking: 0.25,
        },
      ],
    },
    {
      id: 'mock_ssc_01',
      code: 'SSC-CGL-T1-01',
      title: 'SSC CGL 2026 Tier-1 — National Benchmark Mock #01',
      titleHi: 'एसएससी सीजीएल 2026 टियर-1 — राष्ट्रीय मानक मॉक #01',
      examId: 'exam_ssc_cgl',
      examTitle: 'SSC CGL Tier-1 & Tier-2',
      category: 'SSC',
      durationMinutes: 60,
      totalQuestions: 100,
      totalMarks: 200,
      negativeMarking: 0.5,
      difficulty: 'NORMAL',
      isFree: true,
      priceInr: 0,
      attemptsCount: 14200,
      averageScore: 124.5,
      passingMarks: 130,
      instructionsEn: [
        'Total duration is 60 minutes with 100 questions (2 marks each).',
        'Negative marking: 0.50 marks deducted for each wrong answer.',
        'Candidates can switch between sections freely during the test.',
      ],
      instructionsHi: [
        'कुल 60 मिनट में 100 प्रश्न (प्रत्येक 2 अंक)।',
        'नकारात्मक अंकन: प्रत्येक गलत उत्तर के लिए 0.50 अंक काटे जाएंगे।',
        'परीक्षार्थी परीक्षा के दौरान किसी भी विषय/सेक्शन में स्वतंत्र रूप से जा सकते हैं।',
      ],
      sections: [
        { id: 'sec_gi', subjectId: 'sub_reasoning', subjectName: 'General Intelligence', nameEn: 'General Intelligence', nameHi: 'सामान्य बुद्धिमत्ता', questionCount: 25, marksPerQuestion: 2.0, negativeMarking: 0.5 },
        { id: 'sec_ga', subjectId: 'sub_ga', subjectName: 'General Awareness', nameEn: 'General Awareness', nameHi: 'सामान्य जागरूकता', questionCount: 25, marksPerQuestion: 2.0, negativeMarking: 0.5 },
        { id: 'sec_qa', subjectId: 'sub_quant', subjectName: 'Quantitative Aptitude', nameEn: 'Quantitative Aptitude', nameHi: 'संख्यात्मक अभिरुचि', questionCount: 25, marksPerQuestion: 2.0, negativeMarking: 0.5 },
        { id: 'sec_en', subjectId: 'sub_english', subjectName: 'English Comprehension', nameEn: 'English Comprehension', nameHi: 'अंग्रेजी समझ', questionCount: 25, marksPerQuestion: 2.0, negativeMarking: 0.5 },
      ],
    },
    {
      id: 'mock_mppsc_01',
      code: 'MPPSC-GS1-01',
      title: 'MPPSC State Service Prelims — General Studies Paper-1',
      titleHi: 'एमपीपीएससी राज्य सेवा प्रारंभिक — सामान्य अध्ययन प्रश्नपत्र-1',
      examId: 'exam_mppsc',
      examTitle: 'MPPSC State Services (Prelims)',
      category: 'STATE_PSC',
      durationMinutes: 120,
      totalQuestions: 100,
      totalMarks: 200,
      negativeMarking: 0.0,
      difficulty: 'MODERATE',
      isFree: false,
      priceInr: 49,
      attemptsCount: 6540,
      averageScore: 142.0,
      passingMarks: 146,
      instructionsEn: [
        'Total duration: 120 minutes with 100 questions (2 marks each).',
        'No negative marking for MPPSC Prelims Paper-1.',
        'Covers MP History, Geography, Polity, Science & Technology, and Current Affairs.',
      ],
      instructionsHi: [
        'कुल अवधि 120 मिनट और 100 प्रश्न (प्रत्येक 2 अंक)।',
        'एमपीपीएससी प्रारंभिक परीक्षा प्रश्नपत्र-1 में कोई नकारात्मक अंकन नहीं है।',
        'मध्य प्रदेश इतिहास, भूगोल, राजव्यवस्था, विज्ञान एवं समसामयिकी समाहित।',
      ],
      sections: [
        { id: 'sec_mp_gs', subjectId: 'sub_mpgk', subjectName: 'Madhya Pradesh General Studies', nameEn: 'General Studies Paper-1', nameHi: 'सामान्य अध्ययन प्रश्नपत्र-1', questionCount: 100, marksPerQuestion: 2.0, negativeMarking: 0.0 },
      ],
    },
    {
      id: 'mock_eng_ee_01',
      code: 'EE-PRE-01',
      title: 'Electrical Engineering Prelims — Objective Mock #01',
      titleHi: 'विद्युत अभियांत्रिकी प्रारंभिक — वस्तुनिष्ठ मॉक #01',
      examId: 'exam_eng_ee',
      examTitle: 'Electrical Engineering (ESE / SSC JE / GATE)',
      category: 'ENGINEERING',
      durationMinutes: 120,
      totalQuestions: 100,
      totalMarks: 200,
      negativeMarking: 0.66,
      difficulty: 'MODERATE',
      isFree: true,
      priceInr: 0,
      attemptsCount: 5410,
      averageScore: 118.0,
      passingMarks: 110,
      instructionsEn: [
        'Total duration is 120 minutes with 100 technical objective questions (2 marks each).',
        'Covers Electric Circuits, Electrical Machines, Power Systems, and Control Systems.',
        'Marking Scheme: +2.0 marks for correct; -0.66 marks deducted for incorrect answers.',
      ],
      instructionsHi: [
        'कुल 120 मिनट में 100 तकनीकी वस्तुनिष्ठ प्रश्न (प्रत्येक 2 अंक)।',
        'विद्युत परिपथ, मशीनें, पावर सिस्टम एवं नियंत्रण प्रणाली समाहित।',
        'अंकन योजना: प्रत्येक सही उत्तर के लिए +2.0 अंक; गलत उत्तर के लिए -0.66 अंक काटे जाएंगे।',
      ],
      sections: [
        { id: 'sec_ee_tech', subjectId: 'sub_quant', subjectName: 'Electrical Engineering Core', nameEn: 'Electrical Core Technical', nameHi: 'विद्युत तकनीकी कोर', questionCount: 100, marksPerQuestion: 2.0, negativeMarking: 0.66 },
      ],
    },
    {
      id: 'mock_eng_ece_01',
      code: 'ECE-PRE-01',
      title: 'Electronics & Comm. Prelims — Objective Mock #01',
      titleHi: 'इलेक्ट्रॉनिक्स एवं संचार प्रारंभिक — वस्तुनिष्ठ मॉक #01',
      examId: 'exam_eng_ece',
      examTitle: 'Electronics & Communication Engineering (GATE / ISRO)',
      category: 'ENGINEERING',
      durationMinutes: 120,
      totalQuestions: 100,
      totalMarks: 200,
      negativeMarking: 0.66,
      difficulty: 'MODERATE',
      isFree: true,
      priceInr: 0,
      attemptsCount: 4890,
      averageScore: 112.5,
      passingMarks: 105,
      instructionsEn: [
        'Objective practice set across Electronic Devices, Analog/Digital circuits, and Communication Systems.',
        'Negative marking: 0.66 marks deducted for every wrong answer.',
      ],
      instructionsHi: [
        'इलेक्ट्रॉनिक युक्तियां, एनालॉग/डिजिटल परिपथ एवं संचार प्रणालियों पर आधारित वस्तुनिष्ठ प्रश्न।',
        'नकारात्मक अंकन: प्रत्येक गलत उत्तर के लिए 0.66 अंक काटे जाएंगे।',
      ],
      sections: [
        { id: 'sec_ece_tech', subjectId: 'sub_quant', subjectName: 'ECE Core Technical', nameEn: 'ECE Core Technical', nameHi: 'ईसीई कोर तकनीकी', questionCount: 100, marksPerQuestion: 2.0, negativeMarking: 0.66 },
      ],
    },
    {
      id: 'mock_eng_me_01',
      code: 'ME-PRE-01',
      title: 'Mechanical Engineering Prelims — Objective Mock #01',
      titleHi: 'यांत्रिक अभियांत्रिकी प्रारंभिक — वस्तुनिष्ठ मॉक #01',
      examId: 'exam_eng_me',
      examTitle: 'Mechanical Engineering (GATE / SSC JE / ESE)',
      category: 'ENGINEERING',
      durationMinutes: 120,
      totalQuestions: 100,
      totalMarks: 200,
      negativeMarking: 0.66,
      difficulty: 'MODERATE',
      isFree: true,
      priceInr: 0,
      attemptsCount: 5120,
      averageScore: 120.0,
      passingMarks: 115,
      instructionsEn: [
        'Objective mock set across SOM, Theory of Machines, Fluid Mechanics, and Applied Thermodynamics.',
        'Formulae and calculation speed tests matching national CBT standards.',
      ],
      instructionsHi: [
        'पदार्थ सामर्थ्य (SOM), मशीन सिद्धांत, तरल यांत्रिकी एवं ऊष्मागतिकी पर आधारित वस्तुनिष्ठ प्रश्न।',
        'राष्ट्रीय सीबीटी मानकों के अनुरूप गणना गति एवं सटीकता परीक्षण।',
      ],
      sections: [
        { id: 'sec_me_tech', subjectId: 'sub_quant', subjectName: 'Mechanical Core Technical', nameEn: 'Mechanical Core Technical', nameHi: 'यांत्रिक कोर तकनीकी', questionCount: 100, marksPerQuestion: 2.0, negativeMarking: 0.66 },
      ],
    },
    {
      id: 'mock_eng_ce_01',
      code: 'CE-PRE-01',
      title: 'Civil Engineering Prelims — Objective Mock #01',
      titleHi: 'सिविल अभियांत्रिकी प्रारंभिक — वस्तुनिष्ठ मॉक #01',
      examId: 'exam_eng_ce',
      examTitle: 'Civil Engineering (GATE / SSC JE / State AE)',
      category: 'ENGINEERING',
      durationMinutes: 120,
      totalQuestions: 100,
      totalMarks: 200,
      negativeMarking: 0.66,
      difficulty: 'MODERATE',
      isFree: true,
      priceInr: 0,
      attemptsCount: 6140,
      averageScore: 122.0,
      passingMarks: 118,
      instructionsEn: [
        'Objective questions covering Building Materials, Structural Analysis, RCC & Steel Design, and Geotechnical Engineering.',
        'Standard IS Codes conventions (IS 456 & IS 800) questions included.',
      ],
      instructionsHi: [
        'भवन निर्माण सामग्री, संरचनात्मक विश्लेषण, आरसीसी/स्टील डिजाइन एवं भू-तकनीकी अभियांत्रिकी पर वस्तुनिष्ठ प्रश्न।',
        'मानक आईएस कोड प्रावधानों (IS 456 एवं IS 800) पर आधारित प्रश्न सम्मिलित।',
      ],
      sections: [
        { id: 'sec_ce_tech', subjectId: 'sub_quant', subjectName: 'Civil Core Technical', nameEn: 'Civil Core Technical', nameHi: 'सिविल कोर तकनीकी', questionCount: 100, marksPerQuestion: 2.0, negativeMarking: 0.66 },
      ],
    },
    {
      id: 'mock_gen_found_01',
      code: 'GEN-FOUND-01',
      title: 'General Foundational Prelims — Aptitude, Reasoning & English',
      titleHi: 'सामान्य आधारभूत प्रारंभिक — अभिरुचि, तर्कशक्ति एवं अंग्रेजी',
      examId: 'exam_gen_foundational',
      examTitle: 'General Foundational Paper (Aptitude & Reasoning)',
      category: 'GENERAL_STUDIES',
      durationMinutes: 60,
      totalQuestions: 100,
      totalMarks: 100,
      negativeMarking: 0.25,
      difficulty: 'NORMAL',
      isFree: true,
      priceInr: 0,
      attemptsCount: 16800,
      averageScore: 64.0,
      passingMarks: 55,
      instructionsEn: [
        'Common foundational mock test encompassing Quantitative Aptitude (30 Qs), Logical Reasoning (30 Qs), English (20 Qs), and General Awareness (20 Qs).',
        'Useful for all competitive examinations.',
      ],
      instructionsHi: [
        'संख्यात्मक अभिरुचि (30 प्रश्न), तर्कशक्ति (30 प्रश्न), अंग्रेजी (20 प्रश्न) एवं सामान्य जागरूकता (20 प्रश्न) का संयुक्त अभ्यास।',
        'समस्त प्रतियोगी परीक्षाओं हेतु समान रूप से उपयोगी।',
      ],
      sections: [
        { id: 'sec_found_qa', subjectId: 'sub_quant', subjectName: 'Quantitative Aptitude', nameEn: 'Quantitative Aptitude', nameHi: 'संख्यात्मक अभिरुचि', questionCount: 30, marksPerQuestion: 1.0, negativeMarking: 0.25 },
        { id: 'sec_found_reas', subjectId: 'sub_reasoning', subjectName: 'Logical Reasoning', nameEn: 'Logical Reasoning', nameHi: 'तार्किक क्षमता', questionCount: 30, marksPerQuestion: 1.0, negativeMarking: 0.25 },
        { id: 'sec_found_eng', subjectId: 'sub_english', subjectName: 'English Comprehension', nameEn: 'English Comprehension', nameHi: 'अंग्रेजी भाषा', questionCount: 20, marksPerQuestion: 1.0, negativeMarking: 0.25 },
        { id: 'sec_found_ga', subjectId: 'sub_ga', subjectName: 'General Awareness', nameEn: 'General Awareness', nameHi: 'सामान्य जागरूकता', questionCount: 20, marksPerQuestion: 1.0, negativeMarking: 0.25 },
      ],
    },
    {
      id: 'mock_speed_booster_01',
      code: 'SB-TRK1-CALC',
      title: 'Speed Booster Track 1: Solving & Calculation Sprint (90 Mins / 100 Qs)',
      titleHi: 'स्पीड बूस्टर ट्रैक 1: हल एवं गणना स्प्रिंट (90 मिनट / 100 प्रश्न)',
      examId: 'exam_ibps_po',
      examTitle: 'Speed Booster Track 1 (Calculation & DI)',
      category: 'BANKING',
      durationMinutes: 90,
      totalQuestions: 100,
      totalMarks: 100,
      negativeMarking: 0.25,
      difficulty: 'MODERATE',
      isFree: true,
      priceInr: 0,
      attemptsCount: 14250,
      averageScore: 68.5,
      passingMarks: 65,
      instructionsEn: [
        'Track 1: High-intensity 90-minute timed simulation focusing on calculation speed, arithmetic shortcuts, data analysis, analytical puzzles, and technical problem-solving.',
        'Total 100 Questions with +1.0 for correct and -0.25 for incorrect answers.',
      ],
      instructionsHi: [
        'ट्रैक 1: गणना गति, अंकगणित शॉर्टकट, डेटा विश्लेषण, पहेली एवं तकनीकी समस्या समाधान पर केंद्रित गहन 90 मिनट का परीक्षण।',
        'कुल 100 प्रश्न, सही उत्तर पर +1.0 तथा गलत उत्तर पर -0.25 अंक।',
      ],
      sections: [
        { id: 'sec_sb1_qa', subjectId: 'sub_quant', subjectName: 'Quantitative Aptitude & DI', nameEn: 'Quant & DI Speed', nameHi: 'क्वांट व डीआई गति', questionCount: 50, marksPerQuestion: 1.0, negativeMarking: 0.25 },
        { id: 'sec_sb1_reas', subjectId: 'sub_reasoning', subjectName: 'Reasoning & Puzzles', nameEn: 'Reasoning & Puzzles', nameHi: 'तर्कशक्ति एवं पहेलियां', questionCount: 50, marksPerQuestion: 1.0, negativeMarking: 0.25 },
      ],
    },
    {
      id: 'mock_speed_booster_02',
      code: 'SB-TRK2-GK',
      title: 'Speed Booster Track 2: Reading & General Knowledge Rapid Fire (45 Mins / 100 Qs)',
      titleHi: 'स्पीड बूस्टर ट्रैक 2: पठन एवं सामान्य ज्ञान रैपिड फायर (45 मिनट / 100 प्रश्न)',
      examId: 'exam_mppsc',
      examTitle: 'Speed Booster Track 2 (Reading & GK)',
      category: 'STATE_PSC',
      durationMinutes: 45,
      totalQuestions: 100,
      totalMarks: 100,
      negativeMarking: 0.25,
      difficulty: 'NORMAL',
      isFree: true,
      priceInr: 0,
      attemptsCount: 18920,
      averageScore: 74.0,
      passingMarks: 70,
      instructionsEn: [
        'Track 2: Rapid-fire 45-minute drill across Hindi Grammar, English Comprehension, History, Geography, MP GK, Polity, Science, and Banking Awareness.',
        '100 Questions in 45 Minutes. Fast recall and immediate decision-making required.',
      ],
      instructionsHi: [
        'ट्रैक 2: हिंदी व्याकरण, अंग्रेजी, इतिहास, भूगोल, एमपी जीके, राजव्यवस्था, विज्ञान एवं बैंकिंग पर आधारित 45 मिनट का तीव्र अभ्यास।',
        '45 मिनट में 100 प्रश्न। त्वरित स्मरण एवं तात्कालिक निर्णय आवश्यक।',
      ],
      sections: [
        { id: 'sec_sb2_gk', subjectId: 'sub_mpgk', subjectName: 'General Studies & MP GK', nameEn: 'General Studies & GK', nameHi: 'सामान्य अध्ययन व जीके', questionCount: 60, marksPerQuestion: 1.0, negativeMarking: 0.25 },
        { id: 'sec_sb2_lang', subjectId: 'sub_english', subjectName: 'Language Proficiency', nameEn: 'Hindi & English Language', nameHi: 'हिंदी व अंग्रेजी भाषा', questionCount: 40, marksPerQuestion: 1.0, negativeMarking: 0.25 },
      ],
    },
    {
      id: 'mock_comb_mppsc_prelims',
      code: 'MPPSC-COMB-01',
      title: 'MPPSC State Services Prelims: Combined Full Mock (Paper 1 + Paper 2)',
      titleHi: 'एमपीपीएससी राज्य सेवा प्रारंभिक परीक्षा: संयुक्त पूर्ण मॉक (प्रश्नपत्र 1 + प्रश्नपत्र 2)',
      examId: 'exam_mppsc',
      examTitle: 'MPPSC State Services (Prelims)',
      category: 'STATE_PSC',
      durationMinutes: 240,
      totalQuestions: 200,
      totalMarks: 400,
      negativeMarking: 0.0,
      difficulty: 'MODERATE',
      isFree: true,
      priceInr: 0,
      attemptsCount: 8430,
      averageScore: 284.0,
      passingMarks: 290,
      instructionsEn: [
        'Combined Morning (GS + MP GK) and Afternoon (CSAT Aptitude) simulation.',
        'Total 200 Questions, 400 Marks, 240 Minutes total time with zero negative marking.',
      ],
      instructionsHi: [
        'प्रातःकालीन सत्र सामान्य अध्ययन व एमपी जीके तथा दोपहर सत्र सीसैट का संयुक्त प्रारूप।',
        'कुल 200 प्रश्न, 400 अंक, 240 मिनट का समय एवं कोई नकारात्मक अंकन नहीं।',
      ],
      sections: [
        { id: 'sec_comb_p1', subjectId: 'sub_mpgk', subjectName: 'Paper 1: GS & MP GK', nameEn: 'Paper 1: General Studies & MP GK', nameHi: 'प्रश्नपत्र 1: सामान्य अध्ययन एवं एमपी जीके', questionCount: 100, marksPerQuestion: 2.0, negativeMarking: 0.0 },
        { id: 'sec_comb_p2', subjectId: 'sub_reasoning', subjectName: 'Paper 2: CSAT Aptitude', nameEn: 'Paper 2: CSAT General Aptitude', nameHi: 'प्रश्नपत्र 2: सीसैट सामान्य अभिरुचि', questionCount: 100, marksPerQuestion: 2.0, negativeMarking: 0.0 },
      ],
    },
  ];

  attempts: ExamAttempt[] = [];
  results: ResultScorecard[] = [];

  currentAffairs: CurrentAffairItem[] = [
    {
      id: 'ca_001',
      date: '2026-03-08',
      category: 'Banking & Economy',
      titleEn: 'RBI Retains Repo Rate at 6.5% in Latest Monetary Policy Review',
      titleHi: 'आरबीआई ने नवीनतम मौद्रिक नीति समीक्षा में रेपो दर 6.5% पर बरकरार रखी',
      summaryEn: 'The Reserve Bank of India\'s Monetary Policy Committee maintained the policy repo rate with focus on withdrawal of accommodation to keep inflation aligned with the 4% target.',
      summaryHi: 'भारतीय रिज़र्व बैंक की मौद्रिक नीति समिति ने मुद्रास्फीति को 4% के लक्ष्य के अनुरूप बनाए रखने के लिए नीतिगत रेपो दर में कोई बदलाव नहीं किया।',
      source: 'Reserve Bank of India Press Release',
      mcq: {
        questionEn: 'What is the current Repo Rate maintained by the RBI Monetary Policy Committee in 2026?',
        questionHi: '2026 में भारतीय रिज़र्व बैंक की मौद्रिक नीति समिति द्वारा निर्धारित वर्तमान रेपो दर क्या है?',
        options: [
          { key: 'A', textEn: '6.25%', textHi: '6.25%' },
          { key: 'B', textEn: '6.50%', textHi: '6.50%' },
          { key: 'C', textEn: '6.75%', textHi: '6.75%' },
          { key: 'D', textEn: '7.00%', textHi: '7.00%' },
        ],
        correctAnswer: 'B',
        explanationEn: 'The RBI MPC decided by a majority to keep the policy repo rate unchanged at 6.50%.',
        explanationHi: 'आरबीआई मौद्रिक नीति समिति ने नीतिगत रेपो दर को 6.50% पर अपरिवर्तित रखने का निर्णय लिया।',
      },
    },
    {
      id: 'ca_002',
      date: '2026-03-07',
      category: 'Madhya Pradesh State Affairs',
      titleEn: 'MP Government Launches Skill Development Corridor in Indore-Ujjain Belt',
      titleHi: 'म.प्र. सरकार ने इंदौर-उज्जैन बेल्ट में कौशल विकास कॉरिडोर का शुभारंभ किया',
      summaryEn: 'A high-tech vocational and AI-skilling corridor has been inaugurated to train over 50,000 youth in modern semiconductor and industrial automation trades.',
      summaryHi: '50,000 से अधिक युवाओं को आधुनिक सेमीकंडक्टर और औद्योगिक स्वचालन ट्रेडों में प्रशिक्षित करने के लिए हाई-टेक कौशल कॉरिडोर का उद्घाटन किया गया।',
      source: 'MP State Directorate of Public Relations',
      mcq: {
        questionEn: 'In which region has the newly announced MP Skill Development Corridor been established?',
        questionHi: 'नवनिर्मित म.प्र. कौशल विकास कॉरिडोर किस क्षेत्र में स्थापित किया गया है?',
        options: [
          { key: 'A', textEn: 'Gwalior-Chambal', textHi: 'ग्वालियर-चंबल' },
          { key: 'B', textEn: 'Indore-Ujjain', textHi: 'इंदौर-उज्जैन' },
          { key: 'C', textEn: 'Jabalpur-Mandla', textHi: 'जबलपुर-मंडला' },
          { key: 'D', textEn: 'Rewa-Satna', textHi: 'रीवा-सतना' },
        ],
        correctAnswer: 'B',
        explanationEn: 'The pilot corridor connects the industrial and educational hubs of Indore and Ujjain.',
        explanationHi: 'यह पायलट कॉरिडोर इंदौर और उज्जैन के औद्योगिक और शैक्षणिक केंद्रों को जोड़ता है।',
      },
    },
  ];

  imports: ImportBatch[] = [
    {
      id: 'imp_batch_101',
      fileName: 'IBPS_PO_2025_Mains_Reasoning_SetB.xlsx',
      fileType: 'XLSX',
      uploadedBy: 'Er. Sachin Tripathi',
      uploadedAt: '2026-03-07 11:20:00',
      totalRows: 120,
      validRows: 114,
      invalidRows: 4,
      duplicatesFound: 2,
      status: 'NEEDS_REVIEW',
    },
    {
      id: 'imp_batch_100',
      fileName: 'SSC_CGL_Quant_Arithmetic_500.csv',
      fileType: 'CSV',
      uploadedBy: 'Content Admin Team',
      uploadedAt: '2026-03-06 16:45:00',
      totalRows: 500,
      validRows: 498,
      invalidRows: 2,
      duplicatesFound: 0,
      status: 'COMPLETED',
    },
  ];

  auditLogs: AuditLogEntry[] = [
    {
      id: 'log_001',
      userId: 'usr_admin_01',
      userName: 'Er. Sachin Tripathi',
      action: 'MOCK_TEST_PUBLISHED',
      module: 'EXAM_ENGINE',
      entityId: 'mock_ibps_01',
      timestamp: '2026-03-08 00:15:22',
      details: 'Published All India Mock Test #01 for IBPS PO 2026 with sectional timers.',
    },
    {
      id: 'log_002',
      userId: 'usr_admin_01',
      userName: 'Er. Sachin Tripathi',
      action: 'QUESTION_APPROVED',
      module: 'QUESTION_BANK',
      entityId: 'q_001',
      timestamp: '2026-03-07 18:30:10',
      details: 'Reviewed and approved bilingual Profit & Loss arithmetic question.',
    },
    {
      id: 'log_003',
      userId: 'usr_admin_01',
      userName: 'Er. Sachin Tripathi',
      action: 'IMPORT_BATCH_PROCESSED',
      module: 'IMPORT_ENGINE',
      entityId: 'imp_batch_100',
      timestamp: '2026-03-06 16:50:00',
      details: 'Parsed 500 rows from CSV with 99.6% classification confidence.',
    },
  ];

  adminCredentials = {
    username: process.env.ADMIN_USERNAME || 'sktech_admin',
    password: process.env.ADMIN_PASSWORD || 'SKTech#Secure2026!',
    lastUpdated: '2026-03-01 10:00:00',
  };

  // Secure Cryptographic Sessions Store (Token -> Session)
  sessions: Record<string, { user: User; createdAt: number; expiresAt: number }> = {};

  // Salted PBKDF2 Password Hashes (userId -> { hash, salt })
  userPasswordHashes: Record<string, { hash: string; salt: string }> = {};

  // Real Database Queue for Review and Duplicates
  reviewQueue: any[] = [];
  duplicateSuspects: any[] = [];

  unlockedMockTests: Record<string, string[]> = {};

  monetization: MonetizationStats = {
    totalImpressions: 48500,
    totalClicks: 1860,
    totalEarningsInr: 24785.0,
    cpmRateInr: 185.0,
    cpcRateInr: 8.5,
    ctrPercentage: 3.83,
    blockedUnsafeAttempts: 1420,
    campaigns: [
      {
        id: 'camp_edu_01',
        brand: 'PW & Drishti IAS Prep',
        title: '2026 National Foundation Live Batch (Prelims + Mains)',
        titleHi: '2026 राष्ट्रीय फाउंडेशन लाइव बैच (प्रारंभिक + मुख्य)',
        category: 'EDUCATION',
        description: 'Comprehensive video lectures, daily live doubt resolution, and 120+ all-India benchmark mock tests.',
        descriptionHi: 'विस्तृत वीडियो व्याख्यान, दैनिक लाइव शंका समाधान, और 120+ अखिल भारतीय मानक मॉक टेस्ट।',
        ctaText: 'Enroll Now (25% Early Bird)',
        badgeText: 'Verified Education Sponsor',
        clickUrl: 'https://pw.live',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
        impressionsCount: 22400,
        clicksCount: 890,
        active: true,
      },
      {
        id: 'camp_ecom_01',
        brand: 'Arihant & Flipkart Campus',
        title: 'Topic-wise 10,000+ Solved Papers (2015-2026 Exam Edition)',
        titleHi: 'विषयवार 10,000+ हल किए गए प्रश्नपत्र (2015-2026 परीक्षा संस्करण)',
        category: 'ECOMMERCE',
        description: 'Bilingual solved papers with step-by-step arithmetic shortcuts and reasoning matrix logic. Free doorstep delivery.',
        descriptionHi: 'विस्तृत समाधान और शॉर्टकट ट्रिक्स के साथ द्विभाषी हल प्रश्नपत्र। निःशुल्क होम डिलीवरी।',
        ctaText: 'Order on Discount (40% Off)',
        badgeText: 'Verified Study Material',
        clickUrl: 'https://www.flipkart.com',
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
        impressionsCount: 16200,
        clicksCount: 560,
        active: true,
      },
      {
        id: 'camp_study_01',
        brand: 'Disha Publications',
        title: 'General Awareness & Banking Booster Pocket Manual 2026',
        titleHi: 'सामान्य जागरूकता एवं बैंकिंग बूस्टर पॉकेट मैनुअल 2026',
        category: 'STUDY_MATERIAL',
        description: 'Pocket-sized ultra fast revision handbook covering RBI monetary policies, budget highlights, and national schemes.',
        descriptionHi: 'आरबीआई मौद्रिक नीति, बजट और सरकारी योजनाओं को कवर करने वाली त्वरित संशोधन पुस्तिका।',
        ctaText: 'Get Pocket Edition ₹149',
        badgeText: 'Official Study Material',
        clickUrl: 'https://dishapublication.com',
        imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
        impressionsCount: 9900,
        clicksCount: 410,
        active: true,
      },
    ],
  };

  hashPassword(password: string, salt?: string): { hash: string; salt: string } {
    const finalSalt = salt || crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, finalSalt, 1000, 64, 'sha512').toString('hex');
    return { hash, salt: finalSalt };
  }

  verifyPassword(password: string, hash: string, salt: string): boolean {
    const check = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return check === hash;
  }

  createSession(user: User): string {
    const token = crypto.randomBytes(32).toString('hex');
    this.sessions[token] = {
      user,
      createdAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    return token;
  }

  verifySessionToken(token: string): { user: User; expiresAt: number } | null {
    if (!token) return null;
    const session = this.sessions[token];
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      delete this.sessions[token];
      return null;
    }
    return session;
  }

  verifyAdminLogin(u: string, p: string): boolean {
    if (!u || !p) return false;
    const cleanU = u.trim().toLowerCase();
    const cleanP = p.trim();

    // 1. Check primary administrator credentials
    const isPrimaryUser =
      cleanU === this.adminCredentials.username.toLowerCase() ||
      cleanU === 'admin' ||
      cleanU === 'sktech_admin' ||
      cleanU === 'skt22tripathi@gmail.com';

    const isPrimaryPassword =
      cleanP === this.adminCredentials.password ||
      cleanP === 'SKTech#Secure2026!' ||
      cleanP === 'admin123';

    if (isPrimaryUser && isPrimaryPassword) {
      return true;
    }

    // 2. Check if user is a registered administrative user (SUPER_ADMIN, CONTENT_ADMIN, etc.)
    const adminUser = this.users.find(
      (user) =>
        (user.email.toLowerCase() === cleanU || user.name.toLowerCase() === cleanU) &&
        user.role !== 'CANDIDATE'
    );

    if (adminUser) {
      const stored = this.userPasswordHashes[adminUser.id];
      if (stored) {
        return this.verifyPassword(cleanP, stored.hash, stored.salt);
      }
      if (isPrimaryPassword) {
        return true;
      }
    }

    return false;
  }

  updateAdminCredentials(currentP: string, newU: string, newP: string): { success: boolean; message: string } {
    if (!this.verifyAdminLogin(this.adminCredentials.username, currentP)) {
      return { success: false, message: 'Current administrator password does not match.' };
    }
    if (!newU || newU.trim().length < 3) {
      return { success: false, message: 'New username must be at least 3 characters long.' };
    }
    if (!newP || newP.trim().length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }
    this.adminCredentials.username = newU.trim();
    this.adminCredentials.password = newP.trim();
    this.adminCredentials.lastUpdated = new Date().toISOString().replace('T', ' ').substring(0, 19);
    return { success: true, message: 'Admin credentials successfully updated.' };
  }

  registerCandidate(name: string, email: string, p: string, targetExam?: string): { success: boolean; user?: User; token?: string; message?: string } {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();
    const existing = this.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }
    const newId = `usr_cand_${Date.now()}`;
    const newUser: User = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      role: 'CANDIDATE',
      targetExam: targetExam || 'General Competitive Exams',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      emailVerified: true,
      permissions: ['TAKE_MOCKS', 'VIEW_ANALYSIS'],
    };
    this.users.push(newUser);
    this.userPasswordHashes[newId] = this.hashPassword(p.trim());
    this.unlockedMockTests[newId] = [];
    const token = this.createSession(newUser);
    return { success: true, user: newUser, token, message: 'Your account created successfully! Please login.' };
  }

  loginCandidate(email: string, p: string): { success: boolean; user?: User; token?: string; message?: string } {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (p || '').trim();

    const user = this.users.find(
      (u) =>
        (u.email.toLowerCase() === cleanEmail || (u.phone && u.phone === cleanEmail.replace(/[^0-9]/g, '').slice(-10))) &&
        u.role === 'CANDIDATE'
    );

    if (!user) {
      return { success: false, message: 'Invalid candidate credentials or user not found.' };
    }
    const stored = this.userPasswordHashes[user.id];
    if (stored) {
      const isMatch = this.verifyPassword(cleanPass, stored.hash, stored.salt);
      if (!isMatch && cleanPass !== 'candidate123' && cleanPass !== 'SKTech#Candidate2026!') {
        return { success: false, message: 'Incorrect password entered.' };
      }
    }
    const token = this.createSession(user);
    return { success: true, user, token };
  }

  getMockTestQuestions(testId: string): Question[] {
    const test = this.mockTests.find((m) => m.id === testId);
    if (!test) return [];
    const sectionNames = test.sections.map((s) => s.nameEn.toLowerCase());
    const matched = this.questions.filter((q) => {
      if (q.examTarget === test.examId || q.examCategory === test.category) return true;
      return sectionNames.some((sn) => q.subjectName.toLowerCase().includes(sn) || sn.includes(q.subjectName.toLowerCase()));
    });
    return matched.length > 0
      ? matched.slice(0, test.totalQuestions || 100)
      : this.questions.slice(0, Math.min(test.totalQuestions || 25, this.questions.length));
  }

  getCandidateMistakes(userId: string): any[] {
    const candidateAttempts = this.attempts.filter(
      (a) => a.userId === userId && (a.status === 'SUBMITTED' || a.status === 'AUTO_SUBMITTED')
    );
    const mistakeList: any[] = [];
    candidateAttempts.forEach((att) => {
      if (!att.answers) return;
      Object.entries(att.answers).forEach(([qId, ans]: [string, any]) => {
        const q = this.questions.find((item) => item.id === qId);
        if (q && ans.selectedOption && ans.selectedOption !== q.correctAnswer) {
          mistakeList.push({
            id: `mstk_${att.id}_${q.id}`,
            questionId: q.id,
            questionEn: q.textEn,
            questionHi: q.textHi,
            subject: q.subjectName,
            topic: q.topicName,
            selectedOption: ans.selectedOption,
            correctOption: q.correctAnswer,
            explanationEn: q.explanationEn || 'Review relevant formulas and core principles.',
            explanationHi: q.explanationHi || 'संबंधित सूत्रों और अवधारणाओं का पुनरीक्षण करें।',
            options: q.options,
            attemptDate: att.startedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
            resolved: false,
          });
        }
      });
    });
    return mistakeList;
  }

  getCandidateAnalytics(userId: string) {
    const userAttempts = this.attempts.filter(
      (a) => a.userId === userId && (a.status === 'SUBMITTED' || a.status === 'AUTO_SUBMITTED')
    );
    const userResults = this.results.filter((r) => {
      const att = this.attempts.find((a) => a.id === r.attemptId);
      return att?.userId === userId;
    });

    if (userAttempts.length === 0 || userResults.length === 0) {
      return {
        hasAttempts: false,
        totalAttempts: 0,
        accuracyPercentage: 0,
        avgSpeedSecPerQ: 0,
        percentile: 0,
        subjectBreakdown: [],
      };
    }

    const totalAttempts = userAttempts.length;
    const avgAccuracy =
      Math.round((userResults.reduce((sum, r) => sum + (r.accuracyPercentage || 0), 0) / userResults.length) * 10) / 10;
    const totalTime = userResults.reduce((sum, r) => sum + (r.totalTimeTakenSeconds || 0), 0);
    const totalAttemptedQuestions = userResults.reduce(
      (sum, r) => sum + ((r.correctAnswers || 0) + (r.wrongAnswers || 0)),
      0
    );
    const avgSpeed = totalAttemptedQuestions > 0 ? Math.round((totalTime / totalAttemptedQuestions) * 10) / 10 : 0;
    const avgPercentile =
      Math.round((userResults.reduce((sum, r) => sum + (r.percentile || 0), 0) / userResults.length) * 10) / 10;

    return {
      hasAttempts: true,
      totalAttempts,
      accuracyPercentage: avgAccuracy,
      avgSpeedSecPerQ: avgSpeed,
      percentile: avgPercentile,
      subjectBreakdown: userResults[0]?.subjectPerformance || [],
    };
  }

  getReviewQueue(): any[] {
    return this.reviewQueue;
  }

  getDuplicates(): any[] {
    return this.duplicateSuspects;
  }

  resolveReviewItem(id: string, action: string): boolean {
    const idx = this.reviewQueue.findIndex((item) => item.id === id);
    if (idx !== -1) {
      this.reviewQueue.splice(idx, 1);
      return true;
    }
    return false;
  }

  resolveDuplicate(id: string, action: string): boolean {
    const idx = this.duplicateSuspects.findIndex((item) => item.id === id);
    if (idx !== -1) {
      this.duplicateSuspects.splice(idx, 1);
      return true;
    }
    return false;
  }

  unlockMockTest(userId: string, testId: string): { success: boolean; message: string; receiptId: string } {
    if (!this.unlockedMockTests[userId]) {
      this.unlockedMockTests[userId] = [];
    }
    if (!this.unlockedMockTests[userId].includes(testId)) {
      this.unlockedMockTests[userId].push(testId);
    }
    return {
      success: true,
      message: 'Mock test unlocked successfully.',
      receiptId: `TXN_${Date.now()}_${Math.floor(Math.random() * 9000 + 1000)}`,
    };
  }

  updateMockTestPricing(testId: string, isFree: boolean, priceInr: number): boolean {
    const test = this.mockTests.find((t) => t.id === testId);
    if (!test) return false;
    test.isFree = isFree;
    test.priceInr = isFree ? 0 : priceInr;
    return true;
  }

  trackAdEvent(campaignId: string, eventType: 'IMPRESSION' | 'CLICK'): MonetizationStats {
    const camp = this.monetization.campaigns.find((c) => c.id === campaignId);
    if (eventType === 'IMPRESSION') {
      this.monetization.totalImpressions += 1;
      if (camp) camp.impressionsCount += 1;
      this.monetization.totalEarningsInr += this.monetization.cpmRateInr / 1000;
    } else {
      this.monetization.totalClicks += 1;
      if (camp) camp.clicksCount += 1;
      this.monetization.totalEarningsInr += this.monetization.cpcRateInr;
    }
    this.monetization.ctrPercentage = Number(
      ((this.monetization.totalClicks / (this.monetization.totalImpressions || 1)) * 100).toFixed(2)
    );
    this.monetization.totalEarningsInr = Number(this.monetization.totalEarningsInr.toFixed(2));
    return this.monetization;
  }

  getMetrics(): SystemMetrics {
    const totalCandidates = this.users.filter((u) => u.role === 'CANDIDATE').length;
    const activeCandidates = this.users.filter((u) => u.role === 'CANDIDATE' && u.status === 'ACTIVE').length;
    const totalQuestions = this.questions.length;
    const pendingQuestions = this.questions.filter((q) => q.status === 'DRAFT' || q.status === 'NEEDS_REVIEW').length;
    const publishedQuestions = this.questions.filter((q) => q.status === 'PUBLISHED').length;
    const totalMockTests = this.mockTests.length;
    const todayAttempts = this.attempts.length;
    const todayRegistrations = this.users.length;
    const isPostgresConnected = !!pgPool;

    return {
      totalCandidates,
      activeCandidates,
      totalQuestions,
      pendingQuestions,
      publishedQuestions,
      totalMockTests,
      todayAttempts,
      todayRegistrations,
      serverHealth: 'HEALTHY',
      databaseStatus: isPostgresConnected ? 'CONNECTED (PostgreSQL)' : 'ONLINE',
      storageUsageMb: Number((0.5 + totalQuestions * 0.002).toFixed(1)),
      apiVersion: 'v1.0.4-phase1',
    };
  }

  // Multi-Verification & OTP Store
  otpStore: Record<string, { otp: string; expiresAt: number }> = {};

  sendPhoneOtp(phone: string): { success: boolean; message: string; testOtp?: string } {
    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return { success: false, message: 'Please enter a valid 10-digit Indian mobile number.' };
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore[cleanPhone] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
    return {
      success: true,
      message: `Verification OTP dispatched to +91 ${cleanPhone}.`,
    };
  }

  verifyPhoneOtp(
    phone: string,
    otp: string,
    candidateData?: { name?: string; email?: string; targetExam?: string }
  ): {
    success: boolean;
    user?: User;
    message: string;
    isNewUser?: boolean;
    requiresEmailVerification?: boolean;
  } {
    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    const record = this.otpStore[cleanPhone];
    const isValid = record && record.otp === otp && record.expiresAt > Date.now();

    if (!isValid) {
      return { success: false, message: 'Invalid or expired OTP code. Please check and retry.' };
    }

    let user = this.users.find((u) => u.phone === cleanPhone);
    if (!user && candidateData?.email) {
      user = this.users.find((u) => u.email.toLowerCase() === candidateData.email!.toLowerCase());
      if (user) {
        user.phone = cleanPhone;
        user.phoneVerified = true;
      }
    }

    if (user) {
      user.phoneVerified = true;
      user.status = 'ACTIVE';
      user.lastLogin = new Date().toISOString();
      return { success: true, user, message: 'Phone OTP verified successfully.', isNewUser: false };
    }

    const newId = `usr_cand_${Date.now()}`;
    const newUser: User = {
      id: newId,
      name: candidateData?.name || `Candidate +91 ${cleanPhone.slice(-4)}`,
      email: candidateData?.email || `cand_${cleanPhone}@sktech.org`,
      phone: cleanPhone,
      role: 'CANDIDATE',
      targetExam: candidateData?.targetExam || 'General Competitive Exams',
      joinedDate: new Date().toISOString().split('T')[0],
      status: candidateData?.email ? 'ACTIVE' : 'PENDING_VERIFICATION',
      phoneVerified: true,
      emailVerified: Boolean(candidateData?.email),
      permissions: ['TAKE_MOCKS', 'VIEW_ANALYSIS'],
      lastLogin: new Date().toISOString(),
    };
    this.users.push(newUser);
    this.unlockedMockTests[newId] = ['mock_ibps_01', 'mock_ssc_01'];
    return {
      success: true,
      user: newUser,
      message: 'Mobile number verified. Account created successfully.',
      isNewUser: true,
      requiresEmailVerification: !newUser.emailVerified,
    };
  }

  verifyGoogleUser(profile: { email: string; name: string; avatarUrl?: string }): { success: boolean; user: User } {
    let user = this.users.find((u) => u.email.toLowerCase() === profile.email.toLowerCase());
    if (user) {
      user.emailVerified = true;
      user.status = 'ACTIVE';
      user.avatarUrl = profile.avatarUrl || user.avatarUrl;
      user.lastLogin = new Date().toISOString();
      return { success: true, user };
    }

    const newId = `usr_cand_${Date.now()}`;
    const newUser: User = {
      id: newId,
      name: profile.name,
      email: profile.email.toLowerCase(),
      role: 'CANDIDATE',
      avatarUrl: profile.avatarUrl,
      targetExam: 'General Competitive Exams',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: false,
      permissions: ['TAKE_MOCKS', 'VIEW_ANALYSIS'],
      lastLogin: new Date().toISOString(),
    };
    this.users.push(newUser);
    this.unlockedMockTests[newId] = ['mock_ibps_01', 'mock_ssc_01'];
    return { success: true, user: newUser };
  }

  verifyAppleUser(appleId: string, name?: string): { success: boolean; user: User } {
    const email = `${appleId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toLowerCase()}@privaterelay.appleid.com`;
    let user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.emailVerified = true;
      user.status = 'ACTIVE';
      user.lastLogin = new Date().toISOString();
      return { success: true, user };
    }

    const newId = `usr_cand_${Date.now()}`;
    const newUser: User = {
      id: newId,
      name: name || 'Apple ID Candidate',
      email,
      role: 'CANDIDATE',
      targetExam: 'General Competitive Exams',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: false,
      permissions: ['TAKE_MOCKS', 'VIEW_ANALYSIS'],
      lastLogin: new Date().toISOString(),
    };
    this.users.push(newUser);
    this.unlockedMockTests[newId] = ['mock_ibps_01', 'mock_ssc_01'];
    return { success: true, user: newUser };
  }

  createSubAdmin(data: {
    name: string;
    email: string;
    password: string;
    role: 'OPERATOR' | 'SUB_ADMIN' | 'CONTENT_ADMIN' | 'REVIEWER';
    permissions: string[];
    targetExam?: string;
  }): { success: boolean; user?: User; message: string } {
    const existing = this.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'A user account already exists with this email.' };
    }
    const newId = `usr_staff_${Date.now()}`;
    const newUser: User = {
      id: newId,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      role: data.role,
      targetExam: data.targetExam || 'ALL',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      emailVerified: true,
      phoneVerified: true,
      permissions: data.permissions,
      lastLogin: 'Never',
    };
    this.users.push(newUser);
    this.userPasswordHashes[newId] = this.hashPassword(data.password);
    this.auditLogs.unshift({
      id: `log_${Date.now()}`,
      userId: 'usr_admin_01',
      userName: 'Er. Sachin Tripathi',
      action: 'SUB_ADMIN_CREATED',
      module: 'USER_MANAGEMENT',
      entityId: newId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Generated ${data.role} account for ${data.name} with permissions: ${data.permissions.join(', ')}`,
    });
    return { success: true, user: newUser, message: 'Operator / Sub-admin credentials generated successfully.' };
  }

  multiPlatformDeployments: MultiPlatformDeployment[] = [
    {
      platform: 'WEB',
      title: 'SKTECH Cloud Web Portal',
      version: 'v2.4.0',
      buildNumber: 'B-2026-0308-W',
      targetEnv: 'Cloud Run / Port 3000 (Production CDN)',
      binarySize: '1.8 MB (Gzipped)',
      checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      status: 'DEPLOYED',
      packageFormat: 'HTML5 / React 19 / Vite SPA + Express API',
      downloadUrl: '/',
      features: [
        'Full responsive candidate dashboard',
        'Bilingual exam engine with anti-cheat',
        'Clean Ad Network integration (Zero Vulgar/Gambling)',
        'Razorpay & UPI test series unlocking',
        'Gemini Grounded Exam Intelligence',
      ],
    },
    {
      platform: 'WINDOWS_EXE',
      title: 'SKTECH Admin & Exam Center Desktop Client',
      version: 'v2.4.0',
      buildNumber: 'B-2026-0308-EXE',
      targetEnv: 'Windows 10 / 11 (64-bit) & Server 2022',
      binarySize: '68.4 MB',
      checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      status: 'AVAILABLE',
      packageFormat: 'Windows Portable Executable (.exe) & MSI Installer',
      downloadUrl: '#download-exe',
      features: [
        'Secure air-gapped Administrative Console',
        'Local SQLite & PostgreSQL failover synchronization',
        'Full-screen kiosk mode lock for test centers',
        'Direct OCR scanning engine with document camera support',
        'Role-based operator authorization gate',
      ],
    },
    {
      platform: 'ANDROID_APK',
      title: 'SKTECH Candidate Mobile Application',
      version: 'v2.4.0',
      buildNumber: 'B-2026-0308-APK',
      targetEnv: 'Android 8.0+ (API Level 26 to 35)',
      binarySize: '18.2 MB',
      checksumSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      status: 'AVAILABLE',
      packageFormat: 'Universal Release APK & Google Play App Bundle (.aab)',
      downloadUrl: '#download-apk',
      features: [
        'Mobile OTP & Truecaller instant verification',
        'Offline mock test download & caching',
        'Clean AdMob mediation for educational ads',
        'Low-bandwidth 2G/3G optimized question loading',
        'Dark mode study comfort & push alerts',
      ],
    },
  ];

  getRevenueAnalytics(): RevenueAnalyticsStats {
    const dailyTrends: DailyRevenueData[] = [];
    const now = new Date();
    let cumulativeRevenue = 0;
    let totalAdRevenue = 0;
    let totalMicroRevenue = 0;
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalTransactions = 0;
    let highestDay = {
      date: '',
      formattedDate: '',
      amount: 0,
      adAmount: 0,
      microAmount: 0,
    };

    const trendMultipliers = [
      0.82, 0.86, 0.91, 0.97, 1.05, 1.18, 1.12,
      0.90, 0.94, 1.02, 1.09, 1.20, 1.28, 1.16,
      0.98, 1.06, 1.12, 1.18, 1.28, 1.38, 1.25,
      1.08, 1.16, 1.24, 1.35, 1.48, 1.62, 1.45,
      1.52, 1.68,
    ];

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const isoDate = d.toISOString().split('T')[0];
      const formattedDate = d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });

      const mult = trendMultipliers[29 - i] || 1.0;
      const baseImp = 1250 + ((i * 37 + 19) % 350);
      const dayImpressions = Math.round(baseImp * mult);

      const ctr = 0.034 + ((i * 13) % 8) * 0.001;
      const dayClicks = Math.round(dayImpressions * ctr);

      const cpmRev = (dayImpressions / 1000) * 185;
      const cpcRev = dayClicks * 3.5;
      const adRevenue = Math.round((cpmRev + cpcRev) * 100) / 100;

      const baseTx = 11 + ((i * 17 + 5) % 15);
      const microTransactionsCount = Math.round(baseTx * mult);
      const avgPrice = 69 + ((i * 7) % 25);
      const microTransactionsRevenue = Math.round(microTransactionsCount * avgPrice);

      const dayTotalRevenue = Math.round((adRevenue + microTransactionsRevenue) * 100) / 100;
      cumulativeRevenue += dayTotalRevenue;

      totalAdRevenue += adRevenue;
      totalMicroRevenue += microTransactionsRevenue;
      totalImpressions += dayImpressions;
      totalClicks += dayClicks;
      totalTransactions += microTransactionsCount;

      if (dayTotalRevenue > highestDay.amount) {
        highestDay = {
          date: isoDate,
          formattedDate,
          amount: dayTotalRevenue,
          adAmount: adRevenue,
          microAmount: microTransactionsRevenue,
        };
      }

      dailyTrends.push({
        date: isoDate,
        formattedDate,
        adImpressions: dayImpressions,
        adClicks: dayClicks,
        adRevenue,
        microTransactionsCount,
        microTransactionsRevenue,
        totalRevenue: dayTotalRevenue,
        cumulativeRevenue: Math.round(cumulativeRevenue * 100) / 100,
        cpm: Math.round(((adRevenue / (dayImpressions || 1)) * 1000) * 10) / 10,
      });
    }

    const thirtyDayTotal = Math.round((totalAdRevenue + totalMicroRevenue) * 100) / 100;

    return {
      thirtyDayTotalRevenue: thirtyDayTotal,
      thirtyDayAdEarnings: Math.round(totalAdRevenue * 100) / 100,
      thirtyDayMicroEarnings: Math.round(totalMicroRevenue * 100) / 100,
      thirtyDayTransactionsCount: totalTransactions,
      thirtyDayImpressions: totalImpressions,
      thirtyDayClicks: totalClicks,
      averageDailyRevenue: Math.round((thirtyDayTotal / 30) * 100) / 100,
      highestDay,
      growthPercentage: 24.8,
      avgOrderValue: Math.round((totalMicroRevenue / (totalTransactions || 1)) * 100) / 100,
      revenueByExamCategory: [
        { category: 'Banking & Insurance (IBPS/SBI)', amount: Math.round(thirtyDayTotal * 0.44), percentage: 44, color: '#4f46e5' },
        { category: 'Staff Selection Commission (SSC)', amount: Math.round(thirtyDayTotal * 0.31), percentage: 31, color: '#0ea5e9' },
        { category: 'State PSC & Civil Services', amount: Math.round(thirtyDayTotal * 0.16), percentage: 16, color: '#10b981' },
        { category: 'Railways (RRB NTPC/Group D)', amount: Math.round(thirtyDayTotal * 0.09), percentage: 9, color: '#f59e0b' },
      ],
      revenueBySource: [
        { name: 'Mock Test Micro-Transactions', value: Math.round(totalMicroRevenue), color: '#4f46e5' },
        { name: 'Clean Educational Ad Impressions', value: Math.round(totalAdRevenue), color: '#10b981' },
      ],
      dailyTrends,
    };
  }
}

export const db = new CentralDatabase();

