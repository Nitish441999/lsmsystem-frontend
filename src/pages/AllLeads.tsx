import { useState, useEffect } from "react";
import { Lead, LeadSource, LeadStatus } from "@/types/lead";
import { LeadsTableLocal } from "@/components/leads/LeadsTableLocal";
import { AllLeadsFilters } from "@/components/leads/AllLeadsFilters";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import { fetchDashboard } from "../fethure/dashboard/dashboardSlice";

export default function AllLeads() {
  const dispatch = useAppDispatch();

  const { allLeads, loading } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const [selectedSource, setSelectedSource] = useState<LeadSource | "all">(
    "all"
  );

  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "all">(
    "all"
  );

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const filteredLeads = allLeads.filter((lead) => {
    const matchesSource =
      selectedSource === "all" || lead.source === selectedSource;
    const matchesStatus =
      selectedStatus === "all" || lead.status === selectedStatus;
    return matchesSource && matchesStatus;
  });

  if (loading) {
    return <div className="text-center py-10">Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">All Leads</h2>
        <p className="text-muted-foreground">
          Manage and track all your incoming leads.
        </p>
      </div>

      <AllLeadsFilters
        selectedSource={selectedSource}
        selectedStatus={selectedStatus}
        onSourceChange={setSelectedSource}
        onStatusChange={setSelectedStatus}
        leads={filteredLeads}
        title="All Leads"
        filename="all-leads"
      />

      <LeadsTableLocal
        leads={filteredLeads}
        showActions={false}
        enableRowClick={false}
      />
    </div>
  );
}
