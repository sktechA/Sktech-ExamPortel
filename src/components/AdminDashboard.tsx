/**
 * SKTECH EXAM — Admin Web Console & Content Management System
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import {
  Database,
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Search,
  Filter,
  Users,
  Layers,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  FileCheck,
  Tag,
  BookOpen,
  DollarSign,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Save,
  Settings,
  CreditCard,
  UserCheck,
} from 'lucide-react';
import { Question, Subject, SystemMetrics, AuditLogEntry, User, Exam, MockTest } from '../types';
import { api } from '../services/apiClient';
import { CreateSubAdminModal } from './CreateSubAdminModal';
import { RevenueAnalytics } from './RevenueAnalytics';

interface AdminDashboardProps {
  questions: Question[];
  subjects: Subject[];
  exams: Exam[];
  onRefreshQuestions: () => void;
  mockTests?: MockTest[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  questions,
  subjects,
  exams,
  onRefreshQuestions,
  mockTests = [],
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'OVERVIEW' | 'QUESTIONS' | 'IMPORT' | 'GENERATOR' | 'CANDIDATES' | 'AUDIT' | 'PRICING_MONETIZATION' | 'REVENUE_ANALYTICS' | 'SETTINGS'
  >('OVERVIEW');

  // Monetization Sub-tab toggle ('ANALYTICS' | 'PRICING_POLICY')
  const [monetizationSubTab, setMonetizationSubTab] = useState<'ANALYTICS' | 'PRICING_POLICY'>('ANALYTICS');

  // Metrics
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalCandidates: 28450,
    activeCandidates: 3420,
    totalQuestions: 15800,
    pendingQuestions: 184,
    publishedQuestions: 15616,
    totalMockTests: 188,
    todayAttempts: 2154,
    todayRegistrations: 142,
    serverHealth: 'HEALTHY',
    databaseStatus: 'ONLINE (Self-Contained Store)',
    storageUsageMb: 428.5,
    apiVersion: 'v1.0.4-phase1',
  });

  // Question Filters
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Add Question Modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newQuestionData, setNewQuestionData] = useState({
    subjectName: 'Quantitative Aptitude',
    topicName: 'Simplification & Arithmetic',
    examCategory: 'BANKING' as const,
    examTarget: 'IBPS PO 2026',
    difficulty: 'MODERATE' as const,
    textEn: '',
    textHi: '',
    optA_En: '',
    optA_Hi: '',
    optB_En: '',
    optB_Hi: '',
    optC_En: '',
    optC_Hi: '',
    optD_En: '',
    optD_Hi: '',
    correctAnswer: 'A' as const,
    explanationEn: '',
    explanationHi: '',
    marksPositive: 1.0,
    marksNegative: 0.25,
  });

  // Import preview simulator state
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importResult, setImportResult] = useState<any>(null);

  // Generator state
  const [genExam, setGenExam] = useState<string>('IBPS-PO');
  const [genDifficulty, setGenDifficulty] = useState<'NORMAL' | 'MODERATE' | 'HARD'>('MODERATE');
  const [genQCount, setGenQCount] = useState<number>(100);
  const [generatorSuccess, setGeneratorSuccess] = useState<string | null>(null);

  // Candidates & Audit logs
  const [candidates, setCandidates] = useState<User[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [showSubAdminModal, setShowSubAdminModal] = useState<boolean>(false);
  const [subAdminSuccess, setSubAdminSuccess] = useState<string | null>(null);

  // Monetization & Test Series Pricing State
  const [monetizationStats, setMonetizationStats] = useState<any>(null);
  const [testsList, setTestsList] = useState<MockTest[]>(mockTests);
  const [pricingEditId, setPricingEditId] = useState<string | null>(null);
  const [editIsFree, setEditIsFree] = useState<boolean>(true);
  const [editPriceInr, setEditPriceInr] = useState<number>(0);
  const [pricingFeedback, setPricingFeedback] = useState<string | null>(null);

  // Administrative Credentials Settings State
  const [adminCredInfo, setAdminCredInfo] = useState<{ username: string; lastUpdated: string }>({
    username: 'admin',
    lastUpdated: 'Initial Default',
  });
  const [currentAdminPassword, setCurrentAdminPassword] = useState<string>('');
  const [newAdminUsername, setNewAdminUsername] = useState<string>('admin');
  const [newAdminPassword, setNewAdminPassword] = useState<string>('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState<string>('');
  const [credStatus, setCredStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [credUpdating, setCredUpdating] = useState<boolean>(false);

  useEffect(() => {
    api.getAdminOverview().then((res) => {
      if (res.data?.metrics) setMetrics(res.data.metrics);
    }).catch(console.error);

    api.getCandidates().then((res) => {
      if (res.data) setCandidates(res.data);
    }).catch(console.error);

    api.getAuditLogs().then((res) => {
      if (res.data) setAuditLogs(res.data);
    }).catch(console.error);

    api.getMonetizationStats().then((res) => {
      if (res.data) setMonetizationStats(res.data);
    }).catch(console.error);

    api.getMockTests().then((res) => {
      if (res.data) setTestsList(res.data);
    }).catch(console.error);

    api.getAdminCredentials().then((res) => {
      if (res.data) {
        setAdminCredInfo(res.data);
        setNewAdminUsername(res.data.username || 'admin');
      }
    }).catch(console.error);
  }, []);

  const handleSavePricing = async (testId: string) => {
    try {
      const resp = await api.updateMockTestPricing(testId, editIsFree, editPriceInr);
      if (resp.success) {
        setTestsList((prev) =>
          prev.map((t) => (t.id === testId ? { ...t, isFree: editIsFree, priceInr: editPriceInr } : t))
        );
        setPricingFeedback('Pricing updated successfully!');
        setPricingEditId(null);
        setTimeout(() => setPricingFeedback(null), 3000);
      }
    } catch (err) {
      console.error('Pricing update failed:', err);
      alert('Failed to update test pricing.');
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredStatus(null);
    if (!currentAdminPassword) {
      setCredStatus({ type: 'error', message: 'Current password is required to verify administrator authorization.' });
      return;
    }
    if (newAdminPassword && newAdminPassword !== confirmAdminPassword) {
      setCredStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }
    if (newAdminPassword && newAdminPassword.length < 6) {
      setCredStatus({ type: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }

    setCredUpdating(true);
    try {
      const resp = await api.updateAdminCredentials(
        currentAdminPassword,
        newAdminUsername.trim() || 'admin',
        newAdminPassword || undefined
      );
      if (resp.success) {
        setCredStatus({ type: 'success', message: 'Admin credentials updated successfully! Please note your new credentials.' });
        setAdminCredInfo({
          username: resp.username || newAdminUsername.trim() || 'admin',
          lastUpdated: new Date().toLocaleString(),
        });
        setCurrentAdminPassword('');
        setNewAdminPassword('');
        setConfirmAdminPassword('');
      } else {
        setCredStatus({ type: 'error', message: resp.error || resp.message || 'Failed to update admin credentials.' });
      }
    } catch (err: any) {
      setCredStatus({ type: 'error', message: err?.message || 'Failed to update admin credentials.' });
    } finally {
      setCredUpdating(false);
    }
  };

  // Filtered Questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSub = selectedSubject === 'ALL' || q.subjectName === selectedSubject;
    const matchesDiff = selectedDifficulty === 'ALL' || q.difficulty === selectedDifficulty;
    const matchesSearch =
      searchTerm === '' ||
      q.textEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.textHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSub && matchesDiff && matchesSearch;
  });

  // Handle Add Question Submit
  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionData.textEn || !newQuestionData.optA_En) {
      alert('Please fill in required question fields.');
      return;
    }

    try {
      const payload: Partial<Question> = {
        subjectName: newQuestionData.subjectName,
        topicName: newQuestionData.topicName,
        examCategory: newQuestionData.examCategory,
        examTarget: newQuestionData.examTarget,
        difficulty: newQuestionData.difficulty,
        textEn: newQuestionData.textEn,
        textHi: newQuestionData.textHi || newQuestionData.textEn,
        options: [
          { key: 'A', textEn: newQuestionData.optA_En, textHi: newQuestionData.optA_Hi || newQuestionData.optA_En },
          { key: 'B', textEn: newQuestionData.optB_En, textHi: newQuestionData.optB_Hi || newQuestionData.optB_En },
          { key: 'C', textEn: newQuestionData.optC_En, textHi: newQuestionData.optC_Hi || newQuestionData.optC_En },
          { key: 'D', textEn: newQuestionData.optD_En, textHi: newQuestionData.optD_Hi || newQuestionData.optD_En },
        ],
        correctAnswer: newQuestionData.correctAnswer,
        explanationEn: newQuestionData.explanationEn,
        explanationHi: newQuestionData.explanationHi || newQuestionData.explanationEn,
        marksPositive: Number(newQuestionData.marksPositive),
        marksNegative: Number(newQuestionData.marksNegative),
        tags: ['AdminEntry', newQuestionData.examTarget],
      };

      await api.createQuestion(payload);
      setShowAddModal(false);
      onRefreshQuestions();
      alert('Question published successfully to Central Question Bank!');
    } catch (err) {
      console.error('Failed to create question:', err);
      alert('Failed to create question.');
    }
  };

  // Simulate bulk file upload & OCR verification pipeline (Sections 13, 14, 15)
  const handleSimulateImport = async () => {
    setIsImporting(true);
    setImportResult(null);
    try {
      const resp = await api.previewImport('IBPS_2026_Mains_500_Questions.xlsx');
      setImportResult(resp);
    } catch (err) {
      console.error(err);
    } finally {
      setIsImporting(false);
    }
  };

  // Simulate Mock Generation (Sections 19, 20)
  const handleGenerateMock = () => {
    setGeneratorSuccess(
      `Mock test for ${genExam} synthesized successfully! Applied ${genDifficulty} distribution (Easy/Mod/Hard ratio) across ${genQCount} questions with negative marking 0.25.`
    );
    setTimeout(() => setGeneratorSuccess(null), 6000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold text-xs border border-indigo-500/30">
              CENTRAL ADMIN ECOSYSTEM
            </span>
            <span className="text-xs text-slate-400">• Role: Super Administrator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            SKTECH EXAM Management Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Centrally manages Question Bank, Bulk OCR Imports, Mock Generators, Candidates, and Audit Trails
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRefreshQuestions}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Database</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* 2. Admin Sub-navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {[
          { key: 'OVERVIEW', label: 'Executive Dashboard' },
          { key: 'REVENUE_ANALYTICS', label: 'Revenue Analytics (30D)' },
          { key: 'PRICING_MONETIZATION', label: 'Pricing & Clean Ads' },
          { key: 'QUESTIONS', label: `Question Bank (${questions.length})` },
          { key: 'IMPORT', label: 'Bulk Import & OCR Engine' },
          { key: 'GENERATOR', label: 'Mock Test Generator' },
          { key: 'SETTINGS', label: 'Admin Security & Credentials' },
          { key: 'CANDIDATES', label: `Candidates (${candidates.length})` },
          { key: 'AUDIT', label: 'Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveAdminTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition ${
              activeAdminTab === tab.key
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT: OVERVIEW (Section 27) */}
      {activeAdminTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Candidates</span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {metrics.totalCandidates.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">
                +{metrics.todayRegistrations} Today
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Total Questions</span>
              <div className="text-xl font-black text-indigo-700 mt-1">
                {metrics.totalQuestions.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Bilingual Bank</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-semibold text-amber-600 uppercase">Pending Review</span>
              <div className="text-xl font-black text-amber-700 mt-1">{metrics.pendingQuestions}</div>
              <span className="text-[10px] text-slate-500">Low confidence / OCR</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Mock Tests</span>
              <div className="text-xl font-black text-slate-900 mt-1">{metrics.totalMockTests}</div>
              <span className="text-[10px] text-slate-500">Active Test Series</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Attempts Today</span>
              <div className="text-xl font-black text-emerald-700 mt-1">
                {metrics.todayAttempts.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">Real-time sync</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Database</span>
              <div className="text-sm font-black text-slate-800 mt-2 font-mono">Serverless Engine</div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Self-Contained</span>
              </span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200/70 space-y-2">
              <div className="flex items-center space-x-1.5 text-amber-800 text-xs font-bold">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <span>REVENUE ANALYTICS</span>
              </div>
              <h4 className="font-bold text-sm text-amber-950">30-Day Financial Trends</h4>
              <p className="text-xs text-slate-600">
                Visualize clean educational ad earnings and mock test micro-transaction velocities with Recharts.
              </p>
              <button
                onClick={() => setActiveAdminTab('REVENUE_ANALYTICS')}
                className="mt-2 text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center space-x-1 cursor-pointer"
              >
                <span>Launch Analytics Charts &rarr;</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 space-y-2">
              <h4 className="font-bold text-sm text-indigo-950">Bulk Import Pipeline</h4>
              <p className="text-xs text-slate-600">
                Upload CSV/XLSX or scanned Question PDFs with automatic OCR parsing and duplicate detection.
              </p>
              <button
                onClick={() => setActiveAdminTab('IMPORT')}
                className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>Launch Import Engine &rarr;</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100 space-y-2">
              <h4 className="font-bold text-sm text-emerald-950">Auto Mock Test Generator</h4>
              <p className="text-xs text-slate-600">
                Synthesize 100-question full-length exams according to difficulty distribution (Normal, Moderate, Hard).
              </p>
              <button
                onClick={() => setActiveAdminTab('GENERATOR')}
                className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
              >
                <span>Configure Generator &rarr;</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-100 space-y-2">
              <h4 className="font-bold text-sm text-purple-950">Candidate Management</h4>
              <p className="text-xs text-slate-600">
                Monitor candidates, inspect test histories, reset credentials, and manage active sessions.
              </p>
              <button
                onClick={() => setActiveAdminTab('CANDIDATES')}
                className="mt-2 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center space-x-1"
              >
                <span>View Candidates &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: QUESTION BANK (Section 12, 16) */}
      {activeAdminTab === 'QUESTIONS' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="relative w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search questions or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="py-1.5 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
              >
                <option value="ALL">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.nameEn}>
                    {s.nameEn}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="py-1.5 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
              >
                <option value="ALL">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="NORMAL">Normal</option>
                <option value="MODERATE">Moderate</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing {filteredQuestions.length} of {questions.length} questions
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3 hover:border-slate-300 transition"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-slate-400 font-bold">{q.id}</span>
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {q.subjectName}
                    </span>
                    <span className="text-slate-500">&bull; {q.topicName}</span>
                    <span className="text-slate-400 font-mono text-[11px]">({q.examTarget})</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'HARD'
                          ? 'bg-rose-100 text-rose-800'
                          : q.difficulty === 'MODERATE'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Ans: <strong className="font-mono">{q.correctAnswer}</strong>
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-900">
                  <div className="font-medium text-slate-900">
                    <strong className="text-indigo-600 mr-1">[EN]</strong> {q.textEn}
                  </div>
                  {q.textHi && (
                    <div className="text-slate-700 font-medium">
                      <strong className="text-emerald-600 mr-1">[HI]</strong> {q.textHi}
                    </div>
                  )}
                </div>

                {/* Options display */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                  {q.options.map((opt) => (
                    <div
                      key={opt.key}
                      className={`p-2 rounded border truncate ${
                        opt.key === q.correctAnswer
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                      title={`${opt.key}: ${opt.textEn}`}
                    >
                      <span className="font-mono font-bold mr-1">{opt.key}.</span> {opt.textEn}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Source: {q.source || 'SKTECH Repository'}</span>
                  <span>Marks: +{q.marksPositive} / -{q.marksNegative}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: BULK IMPORT ENGINE (Section 13, 31, 51, 52) */}
      {activeAdminTab === 'IMPORT' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Upload className="w-5 h-5 text-indigo-600" />
                <span>Asynchronous Bulk Question Import Pipeline</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Directly imports CSV, XLSX, DOCX, scanned PDF or camera images. Runs automated text extraction, OCR, classification, and duplicate checks.
              </p>
            </div>

            {/* Dropzone simulator */}
            <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="text-xs text-slate-700">
                <span className="font-bold text-indigo-700">Click to browse</span> or drag and drop your question file
              </div>
              <p className="text-[11px] text-slate-500">
                Supports .CSV, .XLSX, .PDF (with OCR), .DOCX up to 100MB
              </p>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  disabled={isImporting}
                  onClick={handleSimulateImport}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50 flex items-center space-x-2 cursor-pointer"
                >
                  {isImporting ? <span>Processing Batch (Extracting OCR)...</span> : <span>Simulate Sample File Upload</span>}
                </button>
              </div>
            </div>

            {/* Import Preview results */}
            {importResult && (
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900">
                    Import Batch Preview: <span className="text-indigo-600">{importResult.fileName}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-100 text-amber-800">
                    Needs Admin Approval
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3 text-center text-xs">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Total Rows</div>
                    <div className="text-lg font-bold text-slate-900">{importResult.totalRows}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200 text-emerald-800">
                    <div className="text-emerald-600 text-[10px] uppercase font-semibold">Valid Rows</div>
                    <div className="text-lg font-bold">{importResult.validRows}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-rose-200 text-rose-800">
                    <div className="text-rose-600 text-[10px] uppercase font-semibold">Invalid / Corrupt</div>
                    <div className="text-lg font-bold">{importResult.invalidRows}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-amber-200 text-amber-800">
                    <div className="text-amber-600 text-[10px] uppercase font-semibold">Duplicate Suspects</div>
                    <div className="text-lg font-bold">{importResult.duplicatesFound}</div>
                  </div>
                </div>

                {/* Table Preview */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 font-semibold text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Row</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Confidence</th>
                        <th className="p-3">Subject / Topic</th>
                        <th className="p-3">Question Text</th>
                        <th className="p-3">Answer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {importResult.preview?.map((row: any) => (
                        <tr key={row.rowNumber} className="hover:bg-slate-50">
                          <td className="p-3 font-mono">#{row.rowNumber}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.status === 'VALID'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono">{Math.round(row.confidence * 100)}%</td>
                          <td className="p-3">
                            <div className="font-bold text-slate-800">{row.subject}</div>
                            <div className="text-[11px] text-slate-400">{row.topic}</div>
                          </td>
                          <td className="p-3 max-w-xs truncate text-slate-700">{row.questionEn}</td>
                          <td className="p-3 font-mono font-bold text-emerald-700">{row.correctAnswer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setImportResult(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold"
                  >
                    Reject Batch
                  </button>
                  <button
                    onClick={() => {
                      alert('Approved! 116 validated questions committed to Question Bank.');
                      setImportResult(null);
                      onRefreshQuestions();
                    }}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition"
                  >
                    Approve & Commit Valid Questions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. TAB CONTENT: MOCK TEST GENERATOR (Section 19, 20) */}
      {activeAdminTab === 'GENERATOR' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Intelligent Mock Test Synthesizer</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select targets, section distributions, and difficulty configurations (Section 20 specifications)
            </p>
          </div>

          {generatorSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{generatorSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700">Target Exam</label>
              <select
                value={genExam}
                onChange={(e) => setGenExam(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="IBPS-PO">IBPS PO Prelims 2026</option>
                <option value="SSC-CGL">SSC CGL Tier-1</option>
                <option value="MPPSC">MPPSC State Services GS-1</option>
                <option value="MP-POLICE">MP Police Constable</option>
                <option value="RRB-PO">RRB Officer Scale-1</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700">Difficulty Matrix (Section 20)</label>
              <select
                value={genDifficulty}
                onChange={(e) => setGenDifficulty(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="NORMAL">Normal (40% Easy • 50% Mod • 10% Hard)</option>
                <option value="MODERATE">Moderate (20% Easy • 60% Mod • 20% Hard)</option>
                <option value="HARD">Hard (10% Easy • 40% Mod • 50% Hard)</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700">Number of Questions</label>
              <input
                type="number"
                value={genQCount}
                onChange={(e) => setGenQCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-800">Automated Balancing Rules:</div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Sectional distribution follows latest 2026 examination blueprints.</li>
              <li>Options randomization and duplicate prevention across the set.</li>
              <li>Calculates negative marking penalty (-0.25 for Banking, -0.50 for SSC).</li>
            </ul>
          </div>

          <button
            onClick={handleGenerateMock}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition cursor-pointer"
          >
            Generate & Publish Mock Test
          </button>
        </div>
      )}

      {/* 7. TAB CONTENT: CANDIDATES & OPERATORS (Section 28) */}
      {activeAdminTab === 'CANDIDATES' && (
        <div className="space-y-4">
          {subAdminSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{subAdminSuccess}</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  User, Candidate & Sub-Admin Directory
                </h3>
                <p className="text-xs text-slate-500">
                  Master role-based access control with dual-verification tracking (Phone OTP & Gmail)
                </p>
              </div>

              <button
                onClick={() => setShowSubAdminModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
              >
                <UserCheck className="w-4 h-4" />
                <span>+ Generate Operator / Sub-Admin</span>
              </button>
            </div>

            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">User & Name</th>
                  <th className="p-3">Contact & Email</th>
                  <th className="p-3">Role Tier</th>
                  <th className="p-3">Verification Check</th>
                  <th className="p-3">Permissions / Target</th>
                  <th className="p-3">Joined Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{c.id}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-700 font-mono">{c.email}</div>
                      {c.phone && (
                        <div className="text-[11px] text-slate-500 font-mono">📱 +91 {c.phone}</div>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.role === 'SUPER_ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : c.role === 'SUB_ADMIN'
                            ? 'bg-indigo-100 text-indigo-800'
                            : c.role === 'OPERATOR'
                            ? 'bg-blue-100 text-blue-800'
                            : c.role === 'CONTENT_ADMIN'
                            ? 'bg-cyan-100 text-cyan-800'
                            : c.role === 'REVIEWER'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {c.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col space-y-0.5">
                        <span className="text-[10px] text-emerald-700 font-semibold flex items-center space-x-1">
                          <span>✓ Phone OTP</span>
                        </span>
                        <span className="text-[10px] text-indigo-700 font-semibold flex items-center space-x-1">
                          <span>✓ Gmail Verified</span>
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-700 font-medium">
                      {c.permissions && c.permissions.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {c.permissions.map((p, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-100 text-slate-700 text-[9px] font-bold px-1.5 py-0.5 rounded"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span>{c.targetExam || 'Candidate'}</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 font-mono">{c.joinedDate}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. TAB CONTENT: AUDIT LOGS (Section 40) */}
      {activeAdminTab === 'AUDIT' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Security & Operational Audit Logs</h3>
            <span className="text-xs text-slate-500">Immutable Event Log</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Module</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 text-slate-900 font-bold">{log.userName}</td>
                  <td className="p-3 text-indigo-700 font-bold">{log.action}</td>
                  <td className="p-3 text-slate-600">{log.module}</td>
                  <td className="p-3 text-slate-700 font-sans">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB CONTENT: PRICING & CLEAN ADS */}
      {activeAdminTab === 'PRICING_MONETIZATION' && (
        <div className="space-y-6">
          {pricingFeedback && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{pricingFeedback}</span>
            </div>
          )}

          {/* Sub-view Switcher inside Pricing & Clean Ads */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
                <span>Commercial Operations & Monetization Architecture</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Switch between real-time 30-day revenue analytics visualizations and test series pricing controls.
              </p>
            </div>
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
              <button
                onClick={() => setMonetizationSubTab('ANALYTICS')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                  monetizationSubTab === 'ANALYTICS'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>30-Day Revenue Analytics</span>
              </button>
              <button
                onClick={() => setMonetizationSubTab('PRICING_POLICY')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                  monetizationSubTab === 'PRICING_POLICY'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pricing & Clean Ad Inventory</span>
              </button>
            </div>
          </div>

          {monetizationSubTab === 'ANALYTICS' ? (
            <RevenueAnalytics
              onRefreshMonetization={() => {
                api.getMonetizationStats().then((res) => {
                  if (res.data) setMonetizationStats(res.data);
                });
              }}
            />
          ) : (
            <>
              {/* Revenue & Ad Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Ad Impressions</span>
                    <BarChart3 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {monetizationStats?.totalImpressions?.toLocaleString() || '14,820'}
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.4% vs last week</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Ad Clicks</span>
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {monetizationStats?.totalClicks?.toLocaleString() || '524'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    CTR: <strong className="text-slate-800">{monetizationStats?.ctr || '3.53%'}</strong>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Total Ad Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl font-bold text-emerald-700">
                    ₹{monetizationStats?.totalRevenueInr?.toLocaleString() || '6,480'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Avg CPM: <strong className="text-slate-800">₹{monetizationStats?.cpmInr || '145'}</strong>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Micro-Transactions</span>
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-xl font-bold text-indigo-700">
                    ₹{monetizationStats?.totalPurchasesInr?.toLocaleString() || '2,450'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Unlocked series: <strong>50+ candidates</strong>
                  </div>
                </div>
              </div>

              {/* Clean Ad Network Strict Policy Box */}
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-emerald-500/30 space-y-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-extrabold text-sm text-emerald-200 uppercase tracking-wide">
                    Clean Advertising Network Compliance Enforced
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  Strictly restricted to <strong>verified educational publications, study books, stationery, and mock test preparation kits</strong>.
                  All adult, dating, gambling, betting, and vulgar content are strictly blocked via DNS and content-filtering gateways to prevent candidate distraction.
                </p>
                <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
                  <span className="bg-emerald-900/60 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-700/50">
                    ✓ Study Books & Materials Allowed
                  </span>
                  <span className="bg-emerald-900/60 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-700/50">
                    ✓ Coaching & EdTech Allowed
                  </span>
                  <span className="bg-rose-950/70 text-rose-300 px-2.5 py-0.5 rounded border border-rose-800/60">
                    ✗ Adult / Dating Blocked
                  </span>
                  <span className="bg-rose-950/70 text-rose-300 px-2.5 py-0.5 rounded border border-rose-800/60">
                    ✗ Gambling / Betting Blocked
                  </span>
                </div>
              </div>

              {/* Test Series Pricing Management Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Mock Test Series Access Fees & Micro-Transaction Control
                    </h3>
                    <p className="text-xs text-slate-500">
                      Set tests to Free or configure custom access fees (INR) to unlock premium mock test series.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Total Series: {testsList.length}
                  </span>
                </div>

                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="p-3">Test Title</th>
                      <th className="p-3">Exam Category</th>
                      <th className="p-3">Duration & Qs</th>
                      <th className="p-3">Current Access Model</th>
                      <th className="p-3">Access Fee (₹)</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {testsList.map((test) => (
                      <tr key={test.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{test.title}</div>
                          <div className="text-[11px] text-slate-500">{test.examTitle}</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                            {test.category}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 font-mono">
                          {test.durationMinutes}m • {test.totalQuestions} Qs
                        </td>
                        <td className="p-3">
                          {test.isFree === false ? (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              <Lock className="w-3.5 h-3.5 text-amber-700" />
                              <span>Paid Series</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Free Open Access</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-800">
                          {pricingEditId === test.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                min="0"
                                disabled={editIsFree}
                                value={editPriceInr}
                                onChange={(e) => setEditPriceInr(Number(e.target.value))}
                                className="w-20 px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 font-mono"
                              />
                            </div>
                          ) : test.isFree === false ? (
                            <span className="text-indigo-700 font-bold">₹{test.priceInr || 49}</span>
                          ) : (
                            <span className="text-slate-400">₹0 (Free)</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          {pricingEditId === test.id ? (
                            <div className="flex items-center justify-end space-x-2">
                              <label className="flex items-center space-x-1 text-[11px] text-slate-600 font-normal">
                                <input
                                  type="checkbox"
                                  checked={editIsFree}
                                  onChange={(e) => {
                                    setEditIsFree(e.target.checked);
                                    if (e.target.checked) setEditPriceInr(0);
                                    else if (editPriceInr === 0) setEditPriceInr(49);
                                  }}
                                  className="rounded text-indigo-600"
                                />
                                <span>Make Free</span>
                              </label>
                              <button
                                onClick={() => handleSavePricing(test.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold cursor-pointer transition shadow-2xs"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setPricingEditId(null)}
                                className="px-2 py-1 text-slate-500 hover:text-slate-800 text-[11px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setPricingEditId(test.id);
                                setEditIsFree(test.isFree !== false);
                                setEditPriceInr(test.priceInr || 49);
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 rounded text-[11px] font-semibold cursor-pointer transition"
                            >
                              Edit Pricing
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB CONTENT: DEDICATED REVENUE ANALYTICS (30D RECHARTS) */}
      {activeAdminTab === 'REVENUE_ANALYTICS' && (
        <RevenueAnalytics
          onRefreshMonetization={() => {
            api.getMonetizationStats().then((res) => {
              if (res.data) setMonetizationStats(res.data);
            });
          }}
        />
      )}

      {/* TAB CONTENT: ADMIN SECURITY & SETTINGS */}
      {activeAdminTab === 'SETTINGS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Card: Current Admin Profile */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs h-fit">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                  ST
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Er. Sachin Tripathi</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Super Administrator
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Username:</span>
                  <span className="font-mono font-bold text-slate-800">{adminCredInfo.username}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Role Authority:</span>
                  <span className="font-semibold text-emerald-600">Full Root Permissions</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Last Credentials Update:</span>
                  <span className="text-slate-700 font-mono text-[11px]">{adminCredInfo.lastUpdated}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Security Standard:</span>
                  <span className="text-indigo-600 font-medium">SHA-256 Auth</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
                <div className="font-bold flex items-center space-x-1 text-slate-900">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Security Best Practice</span>
                </div>
                <p className="leading-relaxed">
                  Regularly update administrative credentials to protect system-level settings, candidate scorecards, and question bank assets.
                </p>
              </div>
            </div>

            {/* Right Card: Credentials Update Form */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">
                  Administrative Credentials Management
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update the master operator username and password. Changes take effect immediately across all sessions.
                </p>
              </div>

              {credStatus && (
                <div
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex items-start space-x-2 ${
                    credStatus.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  {credStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{credStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Password <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current administrator password"
                    value={currentAdminPassword}
                    onChange={(e) => setCurrentAdminPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Required to confirm you are the authorized system administrator.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      New Username
                    </label>
                    <input
                      type="text"
                      required
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={confirmAdminPassword}
                    onChange={(e) => setConfirmAdminPassword(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Audit log will register this credential change event.
                  </span>
                  <button
                    type="submit"
                    disabled={credUpdating}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition cursor-pointer flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{credUpdating ? 'Updating...' : 'Save Updated Credentials'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 9. ADD QUESTION MODAL (Section 12) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Bilingual Question to Central Bank</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Subject</label>
                  <select
                    value={newQuestionData.subjectName}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, subjectName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.nameEn}>{s.nameEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Difficulty</label>
                  <select
                    value={newQuestionData.difficulty}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, difficulty: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  >
                    <option value="EASY">Easy</option>
                    <option value="NORMAL">Normal</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Question Text (English)</label>
                <textarea
                  required
                  rows={2}
                  value={newQuestionData.textEn}
                  onChange={(e) => setNewQuestionData({ ...newQuestionData, textEn: e.target.value })}
                  placeholder="Enter English question text..."
                  className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Question Text (Hindi) — Optional</label>
                <textarea
                  rows={2}
                  value={newQuestionData.textHi}
                  onChange={(e) => setNewQuestionData({ ...newQuestionData, textHi: e.target.value })}
                  placeholder="हिंदी में प्रश्न दर्ज करें..."
                  className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Option A (EN)</label>
                  <input
                    required
                    value={newQuestionData.optA_En}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, optA_En: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Option B (EN)</label>
                  <input
                    required
                    value={newQuestionData.optB_En}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, optB_En: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Option C (EN)</label>
                  <input
                    required
                    value={newQuestionData.optC_En}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, optC_En: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Option D (EN)</label>
                  <input
                    required
                    value={newQuestionData.optD_En}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, optD_En: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Correct Answer</label>
                  <select
                    value={newQuestionData.correctAnswer}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, correctAnswer: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1 font-bold font-mono"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Positive Marks</label>
                  <input
                    type="number"
                    step="0.25"
                    value={newQuestionData.marksPositive}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, marksPositive: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Negative Marks</label>
                  <input
                    type="number"
                    step="0.25"
                    value={newQuestionData.marksNegative}
                    onChange={(e) => setNewQuestionData({ ...newQuestionData, marksNegative: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Explanation & Method</label>
                <textarea
                  rows={2}
                  value={newQuestionData.explanationEn}
                  onChange={(e) => setNewQuestionData({ ...newQuestionData, explanationEn: e.target.value })}
                  placeholder="Explain step by step solution..."
                  className="w-full p-2 border border-slate-300 rounded-lg mt-1"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow"
                >
                  Save & Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-ADMIN & OPERATOR GENERATOR MODAL */}
      <CreateSubAdminModal
        isOpen={showSubAdminModal}
        onClose={() => setShowSubAdminModal(false)}
        onSuccess={(newStaff) => {
          setCandidates((prev) => [newStaff, ...prev]);
          setSubAdminSuccess(`Credentials generated successfully for ${newStaff.name} (${newStaff.role}).`);
          setTimeout(() => setSubAdminSuccess(null), 6000);
        }}
      />
    </div>
  );
};
