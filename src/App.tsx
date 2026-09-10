/**
 * SKTECH EXAM — Master Application Root
 * Multi-Platform Architecture, Dual Portal Isolation, Multi-Verification & Monetization
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import { Header, AppViewMode } from './components/Header';
import { Footer } from './components/Footer';
import { CandidateDashboard } from './components/CandidateDashboard';
import { ExamEngine } from './components/ExamEngine';
import { ResultScorecard } from './components/ResultScorecard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginGate } from './components/AdminLoginGate';
import { ArchitectureSpecs } from './components/ArchitectureSpecs';
import { MultiPlatformHub } from './components/MultiPlatformHub';
import { CandidateAuthModal } from './components/CandidateAuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { PreTestAdModal } from './components/PreTestAdModal';
import { UnlockMockModal } from './components/UnlockMockModal';
import { AudioTranscriptionModal } from './components/AudioTranscriptionModal';
import { LiveNotificationSearch } from './components/LiveNotificationSearch';
import { ExamCenterLocator } from './components/ExamCenterLocator';
import { SubjectiveExamEngine } from './components/SubjectiveExamEngine';
import { api } from './services/apiClient';
import { saveExamAttemptToFirestore } from './lib/firebase';
import {
  Exam,
  MockTest,
  Question,
  Subject,
  CurrentAffairItem,
  ResultScorecard as ResultType,
  ExamAttempt,
  User,
  SubjectiveMockPaper,
  SpeedBoosterTrack,
  CombinedMockPackage,
} from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'/' | '/admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin') || hash === '#admin') {
        return '/admin';
      }
    }
    return '/';
  });

  const [currentView, setCurrentView] = useState<AppViewMode>(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin')) {
      return 'ADMIN';
    }
    return 'CANDIDATE';
  });
  const [portalMode, setPortalMode] = useState<'UNIFIED' | 'CANDIDATE_ONLY' | 'ADMIN_ONLY'>('UNIFIED');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Core Data fetched live from central PostgreSQL API
  const [exams, setExams] = useState<Exam[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairItem[]>([]);
  const [recentResult, setRecentResult] = useState<ResultType | undefined>(undefined);
  const [subjectiveMocks, setSubjectiveMocks] = useState<SubjectiveMockPaper[]>([]);
  const [speedBoosters, setSpeedBoosters] = useState<SpeedBoosterTrack[]>([]);
  const [combinedMocks, setCombinedMocks] = useState<CombinedMockPackage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authentication State
  const [candidateUser, setCandidateUser] = useState<User | null>(null);
  const [isCandidateAuthOpen, setIsCandidateAuthOpen] = useState<boolean>(false);
  const [isVoiceTranscriptionOpen, setIsVoiceTranscriptionOpen] = useState<boolean>(false);

  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Monetization & Test Unlocking State
  const [unlockedTests, setUnlockedTests] = useState<string[]>([]);
  const [testToUnlock, setTestToUnlock] = useState<MockTest | null>(null);

  // Pre-Test Clean Sponsor Ad State
  const [showPreTestAd, setShowPreTestAd] = useState<boolean>(false);
  const [pendingTestForAd, setPendingTestForAd] = useState<MockTest | null>(null);

  // Active Exam State
  const [activeExamSession, setActiveExamSession] = useState<{
    test: MockTest;
    attempt: ExamAttempt;
    questions: Question[];
  } | null>(null);

  // Active Subjective Paper State
  const [activeSubjectivePaper, setActiveSubjectivePaper] = useState<SubjectiveMockPaper | null>(null);

  // Active Result Scorecard View
  const [activeScorecard, setActiveScorecard] = useState<ResultType | null>(null);

  // Initial Load from Central API (Live PostgreSQL database)
  const loadPlatformData = async () => {
    try {
      setIsLoading(true);
      const [examsRes, mocksRes, questionsRes, subjectsRes, caRes, resultRes, subjRes, sbRes, cmRes] = await Promise.all([
        api.getExams(),
        api.getMockTests(),
        api.getQuestions(),
        api.getSubjects(),
        api.getCurrentAffairs(),
        api.getLatestCandidateResult().catch(() => null),
        api.getSubjectiveMocks().catch(() => ({ success: true, count: 0, data: [] })),
        api.getSpeedBoosters().catch(() => ({ success: true, count: 0, data: [] })),
        api.getCombinedMocks().catch(() => ({ success: true, count: 0, data: [] })),
      ]);

      if (examsRes.data) setExams(examsRes.data);
      if (mocksRes.data) setMockTests(mocksRes.data);
      if (questionsRes.data) setQuestions(questionsRes.data);
      if (subjectsRes.data) setSubjects(subjectsRes.data);
      if (caRes.data) setCurrentAffairs(caRes.data);
      if (resultRes?.data) setRecentResult(resultRes.data);
      if (subjRes?.data) setSubjectiveMocks(subjRes.data);
      if (sbRes?.data) setSpeedBoosters(sbRes.data);
      if (cmRes?.data) setCombinedMocks(cmRes.data);
    } catch (err) {
      console.error('Failed loading live platform data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlatformData();

    // Restore candidate session from storage
    try {
      const savedCandidate = localStorage.getItem('SKTECH_CANDIDATE_USER');
      if (savedCandidate) {
        setCandidateUser(JSON.parse(savedCandidate));
      }
      const savedAdmin = localStorage.getItem('SKTECH_ADMIN_USER');
      if (savedAdmin) {
        setAdminUser(JSON.parse(savedAdmin));
        setIsAdminLoggedIn(true);
      }
      const savedUnlocked = localStorage.getItem('SKTECH_UNLOCKED_TESTS');
      if (savedUnlocked) {
        setUnlockedTests(JSON.parse(savedUnlocked));
      }
      const savedMode = localStorage.getItem('SKTECH_PORTAL_MODE');
      if (savedMode === 'CANDIDATE_ONLY' || savedMode === 'ADMIN_ONLY' || savedMode === 'UNIFIED') {
        setPortalMode(savedMode);
      }
    } catch (e) {
      console.warn('LocalStorage restore error:', e);
    }

    // Route-level synchronization for strict separation of /admin and /
    const syncRouteFromLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin') || hash === '#admin') {
        setCurrentRoute('/admin');
        setCurrentView('ADMIN');
      } else {
        setCurrentRoute('/');
        setCurrentView((prev) => (prev === 'ADMIN' ? 'CANDIDATE' : prev));
      }
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, []);

  // Router function providing strictly isolated paths: / (Candidate Portal) and /admin (Admin Dashboard)
  const navigateRoute = (targetRoute: '/' | '/admin', view?: AppViewMode) => {
    setActiveScorecard(null);
    if (targetRoute === '/admin') {
      setCurrentRoute('/admin');
      setCurrentView('ADMIN');
      if (typeof window !== 'undefined' && window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentRoute('/');
      if (view && view !== 'ADMIN') {
        setCurrentView(view);
      } else if (currentView === 'ADMIN') {
        setCurrentView('CANDIDATE');
      }
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.history.pushState(null, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Mode change handler enforcing Dual Portal Separation
  const handlePortalModeChange = (mode: 'UNIFIED' | 'CANDIDATE_ONLY' | 'ADMIN_ONLY') => {
    setPortalMode(mode);
    localStorage.setItem('SKTECH_PORTAL_MODE', mode);
    if (mode === 'CANDIDATE_ONLY') {
      navigateRoute('/');
    } else if (mode === 'ADMIN_ONLY') {
      navigateRoute('/admin');
    }
  };

  // Safe Exam Launcher after ads / unlocking
  const launchExamSession = async (testId: string) => {
    try {
      const resp = await api.startAttempt(testId);
      if (resp.success && resp.data) {
        setActiveScorecard(null);
        setActiveExamSession({
          test: resp.data.test,
          attempt: resp.data.attempt,
          questions: resp.data.questions,
        });
      }
    } catch (err) {
      console.error('Failed to initialize test:', err);
      alert('Unable to launch examination. Please check API server.');
    }
  };

  // Start Test Interceptor (checks monetization and displays clean pre-test ad)
  const handleStartTest = (testId: string) => {
    const targetTest = mockTests.find((t) => t.id === testId);
    if (!targetTest) {
      launchExamSession(testId);
      return;
    }

    // 1. Check if test requires micro-transaction fee
    if (targetTest.isFree === false && !unlockedTests.includes(testId)) {
      setTestToUnlock(targetTest);
      return;
    }

    // 2. Trigger Clean Pre-Test Educational Intermission Ad
    setPendingTestForAd(targetTest);
    setShowPreTestAd(true);
  };

  // Finish Exam Handler
  const handleFinishExam = (scorecard: ResultType) => {
    setActiveExamSession(null);
    setActiveScorecard(scorecard);
    setRecentResult(scorecard);

    // Persist attempt to Firebase Firestore (/users/{userId}/attempts/{attemptId})
    const uid = candidateUser?.id || 'candidate_guest_01';
    saveExamAttemptToFirestore(uid, {
      attemptId: scorecard.attemptId,
      testId: scorecard.testId,
      testTitle: scorecard.testTitle,
      examTitle: scorecard.testTitle,
      score: scorecard.scoreObtained,
      totalMarks: scorecard.totalMarks,
      accuracy: scorecard.accuracyPercentage,
      percentile: scorecard.percentile,
      submittedAt: scorecard.submittedAt,
    }).catch((err) => console.warn('Firestore attempt sync notice:', err));
  };

  // Cancel Exam Handler
  const handleCancelExam = () => {
    if (confirm('Are you sure you want to exit the examination? Unsaved progress will be lost.')) {
      setActiveExamSession(null);
    }
  };

  // View Scorecard Handler
  const handleViewResult = async (attemptId: string) => {
    try {
      const resp = await api.getResult(attemptId);
      if (resp.data) {
        setActiveScorecard(resp.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Candidate Auth Success
  const handleCandidateAuthSuccess = (user: User) => {
    setCandidateUser(user);
    localStorage.setItem('SKTECH_CANDIDATE_USER', JSON.stringify(user));
  };

  // Candidate Logout
  const handleCandidateLogout = () => {
    setCandidateUser(null);
    localStorage.removeItem('SKTECH_CANDIDATE_USER');
  };

  // Admin Login Success
  const handleAdminLoginSuccess = (user: User) => {
    setAdminUser(user);
    setIsAdminLoggedIn(true);
    localStorage.setItem('SKTECH_ADMIN_USER', JSON.stringify(user));
    setIsAdminLoginOpen(false);
    navigateRoute('/admin');
  };

  // Admin Logout
  const handleAdminLogout = () => {
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('SKTECH_ADMIN_USER');
  };

  // Handle Mock Test Unlock
  const handleTestUnlocked = (testId: string) => {
    setUnlockedTests((prev) => {
      const updated = [...prev, testId];
      localStorage.setItem('SKTECH_UNLOCKED_TESTS', JSON.stringify(updated));
      return updated;
    });
    setTestToUnlock(null);

    // After unlocking, immediately queue pre-test ad and launch
    const targetTest = mockTests.find((t) => t.id === testId);
    if (targetTest) {
      setPendingTestForAd(targetTest);
      setShowPreTestAd(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Top Header Navigation with Strict Path Isolation Controls */}
      <Header
        currentRoute={currentRoute}
        onNavigateRoute={navigateRoute}
        currentView={currentView}
        onViewChange={(v) => {
          if (v === 'ADMIN') {
            navigateRoute('/admin');
          } else {
            navigateRoute('/', v);
          }
        }}
        language={language}
        onLanguageToggle={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
        examInProgress={!!activeExamSession || !!activeSubjectivePaper}
        portalMode={portalMode}
        activeCandidate={candidateUser}
        adminUser={adminUser}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenCandidateAuth={() => setIsCandidateAuthOpen(true)}
        onOpenAdminLogin={() => {
          if (currentRoute !== '/admin') {
            navigateRoute('/admin');
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        onLogoutCandidate={handleCandidateLogout}
        onLogoutAdmin={handleAdminLogout}
        onOpenVoiceTranscription={() => setIsVoiceTranscriptionOpen(true)}
      />

      {/* Main Content Workspace: Strictly isolated routes */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {isLoading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xs font-semibold text-slate-600">
              Connecting to SKTECH Central REST API & PostgreSQL Database...
            </div>
          </div>
        ) : currentRoute === '/admin' ? (
          /* Strictly Isolated /admin Route */
          isAdminLoggedIn ? (
            <AdminDashboard
              questions={questions}
              subjects={subjects}
              exams={exams}
              onRefreshQuestions={loadPlatformData}
              mockTests={mockTests}
            />
          ) : (
            <AdminLoginGate
              onSuccess={handleAdminLoginSuccess}
              onReturnToCandidatePortal={() => navigateRoute('/')}
              language={language}
            />
          )
        ) : (
          /* Strictly Isolated / Route: Candidate Portal */
          activeExamSession ? (
            <ExamEngine
              test={activeExamSession.test}
              questions={activeExamSession.questions}
              attempt={activeExamSession.attempt}
              onFinishExam={handleFinishExam}
              onCancelExam={handleCancelExam}
              systemLanguage={language}
            />
          ) : activeSubjectivePaper ? (
            <SubjectiveExamEngine
              paper={activeSubjectivePaper}
              language={language}
              onLanguageToggle={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
              onExit={() => setActiveSubjectivePaper(null)}
            />
          ) : activeScorecard ? (
            <ResultScorecard
              scorecard={activeScorecard}
              questions={questions}
              onRetake={() => handleStartTest(activeScorecard.testId)}
              onBackToDashboard={() => setActiveScorecard(null)}
              language={language}
            />
          ) : currentView === 'LIVE_NOTIFICATIONS' ? (
            <LiveNotificationSearch language={language} />
          ) : currentView === 'EXAM_CENTERS' ? (
            <ExamCenterLocator language={language} />
          ) : currentView === 'PLATFORMS' ? (
            <MultiPlatformHub
              portalMode={portalMode}
              onModeChange={handlePortalModeChange}
            />
          ) : currentView === 'ARCHITECTURE' ? (
            <ArchitectureSpecs />
          ) : (
            <CandidateDashboard
              exams={exams}
              mockTests={mockTests}
              currentAffairs={currentAffairs}
              recentResult={recentResult}
              onStartTest={handleStartTest}
              onViewResult={handleViewResult}
              language={language}
              unlockedTests={unlockedTests}
              onUnlockTest={(test) => setTestToUnlock(test)}
              candidateUser={candidateUser}
              onStartSubjectiveTest={(paper) => setActiveSubjectivePaper(paper)}
              subjects={subjects}
              subjectiveMocks={subjectiveMocks}
              speedBoosters={speedBoosters}
              combinedMocks={combinedMocks}
            />
          )
        )}
      </main>

      {/* Footer with mandatory brand attribution and cross-portal routing */}
      {!activeExamSession && (
        <Footer
          currentRoute={currentRoute}
          onNavigateRoute={navigateRoute}
        />
      )}

      {/* Audio Voice Question & Doubt Transcriber Modal (gemini-3.5-transcribe) */}
      <AudioTranscriptionModal
        isOpen={isVoiceTranscriptionOpen}
        onClose={() => setIsVoiceTranscriptionOpen(false)}
        currentUser={candidateUser}
        language={language}
        onSearchQuery={() => {
          setCurrentView('LIVE_NOTIFICATIONS');
        }}
      />

      {/* Multi-Verification Candidate Auth Modal (Phone OTP, Google, Apple ID) */}
      <CandidateAuthModal
        isOpen={isCandidateAuthOpen}
        onClose={() => setIsCandidateAuthOpen(false)}
        onSuccess={handleCandidateAuthSuccess}
      />

      {/* Admin Login Modal (Restricted Admin Console) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Pre-Test Clean Educational Sponsor Ad Intermission */}
      <PreTestAdModal
        isOpen={showPreTestAd}
        test={pendingTestForAd}
        onProceed={() => {
          setShowPreTestAd(false);
          if (pendingTestForAd) {
            launchExamSession(pendingTestForAd.id);
            setPendingTestForAd(null);
          }
        }}
        onCancel={() => {
          setShowPreTestAd(false);
          setPendingTestForAd(null);
        }}
        language={language}
      />

      {/* Mock Test Micro-Transaction & Razorpay / UPI Unlock Modal */}
      <UnlockMockModal
        isOpen={!!testToUnlock}
        test={testToUnlock}
        onClose={() => setTestToUnlock(null)}
        onUnlocked={handleTestUnlocked}
      />
    </div>
  );
}
