/**
 * SKTECH EXAM — Clean Advertising Banner Component
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 * Compliance: Strictly restricted to e-commerce, education, and study materials.
 * Adult, gambling, dating, and vulgar content are strictly blocked at DNS and API level.
 */

import React, { useEffect } from 'react';
import { ShieldCheck, ExternalLink, Sparkles, BookOpen, ShoppingBag } from 'lucide-react';
import { api } from '../services/apiClient';

interface CleanAdBannerProps {
  campaignId?: string;
  variant?: 'HORIZONTAL' | 'COMPACT';
}

export const CleanAdBanner: React.FC<CleanAdBannerProps> = ({
  campaignId = 'camp_edu_01',
  variant = 'HORIZONTAL',
}) => {
  useEffect(() => {
    // Record ad impression
    api.trackAdEvent(campaignId, 'IMPRESSION').catch(console.error);
  }, [campaignId]);

  const handleClick = () => {
    api.trackAdEvent(campaignId, 'CLICK').catch(console.error);
    window.open('https://www.flipkart.com/books', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id={`clean-ad-banner-${campaignId}`}
      className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-indigo-500/20 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold tracking-wider uppercase bg-white/10 text-indigo-300 px-2 py-0.5 rounded border border-white/10">
              Sponsored Study Partner
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Safe Ads Certified: Clean Education Only</span>
            </span>
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-white">
            Arihant & Disha Publications — 2026 Full Solved Sets & Formula Booklets
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            Complete chapter-wise question bank with verified speed tricks for Banking PO/Clerk, SSC CGL & State PSC. Free doorstep courier across India.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-emerald-400 font-bold">FLAT 45% OFF</div>
            <div className="text-[10px] text-slate-400">Coupon: SKTECH2026</div>
          </div>

          <button
            onClick={handleClick}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <span>View Study Books</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
