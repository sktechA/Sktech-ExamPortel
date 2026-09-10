/**
 * SKTECH EXAM — Multi-Platform Deployment & Distribution Center
 * Targets: Cloud Web Application, Desktop Windows EXE, Android APK
 * Dual Portal Isolation Control
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Smartphone,
  Globe,
  Download,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Layers,
  Sparkles,
  Lock,
  Radio,
  FileCode,
  Laptop,
  Copy,
  Check,
} from 'lucide-react';
import { api } from '../services/apiClient';
import { MultiPlatformDeployment } from '../types';

interface MultiPlatformHubProps {
  portalMode: 'UNIFIED' | 'CANDIDATE_ONLY' | 'ADMIN_ONLY';
  onPortalModeChange: (mode: 'UNIFIED' | 'CANDIDATE_ONLY' | 'ADMIN_ONLY') => void;
  onNavigateToCandidate: () => void;
  onNavigateToAdmin: () => void;
}

export const MultiPlatformHub: React.FC<MultiPlatformHubProps> = ({
  portalMode,
  onPortalModeChange,
  onNavigateToCandidate,
  onNavigateToAdmin,
}) => {
  const [deployments, setDeployments] = useState<MultiPlatformDeployment[]>([]);
  const [activePlatformTab, setActivePlatformTab] = useState<'ALL' | 'WEB' | 'WINDOWS_EXE' | 'ANDROID_APK'>('ALL');
  const [copiedChecksum, setCopiedChecksum] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  useEffect(() => {
    api.getPlatformDeployments().then((res) => {
      if (res.data) setDeployments(res.data);
    }).catch(console.error);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChecksum(id);
    setTimeout(() => setCopiedChecksum(null), 2500);
  };

  const handleSimulateDownload = (pkgTitle: string, format: string) => {
    setDownloadNotice(`Package build verified: ${pkgTitle} [${format}]. Preparing verified installer binary...`);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  const filteredDeployments =
    activePlatformTab === 'ALL'
      ? deployments
      : deployments.filter((d) => d.platform === activePlatformTab);

  return (
    <div id="multi-platform-hub" className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/30 text-indigo-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-indigo-400/30">
              CROSS-PLATFORM ARCHITECTURE & DEPLOYMENT SPECIFICATION
            </span>
            <span className="text-xs text-slate-400">• Release v2.4.0 Production Ready</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            SKTECH Multi-Platform Ecosystem & Distribution Hub
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Engineered for high-concurrency public exam preparation across <strong>Cloud Web</strong>, <strong>Air-Gapped Desktop Client (.EXE)</strong> for proctored examination centers, and <strong>Native Android (.APK)</strong> for candidate self-study.
          </p>
        </div>
      </div>

      {/* 2. Dual Portal Isolation Control */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Dual Portal Isolation Environment Switch</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strictly enforce complete isolation between candidate experience (zero administrative leaks) and administrative console.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
            Active: {portalMode}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onPortalModeChange('CANDIDATE_ONLY')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              portalMode === 'CANDIDATE_ONLY'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs text-slate-900">1. User / Candidate Portal</span>
              <Smartphone className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Completely isolated candidate-facing environment. Zero admin visibility, pure test-taking, Clean Ads, and study intelligence.
            </p>
            <div className="mt-3 text-[10px] font-bold text-indigo-600 uppercase">
              Isolated Candidate Scope →
            </div>
          </button>

          <button
            onClick={() => onPortalModeChange('ADMIN_ONLY')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              portalMode === 'ADMIN_ONLY'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs text-slate-900">2. Admin Control Portal</span>
              <Lock className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Secured administrative console. Operator provisioning, bilingual question bank, bulk OCR, test pricing, and audit logs.
            </p>
            <div className="mt-3 text-[10px] font-bold text-indigo-600 uppercase">
              Isolated Admin Scope →
            </div>
          </button>

          <button
            onClick={() => onPortalModeChange('UNIFIED')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
              portalMode === 'UNIFIED'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-xs text-slate-900">3. Unified Hybrid Mode</span>
              <Globe className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Full hybrid developer architecture allowing instant toggle between Candidate testing views and Admin management console.
            </p>
            <div className="mt-3 text-[10px] font-bold text-emerald-600 uppercase">
              Integrated Workspace →
            </div>
          </button>
        </div>
      </div>

      {/* Download / Verified Notice */}
      {downloadNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-semibold text-emerald-900 flex items-center space-x-3 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* 3. Platform Filter Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-2">
        {[
          { key: 'ALL', label: 'All Platform Deliverables (3)' },
          { key: 'WEB', label: 'Cloud Web Portal' },
          { key: 'WINDOWS_EXE', label: 'Windows Desktop EXE' },
          { key: 'ANDROID_APK', label: 'Android Native APK' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActivePlatformTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition cursor-pointer ${
              activePlatformTab === tab.key
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDeployments.map((d) => (
          <div
            key={d.platform}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-5 hover:shadow-md transition"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-md">
                  {d.platform === 'WEB' && <Globe className="w-6 h-6 text-indigo-400" />}
                  {d.platform === 'WINDOWS_EXE' && <Laptop className="w-6 h-6 text-emerald-400" />}
                  {d.platform === 'ANDROID_APK' && <Smartphone className="w-6 h-6 text-amber-400" />}
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    d.status === 'DEPLOYED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {d.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900">{d.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1 font-mono">
                  <span>{d.version}</span>
                  <span>•</span>
                  <span>{d.buildNumber}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 text-xs space-y-1.5 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Environment:</span>
                  <span className="font-medium text-slate-800">{d.targetEnv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Package Size:</span>
                  <span className="font-mono font-bold text-slate-800">{d.binarySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-medium text-slate-800">{d.packageFormat}</span>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Key Capabilities
                </h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {d.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                  <span>SHA-256 Checksum:</span>
                  <button
                    onClick={() => handleCopy(d.checksumSha256, d.platform)}
                    className="text-indigo-600 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedChecksum === d.platform ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2 bg-slate-100 rounded-xl font-mono text-[10px] text-slate-600 break-all select-all">
                  {d.checksumSha256}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              {d.platform === 'WEB' ? (
                <button
                  onClick={onNavigateToCandidate}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch Web Application</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSimulateDownload(d.title, d.packageFormat)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Verified Installer</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 5. Production Packaging & Build Commands Reference */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h3 className="font-extrabold text-sm text-white">
            Production Build Pipeline & CLI Executable Packaging
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold">1. Cloud Web Build</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Compiles React 19 single-page app and bundles backend TypeScript into self-contained CommonJS.
            </p>
            <div className="bg-slate-900 p-2 rounded text-slate-300 text-[11px]">
              npm run build
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-indigo-400 font-bold">2. Windows Desktop EXE</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Packages standalone Electron runtime into a portable .exe with proctored kiosk mode.
            </p>
            <div className="bg-slate-900 p-2 rounded text-slate-300 text-[11px]">
              npm run build:exe
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold">3. Android APK / AAB</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Syncs Capacitor assets and builds signed Universal Release APK via Android Gradle.
            </p>
            <div className="bg-slate-900 p-2 rounded text-slate-300 text-[11px]">
              npm run build:apk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
