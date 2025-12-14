import { useEffect } from 'react';
import { useLeads } from '@/contexts/LeadsContext';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';

export default function MetaLeads() {
  const { setSourceFilter } = useLeads();

  useEffect(() => {
    setSourceFilter('meta');
  }, [setSourceFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Meta Ads Leads</h2>
        <p className="text-muted-foreground">Leads from Facebook & Instagram Ads campaigns.</p>
      </div>

      <LeadFilters />
      <LeadsTable />
    </div>
  );
}
