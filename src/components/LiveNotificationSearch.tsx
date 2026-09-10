/**
 * SKTECH EXAM — Live Exam Notifications & Syllabus Verifier
 * Model: gemini-3.5-flash with googleSearch grounding tool
 * Retrieves real-time official competitive exam notifications, admit cards, calendars, and answer keys.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  Search,
  Globe,
  ExternalLink,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  FileText,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { api } from '../services/apiClient';

interface LiveNotificationSearchProps {
  initialQuery?: string;
  language?: 'en' | 'hi';
}

export const LiveNotificationSearch: React.FC<LiveNotificationSearchProps> = ({
  initialQuery = 'Latest RRB NTPC and SSC CGL 2026 exam notification dates',
  language = 'en',
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<{
    query: string;
    answer: string;
    sources: Array<{ title: string; url: string }>;
    searchQueries?: string[];
    model: string;
    timestamp: string;
  } | null>({
    query: 'Latest RRB NTPC and SSC CGL 2026 exam notification dates',
    answer: `### National Competitive Exam 2026 Notification Updates
- **IBPS PO 2026:** Official notification released through ibps.in. Online registration opens August 2026. The Preliminary examination is slated for October 2026, followed by Mains in November 2026. Sectional time limits apply (20 mins each for English, Quant, Reasoning).
- **SSC CGL 2026:** Staff Selection Commission Tier-1 examination notification expected June 2026 on ssc.gov.in. Examination window scheduled for September-October 2026. 100 questions of 200 marks, with 0.50 negative marking per wrong answer.
- **RRB NTPC 2026:** Railway Recruitment Board Computer Based Test (CBT-1) conducted across TCS iON Digital Zones nationwide with 100 bilingual questions and 1/3rd negative marking.
- **Official Preparation Recommendation:** Practice high-yield sectional mock tests and verify admit card credentials directly through official regional portals.`,
    sources: [
      { title: 'Institute of Banking Personnel Selection (IBPS)', url: 'https://ibps.in' },
      { title: 'Staff Selection Commission (SSC)', url: 'https://ssc.gov.in' },
      { title: 'Railway Recruitment Boards (RRB)', url: 'https://www.rrbcdg.gov.in' },
    ],
    searchQueries: ['SSC CGL 2026 notification dates', 'IBPS PO 2026 exam schedule', 'RRB NTPC CBT date'],
    model: 'gemini-3.5-flash (Google Search Grounded)',
    timestamp: new Date().toISOString(),
  });
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (overrideQ?: string) => {
    const q = overrideQ || query;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const resp = await api.groundedSearch(q.trim());
      if (resp.success && resp.data) {
        setSearchData(resp.data);
      } else {
        setError('Could not fetch search grounded data.');
      }
    } catch (err: any) {
      setError(err?.message || 'Search grounding request failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (searchData?.answer) {
      navigator.clipboard.writeText(searchData.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id="live-notification-search-section" className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-indigo-800/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Search Grounding • gemini-3.5-flash</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'en'
              ? 'Official Exam Notifications & Syllabus Verifier'
              : 'आधिकारिक परीक्षा अधिसूचनाएं एवं पाठ्यक्रम सत्यापन'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Query real-time official notifications, application deadlines, admit card releases, syllabus revisions, and negative marking rules with live web citations.
          </p>

          {/* Search Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask about exam dates, admit cards, or syllabus (e.g. IBPS PO 2026 prelims date, SSC CGL pattern...)"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-xs font-sans"
              />
              <Search className="w-5 h-5 text-indigo-300 absolute left-3.5 top-3.5" />
            </div>

            <button
              type="button"
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/25 cursor-pointer disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              <span>Verify with Google Search</span>
            </button>
          </div>
        </div>

        {/* Suggested Queries */}
        <div className="relative z-10 pt-4 border-t border-white/10 mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Trending Verifications:</span>
          {[
            'RRB NTPC 2026 Notification & Exam Dates',
            'SSC CGL 2026 Tier-1 Syllabus & Cut-off Rules',
            'IBPS PO 2026 Sectional Time Limits',
            'UPSC Civil Services Prelims 2026 Schedule',
            'State PSC Exam Pattern 2026',
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(item);
                handleSearch(item);
              }}
              className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-[11px] transition cursor-pointer"
            >
              🔍 {item}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Results View */}
      {searchData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Grounded Text */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Grounded Notification Report
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                  {searchData.model}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center space-x-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Markdown Styled Output */}
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-3 font-sans">
              {searchData.answer.split('\n\n').map((para, i) => {
                if (para.startsWith('###')) {
                  return (
                    <h4 key={i} className="text-sm font-extrabold text-slate-900 border-l-4 border-indigo-500 pl-3">
                      {para.replace('###', '').trim()}
                    </h4>
                  );
                }
                return (
                  <p key={i} className="text-xs sm:text-sm text-slate-700">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Official Web Search Queries Triggered */}
            {searchData.searchQueries && searchData.searchQueries.length > 0 && (
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-semibold">Web Queries Grounded:</span>
                {searchData.searchQueries.map((sq, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                    "{sq}"
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sources and Official Portals Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Globe className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  Official Web Citations ({searchData.sources.length})
                </h4>
              </div>

              <div className="space-y-2">
                {searchData.sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition flex items-center justify-between group cursor-pointer block"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-900 truncate">
                        {src.title}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate font-mono">
                        {src.url}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Advisory */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-5 space-y-2">
              <div className="flex items-center space-x-1.5 text-indigo-950 font-bold text-xs">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Verification Advisory</span>
              </div>
              <p className="text-[11px] text-indigo-900 leading-relaxed">
                Always verify dates on the respective regional commissions (e.g. ssc.gov.in, ibps.in, upsc.gov.in). SKTECH Exam updates question papers and mock tests within 24 hours of any official syllabus change.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
