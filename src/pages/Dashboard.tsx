import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { LeadsChart } from '@/components/dashboard/LeadsChart';
import { RecentLeads } from '@/components/leads/RecentLeads';
import { SourceDistribution } from '@/components/dashboard/SourceDistribution';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's your lead overview.</p>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeadsChart />
        </div>
        <div className="space-y-6">
          <SourceDistribution />
        </div>
      </div>

      <RecentLeads />
    </div>
  );
}
