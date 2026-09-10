/**
 * SKTECH EXAM — Admin Application Root (Vercel Project 2)
 * Target Domain: sktech-exam-admin.vercel.app
 * Exclusively administrative console, question bank CRUD, and pricing controls.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import { AdminHeader } from './components/AdminHeader';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginGate } from './components/AdminLoginGate';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ArchitectureSpecs } from './components/ArchitectureSpecs';
import { Footer } from './components/Footer';
import { api } from './services/apiClient';
import { Exam, MockTest, Question, Subject, User } from './types';
import { ShieldCheck, Lock } from 'lucide-react';

interface AdminAppProps {
  candidatePortalUrl?: string;
}

export default function AdminApp({
  candidatePortalUrl = 'https://sktech-exam-portal.vercel.app',
}: AdminAppProps) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [showSpecs, setShowSpecs] = useState<boolean>(false);

  // Administrative State & Content Data
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load Admin Data from central API
  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      const [questionsRes, subjectsRes, examsRes, mocksRes] = await Promise.all([
        api.getQuestions(),
        api.getSubjects(),
        api.getExams(),
        api.getMockTests(),
      ]);

      if (questionsRes.data) setQuestions(questionsRes.data);
      if (subjectsRes.data) setSubjects(subjectsRes.data);
      if (examsRes.data) setExams(examsRes.data);
      if (mocksRes.data) setMockTests(mocksRes.data);
    } catch (err) {
      console.error('Admin portal data loading warning:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();

    // Restore admin session from localStorage
    try {
      const savedAdmin = localStorage.getItem('SKTECH_ADMIN_USER');
      if (savedAdmin) {
        setAdminUser(JSON.parse(savedAdmin));
        setIsAdminLoggedIn(true);
      }
    } catch (e) {
      console.warn('Admin session restore notice:', e);
    }
  }, []);

  // Admin Login Success
  const handleAdminLoginSuccess = (user: User) => {
    setAdminUser(user);
    setIsAdminLoggedIn(true);
    localStorage.setItem('SKTECH_ADMIN_USER', JSON.stringify(user));
    setIsAdminLoginOpen(false);
  };

  // Admin Logout
  const handleAdminLogout = () => {
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('SKTECH_ADMIN_USER');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Dedicated Admin Console Header */}
      <AdminHeader
        adminUser={adminUser}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
        language={language}
        onLanguageToggle={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
        candidatePortalUrl={candidatePortalUrl}
        onOpenSpecs={() => setShowSpecs((s) => !s)}
      />

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {isLoading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xs font-semibold text-purple-300">
              Initializing SKTECH Administrative Console...
            </div>
          </div>
        ) : showSpecs ? (
          <div className="space-y-4">
            <button
              onClick={() => setShowSpecs(false)}
              className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-200 text-xs font-bold transition cursor-pointer"
            >
              ← Back to Admin Console
            </button>
            <ArchitectureSpecs />
          </div>
        ) : isAdminLoggedIn ? (
          /* Secure Administrative Dashboard */
          <AdminDashboard
            questions={questions}
            subjects={subjects}
            exams={exams}
            onRefreshQuestions={loadAdminData}
            mockTests={mockTests}
          />
        ) : (
          /* Administrative Security Login Gate */
          <div className="py-6">
            <AdminLoginGate
              onSuccess={handleAdminLoginSuccess}
              onReturnToCandidatePortal={() => {
                if (typeof window !== 'undefined') {
                  window.open(candidatePortalUrl, '_blank');
                }
              }}
              language={language}
            />
          </div>
        )}
      </main>

      {/* Admin Footer */}
      <footer id="sktech-admin-footer" className="bg-slate-900 text-slate-400 border-t border-purple-950/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="font-semibold text-slate-300">
                SKTECH EXAM • Administrative Deployment (Vercel Project 2)
              </span>
            </div>
            <div className="flex items-center space-x-4 text-slate-500">
              <span>Domain: <strong className="text-purple-300 font-mono">sktech-exam-admin.vercel.app</strong></span>
              <span>Portal: <strong className="text-emerald-400 font-mono">Isolated Admin Console</strong></span>
              <a
                href={candidatePortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline font-semibold"
              >
                Candidate Portal ↗
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal (Fallback Dialog) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
