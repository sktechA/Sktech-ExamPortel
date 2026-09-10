/**
 * SKTECH EXAM — Performance History & Score Progress Visualizer
 * Visualizes candidate score progress, accuracy trajectory, percentile growth,
 * and subject-wise mastery across multiple exam attempts using Recharts.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Clock,
  Target,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Calendar,
  ArrowUpRight,
  BarChart2,
  Filter,
  Sparkles,
  BookOpen,
  Eye,
  PlayCircle,
  Zap,
  Flame,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ResultScorecard, User, MockTest } from '../types';
import { api, getLocalScorecards } from '../services/apiClient';

interface PerformanceHistoryViewProps {
  candidateUser?: User | null;
  recentResult?: ResultScorecard;
  mockTests?: MockTest[];
  language: 'en' | 'hi';
  onStartTest: (testId: string) => void;
  onViewResult: (attemptId: string) => void;
}

type ChartMetric = 'SCORE' | 'ACCURACY_PERCENTILE' | 'TIME_PER_Q';
type ChartStyle = 'AREA' | 'LINE' | 'BAR';

export const PerformanceHistoryView: React.FC<PerformanceHistoryViewProps> = ({
  candidateUser,
  recentResult,
  mockTests = [],
  language,
  onStartTest,
  onViewResult,
}) => {
  const [historyResults, setHistoryResults] = useState<ResultScorecard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeMetric, setActiveMetric] = useState<ChartMetric>('SCORE');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('AREA');
  const [showBenchmarkTrajectory, setShowBenchmarkTrajectory] = useState<boolean>(false);
  const [selectedAttemptDetail, setSelectedAttemptDetail] = useState<ResultScorecard | null>(null);

  // Load results history from serverless API and local store
  useEffect(() => {
    let isMounted = true;
    const loadHistory = async () => {
      setIsLoading(true);
      try {
        const res = await api.getCandidateResultHistory(candidateUser?.id);
        if (isMounted && res?.data) {
          let list = [...res.data];
          if (recentResult && !list.some((r) => r.attemptId === recentResult.attemptId)) {
            list.unshift(recentResult);
          }
          setHistoryResults(list);
          if (list.length > 0 && !selectedAttemptDetail) {
            setSelectedAttemptDetail(list[0]);
          }
        }
      } catch (err) {
        console.warn('History load notice:', err);
        const local = getLocalScorecards();
        if (isMounted) {
          if (recentResult && !local.some((r) => r.attemptId === recentResult.attemptId)) {
            local.unshift(recentResult);
          }
          setHistoryResults(local);
          if (local.length > 0 && !selectedAttemptDetail) {
            setSelectedAttemptDetail(local[0]);
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadHistory();
    return () => {
      isMounted = false;
    };
  }, [candidateUser?.id, recentResult]);

  // Synthetic benchmark attempts for candidates who have few or 0 attempts
  // to visualize learning trajectory and exam readiness
  const benchmarkTrajectory: ResultScorecard[] = useMemo(() => {
    const today = new Date();
    return [
      {
        attemptId: 'bench_att_01',
        testId: 'mock_ibps_01',
        testTitle: 'IBPS PO Prelims 2026 — All India Mock #01',
        candidateName: candidateUser?.name || 'Candidate',
        submittedAt: new Date(today.getTime() - 21 * 86400000).toISOString(),
        totalQuestions: 100,
        totalMarks: 100,
        scoreObtained: 52.5,
        correctAnswers: 58,
        wrongAnswers: 22,
        skippedQuestions: 20,
        markedForReview: 6,
        accuracyPercentage: 72.5,
        attemptPercentage: 80,
        totalTimeTakenSeconds: 3420,
        percentile: 74.2,
        rank: 1240,
        totalParticipants: 4800,
        subjectPerformance: [
          { subjectName: 'Quantitative Aptitude', totalQuestions: 35, attempted: 26, correct: 18, wrong: 8, score: 16.0, accuracy: 69.2 },
          { subjectName: 'Logical Reasoning', totalQuestions: 35, attempted: 30, correct: 24, wrong: 6, score: 22.5, accuracy: 80.0 },
          { subjectName: 'English Language', totalQuestions: 30, attempted: 24, correct: 16, wrong: 8, score: 14.0, accuracy: 66.7 },
        ],
      },
      {
        attemptId: 'bench_att_02',
        testId: 'mock_ssc_01',
        testTitle: 'SSC CGL 2026 Tier-1 Benchmark Mock',
        candidateName: candidateUser?.name || 'Candidate',
        submittedAt: new Date(today.getTime() - 14 * 86400000).toISOString(),
        totalQuestions: 100,
        totalMarks: 200,
        scoreObtained: 124.0,
        correctAnswers: 68,
        wrongAnswers: 16,
        skippedQuestions: 16,
        markedForReview: 8,
        accuracyPercentage: 81.0,
        attemptPercentage: 84,
        totalTimeTakenSeconds: 3310,
        percentile: 82.6,
        rank: 820,
        totalParticipants: 4720,
        subjectPerformance: [
          { subjectName: 'Quantitative Aptitude', totalQuestions: 25, attempted: 22, correct: 18, wrong: 4, score: 34.0, accuracy: 81.8 },
          { subjectName: 'General Intelligence', totalQuestions: 25, attempted: 24, correct: 21, wrong: 3, score: 40.5, accuracy: 87.5 },
          { subjectName: 'English Comprehension', totalQuestions: 25, attempted: 20, correct: 16, wrong: 4, score: 30.0, accuracy: 80.0 },
          { subjectName: 'General Awareness', totalQuestions: 25, attempted: 18, correct: 13, wrong: 5, score: 19.5, accuracy: 72.2 },
        ],
      },
      {
        attemptId: 'bench_att_03',
        testId: 'mock_speed_booster_01',
        testTitle: 'Speed Booster Track 1: Solving & Calculation Sprint',
        candidateName: candidateUser?.name || 'Candidate',
        submittedAt: new Date(today.getTime() - 7 * 86400000).toISOString(),
        totalQuestions: 100,
        totalMarks: 100,
        scoreObtained: 71.5,
        correctAnswers: 76,
        wrongAnswers: 18,
        skippedQuestions: 6,
        markedForReview: 5,
        accuracyPercentage: 80.8,
        attemptPercentage: 94,
        totalTimeTakenSeconds: 5120,
        percentile: 89.4,
        rank: 410,
        totalParticipants: 3950,
        subjectPerformance: [
          { subjectName: 'Quant & DI Speed', totalQuestions: 50, attempted: 48, correct: 39, wrong: 9, score: 36.75, accuracy: 81.25 },
          { subjectName: 'Reasoning & Puzzles', totalQuestions: 50, attempted: 46, correct: 37, wrong: 9, score: 34.75, accuracy: 80.43 },
        ],
      },
      {
        attemptId: 'bench_att_04',
        testId: 'mock_mppsc_01',
        testTitle: 'MPPSC State Service Prelims — General Studies & MP GK',
        candidateName: candidateUser?.name || 'Candidate',
        submittedAt: new Date(today.getTime() - 2 * 86400000).toISOString(),
        totalQuestions: 100,
        totalMarks: 200,
        scoreObtained: 156.0,
        correctAnswers: 78,
        wrongAnswers: 22,
        skippedQuestions: 0,
        markedForReview: 12,
        accuracyPercentage: 78.0,
        attemptPercentage: 100,
        totalTimeTakenSeconds: 6840,
        percentile: 93.8,
        rank: 185,
        totalParticipants: 2980,
        subjectPerformance: [
          { subjectName: 'MP History & Culture', totalQuestions: 30, attempted: 30, correct: 25, wrong: 5, score: 50.0, accuracy: 83.3 },
          { subjectName: 'Indian Polity & Economy', totalQuestions: 35, attempted: 35, correct: 27, wrong: 8, score: 54.0, accuracy: 77.1 },
          { subjectName: 'Science & Environment', totalQuestions: 35, attempted: 35, correct: 26, wrong: 9, score: 52.0, accuracy: 74.3 },
        ],
      },
    ];
  }, [candidateUser?.name]);

  // Combined attempts to display
  const effectiveAttempts = useMemo(() => {
    const realAttempts = [...historyResults];
    // If candidate has real attempts and user hasn't explicitly toggled benchmark comparison
    if (realAttempts.length > 0 && !showBenchmarkTrajectory) {
      return realAttempts;
    }
    // If no real attempts or benchmark trajectory is toggled
    if (realAttempts.length === 0) {
      return benchmarkTrajectory;
    }
    // Blend benchmark with real attempts, preserving chronologic order
    const combined = [...benchmarkTrajectory, ...realAttempts];
    // Deduplicate by attemptId
    const seen = new Set<string>();
    return combined.filter((item) => {
      if (seen.has(item.attemptId)) return false;
      seen.add(item.attemptId);
      return true;
    });
  }, [historyResults, showBenchmarkTrajectory, benchmarkTrajectory]);

  // Chronologically sorted for Recharts X-axis timeline
  const chronologicalAttempts = useMemo(() => {
    return [...effectiveAttempts].sort(
      (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
    );
  }, [effectiveAttempts]);

  // Filtered by category if selected
  const filteredAttempts = useMemo(() => {
    if (selectedCategory === 'ALL') return chronologicalAttempts;
    return chronologicalAttempts.filter((att) => {
      const title = (att.testTitle || '').toUpperCase();
      if (selectedCategory === 'BANKING') return title.includes('IBPS') || title.includes('SBI') || title.includes('BANK');
      if (selectedCategory === 'SSC') return title.includes('SSC') || title.includes('CGL') || title.includes('CHSL');
      if (selectedCategory === 'MPPSC') return title.includes('MPPSC') || title.includes('STATE');
      if (selectedCategory === 'SPEED_BOOSTER') return title.includes('SPEED') || title.includes('BOOSTER');
      if (selectedCategory === 'ENGINEERING') return title.includes('EE') || title.includes('ENGINEERING') || title.includes('GATE');
      return true;
    });
  }, [chronologicalAttempts, selectedCategory]);

  // Recharts Chart Dataset formatting
  const chartData = useMemo(() => {
    return filteredAttempts.map((att, idx) => {
      const dateObj = new Date(att.submittedAt);
      const formattedDate = !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
            month: 'short',
            day: 'numeric',
          })
        : `Test #${idx + 1}`;

      const totalAttempted = Math.max(1, att.correctAnswers + att.wrongAnswers);
      const timePerQuestion = Math.round(att.totalTimeTakenSeconds / totalAttempted);
      const scorePercentage = Math.round((att.scoreObtained / Math.max(1, att.totalMarks)) * 1000) / 10;

      // Short label for chart tooltip & axis
      const shortTitle = att.testTitle.length > 20 ? `${att.testTitle.substring(0, 18)}...` : att.testTitle;

      return {
        index: idx + 1,
        attemptId: att.attemptId,
        testId: att.testId,
        label: `#${idx + 1} (${formattedDate})`,
        shortTitle,
        fullTitle: att.testTitle,
        date: formattedDate,
        fullDate: dateObj.toLocaleDateString(),
        scoreObtained: Math.round(att.scoreObtained * 10) / 10,
        totalMarks: att.totalMarks,
        scorePercentage,
        cutOffPercentage: 60, // Qualifying cut-off line
        accuracyPercentage: att.accuracyPercentage || Math.round((att.correctAnswers / totalAttempted) * 100),
        percentile: att.percentile || 75,
        timePerQuestion,
        rank: att.rank || 1,
        totalParticipants: att.totalParticipants || 1000,
        correctAnswers: att.correctAnswers,
        wrongAnswers: att.wrongAnswers,
        skippedQuestions: att.skippedQuestions,
      };
    });
  }, [filteredAttempts, language]);

  // Aggregate Key Performance Indicators
  const kpis = useMemo(() => {
    if (filteredAttempts.length === 0) {
      return {
        totalAttempts: 0,
        avgScorePercentage: 0,
        bestScore: 0,
        bestScoreTitle: '—',
        avgAccuracy: 0,
        avgTimePerQ: 0,
        firstScorePercentage: 0,
        latestScorePercentage: 0,
        scoreGrowth: 0,
        percentileLatest: 0,
      };
    }

    const totalAttempts = filteredAttempts.length;
    const scores = filteredAttempts.map((a) => (a.scoreObtained / Math.max(1, a.totalMarks)) * 100);
    const accuracies = filteredAttempts.map((a) => a.accuracyPercentage || 0);
    const times = filteredAttempts.map((a) =>
      Math.round(a.totalTimeTakenSeconds / Math.max(1, a.correctAnswers + a.wrongAnswers))
    );

    const avgScorePercentage = Math.round((scores.reduce((a, b) => a + b, 0) / totalAttempts) * 10) / 10;
    const avgAccuracy = Math.round((accuracies.reduce((a, b) => a + b, 0) / totalAttempts) * 10) / 10;
    const avgTimePerQ = Math.round(times.reduce((a, b) => a + b, 0) / totalAttempts);

    // Find best attempt
    let bestAtt = filteredAttempts[0];
    let maxPct = (bestAtt.scoreObtained / Math.max(1, bestAtt.totalMarks)) * 100;
    filteredAttempts.forEach((att) => {
      const pct = (att.scoreObtained / Math.max(1, att.totalMarks)) * 100;
      if (pct > maxPct) {
        maxPct = pct;
        bestAtt = att;
      }
    });

    const firstScorePercentage = Math.round(((filteredAttempts[0].scoreObtained / Math.max(1, filteredAttempts[0].totalMarks)) * 100) * 10) / 10;
    const latestAttempt = filteredAttempts[filteredAttempts.length - 1];
    const latestScorePercentage = Math.round(((latestAttempt.scoreObtained / Math.max(1, latestAttempt.totalMarks)) * 100) * 10) / 10;
    const scoreGrowth = Math.round((latestScorePercentage - firstScorePercentage) * 10) / 10;

    return {
      totalAttempts,
      avgScorePercentage,
      bestScore: Math.round(maxPct * 10) / 10,
      bestScoreTitle: bestAtt.testTitle,
      avgAccuracy,
      avgTimePerQ,
      firstScorePercentage,
      latestScorePercentage,
      scoreGrowth,
      percentileLatest: latestAttempt.percentile || 85,
    };
  }, [filteredAttempts]);

  // Aggregate Subject Mastery data across attempts
  const subjectMasteryData = useMemo(() => {
    const subjectMap: Record<string, { totalQ: number; correctQ: number; totalScore: number }> = {};

    filteredAttempts.forEach((att) => {
      if (Array.isArray(att.subjectPerformance)) {
        att.subjectPerformance.forEach((sub) => {
          const name = sub.subjectName || 'General';
          if (!subjectMap[name]) {
            subjectMap[name] = { totalQ: 0, correctQ: 0, totalScore: 0 };
          }
          subjectMap[name].totalQ += sub.totalQuestions || 0;
          subjectMap[name].correctQ += sub.correct || 0;
          subjectMap[name].totalScore += sub.score || 0;
        });
      }
    });

    const list = Object.entries(subjectMap).map(([subjectName, stats]) => {
      const accuracy = stats.totalQ > 0 ? Math.round((stats.correctQ / stats.totalQ) * 100) : 0;
      return {
        subject: subjectName.length > 18 ? `${subjectName.substring(0, 16)}...` : subjectName,
        fullName: subjectName,
        accuracy,
        totalQuestions: stats.totalQ,
        correctAnswers: stats.correctQ,
      };
    });

    if (list.length === 0) {
      return [
        { subject: 'Quant & DI', fullName: 'Quantitative Aptitude & DI', accuracy: 81, totalQuestions: 110, correctAnswers: 89 },
        { subject: 'Logical Reasoning', fullName: 'Logical Reasoning & Puzzles', accuracy: 86, totalQuestions: 105, correctAnswers: 90 },
        { subject: 'General Awareness', fullName: 'General Awareness & Current Affairs', accuracy: 74, totalQuestions: 85, correctAnswers: 63 },
        { subject: 'English Language', fullName: 'English Comprehension', accuracy: 78, totalQuestions: 74, correctAnswers: 58 },
      ];
    }
    return list;
  }, [filteredAttempts]);

  // Custom Recharts Tooltip
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-extrabold text-indigo-400 font-mono">Attempt {data.label}</span>
            <span className="text-[10px] text-slate-400">{data.fullDate}</span>
          </div>
          <div className="font-bold text-slate-200 line-clamp-1">{data.fullTitle}</div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-slate-800/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Score</span>
              <span className="text-sm font-black text-emerald-400 font-mono">
                {data.scoreObtained} / {data.totalMarks}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">({data.scorePercentage}%)</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Accuracy</span>
              <span className="text-sm font-black text-indigo-300 font-mono">
                {data.accuracyPercentage}%
              </span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Percentile</span>
              <span className="text-sm font-black text-amber-400 font-mono">
                {data.percentile}%ile
              </span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Speed</span>
              <span className="text-sm font-black text-sky-300 font-mono">
                {data.timePerQuestion} s/Q
              </span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
            <span>Rank #{data.rank} of {data.totalParticipants}</span>
            <span className="text-emerald-400">Click below to view full solutions</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="performance-history-section" className="space-y-8 animate-in fade-in pb-8">
      {/* 1. Header Banner & Context Controls */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'hi' ? 'प्रगति एवं प्राप्तांक विश्लेषण' : 'Comprehensive Score Progression'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{language === 'hi' ? 'परीक्षार्थी प्रदर्शन इतिहास' : 'Candidate Performance History'}</span>
              <span className="text-xs font-mono font-normal bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
                {filteredAttempts.length} {language === 'hi' ? 'प्रयास दर्ज' : 'Attempts Tracked'}
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {language === 'hi'
                ? 'विभिन्न मॉक टेस्ट प्रयासों में अपने प्राप्तांक, सटीकता, गति तथा अखिल भारतीय परसेंटाइल में क्रमिक सुधार की रीयल-टाइम ग्राफ़िकल मैपिंग।'
                : 'Visualize your empirical score trajectory, accuracy gains, pacing benchmarks, and All-India percentile growth across computer-based mock tests.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {historyResults.length === 0 && (
              <button
                type="button"
                onClick={() => setShowBenchmarkTrajectory((prev) => !prev)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 border cursor-pointer ${
                  showBenchmarkTrajectory
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                    : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>
                  {showBenchmarkTrajectory
                    ? (language === 'hi' ? 'मॉडल प्रगति सक्रिय' : 'Benchmark Mode Active')
                    : (language === 'hi' ? 'मॉडल प्रगति देखें' : 'View Sample Trajectory')}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onStartTest(mockTests[0]?.id || 'mock_ibps_01')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/40 transition active:scale-98 text-xs flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'नया मॉक टेस्ट दें' : 'Take New Mock Test'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Core Progress Metrics Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Card 1: Score Growth */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{language === 'hi' ? 'प्राप्तांक प्रगति' : 'Score Growth'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {kpis.scoreGrowth >= 0 ? `+${kpis.scoreGrowth}%` : `${kpis.scoreGrowth}%`}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              Trajectory
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            {kpis.totalAttempts > 1
              ? `${kpis.firstScorePercentage}% (First) → ${kpis.latestScorePercentage}% (Latest)`
              : 'Requires multiple mock attempts'}
          </div>
        </div>

        {/* Card 2: Peak Score */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{language === 'hi' ? 'सर्वोत्तम स्कोर' : 'Peak Score'}</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
              {kpis.bestScore}%
            </span>
            <span className="text-xs font-semibold text-slate-500">Personal Best</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium line-clamp-1" title={kpis.bestScoreTitle}>
            {kpis.bestScoreTitle}
          </div>
        </div>

        {/* Card 3: Average Accuracy */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{language === 'hi' ? 'औसत सटीकता' : 'Average Accuracy'}</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {kpis.avgAccuracy}%
            </span>
            <span className="text-xs font-semibold text-indigo-600">Hit Rate</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            {kpis.avgAccuracy >= 75
              ? (language === 'hi' ? 'उत्कृष्ट सटीकता (कट-ऑफ अनुकूल)' : 'High Precision (Target Safe)')
              : (language === 'hi' ? 'नकारात्मक अंकन कम करें' : 'Reduce penalty on unconfident Qs')}
          </div>
        </div>

        {/* Card 4: Avg Speed per Question */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>{language === 'hi' ? 'औसत गति' : 'Average Speed'}</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {kpis.avgTimePerQ} <span className="text-xs font-medium text-slate-500">sec/Q</span>
            </span>
            <span className="text-xs font-semibold text-sky-600 font-mono">
              {kpis.percentileLatest}%ile
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            {kpis.avgTimePerQ <= 55 ? 'Optimal pacing for CBT exams' : 'Focus on calculation shortcuts'}
          </div>
        </div>
      </section>

      {/* 3. Primary Recharts Interactive Progress Graph */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-black text-slate-900">
                {language === 'hi' ? 'क्रमिक प्राप्तांक एवं प्रदर्शन वक्र' : 'Empirical Score Progression Chart'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'hi'
                ? 'समय के साथ आयोजित विभिन्न परीक्षाओं में प्रतिशत, सटीकता एवं समय प्रबंधन की तुलना।'
                : 'Interactive timeline charting score percentages, qualifying cut-off reference, and percentile trends.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Metric Toggle */}
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveMetric('SCORE')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeMetric === 'SCORE'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'hi' ? 'स्कोर % व कट-ऑफ' : 'Score % & Cut-off'}
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('ACCURACY_PERCENTILE')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeMetric === 'ACCURACY_PERCENTILE'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'hi' ? 'सटीकता व परसेंटाइल' : 'Accuracy & %ile'}
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('TIME_PER_Q')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeMetric === 'TIME_PER_Q'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'hi' ? 'गति (सेकंड/प्रश्न)' : 'Speed (sec/Q)'}
              </button>
            </div>

            {/* Chart Style Switcher */}
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setChartStyle('AREA')}
                className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                  chartStyle === 'AREA' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Smooth Area Curve"
              >
                Area
              </button>
              <button
                type="button"
                onClick={() => setChartStyle('LINE')}
                className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                  chartStyle === 'LINE' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Direct Line Chart"
              >
                Line
              </button>
              <button
                type="button"
                onClick={() => setChartStyle('BAR')}
                className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                  chartStyle === 'BAR' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Bar Chart"
              >
                Bar
              </button>
            </div>

            {/* Exam Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="ALL">All Exam Tracks</option>
                <option value="BANKING">Banking (IBPS/SBI)</option>
                <option value="SSC">SSC (CGL/CHSL)</option>
                <option value="MPPSC">State PSC (MPPSC)</option>
                <option value="SPEED_BOOSTER">Speed Boosters</option>
                <option value="ENGINEERING">Engineering JE/GATE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notice when viewing sample benchmark data */}
        {historyResults.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {language === 'hi'
                  ? 'यह नमूना प्रगति वक्र (Sample Growth Trajectory) है। जैसे ही आप कोई नया मॉक टेस्ट सबमिट करेंगे, आपके वास्तविक प्राप्तांक यहाँ रीयल-टाइम में दिखने लगेंगे।'
                  : 'Displaying verified sample benchmark trajectory. As soon as you complete and submit your next mock test, your empirical score will automatically plot here!'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onStartTest('mock_ibps_01')}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1 rounded-xl text-[11px] whitespace-nowrap ml-3 cursor-pointer shadow-xs"
            >
              Start Live Test
            </button>
          </div>
        )}

        {/* The Recharts Canvas Container */}
        <div className="h-80 sm:h-96 w-full pt-2">
          {chartData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
              <Filter className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-semibold">No exam attempts match the selected filter category.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('ALL')}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                Clear Category Filter
              </button>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartStyle === 'AREA' ? (
                <AreaChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 25 }}>
                  <defs>
                    <linearGradient id="scoreColorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.85} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="accuracyColorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.85} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="percentileColorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.85} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="speedColorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.85} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={activeMetric === 'TIME_PER_Q' ? [0, 'auto'] : [0, 100]}
                    unit={activeMetric === 'TIME_PER_Q' ? 's' : '%'}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 12, fontSize: 12 }} />

                  {activeMetric === 'SCORE' && (
                    <>
                      <ReferenceLine
                        y={60}
                        label={{
                          value: 'Qualifying Cut-off (60%)',
                          position: 'insideTopRight',
                          fill: '#dc2626',
                          fontSize: 10,
                          fontWeight: 'bold',
                        }}
                        stroke="#dc2626"
                        strokeDasharray="4 4"
                      />
                      <Area
                        type="monotone"
                        dataKey="scorePercentage"
                        name="Score Achieved (%)"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#scoreColorGrad)"
                        activeDot={{ r: 6, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2 }}
                      />
                    </>
                  )}

                  {activeMetric === 'ACCURACY_PERCENTILE' && (
                    <>
                      <Area
                        type="monotone"
                        dataKey="accuracyPercentage"
                        name="Accuracy Rate (%)"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#accuracyColorGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="percentile"
                        name="All-India Percentile (%ile)"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#percentileColorGrad)"
                      />
                    </>
                  )}

                  {activeMetric === 'TIME_PER_Q' && (
                    <>
                      <ReferenceLine
                        y={54}
                        label={{
                          value: 'Ideal Pace (<54s)',
                          position: 'insideTopRight',
                          fill: '#10b981',
                          fontSize: 10,
                          fontWeight: 'bold',
                        }}
                        stroke="#10b981"
                        strokeDasharray="4 4"
                      />
                      <Area
                        type="monotone"
                        dataKey="timePerQuestion"
                        name="Avg Seconds / Question"
                        stroke="#0ea5e9"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#speedColorGrad)"
                      />
                    </>
                  )}
                </AreaChart>
              ) : chartStyle === 'LINE' ? (
                <LineChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={activeMetric === 'TIME_PER_Q' ? [0, 'auto'] : [0, 100]}
                    unit={activeMetric === 'TIME_PER_Q' ? 's' : '%'}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 12, fontSize: 12 }} />

                  {activeMetric === 'SCORE' && (
                    <>
                      <ReferenceLine
                        y={60}
                        stroke="#dc2626"
                        strokeDasharray="4 4"
                        label={{ value: 'Qualifying (60%)', fill: '#dc2626', fontSize: 10 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="scorePercentage"
                        name="Score Achieved (%)"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2 }}
                        activeDot={{ r: 7 }}
                      />
                    </>
                  )}

                  {activeMetric === 'ACCURACY_PERCENTILE' && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="accuracyPercentage"
                        name="Accuracy Rate (%)"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="percentile"
                        name="Percentile (%ile)"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                      />
                    </>
                  )}

                  {activeMetric === 'TIME_PER_Q' && (
                    <Line
                      type="monotone"
                      dataKey="timePerQuestion"
                      name="Seconds / Question"
                      stroke="#0ea5e9"
                      strokeWidth={2.5}
                      dot={{ r: 4 }}
                    />
                  )}
                </LineChart>
              ) : (
                <BarChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={activeMetric === 'TIME_PER_Q' ? [0, 'auto'] : [0, 100]}
                    unit={activeMetric === 'TIME_PER_Q' ? 's' : '%'}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 12, fontSize: 12 }} />

                  {activeMetric === 'SCORE' && (
                    <>
                      <ReferenceLine y={60} stroke="#dc2626" strokeDasharray="4 4" />
                      <Bar dataKey="scorePercentage" name="Score Achieved (%)" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                    </>
                  )}

                  {activeMetric === 'ACCURACY_PERCENTILE' && (
                    <>
                      <Bar dataKey="accuracyPercentage" name="Accuracy Rate (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="percentile" name="Percentile (%ile)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </>
                  )}

                  {activeMetric === 'TIME_PER_Q' && (
                    <Bar dataKey="timePerQuestion" name="Seconds / Question" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* 4. Subject-Wise Mastery & Diagnostic Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Subject Mastery Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'विषयवार दक्षता एवं सटीकता' : 'Subject-Wise Mastery Breakdown'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? 'विभिन्न विषयों में कुल प्रश्नों के सापेक्ष आपकी सही उत्तर दर'
                  : 'Cumulative accuracy percentage across subjects based on all submitted tests.'}
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
              Target: ≥75%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectMasteryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis dataKey="subject" type="category" stroke="#475569" fontSize={11} tickLine={false} width={100} />
                <Tooltip
                  formatter={(value: any, name: any, item: any) => [
                    `${value}% Accuracy (${item.payload.correctAnswers}/${item.payload.totalQuestions} Qs)`,
                    item.payload.fullName,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <ReferenceLine x={75} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target 75%', fill: '#10b981', fontSize: 10 }} />
                <Bar dataKey="accuracy" fill="#4f46e5" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
            {subjectMasteryData.map((sub, i) => (
              <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold block truncate" title={sub.fullName}>
                  {sub.fullName}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-black text-slate-800 font-mono">{sub.accuracy}%</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      sub.accuracy >= 75
                        ? 'bg-emerald-100 text-emerald-800'
                        : sub.accuracy >= 60
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {sub.accuracy >= 75 ? 'Strong' : sub.accuracy >= 60 ? 'Moderate' : 'Focus'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Comparative Evolution Insights Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-800/40 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'तैयारी मूल्यांकन' : 'Readiness Assessment'}</span>
            </div>
            <h3 className="text-lg font-black text-white leading-tight">
              {kpis.scoreGrowth >= 0
                ? (language === 'hi' ? 'निरंतर प्रगतिशील रुझान' : 'Upward Trajectory Verified')
                : (language === 'hi' ? 'पुनरावलोकन आवश्यक' : 'Diagnostic Revision Recommended')}
            </h3>
            <p className="text-xs text-indigo-200/80 mt-1.5 leading-relaxed">
              {language === 'hi'
                ? `आपके प्रथम प्रयास से लेकर नवीनतम प्रयास के मध्य +${kpis.scoreGrowth}% की उल्लेखनीय वृद्धि दर्ज हुई है।`
                : `Your scores improved by +${kpis.scoreGrowth}% across benchmark attempts, placing you comfortably in the ${kpis.percentileLatest}th percentile.`}
            </p>
          </div>

          {/* First vs Latest Benchmark Comparison Pill */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-2.5 text-xs">
            <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
              {language === 'hi' ? 'प्रारंभिक बनाम वर्तमान' : 'First vs Latest Mock Comparison'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/20 p-2.5 rounded-xl">
                <span className="text-[10px] text-indigo-300 block">First Mock</span>
                <span className="text-base font-black text-white font-mono">{kpis.firstScorePercentage}%</span>
                <span className="text-[10px] text-slate-400 block">Initial Baseline</span>
              </div>
              <div className="bg-indigo-600/40 border border-indigo-400/30 p-2.5 rounded-xl">
                <span className="text-[10px] text-emerald-300 block">Latest Mock</span>
                <span className="text-base font-black text-emerald-400 font-mono">{kpis.latestScorePercentage}%</span>
                <span className="text-[10px] text-emerald-300 block">+{kpis.scoreGrowth}% Gained</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onStartTest('mock_speed_booster_01')}
              className="w-full bg-white hover:bg-slate-100 text-indigo-950 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'स्पीड बूस्टर स्प्रिंट प्रारंभ करें' : 'Boost Pacing (Speed Sprint)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Detailed Attempts History Table & Solution Navigation */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>{language === 'hi' ? 'विगत परीक्षाओं का विस्तृत विवरण' : 'Attempted Examinations Log'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'hi'
                ? 'प्रत्येक प्रयास का प्राप्तांक, सटीकता, हल किए गए प्रश्न तथा विस्तृत उत्तर समाधान लिंक'
                : 'Complete chronicle of all submitted examinations with instantaneous scorecard review.'}
            </p>
          </div>

          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
            Showing {filteredAttempts.length} Tests
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200/80">
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Exam / Mock Test</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4">Accuracy</th>
                <th className="py-3.5 px-4">Speed</th>
                <th className="py-3.5 px-4">Percentile & Rank</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttempts.map((att, idx) => {
                const dateObj = new Date(att.submittedAt);
                const formattedDate = !isNaN(dateObj.getTime())
                  ? dateObj.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Recent';

                const totalAtt = Math.max(1, att.correctAnswers + att.wrongAnswers);
                const scorePct = Math.round((att.scoreObtained / Math.max(1, att.totalMarks)) * 100);
                const speedSec = Math.round(att.totalTimeTakenSeconds / totalAtt);
                const isSelected = selectedAttemptDetail?.attemptId === att.attemptId;

                return (
                  <tr
                    key={att.attemptId || idx}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-indigo-50/40' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 line-clamp-1">{att.testTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{att.testId}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {formattedDate}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="font-black font-mono text-slate-900">
                          {att.scoreObtained} <span className="text-slate-400 font-normal">/ {att.totalMarks}</span>
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${
                            scorePct >= 60
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {scorePct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono font-bold text-slate-700">
                      <span className={att.accuracyPercentage >= 75 ? 'text-emerald-600' : 'text-slate-700'}>
                        {att.accuracyPercentage}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal ml-1">
                        ({att.correctAnswers}✓ {att.wrongAnswers}✗)
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-600">
                      {speedSec}s <span className="text-[10px] text-slate-400">/Q</span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-slate-800">{att.percentile}%ile</div>
                      <div className="text-[10px] text-slate-400">Rank #{att.rank} / {att.totalParticipants}</div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => onViewResult(att.attemptId)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition flex items-center space-x-1 cursor-pointer"
                          title="View Scorecard & Step-by-Step Solutions"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'स्कोरकार्ड' : 'Scorecard'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onStartTest(att.testId)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                          title="Retake Exam"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
