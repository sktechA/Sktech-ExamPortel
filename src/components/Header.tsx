/**
 * SKTECH EXAM — Header Component
 * Dual Portal Isolation Navigation & Multi-Verification Authentication Indicators
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Languages,
  BookOpen,
  LayoutDashboard,
  FileCode2,
  Activity,
  UserCheck,
  Smartphone,
  Laptop,
  Lock,
  LogIn,
  LogOut,
  User as UserIcon,
  Mic,
  MapPin,
  Globe,
  Sparkles,
} from 'lucide-react';
import { User } from '../types';

export type AppViewMode = 'CANDIDATE' | 'ADMIN' | 'ARCHITECTURE' | 'PLATFORMS' | 'LIVE_NOTIFICATIONS' | 'EXAM_CENTERS';

interface HeaderProps {
  currentView: AppViewMode;
  onViewChange: (view: AppViewMode) => void;
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  examInProgress?: boolean;
  portalMode?: 'UNIFIED' | 'CANDIDATE_ONLY' | 'ADMIN_ONLY';
  activeCandidate?: User | null;
  adminUser?: User | null;
  isAdminLoggedIn?: boolean;
  currentRoute?: '/' | '/admin';
  onNavigateRoute?: (route: '/' | '/admin') => void;
  onOpenCandidateAuth?: () => void;
  onOpenAdminLogin?: () => void;
  onLogoutCandidate?: () => void;
  onLogoutAdmin?: () => void;
  onOpenVoiceTranscription?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  language,
  onLanguageToggle,
  examInProgress = false,
  portalMode = 'UNIFIED',
  activeCandidate,
  adminUser,
  isAdminLoggedIn = false,
  currentRoute = '/',
  onNavigateRoute,
  onOpenCandidateAuth,
  onOpenAdminLogin,
  onLogoutCandidate,
  onLogoutAdmin,
  onOpenVoiceTranscription,
}) => {
  const isAdminRoute = currentRoute === '/admin';

  return (
    <header id="sktech-header" className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              if (isAdminRoute) {
                if (onNavigateRoute) onNavigateRoute('/');
              } else {
                onViewChange('CANDIDATE');
              }
            }}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${isAdminRoute ? 'from-purple-600 to-indigo-800 ring-purple-400/40' : 'from-indigo-500 to-blue-700 ring-white/20'} flex items-center justify-center shadow-lg shadow-indigo-900/40 ring-1`}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">SKTECH</span>
                <span className={`text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${isAdminRoute ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}`}>
                  {isAdminRoute ? 'ADMIN CONSOLE' : 'EXAM'}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${isAdminRoute ? 'bg-purple-900/50 text-purple-200 border border-purple-700/60' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                  {isAdminRoute ? '/admin' : '/'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {isAdminRoute
                  ? (language === 'en' ? 'Administrative Content & Exam Control Center' : 'व्यवस्थापक सामग्री एवं परीक्षा नियंत्रण केंद्र')
                  : (language === 'en' ? 'Competitive Examination Ecosystem' : 'प्रतियोगी परीक्षा तैयारी मंच')}
              </p>
            </div>
          </div>

          {/* Center Navigation Portal Switcher (Strictly isolated by route) */}
          {!examInProgress && (
            isAdminRoute ? (
              /* When on /admin: Isolated Admin Controls & Quick Return Button */
              <div className="flex items-center space-x-3">
                <button
                  id="admin-return-candidate-btn"
                  onClick={() => onNavigateRoute && onNavigateRoute('/')}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-bold border border-slate-700 shadow-2xs transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{language === 'en' ? '← Candidate Portal (/)' : '← परीक्षार्थी पोर्टल (/)'}</span>
                </button>
                <div className="hidden md:flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-300 text-[11px] font-mono">
                  <Lock className="w-3 h-3 text-purple-400" />
                  <span>Isolated Admin Zone</span>
                </div>
              </div>
            ) : (
              /* When on /: Candidate Navigation */
              <nav id="sktech-nav" className="hidden lg:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
                {/* Candidate Portal Tab */}
                <button
                  id="nav-candidate-btn"
                  onClick={() => onViewChange('CANDIDATE')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentView === 'CANDIDATE'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-700/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Mock Tests' : 'मॉक टेस्ट'}</span>
                </button>

                {/* Live Search-Grounded Notifications */}
                <button
                  id="nav-notifications-btn"
                  onClick={() => onViewChange('LIVE_NOTIFICATIONS')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentView === 'LIVE_NOTIFICATIONS'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-700/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Live Alerts</span>
                </button>

                {/* CBT Exam Center Locator */}
                <button
                  id="nav-centers-btn"
                  onClick={() => onViewChange('EXAM_CENTERS')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentView === 'EXAM_CENTERS'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-700/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>Exam Centers</span>
                </button>

                {/* Multi-Platform Ecosystem Hub */}
                <button
                  id="nav-platforms-btn"
                  onClick={() => onViewChange('PLATFORMS')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentView === 'PLATFORMS'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-700/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Web / EXE / APK</span>
                </button>

                {/* Architecture Specifications */}
                <button
                  id="nav-architecture-btn"
                  onClick={() => onViewChange('ARCHITECTURE')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentView === 'ARCHITECTURE'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>
              </nav>
            )
          )}

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Voice Question / Oral Doubt Trigger (Available on Candidate route) */}
            {!isAdminRoute && onOpenVoiceTranscription && (
              <button
                id="header-voice-btn"
                onClick={onOpenVoiceTranscription}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white text-xs font-semibold border border-rose-500/40 transition cursor-pointer"
                title="Voice Doubt & Oral Question Transcriber (gemini-3.5-transcribe)"
              >
                <Mic className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Voice Doubt</span>
              </button>
            )}

            {/* Bilingual Switcher */}
            <button
              id="language-toggle-btn"
              onClick={onLanguageToggle}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition cursor-pointer"
              title="Toggle English / Hindi"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language === 'en' ? 'EN' : 'हि'}</span>
            </button>

            {/* Admin Route Controls */}
            {isAdminRoute ? (
              isAdminLoggedIn ? (
                <div className="flex items-center space-x-2 bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-700/60 text-xs">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="font-bold text-purple-200 text-[11px] truncate max-w-[120px]">
                      {adminUser?.name || 'Administrator'}
                    </div>
                    <div className="text-[9px] text-purple-400 font-mono">
                      {adminUser?.role || 'SUPER_ADMIN'}
                    </div>
                  </div>
                  {onLogoutAdmin && (
                    <button
                      onClick={onLogoutAdmin}
                      title="Sign Out Admin"
                      className="text-purple-300 hover:text-white p-1 cursor-pointer transition ml-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  id="header-admin-login-btn"
                  onClick={onOpenAdminLogin}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Sign In</span>
                </button>
              )
            ) : (
              /* Candidate Route Controls */
              <>
                {/* Candidate Authentication Button / Status */}
                {activeCandidate ? (
                  <div className="flex items-center space-x-2 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700 text-xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                      {activeCandidate.name.charAt(0)}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="font-bold text-slate-200 text-[11px] truncate max-w-[110px]">
                        {activeCandidate.name}
                      </div>
                      <div className="text-[9px] text-emerald-400">✓ OTP Verified</div>
                    </div>
                    {onLogoutCandidate && (
                      <button
                        onClick={onLogoutCandidate}
                        title="Sign Out"
                        className="text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    id="header-candidate-auth-btn"
                    onClick={onOpenCandidateAuth}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer transition"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Candidate</span> Sign In
                  </button>
                )}

                {/* Direct link to isolated /admin route for authorized educators */}
                {onNavigateRoute && (
                  <button
                    id="header-go-admin-btn"
                    onClick={() => onNavigateRoute('/admin')}
                    className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 cursor-pointer transition"
                    title="Switch to Admin Console (/admin)"
                  >
                    <Lock className="w-3 h-3 text-purple-400" />
                    <span>Admin (/admin)</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
