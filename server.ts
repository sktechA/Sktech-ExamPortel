/**
 * SKTECH EXAM — Central Node.js / Express Server
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 * Port: 3000 (Mandatory platform port)
 */

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/api';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Global CORS & Preflight OPTIONS Handler (Prevents 405 Method Not Allowed on API and Auth routes)
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-token, *');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    next();
  });

  // Basic request security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Mount Central REST API router at both /api/v1 AND /api
  app.use('/api/v1', apiRouter);
  app.use('/api', apiRouter);

  // Direct alias forwarding for /auth, /admin/login, /login, and /register
  app.use('/auth', (req, res, next) => {
    req.url = '/auth' + (req.url === '/' ? '' : req.url);
    apiRouter(req, res, next);
  });
  app.use(['/admin/login', '/login', '/register'], (req, res, next) => {
    apiRouter(req, res, next);
  });

  // Vite middleware for development vs Static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Protect against 405 Method Not Allowed when forms submit POST to HTML routes (e.g. / or /admin)
    app.use((req, res, next) => {
      if (req.method === 'POST' && !req.path.startsWith('/api') && !req.path.startsWith('/auth')) {
        return res.redirect(req.originalUrl);
      }
      next();
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Catch-all SPA handler for production (handles GET, POST, etc. without 405 error)
    app.all('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
        return res.status(404).json({
          success: false,
          code: 'API_ENDPOINT_NOT_FOUND',
          message: `Endpoint ${req.method} ${req.originalUrl} not found.`,
        });
      }
      if (req.path.startsWith('/admin')) {
        const adminHtml = path.join(distPath, 'admin.html');
        if (fs.existsSync(adminHtml)) {
          return res.sendFile(adminHtml);
        }
      }
      if (req.path.startsWith('/candidate')) {
        const candidateHtml = path.join(distPath, 'candidate.html');
        if (fs.existsSync(candidateHtml)) {
          return res.sendFile(candidateHtml);
        }
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SKTECH EXAM] Server running at http://0.0.0.0:${PORT}`);
    console.log(`[SKTECH EXAM] Central API live at http://0.0.0.0:${PORT}/api/v1/health`);
  });
}

startServer().catch((err) => {
  console.error('[SKTECH EXAM] Fatal server startup error:', err);
  process.exit(1);
});
