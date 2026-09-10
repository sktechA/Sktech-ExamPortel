/**
 * SKTECH EXAM — Candidate Portal Header
 * Dedicated for Vercel Project 1: sktech-exam-portal.vercel.app
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React from 'react';
import {
  GraduationCap,
  Languages,
  BookOpen,
  LineChart,
  UserCheck,
  LogIn,
  LogOut,
  User as UserIcon,
  Mic,
  MapPin,
  Globe,
  Sparkles,
} from 'lucide-react';
import { User } from '../types';

export type CandidatePortalView =
  | 'DASHBOARD'
  | 'PERFORMANCE'
  | 'LIVE_NOTIFICATIONS'
  | 'EXAM_CENTERS'
  | 'PLATFORMS'
  | 'ARCHITECTURE';

interface CandidateHeaderProps {
  currentView: CandidatePortalView;
  onViewChange: (view: CandidatePortalView) => void;
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  examInProgress?: boolean;
  activeCandidate?: User | null;
  onOpenCandidateAuth: () => void;
  onLogoutCandidate: () => void;
  onOpenVoiceTranscription: () => void;
}

export const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  currentView,
  onViewChange,
  language,
  onLanguageToggle,
  examInProgress = false,
  activeCandidate,
  onOpenCandidateAuth,
  onLogoutCandidate,
  onOpenVoiceTranscription,
}) => {
  return (
    <header id="sktech-candidate-header" className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onViewChange('DASHBOARD')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-700 ring-white/20 flex items-center justify-center shadow-lg shadow-indigo-900/40 ring-1">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">SKTECH EXAM</span>
                <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  CANDIDATE PORTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                {language === 'en'
                  ? 'All-India Candidate Examination Portal • Test Engine'
                  : 'अखिल भारतीय परीक्षार्थी परीक्षा पोर्टल • टेस्ट इंजन'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          {!examInProgress && (
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                id="nav-candidate-tests-btn"
                onClick={() => onViewChange('DASHBOARD')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentView === 'DASHBOARD'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Mock Tests' : 'मॉक टेस्ट'}</span>
              </button>

              <button
                id="nav-candidate-performance-btn"
                onClick={() => onViewChange('PERFORMANCE')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentView === 'PERFORMANCE'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Performance' : 'प्रदर्शन विश्लेषण'}</span>
              </button>

              <button
                id="nav-candidate-notifs-btn"
                onClick={() => onViewChange('LIVE_NOTIFICATIONS')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentView === 'LIVE_NOTIFICATIONS'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Exam Alerts' : 'परीक्षा सूचनाएं'}</span>
              </button>

              <button
                id="nav-candidate-centers-btn"
                onClick={() => onViewChange('EXAM_CENTERS')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentView === 'EXAM_CENTERS'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Centers' : 'परीक्षा केंद्र'}</span>
              </button>
            </nav>
          )}

          {/* Right Utility Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Voice Doubt Transcriber */}
            {!examInProgress && (
              <button
                id="candidate-voice-doubt-btn"
                onClick={onOpenVoiceTranscription}
                title="Voice Doubt Solver (Gemini AI)"
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-950/70 border border-indigo-500/40 text-indigo-200 hover:text-white hover:bg-indigo-900/80 text-xs font-semibold shadow-2xs transition cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span className="hidden md:inline">Voice Doubt</span>
              </button>
            )}

            {/* Bilingual Switcher */}
            <button
              id="candidate-language-toggle-btn"
              onClick={onLanguageToggle}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
              title="Toggle Language (English / हिन्दी)"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language === 'en' ? 'HI' : 'EN'}</span>
            </button>

            {/* Candidate Auth / Profile */}
            {activeCandidate ? (
              <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700 rounded-lg pl-2.5 pr-1.5 py-1 text-xs">
                <div className="flex items-center space-x-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-slate-200 max-w-[100px] truncate">
                    {activeCandidate.name}
                  </span>
                </div>
                <button
                  id="candidate-logout-btn"
                  onClick={onLogoutCandidate}
                  title="Logout"
                  className="p-1 hover:bg-slate-700 text-slate-400 hover:text-rose-400 rounded transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="candidate-login-btn"
                onClick={onOpenCandidateAuth}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Candidate Login' : 'लॉगिन'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
