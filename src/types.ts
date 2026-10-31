export type Language = 'id' | 'en';

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  normalPriceIdr: number;
  priceIdr: number;
  normalPriceUsd?: number;
  priceUsd: number;
  discountPercentage: number;
  highlighted?: boolean;
  idealFor: string;
  deliveryTime: string;
  features: string[];
  posIncluded?: boolean;
  posFeatures?: string[];
  ctaLabel: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
  metrics: string;
  features: string[];
  url?: string;
}

export interface BentoService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isSpecial?: boolean;
  hasImage?: boolean;
  imageUrl?: string;
  badge?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PosProduct {
  id: string;
  name: string;
  category: 'beverage' | 'food' | 'retail' | 'service';
  price: number;
  stock: number;
  sku: string;
  icon: string;
}

export interface PosCartItem {
  product: PosProduct;
  quantity: number;
}

export interface PosReceipt {
  transactionId: string;
  date: string;
  items: PosCartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'QRIS' | 'Tunai (Cash)' | 'Transfer VA';
  cashierName: string;
}

// Client Portal & Agency Types
export type IndustryVertical = 'All' | 'Enterprise SaaS' | 'FinTech & Banking' | 'Cloud & Data Infrastructure';

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: 'Enterprise SaaS' | 'FinTech & Banking' | 'Cloud & Data Infrastructure';
  headline: string;
  imagePath: string;
  keyMetric: string;
  secondaryMetrics: string[];
  challenge: string;
  solution: string;
  architectureHighlights: string[];
  stack: string[];
  clientQuote: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Systems Architecture' | 'Data Intelligence' | 'Scaling Strategy' | 'Security & DevSecOps';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  progressPercent: number;
  signOffBy?: string;
  deliverablesCount: number;
  description: string;
}

export interface ProjectDeliverable {
  id: string;
  name: string;
  fileType: 'PDF' | 'JSON' | 'MD' | 'ARCHIVE';
  size: string;
  date: string;
  milestonePhase: string;
  description: string;
}

export interface SystemTelemetry {
  uptime: string;
  p99Latency: string;
  activeNodes: string;
  errorBudgetRemaining: string;
  dailyRequests: string;
  securityIncidents: number;
}

export interface ClientProject {
  id: string;
  projectName: string;
  clientCompany: string;
  phase: string;
  overallProgress: number;
  health: 'Optimal' | 'Stable' | 'Critical';
  startDate: string;
  targetCutover: string;
  assignedLeadArchitect: {
    name: string;
    title: string;
    email: string;
  };
  telemetry: SystemTelemetry;
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'Client Administrator' | 'Engineering Stakeholder';
  projectId: string;
}

export interface ConsultationSubmission {
  fullName: string;
  corporateEmail: string;
  company: string;
  primaryService: string;
  timeline: string;
  budgetRange: string;
  projectBrief: string;
  submittedAt: string;
}
