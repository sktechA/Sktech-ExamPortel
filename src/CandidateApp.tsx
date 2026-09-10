/**
 * SKTECH EXAM — Candidate Application Root (Vercel Project 1)
 * Target Domain: sktech-exam-portal.vercel.app
 * Independent, decoupled candidate portal with mock test engines and performance analytics.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import { CandidateHeader, CandidatePortalView } from './components/CandidateHeader';
import { Footer } from './components/Footer';
import { CandidateDashboard } from './components/CandidateDashboard';
import { ExamEngine } from './components/ExamEngine';
import { SubjectiveExamEngine } from './components/SubjectiveExamEngine';
import { ResultScorecard } from './components/ResultScorecard';
import { PerformanceHistoryView } from './components/PerformanceHistoryView';
import { LiveNotificationSearch } from './components/LiveNotificationSearch';
import { ExamCenterLocator } from './components/ExamCenterLocator';
import { MultiPlatformHub } from './components/MultiPlatformHub';
import { ArchitectureSpecs } from './components/ArchitectureSpecs';
import { CandidateAuthModal } from './components/CandidateAuthModal';
import { AudioTranscriptionModal } from './components/AudioTranscriptionModal';
import { PreTestAdModal } from './components/PreTestAdModal';
import { UnlockMockModal } from './components/UnlockMockModal';
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

export default function CandidateApp() {
  const [currentView, setCurrentView] = useState<CandidatePortalView>('DASHBOARD');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Core Data state
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

  // Monetization & Test Unlocking State
  const [unlockedTests, setUnlockedTests] = useState<string[]>([]);
  const [testToUnlock, setTestToUnlock] = useState<MockTest | null>(null);

  // Pre-Test Clean Sponsor Ad State
  const [showPreTestAd, setShowPreTestAd] = useState<boolean>(false);
  const [pendingTestForAd, setPendingTestForAd] = useState<MockTest | null>(null);

  // Active Objective Exam Session State
  const [activeExamSession, setActiveExamSession] = useState<{
    test: MockTest;
    attempt: ExamAttempt;
    questions: Question[];
  } | null>(null);

  // Active Subjective Paper State
  const [activeSubjectivePaper, setActiveSubjectivePaper] = useState<SubjectiveMockPaper | null>(null);

  // Active Result Scorecard View
  const [activeScorecard, setActiveScorecard] = useState<ResultType | null>(null);

  // Initial Load from Central API
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
      console.error('Candidate portal data loading warning:', err);
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
      const savedUnlocked = localStorage.getItem('SKTECH_UNLOCKED_TESTS');
      if (savedUnlocked) {
        setUnlockedTests(JSON.parse(savedUnlocked));
      }
    } catch (e) {
      console.warn('Candidate storage restore notice:', e);
    }

    // Ensure clean candidate URL routing
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin')) {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  // Launch Exam Session
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
      alert('Unable to launch examination. Please check connection.');
    }
  };

  // Start Test Interceptor
  const handleStartTest = (testId: string) => {
    const targetTest = mockTests.find((t) => t.id === testId);
    if (!targetTest) {
      launchExamSession(testId);
      return;
    }

    if (targetTest.isFree === false && !unlockedTests.includes(testId)) {
      setTestToUnlock(targetTest);
      return;
    }

    setPendingTestForAd(targetTest);
    setShowPreTestAd(true);
  };

  // Finish Exam Handler
  const handleFinishExam = (scorecard: ResultType) => {
    setActiveExamSession(null);
    setActiveScorecard(scorecard);
    setRecentResult(scorecard);

    // Save to Firestore
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

  // Handle Mock Test Unlock
  const handleTestUnlocked = (testId: string) => {
    setUnlockedTests((prev) => {
      const updated = [...prev, testId];
      localStorage.setItem('SKTECH_UNLOCKED_TESTS', JSON.stringify(updated));
      return updated;
    });
    setTestToUnlock(null);

    const targetTest = mockTests.find((t) => t.id === testId);
    if (targetTest) {
      setPendingTestForAd(targetTest);
      setShowPreTestAd(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Candidate Portal Header */}
      <CandidateHeader
        currentView={currentView}
        onViewChange={(view) => {
          setActiveScorecard(null);
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        onLanguageToggle={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
        examInProgress={!!activeExamSession || !!activeSubjectivePaper}
        activeCandidate={candidateUser}
        onOpenCandidateAuth={() => setIsCandidateAuthOpen(true)}
        onLogoutCandidate={handleCandidateLogout}
        onOpenVoiceTranscription={() => setIsVoiceTranscriptionOpen(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {isLoading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xs font-semibold text-slate-600">
              Loading SKTECH Candidate Examination Portal...
            </div>
          </div>
        ) : activeExamSession ? (
          /* Active Objective Exam Engine with Pulse & Chime */
          <ExamEngine
            test={activeExamSession.test}
            questions={activeExamSession.questions}
            attempt={activeExamSession.attempt}
            onFinishExam={handleFinishExam}
            onCancelExam={handleCancelExam}
            systemLanguage={language}
          />
        ) : activeSubjectivePaper ? (
          /* Active Subjective Exam Engine */
          <SubjectiveExamEngine
            paper={activeSubjectivePaper}
            language={language}
            onLanguageToggle={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
            onExit={() => setActiveSubjectivePaper(null)}
          />
        ) : activeScorecard ? (
          /* Result Scorecard & Analytics */
          <ResultScorecard
            scorecard={activeScorecard}
            questions={questions}
            onRetake={() => handleStartTest(activeScorecard.testId)}
            onBackToDashboard={() => setActiveScorecard(null)}
            language={language}
          />
        ) : currentView === 'PERFORMANCE' ? (
          /* Performance History Visualizer */
          <PerformanceHistoryView
            candidateUser={candidateUser}
            recentResult={recentResult}
            mockTests={mockTests}
            language={language}
            onStartTest={handleStartTest}
            onViewResult={handleViewResult}
          />
        ) : currentView === 'LIVE_NOTIFICATIONS' ? (
          /* Live Exam Alerts & Search Grounding */
          <LiveNotificationSearch language={language} />
        ) : currentView === 'EXAM_CENTERS' ? (
          /* Exam Centers Locator */
          <ExamCenterLocator language={language} />
        ) : currentView === 'PLATFORMS' ? (
          /* Ecosystem Hub */
          <MultiPlatformHub />
        ) : currentView === 'ARCHITECTURE' ? (
          /* Architecture Specs */
          <ArchitectureSpecs />
        ) : (
          /* Primary Candidate Dashboard */
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
        )}
      </main>

      {/* Footer */}
      {!activeExamSession && <Footer />}

      {/* Candidate Multi-Verification Auth Modal */}
      <CandidateAuthModal
        isOpen={isCandidateAuthOpen}
        onClose={() => setIsCandidateAuthOpen(false)}
        onSuccess={handleCandidateAuthSuccess}
      />

      {/* Voice Doubt Transcriber Modal */}
      <AudioTranscriptionModal
        isOpen={isVoiceTranscriptionOpen}
        onClose={() => setIsVoiceTranscriptionOpen(false)}
        currentUser={candidateUser}
        language={language}
        onSearchQuery={() => {
          setCurrentView('LIVE_NOTIFICATIONS');
        }}
      />

      {/* Pre-Test Educational Intermission Ad Modal */}
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
