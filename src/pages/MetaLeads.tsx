import { useEffect, useState } from "react";
import { LeadStatus } from "@/types/lead";
import { LeadsTableLocal } from "@/components/leads/LeadsTableLocal";
import { StatusFilters } from "@/components/leads/StatusFilters";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store";

import { fetchMetaLeads } from "../fethure/metaAdds/metaAddSlice";

export default function GoogleLeads() {
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "all">(
    "all"
  );

  const dispatch = useAppDispatch();

  const { leads, loading, error } = useAppSelector(
    (state: RootState) => state.metaLeads
  );

  useEffect(() => {
    dispatch(fetchMetaLeads());
  }, [dispatch]);

  const filteredLeads = leads.filter(
    (lead) => selectedStatus === "all" || lead.status === selectedStatus
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Meta Ads Leads</h2>
        <p className="text-muted-foreground">Leads from Meta Ads Lead Forms.</p>
      </div>

      <StatusFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        leads={filteredLeads}
        title="Meta Ads Leads"
        filename="Meta-leads"
      />

      <LeadsTableLocal leads={filteredLeads} />

      {loading && (
        <p className="text-sm text-muted-foreground">Loading Meta leads...</p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
