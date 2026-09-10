/**
 * SKTECH EXAM — Comprehensive Candidate Dashboard Component
 * Features:
 * 1. Target Exam Switcher (Banking, SSC, MPPSC, Railways, Police, Engineering JE/GATE)
 * 2. Dual Preparation Paths (Objective Prelims & Subjective Mains with Model Rubrics)
 * 3. Speed Boosters (Track 1 Solving & Calculation 90 min/100 Qs; Track 2 Reading & GK 45 min/100 Qs)
 * 4. Combined Full-Length Mocks (MPPSC Paper 1+2, Banking Complete, SSC CGL Tier 1+2, Railways, Police)
 * 5. Smart Practice & Challenges (Daily 15-min sprint, 100Q marathon, weak topic drill)
 * 6. Smart Mistake Book (Categorized errors with 1-click re-solve)
 * 7. Study Planner (Daily task checklist & 7-day schedule)
 * 8. Speed & Pacing Analytics
 * 9. Safe Monetization & Clean Ad Banners
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  Clock,
  Award,
  TrendingUp,
  Target,
  ArrowRight,
  AlertCircle,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  Calendar,
  Sparkles,
  Search,
  Lock,
  ShieldCheck,
  PenTool,
  FileText,
  Layers,
  ChevronRight,
  Eye,
  Check,
  Zap,
  Flame,
  Brain,
  BarChart2,
  RotateCcw,
} from 'lucide-react';
import {
  Exam,
  MockTest,
  CurrentAffairItem,
  ResultScorecard,
  User,
  SubjectiveMockPaper,
  PreparationMode,
  Subject,
  SpeedBoosterTrack,
  CombinedMockPackage,
} from '../types';
import { CleanAdBanner } from './CleanAdBanner';
import { GroundedSearchWidget } from './GroundedSearchWidget';
import { SmartPracticeView } from './SmartPracticeView';
import { MistakeBookView } from './MistakeBookView';
import { StudyPlannerView } from './StudyPlannerView';
import { SpeedAnalyticsView } from './SpeedAnalyticsView';
import { PerformanceHistoryView } from './PerformanceHistoryView';

interface CandidateDashboardProps {
  exams: Exam[];
  mockTests: MockTest[];
  currentAffairs: CurrentAffairItem[];
  recentResult?: ResultScorecard;
  onStartTest: (testId: string) => void;
  onViewResult: (attemptId: string) => void;
  language: 'en' | 'hi';
  unlockedTests?: string[];
  onUnlockTest?: (test: MockTest) => void;
  candidateUser?: User | null;
  onStartSubjectiveTest?: (paper: SubjectiveMockPaper) => void;
  subjects?: Subject[];
  subjectiveMocks?: SubjectiveMockPaper[];
  speedBoosters?: SpeedBoosterTrack[];
  combinedMocks?: CombinedMockPackage[];
}

export type CandidateSubView =
  | 'TESTS'
  | 'PERFORMANCE_HISTORY'
  | 'SPEED_BOOSTERS'
  | 'COMBINED_MOCKS'
  | 'SMART_PRACTICE'
  | 'MISTAKE_BOOK'
  | 'STUDY_PLANNER'
  | 'SPEED_ANALYTICS';

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({
  exams,
  mockTests,
  currentAffairs,
  recentResult,
  onStartTest,
  onViewResult,
  language,
  unlockedTests = [],
  onUnlockTest,
  candidateUser,
  onStartSubjectiveTest,
  subjects = [],
  subjectiveMocks = [],
  speedBoosters = [],
  combinedMocks = [],
}) => {
  // Target Exam state
  const [targetExam, setTargetExam] = useState<string>(
    candidateUser?.targetExam || 'IBPS PO / SBI PO / RRB PO'
  );

  // Active subview navigation
  const [activeSubView, setActiveSubView] = useState<CandidateSubView>('TESTS');

  // Dual Preparation Mode state (inside TESTS tab)
  const [prepMode, setPrepMode] = useState<PreparationMode>('OBJECTIVE');

  // Objective section filters
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Subjective section filters
  const [subjectiveBranchFilter, setSubjectiveBranchFilter] = useState<string>('ALL');
  const [subjectiveSearch, setSubjectiveSearch] = useState<string>('');
  const [previewPaper, setPreviewPaper] = useState<SubjectiveMockPaper | null>(null);

  // Current Affairs state
  const [selectedCaIndex, setSelectedCaIndex] = useState<number>(0);
  const [caUserAnswer, setCaUserAnswer] = useState<string | null>(null);
  const [showCaExplanation, setShowCaExplanation] = useState<boolean>(false);

  // Filtered Objective tests
  const filteredObjectiveTests = mockTests.filter((t) => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.titleHi && t.titleHi.includes(searchQuery)) ||
      t.examTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered Subjective papers from live database API
  const filteredSubjectivePapers = subjectiveMocks.filter((p) => {
    const matchesBranch =
      subjectiveBranchFilter === 'ALL' ||
      p.branchCategory === subjectiveBranchFilter ||
      (subjectiveBranchFilter === 'EE' && p.id.includes('ee')) ||
      (subjectiveBranchFilter === 'ECE' && p.id.includes('ece')) ||
      (subjectiveBranchFilter === 'ME' && p.id.includes('me')) ||
      (subjectiveBranchFilter === 'CE' && p.id.includes('ce'));

    const matchesSearch =
      p.titleEn.toLowerCase().includes(subjectiveSearch.toLowerCase()) ||
      p.titleHi.includes(subjectiveSearch) ||
      p.branchNameEn.toLowerCase().includes(subjectiveSearch.toLowerCase()) ||
      p.subTopics.some((topic) => topic.toLowerCase().includes(subjectiveSearch.toLowerCase()));

    return matchesBranch && matchesSearch;
  });

  const activeCa = currentAffairs[selectedCaIndex] || currentAffairs[0];

  // Handler for practice drill launch
  const handleLaunchPractice = (mode: string, params: any) => {
    // Launches objective test mock with tailored settings
    const availableMock = mockTests[0]?.id || 'mock_ibps_01';
    onStartTest(availableMock);
  };

  return (
    <div id="candidate-dashboard-view" className="space-y-8 pb-12">
      {/* 1. Welcome & Target Exam Hero Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {language === 'en'
                    ? 'Dual Mode Active: Objective Prelims & Subjective Mains'
                    : 'द्वैध तैयारी प्रणाली: वस्तुनिष्ठ एवं विवरणात्मक'}
                </span>
              </div>

              {/* Target Exam Dropdown Switcher */}
              <div className="inline-flex items-center space-x-1.5 bg-white/10 px-3 py-0.5 rounded-full border border-white/20 text-xs text-white">
                <Target className="w-3 h-3 text-amber-400" />
                <span className="text-slate-300 text-[11px]">Target:</span>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer py-0.5"
                >
                  <option value="IBPS PO / SBI PO / RRB PO" className="text-slate-900">
                    IBPS / SBI / RRB PO (Banking)
                  </option>
                  <option value="SSC CGL / CHSL" className="text-slate-900">
                    SSC CGL & CHSL (Tier 1 & 2)
                  </option>
                  <option value="MPPSC State Services" className="text-slate-900">
                    MPPSC Prelims & Mains
                  </option>
                  <option value="RRB NTPC & Group D" className="text-slate-900">
                    RRB NTPC & Group D (Railways)
                  </option>
                  <option value="MP Police SI & Constable" className="text-slate-900">
                    MP Police Sub Inspector & Constable
                  </option>
                  <option value="Electrical Engineering (EE JE/AE)" className="text-slate-900">
                    Electrical Engineering (EE JE / AE / GATE)
                  </option>
                  <option value="Mechanical Engineering (ME JE/AE)" className="text-slate-900">
                    Mechanical Engineering (ME JE / AE / GATE)
                  </option>
                  <option value="Civil Engineering (CE JE/AE)" className="text-slate-900">
                    Civil Engineering (CE JE / AE / GATE)
                  </option>
                  <option value="Electronics & Communication (ECE)" className="text-slate-900">
                    Electronics (ECE GATE / ISRO)
                  </option>
                </select>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {language === 'en'
                ? `Welcome Back, ${candidateUser?.name || 'Candidate'}!`
                : `वापसी पर स्वागत है, ${candidateUser?.name || 'परीक्षार्थी'}!`}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {language === 'en'
                ? 'Master competitive patterns with Computer-Based Objective Prelims, Speed Boosters, Combined Full-Length Mocks, and Comprehensive Subjective Engineering & Mains Papers.'
                : 'कंप्यूटर आधारित वस्तुनिष्ठ मॉक, स्पीड बूस्टर, संयुक्त पूर्ण प्रश्नपत्रों तथा विवरणात्मक इंजीनियरिंग व मुख्य परीक्षा के मॉडल रूब्रिक्स से अपनी समग्र तैयारी सुनिश्चित करें।'}
            </p>
          </div>

          <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-w-[280px] shadow-lg shrink-0">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1 flex items-center justify-between">
              <span>{language === 'en' ? 'Quick Launch' : 'त्वरित शुरुआत'}</span>
              <span className="text-amber-400 text-[10px] bg-amber-400/10 px-2 py-0.5 rounded font-mono">
                {targetExam.split(' ')[0]}
              </span>
            </div>
            <div className="font-bold text-slate-100 text-sm mb-3 line-clamp-1">
              {prepMode === 'OBJECTIVE'
                ? targetExam.includes('MPPSC')
                  ? 'MPPSC State Service Prelims — Paper-1'
                  : targetExam.includes('SSC')
                  ? 'SSC CGL 2026 Tier-1 Benchmark Mock'
                  : targetExam.includes('EE')
                  ? 'Electrical Engineering Prelims Mock'
                  : 'IBPS PO Prelims 2026 — All India Mock #01'
                : 'Electrical Engineering Subjective Paper'}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-4 font-mono">
              {prepMode === 'OBJECTIVE' ? (
                <>
                  <span>60 Mins • 100 Qs</span>
                  <span className="text-emerald-400 font-semibold">+1.0 / -0.25</span>
                </>
              ) : (
                <>
                  <span>180 Mins • 5 Qs</span>
                  <span className="text-amber-400 font-semibold">200 Marks • Rubrics</span>
                </>
              )}
            </div>
            {prepMode === 'OBJECTIVE' ? (
              <button
                id="continue-test-hero-btn"
                onClick={() => {
                  const targetTest = targetExam.includes('MPPSC')
                    ? 'mock_mppsc_01'
                    : targetExam.includes('SSC')
                    ? 'mock_ssc_01'
                    : targetExam.includes('EE')
                    ? 'mock_eng_ee_01'
                    : 'mock_ibps_01';
                  onStartTest(targetTest);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-700/40 transition active:scale-98 text-xs cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>{language === 'en' ? 'Start Objective Mock' : 'वस्तुनिष्ठ मॉक शुरू करें'}</span>
              </button>
            ) : (
              <button
                id="continue-subjective-hero-btn"
                onClick={() => {
                  const target = subjectiveMocks[0];
                  if (onStartSubjectiveTest && target) onStartSubjectiveTest(target);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-amber-700/40 transition active:scale-98 text-xs cursor-pointer"
              >
                <PenTool className="w-4 h-4" />
                <span>{language === 'en' ? 'Start Subjective Paper' : 'विवरणात्मक पेपर शुरू करें'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. CANDIDATE PORTAL NAVIGATION BAR */}
      <section className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center overflow-x-auto gap-1.5 scrollbar-thin">
        {[
          { key: 'TESTS', labelEn: 'Mock Tests & Papers', labelHi: 'मॉक टेस्ट व प्रश्नपत्र', icon: BookOpen },
          { key: 'PERFORMANCE_HISTORY', labelEn: 'Performance History', labelHi: 'प्रदर्शन इतिहास व प्रगति', icon: TrendingUp },
          { key: 'SPEED_BOOSTERS', labelEn: 'Speed Boosters (Track 1 & 2)', labelHi: 'स्पीड बूस्टर (ट्रैक 1 व 2)', icon: Zap },
          { key: 'COMBINED_MOCKS', labelEn: 'Combined Multi-Paper Mocks', labelHi: 'संयुक्त बहु-प्रश्नपत्र मॉक', icon: Layers },
          { key: 'SMART_PRACTICE', labelEn: 'Smart Practice & Drills', labelHi: 'स्मार्ट अभ्यास व चुनौतियां', icon: Brain },
          { key: 'MISTAKE_BOOK', labelEn: 'Mistake Book', labelHi: 'गलती सुधार डायरी', icon: RotateCcw },
          { key: 'STUDY_PLANNER', labelEn: 'Study Planner', labelHi: 'अध्ययन कार्यसूची', icon: Calendar },
          { key: 'SPEED_ANALYTICS', labelEn: 'Speed Analytics', labelHi: 'गति एवं समय विश्लेषण', icon: BarChart2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubView === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSubView(tab.key as CandidateSubView)}
              className={`flex items-center space-x-2 py-2.5 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? tab.labelHi : tab.labelEn}</span>
            </button>
          );
        })}
      </section>

      {/* 3. PERFORMANCE STATS STRIP (Reflects live candidate performance) */}
      <section className="space-y-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <button
            type="button"
            onClick={() => setActiveSubView('PERFORMANCE_HISTORY')}
            className="text-left bg-white hover:bg-slate-50 transition rounded-2xl p-4 border border-slate-200/80 shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-indigo-600 transition">
                {language === 'hi' ? 'समग्र सटीकता' : 'Overall Accuracy'}
              </span>
              <Target className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">
              {recentResult ? `${recentResult.accuracyPercentage}%` : '—'}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5 flex items-center space-x-1">
              {recentResult ? (
                <span className="text-emerald-600 font-semibold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Live Result
                </span>
              ) : (
                <span>Click to view history</span>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('PERFORMANCE_HISTORY')}
            className="text-left bg-white hover:bg-slate-50 transition rounded-2xl p-4 border border-slate-200/80 shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-blue-600 transition">
                {language === 'hi' ? 'परीक्षण प्रयास' : 'Tests Attempted'}
              </span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">
              {recentResult ? '1+ Logged' : '0 Logged'}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
              {recentResult ? `${recentResult.testTitle.substring(0, 22)}...` : 'View learning curve'}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('PERFORMANCE_HISTORY')}
            className="text-left bg-white hover:bg-slate-50 transition rounded-2xl p-4 border border-slate-200/80 shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-amber-600 transition">
                {language === 'hi' ? 'औसत गति' : 'Avg Pacing Speed'}
              </span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">
              {recentResult
                ? `${Math.round(recentResult.totalTimeTakenSeconds / Math.max(1, recentResult.correctAnswers + recentResult.wrongAnswers))} sec/Q`
                : '—'}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              {recentResult ? 'Based on latest attempt' : 'Pacing analytics'}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('PERFORMANCE_HISTORY')}
            className="text-left bg-white hover:bg-slate-50 transition rounded-2xl p-4 border border-slate-200/80 shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider group-hover:text-emerald-600 transition">
                {language === 'hi' ? 'परसेंटाइल' : 'Percentile'}
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">
              {recentResult ? `${recentResult.percentile} %ile` : '—'}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              {recentResult ? `Rank #${recentResult.rank} in ${recentResult.totalParticipants || recentResult.totalCandidates || 1000}` : 'View rank trajectory'}
            </div>
          </button>
        </div>

        {/* Quick Access Strip to Performance History */}
        {activeSubView !== 'PERFORMANCE_HISTORY' && (
          <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50/50 rounded-2xl p-3 px-4 border border-indigo-100 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-indigo-950">
                  {language === 'hi' ? 'रीयल-टाइम स्कोर प्रगति एवं विश्लेषण' : 'Empirical Performance History & Score Trends'}
                </span>
                <span className="text-slate-500 hidden sm:inline ml-2">
                  {language === 'hi'
                    ? '— अपने मॉक टेस्ट प्राप्तांकों का ग्राफ एवं कट-ऑफ तुलना देखें'
                    : '— Track test-by-test score gains, accuracy hit-rate, and cut-off benchmarks with Recharts'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveSubView('PERFORMANCE_HISTORY')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition text-xs flex items-center space-x-1 cursor-pointer shrink-0 shadow-xs ml-2"
            >
              <span>{language === 'hi' ? 'प्रगति चार्ट देखें' : 'View Charts'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* VIEW 1: TESTS (DUAL MODE OBJECTIVE PRELIMS & SUBJECTIVE MAINS)            */}
      {/* ========================================================================= */}
      {activeSubView === 'TESTS' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Dual Segmented Controller */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                {language === 'hi' ? 'द्वैध तैयारी प्रणाली' : 'Dual Preparation Paths'}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {language === 'hi' ? 'अपनी तैयारी का प्रारूप चुनें' : 'Choose Your Preparation Track'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? 'वस्तुनिष्ठ प्रारंभिक कंप्यूटर आधारित परीक्षा अथवा विवरणात्मक लिखित परीक्षा प्रारूप'
                  : 'Toggle smoothly between Objective Prelims Mocks and Subjective Descriptive Written Papers'}
              </p>
            </div>

            <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-md w-full shrink-0">
              <button
                id="dual-mode-objective-btn"
                type="button"
                onClick={() => setPrepMode('OBJECTIVE')}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  prepMode === 'OBJECTIVE'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Target className="w-4 h-4" />
                <div className="text-left">
                  <div className="leading-tight">
                    {language === 'hi' ? 'वस्तुनिष्ठ प्रारंभिक मॉक' : 'Objective Prelims'}
                  </div>
                  <div className="text-[10px] opacity-80 font-normal hidden sm:block">
                    {language === 'hi' ? 'CBT बहुविकल्पीय प्रश्न' : 'CBT Objective Sets'}
                  </div>
                </div>
              </button>

              <button
                id="dual-mode-subjective-btn"
                type="button"
                onClick={() => setPrepMode('SUBJECTIVE')}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  prepMode === 'SUBJECTIVE'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-1 ring-amber-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <div className="text-left">
                  <div className="leading-tight">
                    {language === 'hi' ? 'विवरणात्मक मुख्य मॉक' : 'Subjective Mains'}
                  </div>
                  <div className="text-[10px] opacity-80 font-normal hidden sm:block">
                    {language === 'hi' ? 'लिखित उत्तर एवं रूब्रिक्स' : 'Written & Model Rubrics'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 4A. OBJECTIVE PRELIMS MOCK SECTION */}
          {prepMode === 'OBJECTIVE' && (
            <section id="objective-mocks-section" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-black text-slate-900">
                      {language === 'hi' ? 'वस्तुनिष्ठ प्रारंभिक मॉक टेस्ट' : 'Objective Prelims Mock Section'}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'hi'
                      ? 'इंजीनियरिंग शाखाएं, सामान्य आधारभूत प्रश्नपत्र, बैंकिंग, एसएससी एवं राज्य सेवा वस्तुनिष्ठ श्रृंखला'
                      : 'Standard computer-based objective practice sets across Engineering branches and general foundational papers.'}
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder={
                      language === 'hi'
                        ? 'वस्तुनिष्ठ मॉक खोजें (जैसे EE, CGL, PO)...'
                        : 'Search objective tests (e.g. EE, CGL, PO)...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { key: 'ALL', label: language === 'en' ? 'All Exams' : 'सभी परीक्षाएं' },
                  {
                    key: 'ENGINEERING',
                    label: language === 'en' ? 'Engineering (EE/ECE/ME/CE)' : 'अभियांत्रिकी (EE/ECE/ME/CE)',
                  },
                  { key: 'GENERAL_STUDIES', label: language === 'en' ? 'General Foundational' : 'सामान्य आधारभूत' },
                  { key: 'BANKING', label: 'Banking (IBPS/SBI)' },
                  { key: 'SSC', label: 'SSC (CGL/CHSL)' },
                  { key: 'STATE_PSC', label: 'State PSC (MPPSC)' },
                  { key: 'POLICE', label: 'MP Police' },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      selectedCategory === cat.key
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Mock Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredObjectiveTests.map((test) => {
                  const isLocked = !test.isFree && !unlockedTests.includes(test.id);

                  return (
                    <div
                      key={test.id}
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden group"
                    >
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            {test.category} • {test.code}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              test.difficulty === 'HARD'
                                ? 'bg-rose-100 text-rose-800'
                                : test.difficulty === 'MODERATE'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {test.difficulty}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition leading-snug">
                            {language === 'hi' && test.titleHi ? test.titleHi : test.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">{test.examTitle}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                          <div>
                            <span className="text-slate-400 text-[10px] block font-semibold uppercase">Duration</span>
                            <span className="font-bold text-slate-800">{test.durationMinutes} Mins</span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] block font-semibold uppercase">Questions</span>
                            <span className="font-bold text-slate-800">{test.totalQuestions} Qs</span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] block font-semibold uppercase">Marks</span>
                            <span className="font-bold text-slate-800">{test.totalMarks} M</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Section Breakdown
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {test.sections.map((sec) => (
                              <span
                                key={sec.id}
                                className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium truncate max-w-[150px]"
                                title={sec.nameEn}
                              >
                                {language === 'hi' ? sec.nameHi : sec.nameEn} ({sec.questionCount})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs">
                          {test.isFree || unlockedTests.includes(test.id) ? (
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Free Open Access
                            </span>
                          ) : (
                            <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center space-x-1">
                              <Lock className="w-3 h-3 text-amber-600" />
                              <span>Premium ₹{test.priceInr || 49}</span>
                            </span>
                          )}
                        </div>

                        {isLocked ? (
                          <button
                            onClick={() => onUnlockTest && onUnlockTest(test)}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center space-x-1"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Unlock</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onStartTest(test.id)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center space-x-1"
                          >
                            <span>Start Test</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 4B. SUBJECTIVE MAINS MOCK SECTION */}
          {prepMode === 'SUBJECTIVE' && (
            <section id="subjective-mocks-section" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <PenTool className="w-5 h-5 text-amber-600" />
                    <h2 className="text-xl font-black text-slate-900">
                      {language === 'hi' ? 'विवरणात्मक मुख्य मॉक प्रश्नपत्र' : 'Subjective Descriptive Written Papers'}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'hi'
                      ? 'इंजीनियरिंग शाखाएं (EE, ECE, ME, CE), सामान्य अध्ययन व राज्य मुख्य परीक्षा प्रारूप'
                      : 'Comprehensive written practice papers with official rubrics and model answers.'}
                  </p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search subjective papers..."
                    value={subjectiveSearch}
                    onChange={(e) => setSubjectiveSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Subjective Branch Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'ALL', label: 'All Branches' },
                  { key: 'EE', label: 'Electrical (EE)' },
                  { key: 'ECE', label: 'Electronics (ECE)' },
                  { key: 'ME', label: 'Mechanical (ME)' },
                  { key: 'CE', label: 'Civil (CE)' },
                  { key: 'GENERAL_LANGUAGE', label: 'GS & Language' },
                  { key: 'EXAM_SPECIFIC', label: 'State PSC Mains' },
                ].map((bf) => (
                  <button
                    key={bf.key}
                    onClick={() => setSubjectiveBranchFilter(bf.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      subjectiveBranchFilter === bf.key
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {bf.label}
                  </button>
                ))}
              </div>

              {/* Subjective Papers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSubjectivePapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {paper.branchCategory} • {paper.code}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {paper.questionsCount} Descriptive Qs
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition leading-snug">
                          {language === 'hi' ? paper.titleHi : paper.titleEn}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {language === 'hi' ? paper.branchNameHi : paper.branchNameEn} • {paper.examTarget}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block font-semibold uppercase">Duration</span>
                          <span className="font-bold text-slate-800">{paper.durationMinutes} Mins</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block font-semibold uppercase">Marks</span>
                          <span className="font-bold text-amber-700">{paper.totalMarks} Marks</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block font-semibold uppercase">Attempts</span>
                          <span className="font-bold text-slate-800">{paper.attemptsCount}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Topic Coverage
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {paper.subTopics.slice(0, 3).map((topic, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded truncate max-w-[150px]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setPreviewPaper(paper)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>Preview Rubric</span>
                      </button>

                      <button
                        onClick={() => onStartSubjectiveTest && onStartSubjectiveTest(paper)}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center space-x-1"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Write Paper</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: PERFORMANCE HISTORY & SCORE PROGRESS VISUALIZER (RECHARTS)          */}
      {/* ========================================================================= */}
      {activeSubView === 'PERFORMANCE_HISTORY' && (
        <section className="animate-in fade-in">
          <PerformanceHistoryView
            candidateUser={candidateUser}
            recentResult={recentResult}
            mockTests={mockTests}
            language={language}
            onStartTest={onStartTest}
            onViewResult={onViewResult}
          />
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: SPEED BOOSTERS (TRACK 1 & TRACK 2)                                 */}
      {/* ========================================================================= */}
      {activeSubView === 'SPEED_BOOSTERS' && (
        <section className="space-y-6 animate-in fade-in">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white border border-indigo-800/40 shadow-xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Section 11 Architecture: Two Specialized Speed Booster Tracks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'hi' ? 'स्पीड बूस्टर ट्रैक (स्पीड एवं टाइमिंग महारत)' : 'Speed Booster Examination Tracks'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Designed for intense pacing conditioning. Track 1 focuses on solving and heavy calculations (90 Mins / 100 Qs). Track 2 focuses on rapid-fire reading and memory recall (45 Mins / 100 Qs).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {speedBoosters.map((track) => {
              const isTrack1 = track.trackType === 'TRACK_1_SOLVING';
              return (
                <div
                  key={track.id}
                  className={`bg-white rounded-3xl border p-6 shadow-xs flex flex-col justify-between space-y-5 transition ${
                    isTrack1 ? 'border-indigo-200 hover:border-indigo-400' : 'border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          isTrack1
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {track.code}
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        {track.defaultDurationMinutes} Mins • {track.totalQuestions} Questions
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {language === 'hi' ? track.titleHi : track.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {language === 'hi' ? track.descriptionHi : track.descriptionEn}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Syllabus & Topics Covered:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(language === 'hi' ? track.subjectsHi : track.subjects).map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs font-mono text-slate-400">
                      Marking: +{track.marksPositive} / -{track.marksNegative}
                    </div>

                    <button
                      onClick={() =>
                        onStartTest(isTrack1 ? 'mock_speed_booster_01' : 'mock_speed_booster_02')
                      }
                      className={`px-5 py-2.5 font-bold rounded-xl text-xs text-white shadow-md transition flex items-center space-x-2 cursor-pointer ${
                        isTrack1
                          ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                          : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'स्पीड बूस्टर टेस्ट शुरू करें' : 'Launch Timed Booster'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: COMBINED MULTI-PAPER MOCKS                                         */}
      {/* ========================================================================= */}
      {activeSubView === 'COMBINED_MOCKS' && (
        <section className="space-y-6 animate-in fade-in">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white border border-indigo-800/40 shadow-xl space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Section 12 Architecture: Full Combined Examination Packages</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'hi' ? 'संयुक्त पूर्ण स्तरीय परीक्षा मॉक' : 'Combined Multi-Paper Full-Length Mocks'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Exact simulation of complete examination day schedules. Features MPPSC Prelims (Paper 1 GS + Paper 2 CSAT), Banking Complete PO, SSC CGL Tier-1 & 2, Railways CBT, and Police SI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combinedMocks.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-indigo-300 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {pkg.code} • {pkg.examCategory}
                    </span>
                    <span className="text-xs font-bold text-slate-600 font-mono">
                      {pkg.combinedDurationMinutes} Mins • {pkg.combinedTotalQuestions} Qs
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {language === 'hi' ? pkg.titleHi : pkg.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Target: {pkg.examTarget}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'hi' ? pkg.descriptionHi : pkg.descriptionEn}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Papers ({pkg.totalPapers} Total):
                    </div>
                    {pkg.papers.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-800">
                            {language === 'hi' ? p.paperNameHi : p.paperNameEn}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {p.questionCount} Questions • {p.durationMinutes} Mins
                          </div>
                        </div>
                        <span className="font-mono text-indigo-600 font-bold">{p.totalMarks} Marks</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Free Full Access
                  </span>

                  <button
                    onClick={() => onStartTest('mock_comb_mppsc_prelims')}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/30 transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{language === 'hi' ? 'संयुक्त मॉक प्रारंभ करें' : 'Start Combined Package'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: SMART PRACTICE & ADAPTIVE DRILLS                                  */}
      {/* ========================================================================= */}
      {activeSubView === 'SMART_PRACTICE' && (
        <section className="animate-in fade-in">
          <SmartPracticeView
            subjects={
              subjects.length > 0
                ? subjects
                : [
                    { id: 'sub_qa', code: 'QA', nameEn: 'Quantitative Aptitude', nameHi: 'संख्यात्मक अभियोग्यता', totalTopics: 12 },
                    { id: 'sub_reas', code: 'REAS', nameEn: 'Logical Reasoning', nameHi: 'तार्किक क्षमता', totalTopics: 10 },
                    { id: 'sub_eng', code: 'ENG', nameEn: 'English Language', nameHi: 'अंग्रेजी भाषा', totalTopics: 8 },
                    { id: 'sub_gk', code: 'GK', nameEn: 'General Awareness & MP GK', nameHi: 'सामान्य ज्ञान व एमपी जीके', totalTopics: 15 },
                    { id: 'sub_ee', code: 'EE', nameEn: 'Electrical Engineering', nameHi: 'विद्युत अभियांत्रिकी', totalTopics: 14 },
                  ]
            }
            language={language}
            onLaunchPractice={handleLaunchPractice}
          />
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: MISTAKE BOOK & ERROR RECOVERY                                      */}
      {/* ========================================================================= */}
      {activeSubView === 'MISTAKE_BOOK' && (
        <section className="animate-in fade-in">
          <MistakeBookView
            language={language}
            onStartReattemptDrill={(qIds) => {
              onStartTest('mock_ibps_01');
            }}
          />
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 6: STUDY PLANNER & DAILY TARGETS                                      */}
      {/* ========================================================================= */}
      {activeSubView === 'STUDY_PLANNER' && (
        <section className="animate-in fade-in">
          <StudyPlannerView
            language={language}
            targetExam={targetExam}
            onStartMockTest={() => onStartTest('mock_ibps_01')}
          />
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 7: SPEED & PACING ANALYTICS                                          */}
      {/* ========================================================================= */}
      {activeSubView === 'SPEED_ANALYTICS' && (
        <section className="animate-in fade-in">
          <SpeedAnalyticsView language={language} />
        </section>
      )}

      {/* 8. Clean Ad Banner (Safe Monetization - Section 39 & 40) */}
      <CleanAdBanner language={language} />

      {/* 9. Live Grounded Examination Updates Widget */}
      <GroundedSearchWidget
        language={language}
        targetExam={targetExam}
      />

      {/* 10. Subjective Paper Model Rubric Modal */}
      {previewPaper && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  {previewPaper.branchCategory} • {previewPaper.code}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {language === 'hi' ? previewPaper.titleHi : previewPaper.titleEn}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'hi' ? previewPaper.branchNameHi : previewPaper.branchNameEn} • {previewPaper.examTarget}
                </p>
              </div>
              <button
                onClick={() => setPreviewPaper(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Paper Overview Metrics */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl text-center border border-slate-200/80">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Questions</div>
                <div className="text-base font-black text-slate-900">{previewPaper.questionsCount}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Duration</div>
                <div className="text-base font-black text-slate-900">{previewPaper.durationMinutes} Mins</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Marks</div>
                <div className="text-base font-black text-amber-600">{previewPaper.totalMarks} Marks</div>
              </div>
            </div>

            {/* Questions preview with Rubrics */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {language === 'hi' ? 'प्रश्न सूची एवं अंकन योजना (रूब्रिक्स)' : 'Questions & Official Marking Rubric'}
              </h4>
              <div className="space-y-3">
                {previewPaper.questions.map((q) => (
                  <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-indigo-700">Question {q.questionNumber}</span>
                      <div className="flex items-center space-x-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                          {q.marks} Marks
                        </span>
                        <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-[11px]">
                          {q.wordLimit} Words
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {language === 'hi' ? q.titleHi : q.titleEn}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1">
                      <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                        {language === 'hi' ? 'मूल्यांकन मानदंड' : 'Evaluation Criteria:'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {q.evaluationRubric.map((r, ri) => (
                          <div
                            key={ri}
                            className="bg-slate-50 px-2 py-1 rounded text-slate-600 flex items-center justify-between"
                          >
                            <span>{language === 'hi' ? r.criterionHi : r.criterionEn}</span>
                            <span className="font-bold text-amber-700">+{r.maxMarks}M</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPreviewPaper(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                {language === 'hi' ? 'बंद करें' : 'Close Preview'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const paperToLaunch = previewPaper;
                  setPreviewPaper(null);
                  if (onStartSubjectiveTest && paperToLaunch) {
                    onStartSubjectiveTest(paperToLaunch);
                  }
                }}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-600/30 transition flex items-center space-x-1.5 cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'उत्तर लेखन प्रारंभ करें' : 'Begin Written Practice'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
