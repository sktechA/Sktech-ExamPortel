/**
 * SKTECH EXAM — Universal Master Hub & Environment Router
 * Decoupled Architecture Map:
 *  - Candidate App → Vercel Project 1 (sktech-exam-portal.vercel.app)
 *  - Admin App     → Vercel Project 2 (sktech-exam-admin.vercel.app)
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect } from 'react';
import CandidateApp from './CandidateApp';
import AdminApp from './AdminApp';

export default function App() {
  // Detect active application based on URL pathname, hash, or hostname
  const [activeApp, setActiveApp] = useState<'CANDIDATE' | 'ADMIN'>(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (hostname.includes('admin') || pathname.startsWith('/admin') || hash === '#admin') {
        return 'ADMIN';
      }
    }
    return 'CANDIDATE';
  });

  // Synchronize route on browser back/forward buttons or hash change
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const hostname = window.location.hostname;

      if (hostname.includes('admin') || path.startsWith('/admin') || hash === '#admin') {
        setActiveApp('ADMIN');
      } else {
        setActiveApp('CANDIDATE');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // When on Admin route, render AdminApp. Otherwise render 100% candidate-dedicated portal
  if (activeApp === 'ADMIN') {
    return <AdminApp candidatePortalUrl="/" />;
  }

  return <CandidateApp />;
}
