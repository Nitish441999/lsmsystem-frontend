import { useEffect } from 'react';
import { useLeads } from '@/contexts/LeadsContext';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';

export default function AllLeads() {
  const { setSourceFilter } = useLeads();

  useEffect(() => {
    setSourceFilter('all');
  }, [setSourceFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">All Leads</h2>
        <p className="text-muted-foreground">Manage and track all your incoming leads.</p>
      </div>

      <LeadFilters />
      <LeadsTable />
    </div>
  );
}
