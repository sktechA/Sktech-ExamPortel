/**
 * SKTECH EXAM — Pre-Test Sponsor Intermission Modal
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 * Enforces:
 *  1. Mandatory 5-second countdown before "Skip" becomes active
 *  2. Clean advertising strictly restricted to education and study materials
 *  3. Impression and interaction tracking
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, ExternalLink, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { api } from '../services/apiClient';
import { MockTest } from '../types';

interface PreTestAdModalProps {
  isOpen: boolean;
  test: MockTest | null;
  onProceed: () => void;
  onCancel: () => void;
  language?: 'en' | 'hi';
}

export const PreTestAdModal: React.FC<PreTestAdModalProps> = ({
  isOpen,
  test,
  onProceed,
  onCancel,
  language = 'en',
}) => {
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      return;
    }

    // Track impression to central monetization engine
    api.trackAdEvent('camp_edu_01', 'IMPRESSION').catch((err) =>
      console.warn('Ad impression tracking error:', err)
    );

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !test) return null;

  const handleExploreSponsor = () => {
    api.trackAdEvent('camp_edu_01', 'CLICK').catch(console.error);
    window.open('https://www.flipkart.com/books', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="pre-test-ad-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-indigo-500/30 space-y-5 animate-in zoom-in-95">
        {/* Header with Ad disclosure */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Advertisement
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Clean Study Partner</span>
            </span>
          </div>

          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-slate-600 transition"
          >
            Cancel Test
          </button>
        </div>

        {/* Sponsor Content Block */}
        <div className="border border-indigo-100 rounded-2xl p-5 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-700">
                <BookOpen className="w-4 h-4" />
                <span>EduKart & Arihant Academic Network</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                Complete 2026 Competitive Exam Master Prep Kit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Access 50+ printed full-length bilingual mock tests with step-by-step reasoning shortcuts, quantitative formulas handbook, and daily online speed drills.
              </p>
            </div>
          </div>

          {/* Value pill & link */}
          <div className="pt-2 border-t border-indigo-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
              Special 45% Discount for SKTECH Aspirants
            </span>
            <button
              onClick={handleExploreSponsor}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
            >
              <span>Explore Kit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Next Test Details Banner */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Ready to launch:</div>
            <div className="font-bold text-slate-800 line-clamp-1">{test.title}</div>
          </div>
          <div className="text-right font-mono text-slate-600 shrink-0">
            <div>{test.totalQuestions} Questions</div>
            <div className="text-indigo-600 font-bold">{test.durationMinutes} Minutes</div>
          </div>
        </div>

        {/* Safe Network Notice & Skip Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] text-slate-400 text-center sm:text-left leading-tight">
            Strict Policy: Clean education only. Adult/gambling strictly blocked.
          </div>

          <button
            id="pre-test-skip-ad-btn"
            disabled={countdown > 0}
            onClick={onProceed}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-md ${
              countdown > 0
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-indigo-600/30'
            }`}
          >
            {countdown > 0 ? (
              <>
                <Clock className="w-3.5 h-3.5" />
                <span>Skip ad in {countdown}s...</span>
              </>
            ) : (
              <>
                <span>Skip Ad & Start Test</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
