import { Users, Globe, Facebook, Chrome, TrendingUp, UserCheck } from 'lucide-react';
import { StatCard } from './StatCard';
import { Lead } from '@/types/lead';

const mockLeads: Lead[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com', phone: '+1 (555) 123-4567', company: 'TechCorp Inc.', source: 'website', service: 'Digital Marketing', status: 'new', createdAt: new Date('2024-12-13T10:30:00') },
  { id: '2', name: 'Michael Chen', email: 'mchen@globalventures.io', phone: '+1 (555) 234-5678', company: 'Global Ventures', source: 'meta', campaign: 'Holiday Sale 2024', service: 'Social Media Management', status: 'contacted', createdAt: new Date('2024-12-13T09:15:00') },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.r@startuplab.co', phone: '+1 (555) 345-6789', company: 'StartupLab', source: 'google', campaign: 'Search - Marketing Services', service: 'SEO Services', status: 'qualified', createdAt: new Date('2024-12-12T16:45:00') },
  { id: '4', name: 'David Kim', email: 'dkim@innovate.tech', phone: '+1 (555) 456-7890', company: 'Innovate Tech', source: 'meta', campaign: 'Brand Awareness Q4', service: 'PPC Advertising', status: 'converted', createdAt: new Date('2024-12-12T14:20:00') },
  { id: '5', name: 'Lisa Thompson', email: 'lisa.t@retailplus.com', phone: '+1 (555) 567-8901', company: 'RetailPlus', source: 'website', service: 'E-commerce Solutions', status: 'new', createdAt: new Date('2024-12-12T11:00:00') },
  { id: '6', name: 'James Wilson', email: 'jwilson@financegroup.com', phone: '+1 (555) 678-9012', company: 'Finance Group LLC', source: 'google', campaign: 'Display - Financial Services', service: 'Content Marketing', status: 'contacted', createdAt: new Date('2024-12-11T15:30:00') },
  { id: '7', name: 'Amanda Garcia', email: 'agarcia@healthtech.io', phone: '+1 (555) 789-0123', company: 'HealthTech Solutions', source: 'meta', campaign: 'Healthcare B2B', service: 'Lead Generation', status: 'qualified', createdAt: new Date('2024-12-11T10:15:00') },
  { id: '8', name: 'Robert Brown', email: 'rbrown@manufacturing.co', phone: '+1 (555) 890-1234', company: 'Manufacturing Co', source: 'website', service: 'Brand Strategy', status: 'new', createdAt: new Date('2024-12-10T14:45:00') },
  { id: '9', name: 'Jennifer Lee', email: 'jlee@eduplatform.com', phone: '+1 (555) 901-2345', company: 'EduPlatform', source: 'google', campaign: 'Search - Education Sector', service: 'Video Marketing', status: 'converted', createdAt: new Date('2024-12-10T09:30:00') },
  { id: '10', name: 'Christopher Martinez', email: 'cmartinez@logisticspro.com', phone: '+1 (555) 012-3456', company: 'LogisticsPro', source: 'meta', campaign: 'Retargeting - Past Visitors', service: 'Website Development', status: 'contacted', createdAt: new Date('2024-12-09T16:00:00') },
];

export function StatsGrid() {
  const leads = mockLeads;

  const stats = {
    total: leads.length,
    website: leads.filter((l) => l.source === 'website').length,
    meta: leads.filter((l) => l.source === 'meta').length,
    google: leads.filter((l) => l.source === 'google').length,
    newLeads: leads.filter((l) => l.status === 'new').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    conversionRate: leads.length > 0 ? Math.round((leads.filter((l) => l.status === 'converted').length / leads.length) * 100) : 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Leads"
        value={stats.total}
        change={12}
        icon={<Users className="w-6 h-6 text-primary" />}
        iconBg="bg-primary/10"
      />
      <StatCard
        title="Website Leads"
        value={stats.website}
        change={8}
        icon={<Globe className="w-6 h-6 text-source-website" />}
        iconBg="bg-source-website/10"
      />
      <StatCard
        title="Meta Ads Leads"
        value={stats.meta}
        change={15}
        icon={<Facebook className="w-6 h-6 text-source-meta" />}
        iconBg="bg-source-meta/10"
      />
      <StatCard
        title="Google Ads Leads"
        value={stats.google}
        change={-3}
        icon={<Chrome className="w-6 h-6 text-source-google" />}
        iconBg="bg-source-google/10"
      />
      <StatCard
        title="New Leads Today"
        value={stats.newLeads}
        icon={<TrendingUp className="w-6 h-6 text-status-new" />}
        iconBg="bg-status-new/10"
      />
      <StatCard
        title="Converted"
        value={stats.converted}
        change={25}
        icon={<UserCheck className="w-6 h-6 text-status-qualified" />}
        iconBg="bg-status-qualified/10"
      />
      <StatCard
        title="Conversion Rate"
        value={`${stats.conversionRate}%`}
        change={5}
        icon={<TrendingUp className="w-6 h-6 text-status-converted" />}
        iconBg="bg-status-converted/10"
        className="lg:col-span-2"
      />
    </div>
  );
}
