import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { LeadsChart } from '@/components/dashboard/LeadsChart';
import { SourceDistribution } from '@/components/dashboard/SourceDistribution';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
        <p className="text-muted-foreground">Performance insights and conversion tracking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadsChart />
        <SourceDistribution />
      </div>

      <StatsGrid />
    </div>
  );
}
