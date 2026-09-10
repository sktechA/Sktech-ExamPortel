/**
 * SKTECH EXAM — AI Search Grounding Widget (Google Search Grounded)
 * Powered by Gemini 3.5 Flash & Official National Examination Portals
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import { Search, Sparkles, ExternalLink, Globe, BookOpen, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { api } from '../services/apiClient';

interface GroundedSearchWidgetProps {
  language?: 'en' | 'hi';
}

export const GroundedSearchWidget: React.FC<GroundedSearchWidgetProps> = ({ language = 'en' }) => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<{
    query: string;
    answer: string;
    sources: Array<{ title: string; url: string }>;
    model: string;
    timestamp: string;
  } | null>(null);

  const sampleQueries = [
    'When is IBPS PO 2026 Prelims exam?',
    'SSC CGL 2026 Notification release date & eligibility',
    'MPPSC State Service 2026 Prelims syllabus & pattern',
  ];

  const handleSearch = async (targetQuery?: string) => {
    const q = (targetQuery || query).trim();
    if (!q) return;
    setLoading(true);
    try {
      const resp = await api.groundedSearch(q);
      if (resp.success && resp.data) {
        setSearchResult(resp.data);
      }
    } catch (err) {
      console.error('Search grounding failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-grounded-search-widget" className="bg-white rounded-2xl border border-indigo-100 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                AI Search Grounding
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>Live Web Grounded</span>
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-900 mt-0.5">
              National Examination Intelligence & Official Notifications
            </h3>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Model: Gemini 3.5 Flash
        </span>
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about exam dates, official notifications, age limits, syllabus..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
        >
          {loading ? (
            <span>Researching...</span>
          ) : (
            <>
              <span>Ask AI</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Quick sample chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] text-slate-400 font-medium mr-1">Trending inquiries:</span>
        {sampleQueries.map((sq, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setQuery(sq);
              handleSearch(sq);
            }}
            className="text-[11px] font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-2.5 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Grounded Response View */}
      {searchResult && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-indigo-100 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-indigo-900">Query: "{searchResult.query}"</span>
            <span className="font-mono text-[10px] text-slate-400">
              Verified: {new Date(searchResult.timestamp).toLocaleTimeString()}
            </span>
          </div>

          <div className="text-xs text-slate-800 leading-relaxed font-normal whitespace-pre-line bg-white p-3.5 rounded-lg border border-slate-200">
            {searchResult.answer}
          </div>

          {/* Sources and Citations */}
          {searchResult.sources && searchResult.sources.length > 0 && (
            <div className="pt-2 border-t border-indigo-100/60 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Grounded Official Sources:
              </span>
              {searchResult.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:border-indigo-300 shadow-2xs transition"
                >
                  <span>{src.title}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
