/**
 * SKTECH EXAM — Central Node.js / Express Server
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 * Port: 3000 (Mandatory platform port)
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/api';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Basic request security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Mount Central REST API v1 FIRST
  app.use('/api/v1', apiRouter);

  // Fallback API root
  app.get('/api', (req: Request, res: Response) => {
    res.json({
      name: 'SKTECH EXAM API',
      version: '1.0.0-phase1',
      brand: 'SKTECH',
      footer: 'Powered by SKTECH • All Rights Reserved © 2026',
      endpoints: [
        '/api/v1/health',
        '/api/v1/specs',
        '/api/v1/exams',
        '/api/v1/subjects',
        '/api/v1/questions',
        '/api/v1/mock-tests',
        '/api/v1/attempts',
        '/api/v1/results/:attemptId',
        '/api/v1/current-affairs',
        '/api/v1/admin/overview',
      ],
    });
  });

  // Vite middleware for development vs Static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
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
