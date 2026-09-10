/**
 * SKTECH EXAM — Admin Console Entry Point
 * Vercel Project 2: sktech-exam-admin.vercel.app
 * Independent bundle containing exclusively admin console & question controls.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminApp from './AdminApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminApp />
  </StrictMode>
);
