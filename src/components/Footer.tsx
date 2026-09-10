/**
 * SKTECH EXAM — Footer Component
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React from 'react';
import { ShieldCheck, Database, Cpu, Laptop, Smartphone } from 'lucide-react';

interface FooterProps {
  currentRoute?: '/' | '/admin';
  onNavigateRoute?: (route: '/' | '/admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentRoute = '/', onNavigateRoute }) => {
  return (
    <footer id="sktech-footer" className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <span className="font-extrabold text-base tracking-tight">SKTECH EXAM</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enterprise-grade Indian competitive-exam preparation platform powering Bank (IBPS, SBI, RRB), SSC (CGL, CHSL), State PSC (MPPSC), Police, and Railways test-takers nationwide.
            </p>
            {/* Quick Link to Other Portal */}
            {onNavigateRoute && (
              <div className="pt-1">
                {currentRoute === '/admin' ? (
                  <button
                    onClick={() => onNavigateRoute('/')}
                    className="inline-flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                  >
                    <span>← Switch to Candidate Portal (/)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigateRoute('/admin')}
                    className="inline-flex items-center space-x-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                  >
                    <span>Staff & Admin Console (/admin) →</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Col 2: Architecture Highlights */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Unified Ecosystem</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>Single Central PostgreSQL DB</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Central Node.js REST API v1</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Laptop className="w-3.5 h-3.5 text-emerald-400" />
                <span>Windows Admin Desktop (.NET 8 WPF)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Candidate Mobile App (React Native)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Exam Coverage */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Target Exams</h4>
            <div className="flex flex-wrap gap-1.5">
              {['IBPS PO', 'SBI Clerk', 'SSC CGL', 'MPPSC', 'MP Police', 'RRB PO', 'SSC GD', 'CSAT'].map((exam) => (
                <span key={exam} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                  {exam}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Quality & Integrity */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Exam Integrity</h4>
            <p className="text-[11px] leading-relaxed">
              Server-authoritative timers, negative marking precision, zero client-side score trusting, and bilingual question banks.
            </p>
            <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>₹0 Cost Development Certified</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Mandatory Footer Text */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <div className="font-semibold text-slate-400 mb-2 sm:mb-0">
            Powered by SKTECH • All Rights Reserved © 2026
          </div>
          <div className="flex items-center space-x-4">
            <span>Central API: <strong className="text-slate-400 font-mono">v1.0.4-phase1</strong></span>
            <span>Status: <strong className="text-emerald-400">All Systems Operational</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
