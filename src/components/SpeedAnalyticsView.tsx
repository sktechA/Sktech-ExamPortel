/**
 * SKTECH EXAM — Speed & Performance Analytics Component
 * Implements Section 29 & Section 34 specifications:
 * Average seconds per question, Fastest vs Slowest subject, Speed vs Accuracy trade-off,
 * Time wasted on unattempted questions, and intelligent pacing alerts.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React from 'react';
import {
  Zap,
  Clock,
  TrendingUp,
  Award,
  AlertCircle,
  BarChart2,
  CheckCircle2,
  Compass,
  ArrowUpRight,
  Flame,
} from 'lucide-react';

interface SpeedAnalyticsProps {
  language: 'en' | 'hi';
}

export const SpeedAnalyticsView: React.FC<SpeedAnalyticsProps> = ({ language }) => {
  return (
    <div className="space-y-8">
      {/* 1. Core Speed KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Avg Time / Question</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            52.4 <span className="text-xs text-slate-500 font-medium">sec</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Target: &lt; 54s (On Track)</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Fastest Subject</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            24 <span className="text-xs text-slate-500 font-medium">sec</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            General Hindi & Current Affairs
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Slowest Subject</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            86 <span className="text-xs text-slate-500 font-medium">sec</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Data Interpretation & Puzzles
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Overall Accuracy</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-600">
            82.5<span className="text-xs text-slate-500 font-medium">%</span>
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold">
            Top 8% of all candidates
          </div>
        </div>
      </div>

      {/* 2. Subject-wise Time Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-black text-slate-900">
              {language === 'hi' ? 'विषयवार समय एवं गति विश्लेषण' : 'Subject-wise Pacing Breakdown'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Based on last 5 mock tests</span>
        </div>

        <div className="space-y-4 text-xs">
          {[
            {
              subject: 'Quantitative Aptitude',
              avgSec: 74,
              targetSec: 60,
              accuracy: 78,
              status: 'NEEDS_SPEED_UP',
            },
            {
              subject: 'Reasoning Ability & Puzzles',
              avgSec: 62,
              targetSec: 55,
              accuracy: 84,
              status: 'MODERATE',
            },
            {
              subject: 'English Language',
              avgSec: 36,
              targetSec: 40,
              accuracy: 80,
              status: 'EXCELLENT',
            },
            {
              subject: 'General Hindi Grammar',
              avgSec: 22,
              targetSec: 30,
              accuracy: 91,
              status: 'SUPERIOR',
            },
            {
              subject: 'General Studies & MP GK',
              avgSec: 26,
              targetSec: 35,
              accuracy: 85,
              status: 'SUPERIOR',
            },
          ].map((row, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{row.subject}</span>
                <div className="flex items-center space-x-3 text-slate-600">
                  <span>Actual: <strong>{row.avgSec}s / Q</strong></span>
                  <span className="text-slate-400">Target: {row.targetSec}s</span>
                  <span className="text-indigo-600">Acc: {row.accuracy}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div
                  className={`h-full ${
                    row.avgSec > row.targetSec ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (row.avgSec / 90) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Pacing & Strategy Recommendations */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 text-white border border-indigo-700/40 shadow-xl space-y-4">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-black text-white">
            {language === 'hi' ? 'स्मार्ट गति एवं समय प्रबंधन संस्तुतियां' : 'Intelligent Speed Optimization Recommendations'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1.5">
            <div className="font-bold text-amber-300 flex items-center space-x-1.5">
              <span>⚡ Save 18 seconds on Data Interpretation:</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              You are calculating exact decimals in ratio and percentage questions. Use estimation and option elimination to shave off ~18-22 seconds per DI set.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1.5">
            <div className="font-bold text-emerald-300 flex items-center space-x-1.5">
              <span>🎯 Reinvest Surplus Time into High-Scoring Puzzles:</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              Your English and Hindi speed leaves a 7-minute surplus in full mocks. Channel this bonus buffer into the final 5-question seating arrangement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
