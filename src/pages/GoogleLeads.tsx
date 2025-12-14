import { useEffect } from 'react';
import { useLeads } from '@/contexts/LeadsContext';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';

export default function GoogleLeads() {
  const { setSourceFilter } = useLeads();

  useEffect(() => {
    setSourceFilter('google');
  }, [setSourceFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Google Ads Leads</h2>
        <p className="text-muted-foreground">Leads from Google Ads Lead Forms.</p>
      </div>

      <LeadFilters />
      <LeadsTable />
    </div>
  );
}
