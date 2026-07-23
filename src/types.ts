export type PageTab = 'home' | 'about' | 'products' | 'wellpath' | 'capability' | 'contact';

export type TrustModalType = 'privacy' | 'terms' | 'accessibility' | 'responsible-ai' | 'company-details' | null;

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  logoUrl?: string;
  statusBadge: string;
  statusBadgeColor?: 'gold' | 'emerald' | 'blue' | 'purple';
  isPublishedOnAppStore?: boolean;
  appStoreUrl?: string;
  websiteUrl?: string;
  isFeatured?: boolean;
  isUpcoming?: boolean;
  keyFeatures: string[];
  techCapabilities: string[];
}

export interface WellPathJourneyStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  userAction: string;
  systemAction: string;
  barrierResolution: string;
}

export interface ProgramMatch {
  id: string;
  title: string;
  provider: string;
  category: string;
  cost: string;
  delivery: string;
  matchScore: number;
  explainability: string;
  nextAction: string;
}

export interface EnquiryForm {
  name: string;
  organisation: string;
  email: string;
  reason: 'Government and partnerships' | 'WellPath' | 'Product enquiry' | 'Technical support' | 'General enquiry';
  message: string;
  consent: boolean;
}

export interface CompanyDetails {
  legalName: string;
  entityType: string;
  abn: string;
  acn: string;
  headquarters: string;
  locationDetails: string;
  foundedYear: number;
  gstStatus: string;
  email: string;
  website: string;
}
