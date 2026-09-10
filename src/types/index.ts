/**
 * SKTECH EXAM — Core TypeScript Type Definitions
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

export type UserRole =
  | 'SUPER_ADMIN'
  | 'CONTENT_ADMIN'
  | 'EXAM_ADMIN'
  | 'REVIEWER'
  | 'OPERATOR'
  | 'SUB_ADMIN'
  | 'CANDIDATE';

export type ExamCategory =
  | 'BANKING'
  | 'SSC'
  | 'STATE_PSC'
  | 'POLICE'
  | 'RAILWAYS'
  | 'TEACHING'
  | 'ENGINEERING'
  | 'GENERAL_STUDIES';

export type PreparationMode = 'OBJECTIVE' | 'SUBJECTIVE';

export type SubjectiveBranchCategory = 'ENGINEERING' | 'GENERAL_LANGUAGE' | 'EXAM_SPECIFIC';

export interface EvaluationCriterion {
  criterionEn: string;
  criterionHi: string;
  maxMarks: number;
}

export interface SubjectiveQuestion {
  id: string;
  questionNumber: number;
  titleEn: string;
  titleHi: string;
  marks: number;
  wordLimit: number;
  topicsCovered: string[];
  difficulty: DifficultyLevel;
  modelAnswerEn: string;
  modelAnswerHi: string;
  evaluationRubric: EvaluationCriterion[];
  keyPointsEn: string[];
  keyPointsHi: string[];
}

export interface SubjectiveMockPaper {
  id: string;
  code: string;
  titleEn: string;
  titleHi: string;
  branchCategory: SubjectiveBranchCategory;
  branchNameEn: string;
  branchNameHi: string;
  subTopics: string[];
  subTopicsHi: string[];
  examTarget: string;
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  isFree: boolean;
  priceInr?: number;
  attemptsCount: number;
  questions: SubjectiveQuestion[];
  instructionsEn: string[];
  instructionsHi: string[];
}

export type DifficultyLevel = 'EASY' | 'NORMAL' | 'MODERATE' | 'HARD';

export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'ASSERTION_REASON' | 'NUMERICAL';

export type AttemptStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'AUTO_SUBMITTED' | 'EXPIRED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  targetExam?: string;
  joinedDate: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  phoneVerified?: boolean;
  emailVerified?: boolean;
  permissions?: string[];
  lastLogin?: string;
}

export interface MultiPlatformDeployment {
  platform: 'WEB' | 'WINDOWS_EXE' | 'ANDROID_APK';
  title: string;
  version: string;
  buildNumber: string;
  targetEnv: string;
  binarySize: string;
  checksumSha256: string;
  status: 'READY' | 'DEPLOYED' | 'AVAILABLE';
  packageFormat: string;
  downloadUrl?: string;
  features: string[];
}

export interface Exam {
  id: string;
  code: string;
  title: string;
  category: ExamCategory;
  description: string;
  bannerColor: string;
  totalTests: number;
  totalQuestions: number;
  enrolledCandidates: number;
  featured?: boolean;
}

export interface Subject {
  id: string;
  examId?: string;
  code: string;
  nameEn: string;
  nameHi: string;
  totalTopics: number;
}

export interface Topic {
  id: string;
  subjectId: string;
  nameEn: string;
  nameHi: string;
  questionCount: number;
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  textEn: string;
  textHi: string;
}

export interface Question {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  examCategory: ExamCategory;
  examTarget: string;
  year?: number;
  difficulty: DifficultyLevel;
  type: QuestionType;
  textEn: string;
  textHi: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanationEn: string;
  explanationHi: string;
  marksPositive: number;
  marksNegative: number;
  tags: string[];
  status: 'PUBLISHED' | 'NEEDS_REVIEW' | 'DRAFT';
  source?: string;
  duplicateConfidence?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MockTestSection {
  id: string;
  subjectId: string;
  subjectName: string;
  nameEn: string;
  nameHi: string;
  questionCount: number;
  durationMinutes?: number;
  marksPerQuestion: number;
  negativeMarking: number;
}

export interface MockTest {
  id: string;
  code: string;
  title: string;
  titleHi?: string;
  examId: string;
  examTitle: string;
  category: ExamCategory;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  negativeMarking: number;
  sections: MockTestSection[];
  difficulty: DifficultyLevel;
  isFree: boolean;
  priceInr?: number;
  attemptsCount: number;
  averageScore?: number;
  passingMarks?: number;
  instructionsEn: string[];
  instructionsHi: string[];
}

export interface AttemptAnswer {
  questionId: string;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
  visited: boolean;
}

export interface ExamAttempt {
  id: string;
  userId: string;
  testId: string;
  testTitle: string;
  category: ExamCategory;
  startedAt: string;
  submittedAt?: string;
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  status: AttemptStatus;
  answers: Record<string, AttemptAnswer>;
}

export interface ResultScorecard {
  attemptId: string;
  testId: string;
  testTitle: string;
  candidateName: string;
  submittedAt: string;
  totalQuestions: number;
  totalMarks: number;
  scoreObtained: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedQuestions: number;
  markedForReview: number;
  accuracyPercentage: number;
  attemptPercentage: number;
  totalTimeTakenSeconds: number;
  percentile: number;
  rank: number;
  totalParticipants: number;
  subjectPerformance: {
    subjectName: string;
    totalQuestions: number;
    attempted: number;
    correct: number;
    wrong: number;
    score: number;
    accuracy: number;
  }[];
}

export interface CurrentAffairItem {
  id: string;
  date: string;
  category: string;
  titleEn: string;
  titleHi: string;
  summaryEn: string;
  summaryHi: string;
  source: string;
  mcq?: {
    questionEn: string;
    questionHi: string;
    options: QuestionOption[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanationEn: string;
    explanationHi: string;
  };
}

export interface ImportBatch {
  id: string;
  fileName: string;
  fileType: 'CSV' | 'XLSX' | 'PDF' | 'DOCX' | 'OCR_IMAGE';
  uploadedBy: string;
  uploadedAt: string;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicatesFound: number;
  status: 'QUEUED' | 'PARSING' | 'COMPLETED' | 'NEEDS_REVIEW' | 'FAILED';
  previewItems?: Partial<Question>[];
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  entityId: string;
  timestamp: string;
  details: string;
}

export interface SystemMetrics {
  totalCandidates: number;
  activeCandidates: number;
  totalQuestions: number;
  pendingQuestions: number;
  publishedQuestions: number;
  totalMockTests: number;
  todayAttempts: number;
  todayRegistrations: number;
  serverHealth: 'HEALTHY' | 'DEGRADED';
  databaseStatus: 'CONNECTED (PostgreSQL)' | 'ONLINE';
  storageUsageMb: number;
  apiVersion: string;
}

export interface AdCampaign {
  id: string;
  brand: string;
  title: string;
  titleHi?: string;
  category: 'EDUCATION' | 'ECOMMERCE' | 'STUDY_MATERIAL';
  description: string;
  descriptionHi?: string;
  ctaText: string;
  badgeText: string;
  clickUrl: string;
  imageUrl?: string;
  impressionsCount: number;
  clicksCount: number;
  active: boolean;
}

export interface MonetizationStats {
  totalImpressions: number;
  totalClicks: number;
  totalEarningsInr: number;
  cpmRateInr: number;
  cpcRateInr: number;
  ctrPercentage: number;
  blockedUnsafeAttempts: number;
  campaigns: AdCampaign[];
}

export interface AdminCredentialsInfo {
  username: string;
  lastUpdated: string;
}

export interface DailyRevenueData {
  date: string;
  formattedDate: string;
  adImpressions: number;
  adClicks: number;
  adRevenue: number;
  microTransactionsCount: number;
  microTransactionsRevenue: number;
  totalRevenue: number;
  cumulativeRevenue?: number;
  cpm: number;
}

export interface RevenueAnalyticsStats {
  thirtyDayTotalRevenue: number;
  thirtyDayAdEarnings: number;
  thirtyDayMicroEarnings: number;
  thirtyDayTransactionsCount: number;
  thirtyDayImpressions: number;
  thirtyDayClicks: number;
  averageDailyRevenue: number;
  highestDay: { date: string; formattedDate: string; amount: number; adAmount: number; microAmount: number };
  growthPercentage: number;
  avgOrderValue: number;
  revenueByExamCategory: { category: string; amount: number; percentage: number; color: string }[];
  revenueBySource: { name: string; value: number; color: string }[];
  dailyTrends: DailyRevenueData[];
}

export interface SpeedBoosterTrack {
  id: string;
  code: string;
  trackType: 'TRACK_1_SOLVING' | 'TRACK_2_READING';
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  defaultDurationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  marksPositive: number;
  marksNegative: number;
  subjects: string[];
  subjectsHi: string[];
  tags: string[];
  icon: string;
  attemptsCount: number;
}

export interface CombinedMockPaperSection {
  paperNameEn: string;
  paperNameHi: string;
  durationMinutes: number;
  questionCount: number;
  totalMarks: number;
  marksPositive: number;
  marksNegative: number;
  subjects: string[];
  subjectsHi: string[];
}

export interface CombinedMockPackage {
  id: string;
  code: string;
  examCategory: 'STATE_PSC' | 'BANKING' | 'SSC' | 'RAILWAYS' | 'POLICE';
  examTarget: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  totalPapers: number;
  combinedDurationMinutes: number;
  combinedTotalQuestions: number;
  combinedTotalMarks: number;
  papers: CombinedMockPaperSection[];
  isFree: boolean;
  priceInr?: number;
  attemptsCount: number;
  passingScore?: number;
}


