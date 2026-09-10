# SKTECH EXAM — Dual-Project Vercel Deployment Architecture

This repository is structured to deploy **two fully independent, decoupled web applications** to Vercel from a single GitHub repository.

```
                  Google AI Studio
                         ↓
              Existing SKTECH EXAM Code
                         ↓
                 GitHub Repository
                         ↓
       ├── Candidate App → Vercel Project 1
       │                    ↓
       │             sktech-exam-portal.vercel.app
       │
       └── Admin App → Vercel Project 2
                            ↓
                     sktech-exam-admin.vercel.app
```

---

## Architecture Summary

| Characteristic | Vercel Project 1 (Candidate App) | Vercel Project 2 (Admin App) |
| :--- | :--- | :--- |
| **Domain** | `sktech-exam-portal.vercel.app` | `sktech-exam-admin.vercel.app` |
| **Entry Point** | `src/candidate-main.tsx` | `src/admin-main.tsx` |
| **HTML Entry** | `candidate.html` | `admin.html` |
| **Vite Config** | `vite.candidate.config.ts` | `vite.admin.config.ts` |
| **Build Command** | `npm run build:candidate` | `npm run build:admin` |
| **Output Directory** | `dist` | `dist` |
| **Included Features** | Mock Test Engines, Timer Pulse & Warning Chimes, Result Analytics, Voice Doubt Transcriber, Center Locator, Exam Alerts, Pre-test Ads, Razorpay/UPI Unlock | Question Bank CRUD, Batch JSON Upload, Mock Test Creator, Fee/Pricing Controls, Monetization Analytics, Administrative Login Gate |
| **Excluded Features** | No administrative routes, no question management, no pricing editors | No candidate test-taking engines, no exam sessions |

---

## Step-by-Step Vercel Setup

### 1. Deploying Candidate App (Vercel Project 1)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
2. Select and import your GitHub repository: `SKTECH EXAM`.
3. In **Project Name**, enter: `sktech-exam-portal` (or your desired portal domain).
4. Under **Build & Development Settings**, toggle **Override**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build:candidate`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, configure if needed:
   - `VITE_FIREBASE_PROJECT_ID`: (Your Firebase Project ID)
   - `VITE_ADMIN_PORTAL_URL`: `https://sktech-exam-admin.vercel.app`
6. Click **Deploy**.

> **Note on 405 Prevention**: The bundled `vercel.candidate.json` / `vercel.json` rewrites all client routes to `/candidate.html` and sets proper CORS & HTTP headers (`GET, POST, PUT, DELETE, OPTIONS`), preventing `405 Method Not Allowed` errors.

---

### 2. Deploying Admin App (Vercel Project 2)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
2. Select the **same** GitHub repository: `SKTECH EXAM`.
3. In **Project Name**, enter: `sktech-exam-admin`.
4. Under **Build & Development Settings**, toggle **Override**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build:admin`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, configure:
   - `VITE_CANDIDATE_PORTAL_URL`: `https://sktech-exam-portal.vercel.app`
6. Click **Deploy**.

---

## Local Development & Single-Server Preview

When running locally (`npm run dev`) or inside Google AI Studio:
- The server automatically provides the top **Architecture Ribbon** allowing instant switching between the Candidate Portal and Admin Console.
- Direct route mapping:
  - `http://localhost:3000/` → Candidate Portal (`CandidateApp.tsx`)
  - `http://localhost:3000/admin` → Admin Console (`AdminApp.tsx`)
  - `http://localhost:3000/candidate.html` → Pure Candidate HTML
  - `http://localhost:3000/admin.html` → Pure Admin HTML
