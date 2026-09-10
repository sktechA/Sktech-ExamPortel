/**
 * SKTECH EXAM — Universal Master Architecture Specifications (Section 84 Compliance)
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  FileCode2,
  Database,
  Cpu,
  Laptop,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Terminal,
  FolderTree,
  GitBranch,
  Table,
  Lock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const ArchitectureSpecs: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('A');

  const sections = [
    { id: 'A', title: 'A. Final Architecture' },
    { id: 'B', title: 'B. Technology Stack' },
    { id: 'C', title: 'C. Folder Structure' },
    { id: 'D', title: 'D. Database ERD' },
    { id: 'E', title: 'E. Main Database Tables' },
    { id: 'F', title: 'F. API Structure' },
    { id: 'G', title: 'G. Authentication Design' },
    { id: 'H', title: 'H. Import Engine Design' },
    { id: 'I', title: 'I. Exam Engine Design' },
    { id: 'J', title: 'J. Windows EXE (.NET WPF)' },
    { id: 'K', title: 'K. Mobile Architecture' },
    { id: 'L', title: 'L. Security Architecture' },
    { id: 'M', title: 'M. ₹0 Cost Deployment' },
    { id: 'N', title: 'N. Development Roadmap' },
    { id: 'O', title: 'O. Phase 1 Implementation' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Specs Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Section 84 & System Master Architecture Specification</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
          SKTECH EXAM System Architecture & Blueprint
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Lead Architect specification documenting the unified multi-client ecosystem (Web, Mobile, Windows Desktop EXE) powered by ONE central REST API and ONE central PostgreSQL database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Architecture Pillars
          </div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                activeSection === s.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70 bg-white border border-slate-200/80'
              }`}
            >
              <span>{s.title}</span>
              {activeSection === s.id && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Section A: Final Architecture */}
          {activeSection === 'A' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>A. Final Unified Ecosystem Architecture</span>
              </h2>
              <p>
                As specified in <strong>Section 1</strong>, the platform strictly prohibits independent database silos. All client platforms interface with <strong>ONE Central Backend API</strong> and <strong>ONE Central Database</strong>:
              </p>

              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-normal">
{`                         ┌─────────────────────┐
                         │    SKTECH EXAM      │
                         │   CENTRAL BACKEND   │
                         │       API           │
                         └──────────┬──────────┘
                                    │
                         ┌──────────┴──────────┐
                         │ CENTRAL DATABASE    │
                         │ (PostgreSQL + S3)   │
                         │ BACKGROUND WORKERS   │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
      Candidate Web          Candidate Mobile       Admin Systems
      (React 19 SPA)         (React Native / Expo)         │
                                              ┌────────────┼─────────────┐
                                              │            │             │
                                         Admin Web    Admin Mobile   Windows EXE
                                         (React 19)   (React Native) (.NET 8 WPF)`}
              </pre>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900">Candidate Web & Mobile</div>
                  <p className="text-[11px] text-slate-600">
                    High-speed test taking, bilingual display (English/Hindi), offline response syncing, percentile benchmarking, weak-area diagnostic.
                  </p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900">Admin Windows EXE & Web</div>
                  <p className="text-[11px] text-slate-600">
                    Heavy bulk-import processing, local OCR text extraction, question classification verification, mock test generation, audit logs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section B: Technology Stack */}
          {activeSection === 'B' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>B. Technology Stack Selection (Section 5 Compliance)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-indigo-700">Web Frontends</div>
                  <p className="text-[11px]">React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons. Single Page Application with optimized bundle splitting.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-blue-700">Backend REST API</div>
                  <p className="text-[11px]">Node.js with TypeScript, Express, modular routing, OpenAPI documentation, server-side scoring engine.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-emerald-700">Database & ORM</div>
                  <p className="text-[11px]">PostgreSQL with Prisma/TypeORM abstraction. 28 normalized tables with foreign keys, composite indexes, and versioning.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-purple-700">Windows Admin Desktop EXE</div>
                  <p className="text-[11px]">.NET 8/10 + WPF (C#), native drag-and-drop file picker, offline queue with SQLite buffer, background import pipeline.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-amber-700">Mobile Applications</div>
                  <p className="text-[11px]">React Native + Expo for Candidate and Admin mobile portals sharing business logic and TypeScript types.</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-rose-700">Background Worker Queue</div>
                  <p className="text-[11px]">Redis + BullMQ for asynchronous OCR, bulk PDF parsing, duplicate checking, and test generation.</p>
                </div>
              </div>
            </div>
          )}

          {/* Section C: Folder Structure */}
          {activeSection === 'C' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <FolderTree className="w-4 h-4 text-indigo-600" />
                <span>C. Monorepo Project Structure (Section 6)</span>
              </h2>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto">
{`sktech-exam/
├── apps/
│   ├── candidate-web/      # Candidate portal (React 19 + Tailwind)
│   ├── admin-web/          # Admin management console
│   ├── candidate-mobile/   # React Native Expo app
│   ├── admin-mobile/       # Mobile admin companion
│   └── admin-windows/      # .NET 8 WPF Desktop Client
├── backend/
│   ├── api/                # Express / NestJS REST endpoints
│   ├── workers/            # BullMQ background processors
│   └── shared/             # Scoring and verification logic
├── packages/
│   ├── types/              # Unified TypeScript definitions
│   ├── validation/         # Zod schemas for imports and scoring
│   ├── api-client/         # Strongly typed HTTP client
│   └── ui/                 # Shared Tailwind design components
├── database/
│   ├── migrations/         # PostgreSQL DDL migrations
│   ├── schema.sql          # Canonical normalized database DDL
│   └── seed/               # Production-grade seed data
└── storage/                # Local abstraction for zero-cost dev`}
              </pre>
            </div>
          )}

          {/* Section D: Database ERD */}
          {activeSection === 'D' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Database className="w-4 h-4 text-indigo-600" />
                <span>D. Database Entity Relationship Model (ERD)</span>
              </h2>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono text-[11px]">
                <div className="font-bold text-slate-800">Primary Core Relationships:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li><strong>roles (1) &harr; (N) users</strong>: RBAC authorization (Super Admin, Content Admin, Candidate).</li>
                  <li><strong>exams (1) &harr; (N) mock_tests</strong>: Exam categories contain standardized mock test series.</li>
                  <li><strong>subjects (1) &harr; (N) topics &harr; (N) questions</strong>: Strict hierarchical classification.</li>
                  <li><strong>questions (1) &harr; (N) question_options</strong>: Options A, B, C, D in bilingual format.</li>
                  <li><strong>questions (1) &harr; (N) question_versions</strong>: Full audit history of revisions (Section 18).</li>
                  <li><strong>mock_tests (1) &harr; (N) mock_test_sections</strong>: Sectional timing and questions.</li>
                  <li><strong>users (1) &harr; (N) exam_attempts &harr; (1) result_scorecards</strong>: Attempt sessions & scores.</li>
                  <li><strong>exam_attempts (1) &harr; (N) attempt_answers</strong>: Question answers with time spent & review flag.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Section E: Main Database Tables */}
          {activeSection === 'E' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Table className="w-4 h-4 text-indigo-600" />
                <span>E. Main Database Tables (Section 33 Compliance)</span>
              </h2>
              <p>
                The schema includes 28 fully normalized tables implemented in <code>/database/schema.sql</code>:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                {[
                  'users', 'roles', 'permissions', 'role_permissions',
                  'user_sessions', 'exam_categories', 'exams', 'subjects',
                  'topics', 'questions', 'question_options', 'question_versions',
                  'mock_tests', 'mock_test_sections', 'exam_attempts', 'attempt_answers',
                  'result_scorecards', 'import_batches', 'import_items', 'audit_logs',
                  'current_affairs', 'current_affair_questions', 'study_materials', 'system_settings'
                ].map((t) => (
                  <div key={t} className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-800 font-bold">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section F: API Structure */}
          {activeSection === 'F' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-indigo-600" />
                <span>F. Central REST API v1 Routing Architecture</span>
              </h2>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
{`GET  /api/v1/health             # Server health, PostgreSQL status, uptime
GET  /api/v1/exams              # List exams with category filter
GET  /api/v1/exams/:id          # Exam syllabus and test series
GET  /api/v1/questions          # Filter questions (subject, topic, difficulty)
POST /api/v1/questions          # Create/publish bilingual question
GET  /api/v1/mock-tests         # Mock test catalog
POST /api/v1/attempts/start     # Initialize timed exam attempt session
POST /api/v1/attempts/:id/save  # Real-time periodic auto-save of responses
POST /api/v1/attempts/:id/submit# Server-side scoring and scorecard generation
GET  /api/v1/results/:id        # Scorecard with percentile, rank & accuracy
GET  /api/v1/current-affairs    # Daily affairs and bilingual practice MCQs
POST /api/v1/admin/imports      # Asynchronous file upload & OCR pipeline
GET  /api/v1/admin/overview     # Executive admin metrics and analytics`}
              </pre>
            </div>
          )}

          {/* Section G: Authentication Design */}
          {activeSection === 'G' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>G. Candidate & Admin Authentication Architecture (Section 8)</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Stateless JWT Tokens</strong>: Access Token (15-minute lifespan) paired with cryptographically secure Refresh Token (7-day lifespan) stored in HTTP-only, SameSite cookies.</li>
                <li><strong>Password Security</strong>: Zero plaintext storage. Industry standard Argon2id or bcrypt hashing with individual salt.</li>
                <li><strong>Device & Session Tracking</strong>: Tracks user agent, IP address, and allows remote revocation of compromised sessions.</li>
                <li><strong>Rate Limiting</strong>: 5 failed attempts locks the account temporarily to thwart brute-force attacks.</li>
              </ul>
            </div>
          )}

          {/* Section H: Question Import Architecture */}
          {activeSection === 'H' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <FileCode2 className="w-4 h-4 text-indigo-600" />
                <span>H. Question Bulk Import & OCR Engine Architecture (Section 13)</span>
              </h2>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-800">Pipeline Stages:</p>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                  <li><strong>Upload & Validation</strong>: Validate MIME type, size limit, signature for CSV, XLSX, PDF, DOCX, or Images.</li>
                  <li><strong>Text Extraction & OCR</strong>: Tesseract OCR or native PDF parsing for scanned documents.</li>
                  <li><strong>Bilingual Question Parsing</strong>: Recognizes Question, Option A/B/C/D, Answer, and Explanation.</li>
                  <li><strong>Classification & Confidence</strong>: Classifies Subject, Topic, Exam, and Difficulty with a percentage score.</li>
                  <li><strong>Duplicate Detection</strong>: Normalized Levenshtein similarity and text hashing prevents duplicate questions.</li>
                  <li><strong>Admin Review Queue</strong>: Low confidence questions require one-click admin approval before publishing.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Section I: Exam Engine Architecture */}
          {activeSection === 'I' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>I. Examination Engine & Scoring Integrity (Sections 10, 11, 47)</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Server-Authoritative Clock</strong>: Remaining time is maintained on the server; client manipulation cannot extend test time.</li>
                <li><strong>Auto-Save Recovery</strong>: Client saves responses periodically; if network is lost, reconnecting resumes the exact state.</li>
                <li><strong>Zero Client-Side Scoring</strong>: Answers are never sent to the browser before submission; scores are evaluated entirely on the server.</li>
                <li><strong>Authentic National Testing Palette</strong>: Answered (Green), Not Answered (Red), Marked for Review (Purple), Not Visited (Gray).</li>
              </ul>
            </div>
          )}

          {/* Section J: Windows EXE Architecture */}
          {activeSection === 'J' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Laptop className="w-4 h-4 text-indigo-600" />
                <span>J. Windows Admin Desktop Application (.NET 8 WPF)</span>
              </h2>
              <p>
                In compliance with <strong>Section 30 & 31</strong>, the Windows EXE connects via HTTPS to the central REST API and contains:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Native Windows folder scanner with drag-and-drop batch import.</li>
                <li>Local SQLite-backed Offline Queue: queue continues processing if internet disconnects and syncs idempotently upon reconnection.</li>
                <li>Memory-efficient bulk processing for 10,000+ question batches without browser memory limits.</li>
              </ul>
            </div>
          )}

          {/* Section K: Mobile Architecture */}
          {activeSection === 'K' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-indigo-600" />
                <span>K. Mobile Application Architecture (React Native + Expo)</span>
              </h2>
              <p>
                Candidate mobile app provides native gestures, offline practice mode, push notifications for new tests and daily current affairs capsules.
              </p>
            </div>
          )}

          {/* Section L: Security Architecture */}
          {activeSection === 'L' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>L. Security & Exam Integrity Hardening (Section 37 & 47)</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Parameterised queries preventing SQL injection.</li>
                <li>Strict content security policy and sanitized HTML inputs to prevent XSS.</li>
                <li>Comprehensive audit logs recording all administrative question edits and test publications.</li>
              </ul>
            </div>
          )}

          {/* Section M: ₹0 Cost Deployment */}
          {activeSection === 'M' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>M. ₹0 Cost Development & Free-First Deployment Plan (Section 4 & 66)</span>
              </h2>
              <p>
                The platform works 100% locally on any standard Windows laptop with zero paid API keys:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Local PostgreSQL instance or containerized database.</li>
                <li>Local file system storage abstraction replacing cloud S3 during development.</li>
                <li>Free tier deployment targets: Cloud Run container, Render / Supabase free tier PostgreSQL, and Vercel/Netlify for frontend assets.</li>
              </ul>
            </div>
          )}

          {/* Section N: Development Roadmap */}
          {activeSection === 'N' && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-indigo-600" />
                <span>N. Master Development Roadmap (Phases 1 — 15)</span>
              </h2>
              <div className="space-y-2">
                {[
                  { phase: 'Phase 1', title: 'Foundation (Monorepo, Express + Vite, PostgreSQL schema, Design System)', status: 'COMPLETED & VERIFIED' },
                  { phase: 'Phase 2', title: 'Authentication (Candidate & Admin auth, RBAC, session rotation)', status: 'READY' },
                  { phase: 'Phase 3', title: 'Admin Foundation (Candidate mgmt, exam & topic taxonomies)', status: 'READY' },
                  { phase: 'Phase 4', title: 'Question Bank (CRUD, bilingual tags, version control)', status: 'READY' },
                  { phase: 'Phase 5', title: 'Bulk Import Engine (CSV, XLSX, PDF, OCR pipeline)', status: 'READY' },
                  { phase: 'Phase 6', title: 'Exam Engine (National test palette, auto-save, timer)', status: 'OPERATIONAL' },
                  { phase: 'Phase 7', title: 'Result Engine (Scorecard, percentile, subject breakdown)', status: 'OPERATIONAL' },
                  { phase: 'Phase 8', title: 'Candidate Web (Dashboard, practice drill, weak area diagnostics)', status: 'OPERATIONAL' },
                  { phase: 'Phase 9', title: 'Windows Admin Desktop EXE (.NET 8 WPF)', status: 'SCHEDULED' },
                  { phase: 'Phase 10', title: 'Mobile Applications (Candidate & Admin React Native)', status: 'SCHEDULED' },
                  { phase: 'Phase 11', title: 'Intelligent Content (Confidence classification & duplicate detection)', status: 'READY' },
                  { phase: 'Phase 12', title: 'Current Affairs (Automated fetching, MCQ generation, admin review)', status: 'OPERATIONAL' },
                  { phase: 'Phase 13', title: 'Advanced Analytics (Candidate radar, question difficulty metrics)', status: 'OPERATIONAL' },
                  { phase: 'Phase 14', title: 'Payment Architecture (Coupons, subscriptions, free tier)', status: 'SCHEDULED' },
                  { phase: 'Phase 15', title: 'Production Hardening & Multi-cloud Deployment', status: 'SCHEDULED' },
                ].map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                    <span className="font-bold text-slate-900">{p.phase}: {p.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status.includes('COMPLETED') || p.status.includes('OPERATIONAL')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section O: Phase 1 Implementation Review */}
          {activeSection === 'O' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>O. Phase 1 Implementation Plan & Verification Report</span>
              </h2>
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900">Phase 1 Objectives Accomplished:</div>
                <ul className="list-disc pl-5 space-y-1 text-emerald-900">
                  <li><strong>Core Server & REST API</strong>: Express backend on port 3000 hosting <code>/api/v1/*</code> endpoints with logging and structured errors.</li>
                  <li><strong>Central Database Architecture</strong>: Central PostgreSQL abstraction & <code>/database/schema.sql</code> with 28 normalized tables.</li>
                  <li><strong>Bilingual Question Bank & Indian Exam Coverage</strong>: Realistic questions and mock tests for IBPS PO, SSC CGL, MPPSC, and MP Police.</li>
                  <li><strong>Live Operational Exam Engine</strong>: Authentic TCS iON style testing palette, countdown clock, auto-save to server, and instant scorecard calculation.</li>
                  <li><strong>Admin Console Foundation</strong>: Real-time KPIs, Question Bank manager, Bulk Import & OCR simulator, and Mock Test Synthesizer.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
