/**
 * SKTECH EXAM — Result Scorecard & Performance Analytics
 * Section 11 Compliance: SCORE, ACCURACY, CORRECT, WRONG, SKIPPED, TIME, PERCENTILE, RANK
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  Languages,
  Check,
} from 'lucide-react';
import { ResultScorecard as ResultType, Question } from '../types';

interface ResultScorecardProps {
  scorecard: ResultType;
  questions?: Question[];
  onRetake: () => void;
  onBackToDashboard: () => void;
  language: 'en' | 'hi';
}

export const ResultScorecard: React.FC<ResultScorecardProps> = ({
  scorecard,
  questions = [],
  onRetake,
  onBackToDashboard,
  language: initialLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SOLUTIONS'>('OVERVIEW');
  const [solutionLang, setSolutionLang] = useState<'en' | 'hi'>(initialLanguage);
  const [filterSolution, setFilterSolution] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'SKIPPED'>('ALL');

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}m ${remainderSecs}s`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Navigation & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Performance Scorecard
            </span>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {scorecard.testTitle}
            </h1>
            <p className="text-xs text-slate-500">
              Submitted at: <span className="font-mono">{scorecard.submittedAt}</span> • Candidate: {scorecard.candidateName}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRetake}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Test</span>
          </button>
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs shadow-indigo-600/30 transition"
          >
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      {/* 2. Key 8 Mandated Metrics Grid (Section 11) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Metric 1: SCORE */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Score</div>
          <div className="text-xl font-black text-indigo-700 mt-1">{scorecard.scoreObtained}</div>
          <div className="text-[10px] text-slate-500">out of {scorecard.totalMarks}</div>
        </div>

        {/* Metric 2: ACCURACY */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
          <div className="text-xl font-black text-emerald-600 mt-1">{scorecard.accuracyPercentage}%</div>
          <div className="text-[10px] text-slate-500">Net Precision</div>
        </div>

        {/* Metric 3: CORRECT */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-emerald-600">Correct</div>
          <div className="text-xl font-black text-emerald-700 mt-1">{scorecard.correctAnswers}</div>
          <div className="text-[10px] text-slate-500">Positive Marks</div>
        </div>

        {/* Metric 4: WRONG */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-rose-600">Wrong</div>
          <div className="text-xl font-black text-rose-700 mt-1">{scorecard.wrongAnswers}</div>
          <div className="text-[10px] text-slate-500">Negative Penalty</div>
        </div>

        {/* Metric 5: SKIPPED */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-500">Skipped</div>
          <div className="text-xl font-black text-slate-700 mt-1">{scorecard.skippedQuestions}</div>
          <div className="text-[10px] text-slate-500">Zero Impact</div>
        </div>

        {/* Metric 6: TIME */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Time Taken</div>
          <div className="text-base font-black text-slate-800 mt-1.5 font-mono">
            {formatDuration(scorecard.totalTimeTakenSeconds)}
          </div>
          <div className="text-[10px] text-slate-500">Total Spent</div>
        </div>

        {/* Metric 7: PERCENTILE */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-indigo-600">Percentile</div>
          <div className="text-xl font-black text-indigo-600 mt-1">{scorecard.percentile}%</div>
          <div className="text-[10px] text-slate-500">All-India</div>
        </div>

        {/* Metric 8: RANK */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
          <div className="text-[10px] uppercase font-bold text-amber-600">Rank</div>
          <div className="text-xl font-black text-amber-700 mt-1">#{scorecard.rank}</div>
          <div className="text-[10px] text-slate-500">of {scorecard.totalParticipants}</div>
        </div>
      </div>

      {/* 3. Tab Switcher: Overview vs Detailed Solutions */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-5 py-2.5 font-bold text-xs border-b-2 transition ${
            activeTab === 'OVERVIEW'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Section-wise Performance Breakdown
        </button>
        <button
          onClick={() => setActiveTab('SOLUTIONS')}
          className={`px-5 py-2.5 font-bold text-xs border-b-2 transition ${
            activeTab === 'SOLUTIONS'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Question-by-Question Solution & Explanations
        </button>
      </div>

      {/* 4. Section Performance Table */}
      {activeTab === 'OVERVIEW' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Subject Breakdown & Efficiency</h3>
            <span className="text-xs text-slate-500">Evaluated on Central Scoring Server</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">Subject</th>
                  <th className="px-5 py-3">Total Qs</th>
                  <th className="px-5 py-3">Attempted</th>
                  <th className="px-5 py-3">Correct</th>
                  <th className="px-5 py-3">Wrong</th>
                  <th className="px-5 py-3">Net Score</th>
                  <th className="px-5 py-3">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {scorecard.subjectPerformance.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5 font-bold text-slate-900">{sub.subjectName}</td>
                    <td className="px-5 py-3.5 font-mono">{sub.totalQuestions}</td>
                    <td className="px-5 py-3.5 font-mono">{sub.attempted}</td>
                    <td className="px-5 py-3.5 text-emerald-700 font-bold font-mono">+{sub.correct}</td>
                    <td className="px-5 py-3.5 text-rose-700 font-bold font-mono">-{sub.wrong}</td>
                    <td className="px-5 py-3.5 font-extrabold text-indigo-700 font-mono">{sub.score}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold font-mono">{sub.accuracy}%</span>
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              sub.accuracy >= 80 ? 'bg-emerald-500' : sub.accuracy >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${sub.accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Detailed Solution & Bilingual Explanations */}
      {activeTab === 'SOLUTIONS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-500 font-semibold">Solution Language:</span>
              <button
                onClick={() => setSolutionLang(solutionLang === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 transition"
              >
                <Languages className="w-3.5 h-3.5 text-indigo-600" />
                <span>{solutionLang === 'en' ? 'English' : 'हिन्दी'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Review verified explanations and step-by-step shortcuts
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      Question {idx + 1}
                    </span>
                    <span className="text-xs text-slate-500">{q.subjectName} • {q.topicName}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Correct Answer: <strong className="font-mono">{q.correctAnswer}</strong>
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                  {solutionLang === 'hi' ? q.textHi : q.textEn}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt) => {
                    const isCorrect = opt.key === q.correctAnswer;
                    return (
                      <div
                        key={opt.key}
                        className={`p-2.5 rounded-lg border flex items-center justify-between ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold'
                            : 'border-slate-200 bg-slate-50/50 text-slate-700'
                        }`}
                      >
                        <span>
                          <strong className="mr-1.5 font-mono">{opt.key}.</strong>
                          {solutionLang === 'hi' ? opt.textHi : opt.textEn}
                        </span>
                        {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="bg-indigo-50/60 border border-indigo-100 p-3.5 rounded-xl text-xs space-y-1 text-slate-800">
                  <div className="font-bold text-indigo-900 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Detailed Solution & Method</span>
                  </div>
                  <p className="leading-relaxed">
                    {solutionLang === 'hi' ? q.explanationHi : q.explanationEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
