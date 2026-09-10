/**
 * SKTECH EXAM — Mistake Book Component
 * Features:
 * 1. Automatic storage of wrong questions and repeated mistakes from live API
 * 2. Error pattern classification (Conceptual, Calculation, Time Rush)
 * 3. Subject & topic filtering with 1-click reattempt drill
 * 4. Improvement & recovery analytics
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Filter,
  Search,
  BookOpen,
  TrendingUp,
  Brain,
  Sparkles,
  ArrowRight,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { api } from '../services/apiClient';

export interface MistakeItem {
  id: string;
  questionId: string;
  testTitle: string;
  subjectName: string;
  topicName: string;
  textEn: string;
  textHi: string;
  userSelectedOption: string;
  correctOption: string;
  explanationEn: string;
  explanationHi: string;
  errorTag: 'CALCULATION_ERROR' | 'CONCEPTUAL_GAP' | 'TIME_RUSH' | 'MISREAD_QUESTION';
  mistakeCount: number;
  lastAttempted: string;
  status: 'UNRESOLVED' | 'RESOLVED';
}

interface MistakeBookViewProps {
  language: 'en' | 'hi';
  candidateId?: string;
  onStartReattemptDrill: (questionIds: string[]) => void;
}

export const MistakeBookView: React.FC<MistakeBookViewProps> = ({
  language,
  candidateId = 'usr_cand_01',
  onStartReattemptDrill,
}) => {
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterSubject, setFilterSubject] = useState<string>('ALL');
  const [filterTag, setFilterTag] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const fetchMistakes = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await api.getCandidateMistakes(candidateId);
      if (resp.success && Array.isArray(resp.data)) {
        setMistakes(resp.data);
      } else {
        setMistakes([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load mistake records from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMistakes();
  }, [candidateId]);

  const filtered = mistakes.filter((m) => {
    const matchSub = filterSubject === 'ALL' || m.subjectName === filterSubject;
    const matchTag = filterTag === 'ALL' || m.errorTag === filterTag;
    const matchSearch =
      m.textEn.toLowerCase().includes(search.toLowerCase()) ||
      (m.textHi && m.textHi.includes(search)) ||
      (m.topicName && m.topicName.toLowerCase().includes(search.toLowerCase()));
    return matchSub && matchTag && matchSearch;
  });

  const unresolvedCount = mistakes.filter((m) => m.status === 'UNRESOLVED').length;
  const resolvedCount = mistakes.filter((m) => m.status === 'RESOLVED').length;

  const markResolved = (id: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: m.status === 'RESOLVED' ? 'UNRESOLVED' : 'RESOLVED' } : m))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 rounded-2xl p-6 sm:p-7 text-white border border-rose-900/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'गलती सुधार डायरी (Mistake Book)' : 'Smart Mistake Book & Error Recovery'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'hi' ? 'कमजोर बिन्दुओं एवं गलतियों का त्वरित विश्लेषण' : 'Turn Mistakes into Scoring Strengths'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'मॉक टेस्ट में हुई गलतियों को स्वचालित रूप से वर्गीकृत करें तथा 1-क्लिक री-अटेम्प्ट द्वारा अपनी सटीकता 100% तक बढ़ाएं।'
              : 'Automatically archives every wrong or skipped question, classifies error patterns, and lets you re-attempt them until mastered.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto">
          <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center">
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Unresolved Errors</div>
            <div className="text-2xl font-black text-rose-400">{unresolvedCount}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 text-center">
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Corrected & Mastered</div>
            <div className="text-2xl font-black text-emerald-400">{resolvedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={language === 'hi' ? 'गलती खोजें...' : 'Search mistakes...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 font-semibold focus:outline-none"
          >
            <option value="ALL">All Subjects</option>
            <option value="Quantitative Aptitude">Quantitative Aptitude</option>
            <option value="General Intelligence">Logical Reasoning</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="General Awareness">General Awareness</option>
          </select>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 font-semibold focus:outline-none"
          >
            <option value="ALL">All Error Types</option>
            <option value="CALCULATION_ERROR">Calculation Errors</option>
            <option value="CONCEPTUAL_GAP">Conceptual Gaps</option>
            <option value="TIME_RUSH">Time Rush</option>
          </select>
        </div>

        <button
          onClick={() => {
            const wrongIds = filtered.map((m) => m.questionId);
            if (wrongIds.length > 0) onStartReattemptDrill(wrongIds);
          }}
          disabled={filtered.length === 0}
          className="flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-md shadow-rose-600/30 transition disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'समस्त गलतियों का री-अटेम्प्ट करें' : 'Re-Attempt All Wrong Questions'}</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <Loader2 className="w-8 h-8 text-rose-600 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600">Retrieving personalized mistake log from database...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-rose-50 rounded-2xl border border-rose-200 p-8 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
          <p className="text-xs font-semibold text-rose-800">{error}</p>
          <button
            onClick={fetchMistakes}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-500 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            {language === 'hi' ? 'कोई गलती दर्ज नहीं है!' : 'No Mistakes Logged Yet!'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {language === 'hi'
              ? 'जब आप वस्तुनिष्ठ मॉक टेस्ट या अभ्यास सत्र हल करेंगे, तो आपके गलत प्रश्न स्वचालित रूप से यहाँ सहेज लिए जाएंगे।'
              : 'When you take objective mock tests or adaptive drills, any incorrect or skipped questions will automatically be archived here for revision.'}
          </p>
        </div>
      )}

      {/* Mistakes Card List */}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 transition space-y-3 ${
                item.status === 'RESOLVED'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-rose-300 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {item.subjectName}
                  </span>
                  <span className="text-slate-500 font-medium">&bull; {item.topicName}</span>
                  <span className="text-slate-400 text-[11px]">({item.testTitle})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.errorTag === 'CALCULATION_ERROR'
                        ? 'bg-amber-100 text-amber-800'
                        : item.errorTag === 'CONCEPTUAL_GAP'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {item.errorTag.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.lastAttempted}</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                {language === 'hi' && item.textHi ? item.textHi : item.textEn}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center space-x-2 text-rose-700 font-medium">
                  <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-bold">
                    ✕
                  </span>
                  <span>Your Answer: Option {item.userSelectedOption} (Incorrect)</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>Correct Answer: Option {item.correctOption}</span>
                </div>
              </div>

              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-xs space-y-1 text-slate-700">
                <span className="font-bold text-amber-900 uppercase text-[10px] tracking-wider block">
                  {language === 'hi' ? 'विस्तृत समाधान एवं व्याख्या:' : 'Detailed Solution & Memory Hook:'}
                </span>
                <p>{language === 'hi' && item.explanationHi ? item.explanationHi : item.explanationEn}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-400">
                  Repeated Mistakes on this Concept: <strong>{item.mistakeCount} times</strong>
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => markResolved(item.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                      item.status === 'RESOLVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.status === 'RESOLVED' ? '✓ Mastered' : 'Mark as Mastered'}
                  </button>
                  <button
                    onClick={() => onStartReattemptDrill([item.questionId])}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-xs transition flex items-center space-x-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Re-solve Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
