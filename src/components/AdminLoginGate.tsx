/**
 * SKTECH EXAM — Dedicated Admin Authentication Gate
 * Rendered strictly at /admin when administrative credentials are not yet authenticated.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  User as UserIcon,
  KeyRound,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Database,
  Server,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/apiClient';
import { User } from '../types';

interface AdminLoginGateProps {
  onSuccess: (adminUser: User) => void;
  onReturnToCandidatePortal: () => void;
  language: 'en' | 'hi';
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({
  onSuccess,
  onReturnToCandidatePortal,
  language,
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError(
        language === 'hi'
          ? 'कृपया व्यवस्थापक यूजरनेम एवं पासवर्ड दोनों दर्ज करें।'
          : 'Please enter both administrator username and password.'
      );
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const resp = await api.adminLogin(username.trim(), password);
      if (resp.success && resp.user) {
        onSuccess(resp.user);
      } else {
        setError(
          language === 'hi'
            ? 'अमान्य व्यवस्थापक क्रेडेंशियल्स। कृपया पुनः प्रयास करें।'
            : 'Invalid administrator credentials. Access denied.'
        );
      }
    } catch (err: any) {
      setError(
        err?.message ||
          (language === 'hi'
            ? 'प्रमाणीकरण विफल रहा। कृपया सर्वर कनेक्शन की जांच करें।'
            : 'Authentication failed. Please verify server connection.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-10 px-4">
      {/* Top Breadcrumb & Route Indicator */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between">
        <button
          onClick={onReturnToCandidatePortal}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? '← परीक्षार्थी पोर्टल पर लौटें (/)' : '← Return to Candidate Portal (/)'}</span>
        </button>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-200 text-[11px] font-mono border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Isolated Route: /admin</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white border-b border-slate-800">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-white">SKTECH EXAM</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 uppercase">
                  Admin Console
                </span>
              </div>
              <h1 className="text-lg font-black text-white">
                {language === 'hi' ? 'व्यवस्थापक प्रमाणीकरण गेट' : 'Administrative Access Gate'}
              </h1>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'यह पृष्ठ (/admin) केवल अधिकृत परीक्षकों, विषय-विशेषज्ञों और सिस्टम एडमिनिस्ट्रेटर्स के लिए आरक्षित है।'
              : 'This URL route (/admin) is isolated for authorized educators, question reviewers, and system operators.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-semibold text-rose-800 flex items-start space-x-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {language === 'hi' ? 'व्यवस्थापक यूजरनेम / ईमेल' : 'Admin Username or Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={language === 'hi' ? 'व्यवस्थापक यूजरनेम' : 'e.g. admin or skt22tripathi@gmail.com'}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {language === 'hi' ? 'गोपनीय पासवर्ड' : 'Secret Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{language === 'hi' ? 'सत्यापित किया जा रहा है...' : 'Verifying Credentials...'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{language === 'hi' ? 'व्यवस्थापक कंसोल में प्रवेश करें' : 'Sign In to Admin Console'}</span>
                </>
              )}
            </button>
          </form>

          {/* Security & Route Info Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-[11px] text-slate-600 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cryptographically Enforced RBAC</span>
            </div>
            <p className="leading-relaxed">
              Administrative sessions are issued with server-side tokens and audited in immutable database logs.
              Students taking exams should use the candidate portal at <strong className="text-slate-800">/</strong>.
            </p>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Route: <strong className="font-mono text-slate-700">/admin</strong></span>
          <button
            type="button"
            onClick={onReturnToCandidatePortal}
            className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer"
          >
            Candidate Portal (/) →
          </button>
        </div>
      </div>
    </div>
  );
};
