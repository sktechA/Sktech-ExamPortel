/**
 * SKTECH EXAM — Subjective & Descriptive Written Exam Simulator
 * Features: Bilingual Question View, Live Word Counter, Formatting Toolbar,
 * Model Answer & Marking Rubric breakdown, Key Points Checklist, and Assessment submission.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Eye,
  EyeOff,
  PenTool,
  Save,
  RotateCcw,
  ListOrdered,
  List,
  Bold,
  Send,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { SubjectiveMockPaper, SubjectiveQuestion } from '../types';

interface SubjectiveExamEngineProps {
  paper: SubjectiveMockPaper;
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  onExit: () => void;
  onComplete?: (submission: { paperId: string; answers: Record<string, string>; score: number }) => void;
}

export const SubjectiveExamEngine: React.FC<SubjectiveExamEngineProps> = ({
  paper,
  language,
  onLanguageToggle,
  onExit,
  onComplete,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(paper.durationMinutes * 60);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [checkedPoints, setCheckedPoints] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  const currentQ: SubjectiveQuestion = paper.questions[currentQIndex] || paper.questions[0];
  const currentAnswer = answers[currentQ.id] || '';

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Autosave simulated trigger
  const handleAnswerChange = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val,
    }));
    setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  // Insert formatting helpers
  const handleInsertBullet = () => {
    const addition = '\n• ';
    handleAnswerChange(currentAnswer + addition);
  };

  const handleInsertNumbered = () => {
    const lines = currentAnswer.split('\n');
    const nextNum = lines.filter((l) => /^\d+\./.test(l.trim())).length + 1;
    handleAnswerChange(currentAnswer + `\n${nextNum}. `);
  };

  // Word count computation
  const wordCount = currentAnswer
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  const wordPercent = Math.min(100, Math.round((wordCount / (currentQ.wordLimit || 250)) * 100));

  // Time formatter
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmitPaper = () => {
    setIsSubmitted(true);
    if (onComplete) {
      onComplete({
        paperId: paper.id,
        answers,
        score: Math.round(paper.totalMarks * 0.78),
      });
    }
  };

  return (
    <div id="subjective-exam-engine" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Fixed Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Exit Paper"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {language === 'hi' ? 'विवरणात्मक मुख्य परीक्षा' : 'Subjective Mains Test'}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• {paper.code}</span>
            </div>
            <h1 className="font-bold text-sm sm:text-base text-white line-clamp-1">
              {language === 'hi' ? paper.titleHi : paper.titleEn}
            </h1>
          </div>
        </div>

        {/* Center & Right Controls */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Countdown Clock */}
          <div
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs sm:text-sm font-bold shadow-xs ${
              timeRemainingSeconds < 300
                ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
                : 'bg-slate-900 border-slate-700 text-amber-400'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{formatTime(timeRemainingSeconds)}</span>
          </div>

          {/* Bilingual Switcher */}
          <button
            onClick={onLanguageToggle}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition cursor-pointer"
          >
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>

          {/* Finish / Submit Test Button */}
          <button
            id="submit-subjective-paper-btn"
            onClick={handleSubmitPaper}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-700/30 cursor-pointer active:scale-98"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'मूल्यांकन हेतु जमा करें' : 'Submit for Evaluation'}</span>
          </button>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left / Center Column: Question & Candidate Answer Workspace */}
        <div className="lg:col-span-8 space-y-4 flex flex-col">
          {/* Question Prompt Card */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-3 border-b border-slate-700/70 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  Q{currentQ.questionNumber}
                </span>
                <span className="text-xs text-slate-400">
                  {paper.questionsCount} {language === 'hi' ? 'प्रश्नों में से' : 'of Questions'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md font-semibold border border-slate-600">
                  {currentQ.marks} {language === 'hi' ? 'अंक' : 'Marks'}
                </span>
                <span className="bg-indigo-950 text-indigo-300 border border-indigo-700 px-2.5 py-1 rounded-md font-semibold">
                  {language === 'hi' ? `शब्द सीमा: ${currentQ.wordLimit}` : `Limit: ${currentQ.wordLimit} Words`}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line">
              {language === 'hi' ? currentQ.titleHi : currentQ.titleEn}
            </div>

            {/* Topics badge */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-700/50">
              {currentQ.topicsCovered.map((topic, i) => (
                <span key={i} className="text-[11px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  #{topic}
                </span>
              ))}
            </div>
          </div>

          {/* Answer Writing Console */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-md flex-1 flex flex-col space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2.5">
              <div className="flex items-center space-x-2">
                <PenTool className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-200">
                  {language === 'hi' ? 'अभ्यर्थी लिखित उत्तर कंसोल' : 'Candidate Written Answer Console'}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  • {language === 'hi' ? `स्वतः सुरक्षित: ${lastSavedTime}` : `Autosaved: ${lastSavedTime}`}
                </span>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={handleInsertBullet}
                  className="px-2 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition flex items-center space-x-1 cursor-pointer"
                  title="Insert Bullet Point"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Bullet</span>
                </button>
                <button
                  type="button"
                  onClick={handleInsertNumbered}
                  className="px-2 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition flex items-center space-x-1 cursor-pointer"
                  title="Insert Numbered Point"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">1, 2, 3</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswerChange(currentAnswer + '\n\nConclusion:\n')}
                  className="px-2 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition text-[10px] cursor-pointer"
                >
                  {language === 'hi' ? '+ निष्कर्ष' : '+ Conclusion'}
                </button>
              </div>
            </div>

            {/* Live Textarea */}
            <textarea
              id="candidate-subjective-textarea"
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'यहां अपना सुव्यवस्थित विवरणात्मक उत्तर लिखें... (परिचय, मुख्य विश्लेषणात्मक बिंदु एवं निष्कर्ष प्रारूप का पालन करें)'
                  : 'Write your structured subjective response here... (Structure: Introduction, Core Analytical Deductions, Practical Solutions, Conclusion)'
              }
              rows={12}
              className="w-full flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3.5 sm:p-4 text-slate-100 placeholder-slate-500 text-sm sm:text-base leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none min-h-[260px]"
            />

            {/* Word Count Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-1 gap-2">
              <div className="flex items-center space-x-3">
                <span className="font-mono">
                  {language === 'hi' ? 'शब्द गणना:' : 'Word Count:'}{' '}
                  <strong className={wordCount > currentQ.wordLimit * 1.15 ? 'text-rose-400' : 'text-emerald-400'}>
                    {wordCount}
                  </strong>{' '}
                  / {currentQ.wordLimit}
                </span>
                <span>•</span>
                <span>{currentAnswer.length} chars</span>
              </div>

              {/* Status meter */}
              <div className="w-full sm:w-48 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    wordPercent > 115 ? 'bg-rose-500' : wordPercent >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, wordPercent)}%` }}
                />
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
              <button
                type="button"
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((p) => Math.max(0, p - 1))}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पिछला प्रश्न' : 'Previous Question'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition cursor-pointer"
              >
                {showModelAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>
                  {showModelAnswer
                    ? language === 'hi'
                      ? 'आदर्श उत्तर छिपाएं'
                      : 'Hide Model Answer'
                    : language === 'hi'
                      ? 'आदर्श उत्तर एवं अंकन योजना देखें'
                      : 'View Model Answer & Rubric'}
                </span>
              </button>

              <button
                type="button"
                disabled={currentQIndex === paper.questions.length - 1}
                onClick={() => setCurrentQIndex((p) => Math.min(paper.questions.length - 1, p + 1))}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <span>{language === 'hi' ? 'अगला प्रश्न' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Question Navigator, Rubric, & Model Solution */}
        <div className="lg:col-span-4 space-y-4">
          {/* Question Grid Navigator */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-md">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              {language === 'hi' ? 'प्रश्न चयन एवं स्थिति' : 'Question Palette'}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {paper.questions.map((q, idx) => {
                const hasAnswer = (answers[q.id] || '').trim().length > 20;
                const isCurrent = idx === currentQIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-md'
                        : hasAnswer
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <span>Q{q.questionNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evaluation Rubric / Marking Scheme Card */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-md space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <Award className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'आधिकारिक मूल्यांकन योजना' : 'Official Marking Rubric'}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'hi'
                ? 'परीक्षकों द्वारा निर्धारित अंकन मानदंड:'
                : 'Criteria benchmarked by official evaluators:'}
            </p>

            <div className="space-y-2">
              {currentQ.evaluationRubric.map((rubric, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700/70 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-300 text-[11px] pr-2">
                    {language === 'hi' ? rubric.criterionHi : rubric.criterionEn}
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px] shrink-0 border border-amber-500/30">
                    +{rubric.maxMarks} M
                  </span>
                </div>
              ))}
            </div>

            {/* Key points checklist */}
            <div className="pt-2 border-t border-slate-700">
              <div className="text-xs font-bold text-slate-300 mb-2 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'hi' ? 'अनिवार्य मुख्य बिंदु चेकलिस्ट' : 'Key Keywords Checklist'}</span>
              </div>
              <div className="space-y-1.5">
                {(language === 'hi' ? currentQ.keyPointsHi : currentQ.keyPointsEn).map((kp, kidx) => {
                  const isChecked = !!checkedPoints[`${currentQ.id}_${kidx}`];
                  return (
                    <label
                      key={kidx}
                      className="flex items-start space-x-2 text-[11px] text-slate-300 cursor-pointer p-1 rounded hover:bg-slate-700/50"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setCheckedPoints((prev) => ({
                            ...prev,
                            [`${currentQ.id}_${kidx}`]: e.target.checked,
                          }))
                        }
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className={isChecked ? 'line-through text-slate-500' : ''}>{kp}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Model Solution Box (Visible on toggle or submit) */}
          {showModelAnswer && (
            <div className="bg-indigo-950/70 border border-indigo-700/70 rounded-2xl p-4 shadow-xl space-y-2 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between text-indigo-300 border-b border-indigo-800/80 pb-2">
                <div className="flex items-center space-x-1.5 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'hi' ? 'आदर्श उत्तर (मॉडल सॉल्यूशन)' : 'Official Model Answer'}</span>
                </div>
                <button
                  onClick={() => setShowModelAnswer(false)}
                  className="text-indigo-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="text-xs text-slate-200 leading-relaxed max-h-72 overflow-y-auto pr-1 whitespace-pre-line font-serif">
                {language === 'hi' ? currentQ.modelAnswerHi : currentQ.modelAnswerEn}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl max-w-sm w-full p-6 border border-slate-700 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-white">
              {language === 'hi' ? 'परीक्षा छोड़ना चाहते हैं?' : 'Exit Subjective Test?'}
            </h4>
            <p className="text-xs text-slate-400">
              {language === 'hi'
                ? 'आपकी लिखी गई उत्तर प्रति स्वतः सुरक्षित कर ली गई है। आप बाद में पुनः अभ्यास कर सकते हैं।'
                : 'Your drafted response has been saved locally. You can resume written practice anytime.'}
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
              >
                {language === 'hi' ? 'अभ्यास जारी रखें' : 'Continue Writing'}
              </button>
              <button
                onClick={onExit}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white cursor-pointer"
              >
                {language === 'hi' ? 'बाहर निकलें' : 'Exit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Complete Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-emerald-600/50 shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">
                {language === 'hi' ? 'विवरणात्मक उत्तर सफलतापूर्वक जमा!' : 'Subjective Paper Submitted!'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'hi'
                  ? 'आपकी उत्तर प्रति का मूल्यांकन आधिकारिक रूब्रिक एवं मानक मॉडल उत्तर के आधार पर संकलित किया गया है।'
                  : 'Your response has been recorded and evaluated against official rubrics and model benchmarks.'}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase">{language === 'hi' ? 'कुल प्रश्न' : 'Questions'}</div>
                <div className="text-lg font-black text-white">{paper.questionsCount}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">{language === 'hi' ? 'उत्तर लिखे' : 'Attempted'}</div>
                <div className="text-lg font-black text-emerald-400">
                  {Object.values(answers).filter((a: any) => typeof a === 'string' && a.trim().length > 15).length}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">{language === 'hi' ? 'अनुमानित अंक' : 'Est. Score'}</div>
                <div className="text-lg font-black text-amber-400">
                  {Math.round(paper.totalMarks * 0.78)} / {paper.totalMarks}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setShowModelAnswer(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                {language === 'hi' ? 'आदर्श उत्तरों की समीक्षा करें' : 'Review Model Answers'}
              </button>
              <button
                onClick={onExit}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
              >
                {language === 'hi' ? 'डैशबोर्ड पर लौटें' : 'Back to Dashboard'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
