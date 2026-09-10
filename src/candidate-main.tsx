/**
 * SKTECH EXAM — Candidate Portal Entry Point
 * Vercel Project 1: sktech-exam-portal.vercel.app
 * Independent bundle containing only candidate features.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CandidateApp from './CandidateApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CandidateApp />
  </StrictMode>
);
