/**
 * SKTECH EXAM — Study Planner & Daily Target Manager
 * Implements Section 27 specifications:
 * Daily Plan, Weekly Plan, Subject Goals, Daily Question Goal, Mock Goal, and CA Tracker.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Target,
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Edit2,
  Plus,
} from 'lucide-react';

interface DailyTask {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'MOCK' | 'QUESTIONS' | 'CURRENT_AFFAIRS' | 'SUBJECT_STUDY';
  targetCount?: number;
  completedCount?: number;
  completed: boolean;
}

interface StudyPlannerViewProps {
  language: 'en' | 'hi';
  targetExam?: string;
  onStartMockTest?: () => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  language,
  targetExam = 'IBPS PO 2026',
  onStartMockTest,
}) => {
  const [tasks, setTasks] = useState<DailyTask[]>([
    {
      id: 'tsk_01',
      titleEn: 'Attempt 1 Full-Length Objective Mock Test',
      titleHi: '1 पूर्ण स्तरीय वस्तुनिष्ठ मॉक टेस्ट हल करें',
      category: 'MOCK',
      targetCount: 1,
      completedCount: 1,
      completed: true,
    },
    {
      id: 'tsk_02',
      titleEn: 'Practice 50 Quant & DI Questions (Speed Math)',
      titleHi: '50 क्वांट एवं डीआई प्रश्न हल करें (स्पीड मैथ)',
      category: 'QUESTIONS',
      targetCount: 50,
      completedCount: 38,
      completed: false,
    },
    {
      id: 'tsk_03',
      titleEn: 'Read Today’s Current Affairs & Solve 10 MCQs',
      titleHi: 'आज की समसामयिकी पढ़ें एवं 10 बहुविकल्पीय प्रश्न हल करें',
      category: 'CURRENT_AFFAIRS',
      targetCount: 10,
      completedCount: 10,
      completed: true,
    },
    {
      id: 'tsk_04',
      titleEn: 'Review Mistake Book: Re-solve 15 Wrong Questions',
      titleHi: 'गलती डायरी समीक्षा: 15 गलत प्रश्नों को पुनः हल करें',
      category: 'SUBJECT_STUDY',
      targetCount: 15,
      completedCount: 6,
      completed: false,
    },
    {
      id: 'tsk_05',
      titleEn: 'English Sectional: Read 2 Comprehension Passages',
      titleHi: 'अंग्रेजी अनुभाग: 2 अपठित गद्यांश का अभ्यास करें',
      category: 'SUBJECT_STUDY',
      targetCount: 2,
      completedCount: 0,
      completed: false,
    },
  ]);

  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: 'Mon', focus: 'Quant (Arithmetic) + Speed Booster 1', done: true },
    { day: 'Tue', focus: 'Reasoning (Puzzles) + English Vocab', done: true },
    { day: 'Wed', focus: 'Full Mock Test #01 + Mistake Review', done: true },
    { day: 'Thu', focus: 'Data Interpretation + CA Weekly Digest', done: false, active: true },
    { day: 'Fri', focus: 'Full Mock Test #02 + Speed Booster 2', done: false },
    { day: 'Sat', focus: 'Subjective / Mains Technical Writing', done: false },
    { day: 'Sun', focus: 'All-India Live Mock Test & Ranking Review', done: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="space-y-8">
      {/* Target Exam Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white border border-indigo-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Target className="w-3.5 h-3.5" />
            <span>Target Goal: {targetExam}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'hi' ? 'दैनिक एवं साप्ताहिक अध्ययन योजना' : 'Personalized Daily & Weekly Study Blueprint'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'अनुशासित एवं चरणबद्ध लक्ष्य: प्रतिदिन प्रश्न कोटा, मॉक टेस्ट व समसामयिकी रिवीजन पूरा कर अपनी चयन संभावना सुनिश्चित करें।'
              : 'Consistent deliberate practice: Track your daily question quotas, mock test frequency, and revision targets.'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[200px] space-y-2">
          <div className="text-[11px] text-slate-300 uppercase font-bold tracking-wider">
            Today’s Target Completion
          </div>
          <div className="text-3xl font-black text-emerald-400">{progressPercent}%</div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-[11px] text-slate-300">
            {completedCount} of {tasks.length} tasks completed
          </div>
        </div>
      </div>

      {/* Daily Tasks Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-black text-slate-900">
              {language === 'hi' ? 'आज की अध्ययन कार्यसूची (Daily Tasks)' : "Today's Study Checklist"}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition select-none ${
                task.completed
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center space-x-3">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <div>
                  <div
                    className={`text-xs font-bold ${
                      task.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                    }`}
                  >
                    {language === 'hi' ? task.titleHi : task.titleEn}
                  </div>
                  {task.targetCount && (
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Progress: {task.completedCount || 0} / {task.targetCount}
                    </div>
                  )}
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  task.category === 'MOCK'
                    ? 'bg-indigo-100 text-indigo-800'
                    : task.category === 'QUESTIONS'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {task.category.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Weekly Roadmap */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-black text-slate-900">
              {language === 'hi' ? 'साप्ताहिक अध्ययन सारणी (Weekly Planner)' : '7-Day Weekly Roadmap'}
            </h3>
          </div>
          <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            Sprint Phase 1
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weeklySchedule.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col justify-between text-xs space-y-2 ${
                item.active
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
                  : item.done
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">{item.day}</span>
                {item.done && <span className="text-emerald-600 text-[10px] font-bold">✓ Done</span>}
                {item.active && <span className="text-indigo-600 text-[10px] font-bold uppercase">Today</span>}
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-tight">{item.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
