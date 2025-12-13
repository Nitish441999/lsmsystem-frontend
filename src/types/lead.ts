export type LeadSource = 'website' | 'meta' | 'google';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  source: LeadSource;
  campaign?: string;
  service?: string;
  status: LeadStatus;
  createdAt: Date;
  assignedTo?: string;
  notes?: string;
}

export interface LeadStats {
  total: number;
  website: number;
  meta: number;
  google: number;
  newLeads: number;
  converted: number;
  conversionRate: number;
}

export interface ChartData {
  name: string;
  website: number;
  meta: number;
  google: number;
}
