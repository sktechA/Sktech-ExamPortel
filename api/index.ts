/**
 * Vercel Serverless Function Gateway
 * Routes all /api/* and /auth/* requests to the unified Central Database & API Router
 */

import express, { Request, Response } from 'express';
import { apiRouter } from '../server/api';

const app = express();

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

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Set secure response headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Mount Central REST API router at both /api/v1 AND /api
app.use('/api/v1', apiRouter);
app.use('/api', apiRouter);
app.use('/auth', apiRouter);

// Comprehensive direct auth endpoints (prevents path-stripping 404s)
const directAuthPaths = new Set([
  '/login',
  '/signin',
  '/signup',
  '/register',
  '/admin/login',
  '/admin/signin',
  '/admin/auth/login',
  '/candidate/login',
  '/candidate/signin',
  '/candidate/register',
  '/candidate/signup',
  '/logout',
  '/admin/logout',
  '/candidate/logout',
  '/auth/me',
  '/auth/session',
  '/auth/status',
  '/me',
  '/session',
  '/otp/send',
  '/otp/verify',
]);

app.use((req: Request, res: Response, next) => {
  const rawPath = req.path.toLowerCase().replace(/\/+$/, '');
  if (directAuthPaths.has(rawPath) || rawPath.startsWith('/api') || rawPath.startsWith('/auth')) {
    return apiRouter(req, res, next);
  }
  next();
});

// Fallback for unmatched serverless routes
app.all('*', (req: Request, res: Response) => {
  apiRouter(req, res, () => {
    res.status(404).json({
      success: false,
      code: 'SERVERLESS_ENDPOINT_NOT_FOUND',
      message: `Endpoint ${req.method} ${req.originalUrl} not found on serverless gateway.`,
    });
  });
});

export default app;
