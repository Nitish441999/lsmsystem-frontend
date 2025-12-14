import { useEffect } from 'react';
import { useLeads } from '@/contexts/LeadsContext';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';

export default function WebsiteLeads() {
  const { setSourceFilter } = useLeads();

  useEffect(() => {
    setSourceFilter('website');
  }, [setSourceFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Website Leads</h2>
        <p className="text-muted-foreground">Leads captured from your website forms.</p>
      </div>

      <LeadFilters />
      <LeadsTable />
    </div>
  );
}
