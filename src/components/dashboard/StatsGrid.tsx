import { Users, Globe, Facebook, Chrome, TrendingUp, UserCheck } from 'lucide-react';
import { StatCard } from './StatCard';
import { useLeads } from '@/contexts/LeadsContext';

export function StatsGrid() {
  const { leads } = useLeads();

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
