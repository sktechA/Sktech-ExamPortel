/**
 * SKTECH EXAM — Smart Practice & Adaptive Drills Component
 * Implements Section 26 specifications:
 * Subject Practice, Topic Practice, Weak Area Drills, Daily Challenge, and 100-Question Challenge.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  Brain,
  Zap,
  Target,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Clock,
  Compass,
  Sparkles,
} from 'lucide-react';
import { Subject } from '../types';

interface SmartPracticeViewProps {
  subjects: Subject[];
  language: 'en' | 'hi';
  onLaunchPractice: (mode: string, params: any) => void;
}

export const SmartPracticeView: React.FC<SmartPracticeViewProps> = ({
  subjects,
  language,
  onLaunchPractice,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]?.nameEn || 'Quantitative Aptitude');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('MODERATE');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [timedMode, setTimedMode] = useState<boolean>(true);

  return (
    <div className="space-y-8">
      {/* 1. Daily & Marathon Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Daily 15-Min Challenge */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white border border-indigo-700/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'hi' ? 'दैनिक 15-मिनट चुनौती' : 'Daily 15-Min Power Challenge'}</span>
            </div>
            <h3 className="text-xl font-black text-white">
              {language === 'hi' ? 'आज की मिश्रित अभ्यास ड्रिल' : "Today's Mixed Curated Sprint"}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? '25 उच्च संभावना वाले प्रश्न (क्वांट, रीजनिंग, अंग्रेजी एवं समसामयिकी)। प्रतिदिन अभ्यास करें और अपनी ऑल-इंडिया रैंकिंग सुधारें।'
                : '25 high-probability questions across Quant, Reasoning, English, and Current Affairs. Instant ranking and percentile.'}
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-300 font-mono pt-1">
              <span>⏱ 15 Mins</span>
              <span>• 25 Questions</span>
              <span className="text-emerald-400">+25 Marks</span>
            </div>
          </div>

          <div className="pt-5 relative z-10">
            <button
              onClick={() => onLaunchPractice('DAILY_CHALLENGE', { duration: 15, questions: 25 })}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/40 transition active:scale-98 flex items-center justify-center space-x-2 text-xs cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{language === 'hi' ? 'दैनिक चुनौती शुरू करें' : 'Start Daily Challenge'}</span>
            </button>
          </div>
        </div>

        {/* 100-Question Marathon Sprint */}
        <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-slate-900 rounded-3xl p-6 text-white border border-amber-700/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'hi' ? '100 प्रश्न मैराथन स्प्रिंट' : '100 Question Full Sprint'}</span>
            </div>
            <h3 className="text-xl font-black text-white">
              {language === 'hi' ? 'सहनशक्ति एवं गति मैराथन' : 'Endurance & Speed Assessment'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'वास्तविक परीक्षा दबाव का अनुभव करें। 90 मिनट में 100 प्रश्नों को हल कर अपनी समय प्रबंधन क्षमता को मापें।'
                : 'Test your exam endurance with 100 non-stop questions under standard sectional timing and negative marking.'}
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-300 font-mono pt-1">
              <span>⏱ 90 Mins</span>
              <span>• 100 Questions</span>
              <span className="text-amber-400">Sectional Timer</span>
            </div>
          </div>

          <div className="pt-5 relative z-10">
            <button
              onClick={() => onLaunchPractice('MARATHON_100', { duration: 90, questions: 100 })}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/40 transition active:scale-98 flex items-center justify-center space-x-2 text-xs cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>{language === 'hi' ? '100 प्रश्न मैराथन शुरू करें' : 'Launch 100Q Marathon'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Personalized Weak Topic Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-black text-slate-900">
              {language === 'hi' ? 'कमजोर क्षेत्रों पर लक्षित अभ्यास (Adaptive Drills)' : 'Targeted Weak Topic Drills'}
            </h3>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            Performance-Based
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              topic: 'Reasoning Puzzles & Seating',
              subject: 'General Intelligence',
              accuracy: '44% Acc',
              timeAvg: '95s / Q',
              recommendation: '20 High-Level Floor Puzzles',
            },
            {
              topic: 'Data Interpretation (Caselets)',
              subject: 'Quantitative Aptitude',
              accuracy: '52% Acc',
              timeAvg: '110s / Q',
              recommendation: '15 Calculation-heavy DI sets',
            },
            {
              topic: 'Sentence Rearrangement (Para Jumbles)',
              subject: 'English Language',
              accuracy: '58% Acc',
              timeAvg: '70s / Q',
              recommendation: '25 Para Jumble drills',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.subject}</span>
                  <span className="text-rose-600 font-bold">{item.accuracy}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{item.topic}</h4>
                <p className="text-[11px] text-slate-500 mt-1">Recommended: {item.recommendation}</p>
              </div>
              <button
                onClick={() => onLaunchPractice('WEAK_DRILL', { topic: item.topic, questions: 20 })}
                className="mt-3 w-full py-1.5 bg-white hover:bg-slate-100 text-indigo-600 border border-indigo-200 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>Drill Weak Area</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Custom Practice Generator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Brain className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-base font-black text-slate-900">
              {language === 'hi' ? 'स्वयं अनुकूलित अभ्यास निर्माता' : 'Custom Practice Session Generator'}
            </h3>
            <p className="text-xs text-slate-500">Choose your subject, difficulty, and question volume</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          {/* Subject selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.nameEn}>
                  {s.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Difficulty Level</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option value="EASY">Easy (Foundational)</option>
              <option value="NORMAL">Normal (Prelims Standard)</option>
              <option value="MODERATE">Moderate (Exam Level)</option>
              <option value="HARD">Hard (Advanced Mains)</option>
            </select>
          </div>

          {/* Question count */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Question Count</label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option value={10}>10 Questions (Quick 10m)</option>
              <option value={20}>20 Questions (Standard 20m)</option>
              <option value={30}>30 Questions (Intensive 30m)</option>
              <option value={50}>50 Questions (Comprehensive 50m)</option>
            </select>
          </div>

          {/* Action launch */}
          <div className="flex items-end">
            <button
              onClick={() =>
                onLaunchPractice('CUSTOM', {
                  subject: selectedSubject,
                  difficulty: selectedDifficulty,
                  questions: questionCount,
                  timed: timedMode,
                })
              }
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Custom Drill</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
