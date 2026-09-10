/**
 * SKTECH EXAM — Admin Console Header
 * Dedicated for Vercel Project 2: sktech-exam-admin.vercel.app
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React from 'react';
import {
  ShieldCheck,
  Languages,
  LogOut,
  ExternalLink,
  Lock,
  Database,
  Server,
  KeyRound,
  FileCode2,
} from 'lucide-react';
import { User } from '../types';

interface AdminHeaderProps {
  adminUser?: User | null;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  candidatePortalUrl?: string;
  onOpenSpecs?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  adminUser,
  isAdminLoggedIn,
  onLogoutAdmin,
  language,
  onLanguageToggle,
  candidatePortalUrl = 'https://sktech-exam-portal.vercel.app',
  onOpenSpecs,
}) => {
  return (
    <header id="sktech-admin-header" className="bg-slate-900 text-white border-b border-purple-900/60 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Administrative Console Identifier */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 ring-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-950/60 ring-1">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">SKTECH</span>
                <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-purple-500/25 text-purple-300 border border-purple-500/40">
                  ADMIN CONSOLE
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-purple-900/60 text-purple-200 border border-purple-700/60">
                  VERCEL PROJECT 2
                </span>
              </div>
              <p className="text-[11px] text-purple-300/80 font-medium hidden sm:block">
                {language === 'en'
                  ? 'Administrative Question Bank, Mock Papers, & Pricing Control Center'
                  : 'व्यवस्थापक प्रश्न बैंक, मॉक टेस्ट एवं मूल्य नियंत्रण केंद्र'}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Architecture Specs (optional view) */}
            {onOpenSpecs && (
              <button
                type="button"
                onClick={onOpenSpecs}
                className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition cursor-pointer"
                title="System Specifications"
              >
                <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Specs</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              id="admin-language-toggle-btn"
              onClick={onLanguageToggle}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
              title="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5 text-purple-400" />
              <span>{language === 'en' ? 'HI' : 'EN'}</span>
            </button>

            {/* External Link to Candidate Portal (Vercel Project 1) */}
            <a
              id="link-to-candidate-portal-btn"
              href={candidatePortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Candidate Portal (sktech-exam-portal.vercel.app)"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-bold transition shadow-xs"
            >
              <span className="hidden sm:inline">Candidate Portal</span>
              <span className="sm:hidden">Portal</span>
              <ExternalLink className="w-3 h-3 text-indigo-400" />
            </a>

            {/* Admin Session Indicator & Logout */}
            {isAdminLoggedIn && (
              <div className="flex items-center space-x-2 bg-purple-950/80 border border-purple-700/60 rounded-lg pl-2.5 pr-1.5 py-1 text-xs">
                <div className="flex items-center space-x-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-purple-200 max-w-[100px] truncate">
                    {adminUser?.name || 'Administrator'}
                  </span>
                </div>
                <button
                  id="admin-logout-btn"
                  onClick={onLogoutAdmin}
                  title="Logout from Admin Console"
                  className="p-1 hover:bg-purple-900 text-purple-300 hover:text-rose-400 rounded transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
