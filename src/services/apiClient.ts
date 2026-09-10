/**
 * SKTECH EXAM — Central API Client
 * Brand: SKTECH • All Rights Reserved © 2026
 */

import {
  Exam,
  Subject,
  Topic,
  Question,
  MockTest,
  ExamAttempt,
  ResultScorecard,
  CurrentAffairItem,
  User,
  AuditLogEntry,
  SystemMetrics,
  MonetizationStats,
  MultiPlatformDeployment,
  RevenueAnalyticsStats,
  SubjectiveMockPaper,
  SpeedBoosterTrack,
  CombinedMockPackage,
} from '../types';

const API_BASE: string = '/api/v1';

let adminToken: string | null = null;
let candidateToken: string | null = null;

export function setAdminToken(token: string | null) {
  adminToken = token;
  if (token) {
    localStorage.setItem('sktech_admin_token', token);
  } else {
    localStorage.removeItem('sktech_admin_token');
  }
}

export function getStoredAdminToken(): string | null {
  if (!adminToken) {
    adminToken = localStorage.getItem('sktech_admin_token');
  }
  return adminToken;
}

export function setCandidateToken(token: string | null) {
  candidateToken = token;
  if (token) {
    localStorage.setItem('sktech_cand_token', token);
  } else {
    localStorage.removeItem('sktech_cand_token');
  }
}

export function getStoredCandidateToken(): string | null {
  if (!candidateToken) {
    candidateToken = localStorage.getItem('sktech_cand_token');
  }
  return candidateToken;
}

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getStoredAdminToken() || getStoredCandidateToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}`, 'x-admin-token': token } : {}),
    ...(options?.headers as Record<string, string>),
  };

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let response = await fetch(`${API_BASE}${cleanEndpoint}`, {
    ...options,
    headers,
  });

  // Resilient fallback: If 405 Method Not Allowed or 404 is encountered, attempt secondary root `/api`
  if ((response.status === 405 || response.status === 404) && API_BASE !== '/api') {
    try {
      const fallbackResponse = await fetch(`/api${cleanEndpoint}`, {
        ...options,
        headers,
      });
      if (fallbackResponse.ok) {
        return fallbackResponse.json();
      }
    } catch {
      // Continue to default error handling
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // System Health & Architecture Specs
  async getHealth(): Promise<{ success: boolean; status: string; metrics: SystemMetrics }> {
    return fetchJson('/health');
  },

  async getSpecs(): Promise<{ success: boolean; architecture: any }> {
    return fetchJson('/specs');
  },

  // Exams
  async getExams(category?: string): Promise<{ success: boolean; data: Exam[] }> {
    const query = category && category !== 'ALL' ? `?category=${category}` : '';
    return fetchJson(`/exams${query}`);
  },

  async getExamDetail(id: string): Promise<{ success: boolean; data: Exam & { mockTests: MockTest[] } }> {
    return fetchJson(`/exams/${id}`);
  },

  // Subjects & Topics
  async getSubjects(): Promise<{ success: boolean; data: Subject[] }> {
    return fetchJson('/subjects');
  },

  async getTopics(subjectId?: string): Promise<{ success: boolean; data: Topic[] }> {
    const query = subjectId ? `?subjectId=${subjectId}` : '';
    return fetchJson(`/topics${query}`);
  },

  // Questions
  async getQuestions(filters?: {
    subjectId?: string;
    difficulty?: string;
    search?: string;
    status?: string;
    category?: string;
  }): Promise<{ success: boolean; count: number; data: Question[] }> {
    const params = new URLSearchParams();
    if (filters?.subjectId) params.append('subjectId', filters.subjectId);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.category) params.append('category', filters.category);

    const query = params.toString() ? `?${params.toString()}` : '';
    return fetchJson(`/questions${query}`);
  },

  async createQuestion(question: Partial<Question>): Promise<{ success: boolean; data: Question }> {
    return fetchJson('/questions', {
      method: 'POST',
      body: JSON.stringify(question),
    });
  },

  // Mock Tests
  async getMockTests(category?: string, examId?: string): Promise<{ success: boolean; data: MockTest[] }> {
    const params = new URLSearchParams();
    if (category && category !== 'ALL') params.append('category', category);
    if (examId) params.append('examId', examId);
    const query = params.toString() ? `?${params.toString()}` : '';
    return fetchJson(`/mock-tests${query}`);
  },

  async getMockTestDetail(id: string): Promise<{ success: boolean; data: MockTest & { questions: Question[] } }> {
    return fetchJson(`/mock-tests/${id}`);
  },

  // Exam Engine
  async startAttempt(testId: string): Promise<{
    success: boolean;
    data: { attempt: ExamAttempt; test: MockTest; questions: Question[] };
  }> {
    return fetchJson('/attempts/start', {
      method: 'POST',
      body: JSON.stringify({ testId }),
    });
  },

  async saveAttempt(attemptId: string, answers: any, timeRemainingSeconds: number): Promise<{ success: boolean }> {
    return fetchJson(`/attempts/${attemptId}/save`, {
      method: 'POST',
      body: JSON.stringify({ answers, timeRemainingSeconds }),
    });
  },

  async submitAttempt(
    attemptId: string,
    answers: any,
    timeRemainingSeconds: number
  ): Promise<{ success: boolean; data: ResultScorecard }> {
    return fetchJson(`/attempts/${attemptId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers, timeRemainingSeconds }),
    });
  },

  async getResult(attemptId: string): Promise<{ success: boolean; data: ResultScorecard }> {
    return fetchJson(`/results/${attemptId}`);
  },

  async getLatestCandidateResult(candidateId?: string): Promise<{ success: boolean; data: ResultScorecard | null }> {
    const query = candidateId ? `?candidateId=${encodeURIComponent(candidateId)}` : '';
    return fetchJson(`/results/candidate/latest${query}`);
  },

  // Subjective & Descriptive Papers
  async getSubjectiveMocks(): Promise<{ success: boolean; count: number; data: SubjectiveMockPaper[] }> {
    return fetchJson('/subjective-mocks');
  },

  async getSubjectiveMockDetail(id: string): Promise<{ success: boolean; data: SubjectiveMockPaper }> {
    return fetchJson(`/subjective-mocks/${id}`);
  },

  // Speed Boosters
  async getSpeedBoosters(): Promise<{ success: boolean; count: number; data: SpeedBoosterTrack[] }> {
    return fetchJson('/speed-boosters');
  },

  // Combined Multi-Paper Mocks
  async getCombinedMocks(): Promise<{ success: boolean; count: number; data: CombinedMockPackage[] }> {
    return fetchJson('/combined-mocks');
  },

  // Current Affairs
  async getCurrentAffairs(): Promise<{ success: boolean; data: CurrentAffairItem[] }> {
    return fetchJson('/current-affairs');
  },

  // Admin Portal APIs
  async getAdminOverview(): Promise<{ success: boolean; data: any }> {
    return fetchJson('/admin/overview');
  },

  async previewImport(fileName: string): Promise<{ success: boolean; [key: string]: any }> {
    return fetchJson('/admin/imports/preview', {
      method: 'POST',
      body: JSON.stringify({ fileName }),
    });
  },

  async getCandidates(): Promise<{ success: boolean; data: User[] }> {
    return fetchJson('/admin/candidates');
  },

  async getAuditLogs(): Promise<{ success: boolean; data: AuditLogEntry[] }> {
    return fetchJson('/admin/audit-logs');
  },

  // Authentication & Admin Settings
  async adminLogin(username: string, password: string): Promise<{ success: boolean; token: string; user: User }> {
    const res = await fetchJson<{ success: boolean; token: string; user: User }>('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (res.token) {
      setAdminToken(res.token);
    }
    return res;
  },

  async getAdminCredentials(): Promise<{ success: boolean; data: { username: string; lastUpdated: string } }> {
    return fetchJson('/auth/admin/credentials');
  },

  async updateAdminCredentials(currentPassword: string, newUsername: string, newPassword?: string): Promise<{ success: boolean; message: string; username?: string; error?: string }> {
    return fetchJson('/auth/admin/credentials', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newUsername, newPassword }),
    });
  },

  // Candidate Authentication
  async registerCandidate(name: string, email: string, password: string, targetExam?: string): Promise<{ success: boolean; token?: string; user?: User; message?: string }> {
    return fetchJson('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, targetExam }),
    });
  },

  async loginCandidate(email: string, password: string): Promise<{ success: boolean; token: string; user: User }> {
    const res = await fetchJson<{ success: boolean; token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      setCandidateToken(res.token);
    }
    return res;
  },

  // Candidate Mistakes & Analytics
  async getCandidateMistakes(candidateId: string): Promise<{ success: boolean; count: number; data: any[] }> {
    return fetchJson(`/candidates/${candidateId}/mistakes`);
  },

  async getCandidateAnalytics(candidateId: string): Promise<{ success: boolean; data: any }> {
    return fetchJson(`/candidates/${candidateId}/analytics`);
  },

  // Admin Review Queue & Duplicates
  async getReviewQueue(): Promise<{ success: boolean; count: number; data: any[] }> {
    return fetchJson('/admin/review-queue');
  },

  async resolveReviewItem(id: string, action: string): Promise<{ success: boolean; message: string }> {
    return fetchJson(`/admin/review-queue/${id}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  },

  async getDuplicates(): Promise<{ success: boolean; count: number; data: any[] }> {
    return fetchJson('/admin/duplicates');
  },

  async resolveDuplicate(id: string, action: string): Promise<{ success: boolean; message: string }> {
    return fetchJson(`/admin/duplicates/${id}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  },

  // Monetization & Clean Ad Inventory
  async getMonetizationStats(): Promise<{ success: boolean; data: MonetizationStats }> {
    return fetchJson('/monetization/stats');
  },

  async getRevenueAnalytics(): Promise<{ success: boolean; data: RevenueAnalyticsStats }> {
    return fetchJson('/monetization/analytics');
  },

  async trackAdEvent(campaignId: string, type: 'IMPRESSION' | 'CLICK'): Promise<{ success: boolean; data: MonetizationStats }> {
    return fetchJson('/monetization/track', {
      method: 'POST',
      body: JSON.stringify({ campaignId, type }),
    });
  },

  async updateMockTestPricing(testId: string, isFree: boolean, priceInr: number): Promise<{ success: boolean; message: string }> {
    return fetchJson(`/mock-tests/${testId}/pricing`, {
      method: 'PUT',
      body: JSON.stringify({ isFree, priceInr }),
    });
  },

  async unlockMockTest(testId: string, userId?: string): Promise<{ success: boolean; message: string; receiptId: string }> {
    return fetchJson('/payments/unlock', {
      method: 'POST',
      body: JSON.stringify({ testId, userId }),
    });
  },

  async getCandidateUnlockedTests(candidateId: string): Promise<{ success: boolean; data: string[] }> {
    return fetchJson(`/candidates/${candidateId}/unlocked-tests`);
  },

  // Multi-Verification & OTP Services
  async sendPhoneOtp(phone: string): Promise<{ success: boolean; message: string; testOtp?: string }> {
    return fetchJson('/auth/otp/send', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  async verifyPhoneOtp(
    phone: string,
    otp: string,
    candidateData?: { name?: string; email?: string; targetExam?: string }
  ): Promise<{ success: boolean; token?: string; user?: User; message: string; isNewUser?: boolean; requiresEmailVerification?: boolean }> {
    return fetchJson('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, ...candidateData }),
    });
  },

  async googleOAuthLogin(profile: { email: string; name: string; avatarUrl?: string }): Promise<{ success: boolean; token: string; user: User; message: string }> {
    return fetchJson('/auth/oauth/google', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  },

  async appleOAuthLogin(appleId: string, name?: string): Promise<{ success: boolean; token: string; user: User; message: string }> {
    return fetchJson('/auth/oauth/apple', {
      method: 'POST',
      body: JSON.stringify({ appleId, name }),
    });
  },

  // Operator & Sub-Admin Role Management
  async getSubAdmins(): Promise<{ success: boolean; data: User[] }> {
    return fetchJson('/admin/sub-admins');
  },

  async createSubAdmin(data: {
    name: string;
    email: string;
    password: string;
    role: 'OPERATOR' | 'SUB_ADMIN' | 'CONTENT_ADMIN' | 'REVIEWER';
    permissions: string[];
    targetExam?: string;
  }): Promise<{ success: boolean; user: User; message: string }> {
    return fetchJson('/admin/sub-admins/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Multi-Platform Deployments (Web, Windows EXE, Android APK)
  async getPlatformDeployments(): Promise<{ success: boolean; data: MultiPlatformDeployment[] }> {
    return fetchJson('/deployments/platforms');
  },

  // Gemini Search Grounding (gemini-3.5-flash with googleSearch)
  async groundedSearch(query: string): Promise<{
    success: boolean;
    data: {
      query: string;
      answer: string;
      sources: Array<{ title: string; url: string }>;
      searchQueries?: string[];
      model: string;
      timestamp: string;
    };
  }> {
    return fetchJson('/ai/grounded-search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },

  // Gemini Audio Transcription (gemini-3.5-transcribe)
  async transcribeAudio(
    audioBase64: string,
    mimeType: string = 'audio/webm'
  ): Promise<{
    success: boolean;
    data: {
      transcription: string;
      model: string;
      timestamp: string;
      note?: string;
    };
  }> {
    return fetchJson('/ai/transcribe-audio', {
      method: 'POST',
      body: JSON.stringify({ audioBase64, mimeType }),
    });
  },

  // Gemini Maps Grounding (gemini-3.5-flash with googleMaps)
  async mapsGrounding(
    query: string,
    latitude?: number,
    longitude?: number
  ): Promise<{
    success: boolean;
    data: {
      query: string;
      answer: string;
      places: Array<{ title: string; uri: string; address?: string; snippet?: string }>;
      model: string;
      timestamp: string;
    };
  }> {
    return fetchJson('/ai/maps-grounding', {
      method: 'POST',
      body: JSON.stringify({ query, latitude, longitude }),
    });
  },
};


