import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSourceFilter } from '@/store/leadSlice';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';

export default function MetaLeads() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSourceFilter('meta'));
  }, [dispatch]);

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
