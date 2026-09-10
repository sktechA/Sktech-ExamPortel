/**
 * SKTECH EXAM — Core Examination Engine Interface
 * Standards: TCS iON / NTA / IBPS Authentic Indian Exam Architecture
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Bookmark,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  Send,
  Languages,
  X,
  BellRing,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { MockTest, Question, ExamAttempt, AttemptAnswer, ResultScorecard } from '../types';
import { api } from '../services/apiClient';

interface ExamEngineProps {
  test: MockTest;
  questions: Question[];
  attempt: ExamAttempt;
  onFinishExam: (scorecard: ResultScorecard) => void;
  onCancelExam: () => void;
  systemLanguage: 'en' | 'hi';
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  test,
  questions,
  attempt,
  onFinishExam,
  onCancelExam,
  systemLanguage,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [examLanguage, setExamLanguage] = useState<'en' | 'hi'>(systemLanguage);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    test.sections[0]?.id || 'default_sec'
  );
  const [answers, setAnswers] = useState<Record<string, AttemptAnswer>>(attempt.answers || {});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    attempt.timeRemainingSeconds || test.durationMinutes * 60
  );
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');

  // 5-Minute Warning Notification state (Section 10 & Examination Integrity Standards)
  const [hasTriggeredFiveMinWarning, setHasTriggeredFiveMinWarning] = useState<boolean>(false);
  const [showFiveMinWarningModal, setShowFiveMinWarningModal] = useState<boolean>(false);

  // Secondary Milestone Non-Skippable Intermission Ad State
  const [hasTriggeredMilestoneAd, setHasTriggeredMilestoneAd] = useState<boolean>(false);
  const [showMilestoneAdModal, setShowMilestoneAdModal] = useState<boolean>(false);
  const [milestoneAdCountdown, setMilestoneAdCountdown] = useState<number>(5);

  const STORAGE_KEY = `SKTECH_EXAM_AUTOSAVE_${test.id}`;
  const currentQ = questions[currentQIndex] || questions[0];

  // 0. Restore exam progress from localStorage on initial mount
  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (saved && saved.answers && Object.keys(saved.answers).length > 0) {
          setAnswers((prev) => ({ ...prev, ...saved.answers }));
        }
        if (saved && saved.secondsRemaining && saved.secondsRemaining > 0) {
          setSecondsRemaining(saved.secondsRemaining);
        }
        if (typeof saved.currentQIndex === 'number' && saved.currentQIndex < questions.length) {
          setCurrentQIndex(saved.currentQIndex);
        }
        if (saved.lastSavedTime) {
          setLastSavedTime(saved.lastSavedTime);
        }
      }
    } catch (e) {
      console.warn('LocalStorage auto-restore note:', e);
    }
  }, [STORAGE_KEY, questions.length]);

  // 1. Server-Authoritative Synchronized Countdown Timer (Paused during Milestone Intermission Ad)
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (showMilestoneAdModal) {
          return prev; // Time safely frozen during sponsor intermission
        }
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit(true); // Auto-submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showMilestoneAdModal]);

  // 2. Trigger warning notification specifically when 5 minutes (300s) remain
  useEffect(() => {
    if (secondsRemaining <= 300 && secondsRemaining > 0 && !hasTriggeredFiveMinWarning) {
      setShowFiveMinWarningModal(true);
      setHasTriggeredFiveMinWarning(true);
    }
  }, [secondsRemaining, hasTriggeredFiveMinWarning]);

  // 3. Milestone Ad non-skippable countdown timer
  useEffect(() => {
    if (!showMilestoneAdModal) return;
    const adTimer = setInterval(() => {
      setMilestoneAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(adTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(adTimer);
  }, [showMilestoneAdModal]);

  // 4. Periodic background auto-save to localStorage & central API every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString();
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            testId: test.id,
            attemptId: attempt.id,
            answers,
            secondsRemaining,
            currentQIndex,
            lastSavedTime: timeStr,
            savedAtTimestamp: Date.now(),
          })
        );
        setLastSavedTime(timeStr);
      } catch (err) {
        console.error('LocalStorage auto-save error:', err);
      }

      if (attempt?.id) {
        api.saveAttempt(attempt.id, answers, secondsRemaining).catch((err) =>
          console.error('API auto-save sync error:', err)
        );
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [answers, secondsRemaining, currentQIndex, attempt?.id, test.id, STORAGE_KEY]);

  // Format time as HH:MM:SS
  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Status computation for palette
  const getQuestionStatus = (qId: string) => {
    const ans = answers[qId];
    if (!ans || !ans.visited) return 'NOT_VISITED';
    if (ans.selectedOption && ans.isMarkedForReview) return 'ANSWERED_MARKED';
    if (ans.isMarkedForReview) return 'MARKED_REVIEW';
    if (ans.selectedOption) return 'ANSWERED';
    return 'NOT_ANSWERED';
  };

  // Count stats
  const stats = questions.reduce(
    (acc, q) => {
      const status = getQuestionStatus(q.id);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { ANSWERED: 0, NOT_ANSWERED: 0, NOT_VISITED: 0, MARKED_REVIEW: 0, ANSWERED_MARKED: 0 } as Record<string, number>
  );

  // Mark question visited when navigating
  const navigateToQuestion = (index: number) => {
    const targetQ = questions[index];
    if (targetQ) {
      setAnswers((prev) => ({
        ...prev,
        [targetQ.id]: {
          questionId: targetQ.id,
          selectedOption: prev[targetQ.id]?.selectedOption,
          isMarkedForReview: prev[targetQ.id]?.isMarkedForReview || false,
          timeSpentSeconds: (prev[targetQ.id]?.timeSpentSeconds || 0) + 5,
          visited: true,
        },
      }));
    }
    setCurrentQIndex(index);
  };

  // Select Option
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption: key,
        isMarkedForReview: prev[currentQ.id]?.isMarkedForReview || false,
        timeSpentSeconds: (prev[currentQ.id]?.timeSpentSeconds || 0) + 2,
        visited: true,
      },
    }));
  };

  // Clear Response
  const handleClearResponse = () => {
    setAnswers((prev) => {
      const updated = { ...prev };
      if (updated[currentQ.id]) {
        updated[currentQ.id] = {
          ...updated[currentQ.id],
          selectedOption: undefined,
        };
      }
      return updated;
    });
  };

  // Check and trigger milestone non-skippable ad
  const checkMilestoneAdTrigger = (updatedAnswers: Record<string, AttemptAnswer>) => {
    const answeredCount = Object.values(updatedAnswers).filter((a) => Boolean(a.selectedOption)).length;
    const milestoneThreshold = Math.max(2, Math.floor(questions.length / 2));
    if (!hasTriggeredMilestoneAd && answeredCount >= milestoneThreshold) {
      setShowMilestoneAdModal(true);
      setHasTriggeredMilestoneAd(true);
      setMilestoneAdCountdown(5);
      api.trackAdEvent('camp_ecom_01', 'IMPRESSION').catch((err) =>
        console.warn('Ad impression tracking error:', err)
      );
    }
  };

  // Save & Next
  const handleSaveAndNext = () => {
    checkMilestoneAdTrigger(answers);
    if (currentQIndex < questions.length - 1) {
      navigateToQuestion(currentQIndex + 1);
    }
  };

  // Mark For Review & Next
  const handleMarkForReviewAndNext = () => {
    const updated = {
      ...answers,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption: answers[currentQ.id]?.selectedOption,
        isMarkedForReview: true,
        timeSpentSeconds: (answers[currentQ.id]?.timeSpentSeconds || 0) + 2,
        visited: true,
      },
    };
    setAnswers(updated);
    checkMilestoneAdTrigger(updated);
    if (currentQIndex < questions.length - 1) {
      navigateToQuestion(currentQIndex + 1);
    }
  };

  // Final Submit
  const handleFinalSubmit = async (auto = false) => {
    setIsSubmitting(true);
    try {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('Could not clear local storage session', e);
      }
      const resp = await api.submitAttempt(attempt.id, answers, secondsRemaining);
      if (resp.success && resp.data) {
        onFinishExam(resp.data);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setIsSubmitting(false);
      alert('Unable to submit exam. Please verify connection and retry.');
    }
  };

  const isLowTime = secondsRemaining <= 300; // Under 5 mins

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between -mx-4 -mt-6 sm:-mx-6 lg:-mx-8">
      {/* 1. Official Exam Header Bar */}
      <header className="bg-slate-900 text-white px-4 py-2.5 border-b border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <span className="font-extrabold text-sm tracking-tight text-white bg-indigo-600 px-2 py-0.5 rounded">
            SKTECH
          </span>
          <span className="font-bold text-xs sm:text-sm text-slate-200 line-clamp-1">
            {test.title}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Question Language Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-xs">
            <Languages className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400 text-[11px] hidden sm:inline">View in:</span>
            <select
              value={examLanguage}
              onChange={(e) => setExamLanguage(e.target.value as 'en' | 'hi')}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900">English</option>
              <option value="hi" className="bg-slate-900">हिन्दी</option>
            </select>
          </div>

          {/* Countdown Clock */}
          <button
            id="exam-countdown-timer-btn"
            onClick={() => {
              if (isLowTime) setShowFiveMinWarningModal(true);
            }}
            title={isLowTime ? 'Click to view 5-minute time warning details' : 'Time remaining'}
            className={`flex items-center space-x-2 px-3 py-1 rounded font-mono font-bold text-xs sm:text-sm transition ${
              isLowTime
                ? 'bg-rose-900/80 text-rose-200 animate-pulse border border-rose-600 hover:bg-rose-900 cursor-pointer'
                : 'bg-slate-800 text-emerald-400 border border-slate-700 cursor-default'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Time Left: {formatTime(secondsRemaining)}</span>
          </button>
        </div>
      </header>

      {/* 2. Section Tabs Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-xs overflow-x-auto shadow-2xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-600 uppercase text-[11px]">Sections:</span>
          {test.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionId(sec.id)}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition ${
                activeSectionId === sec.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {examLanguage === 'hi' ? sec.nameHi : sec.nameEn} ({sec.questionCount} Qs)
            </button>
          ))}
        </div>

        <div id="exam-autosave-status-badge" className="text-[11px] text-slate-600 font-medium flex items-center space-x-1.5 hidden sm:flex">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>Local Auto-Save (30s): <strong className="text-slate-800 font-mono">{lastSavedTime}</strong></span>
        </div>
      </div>

      {/* 2b. 5-Minute Low-Time Persistent Warning Banner */}
      {isLowTime && secondsRemaining > 0 && (
        <div
          id="five-min-warning-banner"
          className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-950 animate-in fade-in"
        >
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-bold text-rose-900">
              {examLanguage === 'hi' ? '5-मिनट चेतावनी:' : '5-Minute Warning:'}
            </span>
            <span className="text-slate-800 hidden sm:inline">
              {examLanguage === 'hi'
                ? `सत्र में केवल ${formatTime(secondsRemaining)} शेष हैं। परीक्षा 00:00 पर स्वतः सबमिट हो जाएगी।`
                : `Only ${formatTime(secondsRemaining)} remaining in this session. Exam will auto-submit at 00:00.`}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="view-warning-details-btn"
              onClick={() => setShowFiveMinWarningModal(true)}
              className="text-[11px] font-bold text-amber-900 underline hover:text-amber-700 cursor-pointer"
            >
              {examLanguage === 'hi' ? 'विवरण देखें' : 'View Warning'}
            </button>
            <button
              id="quick-submit-banner-btn"
              onClick={() => setShowSubmitModal(true)}
              className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] shadow-2xs transition cursor-pointer"
            >
              {examLanguage === 'hi' ? 'सबमिट करें' : 'Review & Submit'}
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Examination Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left 8-9 cols: Active Question Panel */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white p-4 sm:p-6 flex flex-col justify-between overflow-y-auto border-r border-slate-200">
          <div>
            {/* Question Header & Marking Scheme */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="font-black text-slate-900 text-base">
                  Question {currentQIndex + 1}
                </span>
                <span className="text-xs text-slate-500">of {questions.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 ml-2">
                  {currentQ.subjectName}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  +{currentQ.marksPositive}
                </span>
                <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold border border-rose-200">
                  -{currentQ.marksNegative}
                </span>
              </div>
            </div>

            {/* Question Content */}
            <div className="space-y-6 text-slate-900">
              <div className="text-sm sm:text-base font-medium leading-relaxed select-none whitespace-pre-line">
                {examLanguage === 'hi' ? currentQ.textHi : currentQ.textEn}
              </div>

              {/* 4 Options Grid */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((option) => {
                  const isChecked = answers[currentQ.id]?.selectedOption === option.key;
                  return (
                    <label
                      key={option.key}
                      onClick={() => handleSelectOption(option.key)}
                      className={`flex items-start space-x-3 p-3.5 rounded-xl border transition cursor-pointer select-none ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-600'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold ${
                          isChecked
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 bg-white text-slate-600'
                        }`}
                      >
                        {option.key}
                      </div>
                      <div className="text-xs sm:text-sm pt-0.5 leading-normal">
                        {examLanguage === 'hi' ? option.textHi : option.textEn}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Interactive Action Toolbar */}
          <div className="pt-6 border-t border-slate-200 mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2 rounded-lg border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold flex items-center space-x-1.5 transition active:scale-95"
              >
                <Bookmark className="w-3.5 h-3.5 text-purple-700" />
                <span>Mark for Review & Next</span>
              </button>

              <button
                onClick={handleClearResponse}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center space-x-1 transition active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={currentQIndex === 0}
                onClick={() => navigateToQuestion(currentQIndex - 1)}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm shadow-emerald-700/30 transition active:scale-95"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 3-4 cols: Question Status Palette & Profile Bar */}
        <div className="lg:col-span-4 xl:col-span-3 bg-slate-50 p-4 border-t lg:border-t-0 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Candidate Card */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                AS
              </div>
              <div className="text-left">
                <div className="font-bold text-xs text-slate-900">Aarav Sharma</div>
                <div className="text-[10px] text-slate-500 font-mono">Roll: SK-2026-8420</div>
              </div>
            </div>

            {/* Legend Stats Grid */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 text-[11px]">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] border-b border-slate-100 pb-1">
                Question Palette Legend
              </div>
              <div className="grid grid-cols-2 gap-2 font-medium">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {stats.ANSWERED + stats.ANSWERED_MARKED}
                  </span>
                  <span className="text-slate-700">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {stats.NOT_ANSWERED}
                  </span>
                  <span className="text-slate-700">Not Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {stats.MARKED_REVIEW}
                  </span>
                  <span className="text-slate-700">Marked Review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center border border-slate-300">
                    {stats.NOT_VISITED}
                  </span>
                  <span className="text-slate-700">Not Visited</span>
                </div>
              </div>
            </div>

            {/* Questions Number Grid */}
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-2.5">
                Choose a Question
              </div>
              <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const status = getQuestionStatus(q.id);
                  const isCurrent = idx === currentQIndex;

                  let colorClass = 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200';
                  if (status === 'ANSWERED') colorClass = 'bg-emerald-600 text-white font-bold';
                  if (status === 'NOT_ANSWERED') colorClass = 'bg-rose-600 text-white font-bold';
                  if (status === 'MARKED_REVIEW') colorClass = 'bg-purple-600 text-white font-bold';
                  if (status === 'ANSWERED_MARKED') colorClass = 'bg-purple-700 text-white font-bold ring-2 ring-emerald-400';

                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateToQuestion(idx)}
                      className={`h-8 rounded text-xs transition relative font-mono ${colorClass} ${
                        isCurrent ? 'ring-2 ring-indigo-700 ring-offset-1 scale-105 z-10' : ''
                      }`}
                      title={`Q${idx + 1}: ${status}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Final Submit CTA Button */}
          <div className="pt-4 border-t border-slate-200 mt-4 space-y-2">
            <button
              id="open-submit-modal-btn"
              onClick={() => setShowSubmitModal(true)}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition active:scale-98 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-indigo-400" />
              <span>Submit Examination</span>
            </button>
            <button
              onClick={onCancelExam}
              className="w-full text-slate-500 hover:text-slate-800 text-[11px] font-medium py-1 text-center"
            >
              Exit without saving
            </button>
          </div>
        </div>
      </div>

      {/* 4. Anti-Accidental Final Submit Confirmation Modal (Section 10) */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center space-x-3 text-amber-600">
              <ShieldAlert className="w-7 h-7" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Confirm Exam Submission</h3>
                <p className="text-xs text-slate-500">Please review your attempt statistics before final submit</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 bg-white rounded border border-slate-100">
                <span className="text-slate-500 text-[11px]">Total Questions:</span>
                <div className="font-bold text-slate-900 text-sm">{questions.length}</div>
              </div>
              <div className="p-2 bg-emerald-50 rounded border border-emerald-100 text-emerald-900">
                <span className="text-emerald-700 text-[11px]">Answered:</span>
                <div className="font-bold text-emerald-800 text-sm">
                  {stats.ANSWERED + stats.ANSWERED_MARKED}
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded border border-purple-100 text-purple-900">
                <span className="text-purple-700 text-[11px]">Marked for Review:</span>
                <div className="font-bold text-purple-800 text-sm">{stats.MARKED_REVIEW}</div>
              </div>
              <div className="p-2 bg-rose-50 rounded border border-rose-100 text-rose-900">
                <span className="text-rose-700 text-[11px]">Not Answered:</span>
                <div className="font-bold text-rose-800 text-sm">
                  {stats.NOT_ANSWERED + stats.NOT_VISITED}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Once submitted, you cannot change your responses. The central scoring engine will calculate your accuracy, percentile, and negative marking immediately.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
              >
                Resume Exam
              </button>
              <button
                id="confirm-submit-exam-btn"
                disabled={isSubmitting}
                onClick={() => handleFinalSubmit(false)}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting ? <span>Scoring Attempt...</span> : <span>Confirm Submission</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. 5-Minute Time Remaining Warning Notification (Section 10 Compliance) */}
      {showFiveMinWarningModal && (
        <div
          id="five-min-warning-modal-backdrop"
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            id="five-min-warning-notification"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="five-min-warning-title"
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-500/40 space-y-5 animate-in zoom-in-95"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0 shadow-xs">
                  <BellRing className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-black text-[10px] uppercase tracking-wider border border-rose-200">
                      URGENT NOTICE
                    </span>
                  </div>
                  <h3 id="five-min-warning-title" className="text-base font-black text-slate-900 mt-0.5">
                    {examLanguage === 'hi'
                      ? 'समय चेतावनी: केवल 5 मिनट शेष!'
                      : 'Time Warning: Only 5 Minutes Remaining!'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {examLanguage === 'hi'
                      ? 'सक्रिय परीक्षा सत्र समाप्ति की ओर है'
                      : 'Active test session is approaching the deadline'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFiveMinWarningModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Countdown Badge */}
            <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 flex items-center justify-between text-amber-950">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                <span className="text-xs font-semibold">
                  {examLanguage === 'hi' ? 'शेष परीक्षा समय:' : 'Time Left in Exam:'}
                </span>
              </div>
              <span className="font-mono font-black text-base sm:text-lg text-rose-700 bg-white px-2.5 py-0.5 rounded border border-amber-300 shadow-2xs">
                {formatTime(secondsRemaining)}
              </span>
            </div>

            {/* Advisory Notes */}
            <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <p className="font-medium">
                {examLanguage === 'hi'
                  ? 'कृपया ध्यान दें: परीक्षा 00:00 होते ही स्वतः समाप्त होकर सबमिट हो जाएगी। अंतिम सबमिशन से पूर्व सुनिश्चित करें कि आपके सभी उत्तर सहेजे गए हैं।'
                  : 'Important: The exam will automatically close and submit when the timer reaches 00:00. Please ensure all your responses are saved before time expires.'}
              </p>
              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-600 border-t border-slate-200">
                <span>
                  <strong>Answered:</strong> {stats.ANSWERED + stats.ANSWERED_MARKED}
                </span>
                <span>
                  <strong>Marked:</strong> {stats.MARKED_REVIEW}
                </span>
                <span>
                  <strong>Unanswered:</strong> {stats.NOT_ANSWERED + stats.NOT_VISITED}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-1">
              <button
                id="dismiss-five-min-warning-btn"
                onClick={() => setShowFiveMinWarningModal(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition shadow-2xs cursor-pointer text-center"
              >
                {examLanguage === 'hi' ? 'समझ गया, परीक्षा जारी रखें' : 'Acknowledge & Continue'}
              </button>
              <button
                id="review-from-five-min-warning-btn"
                onClick={() => {
                  setShowFiveMinWarningModal(false);
                  setShowSubmitModal(true);
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{examLanguage === 'hi' ? 'समीक्षा और सबमिट' : 'Review & Submit'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Milestone Intermission Ad Modal (Non-Skippable 5s Countdown, Exam Clock Paused) */}
      {showMilestoneAdModal && (
        <div
          id="milestone-intermission-ad-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-indigo-500/30 space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px] tracking-wide uppercase">
                      Mid-Exam Intermission
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] tracking-wide uppercase">
                      Mandatory Sponsor Break
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    {examLanguage === 'hi'
                      ? 'परीक्षा मध्यंतर प्रायोजक विज्ञापन'
                      : 'Milestone Intermission (Verified Educational Sponsor)'}
                  </h3>
                </div>
              </div>
            </div>

            {/* Exam clock paused banner */}
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 flex items-center space-x-2.5 text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Official exam clock is frozen.</strong> You will not lose any examination time during this brief sponsor intermission.
              </span>
            </div>

            {/* Clean Educational Sponsor Card */}
            <div className="border border-slate-200 rounded-xl p-4 bg-gradient-to-br from-slate-50 to-indigo-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                  Books & Study Materials
                </span>
                <span className="text-[10px] font-semibold text-indigo-700 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Safe Network</span>
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  Arihant 10,000+ Topic-Wise Solved Papers (2015-2026 Editions)
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Comprehensive bilingual question bank for Banking PO/Clerk, SSC CGL & State PSC with shortcut solutions, speed test modules, and QR video lectures.
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Flat 40% Off for SKTECH Candidates
                </span>
                <button
                  onClick={() => {
                    api.trackAdEvent('camp_ecom_01', 'CLICK').catch(console.error);
                    window.open('https://www.flipkart.com/books', '_blank', 'noopener,noreferrer');
                  }}
                  className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Explore Catalog</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Policy & Countdown footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400 text-center sm:text-left">
                Strict Policy: Clean education only. Adult/gambling strictly blocked.
              </span>
              <button
                id="milestone-ad-continue-btn"
                disabled={milestoneAdCountdown > 0}
                onClick={() => setShowMilestoneAdModal(false)}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md ${
                  milestoneAdCountdown > 0
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-emerald-600/30'
                }`}
              >
                {milestoneAdCountdown > 0 ? (
                  <span>Resuming test in {milestoneAdCountdown}s...</span>
                ) : (
                  <>
                    <span>Continue Examination</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
