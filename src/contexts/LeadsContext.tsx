import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Lead, LeadSource, LeadStatus } from '@/types/lead';
import { mockLeads } from '@/data/mockLeads';

interface LeadsContextType {
  leads: Lead[];
  filteredLeads: Lead[];
  selectedSource: LeadSource | 'all';
  selectedStatus: LeadStatus | 'all';
  searchQuery: string;
  isLoading: boolean;
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  updateLead: (lead: Lead) => void;
  setSourceFilter: (source: LeadSource | 'all') => void;
  setStatusFilter: (status: LeadStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeadsState] = useState<Lead[]>([]);
  const [selectedSource, setSelectedSource] = useState<LeadSource | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'all'>('all');
  const [searchQuery, setSearchQueryState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with mock data
  useEffect(() => {
    setLeadsState(mockLeads);
  }, []);

  // Filter leads based on current filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource;
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesStatus && matchesSearch;
  });

  const setLeads = useCallback((newLeads: Lead[]) => {
    setLeadsState(newLeads);
  }, []);

  const addLead = useCallback((lead: Lead) => {
    setLeadsState((prev) => [lead, ...prev]);
  }, []);

  const updateLead = useCallback((updatedLead: Lead) => {
    setLeadsState((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  }, []);

  const setSourceFilter = useCallback((source: LeadSource | 'all') => {
    setSelectedSource(source);
  }, []);

  const setStatusFilter = useCallback((status: LeadStatus | 'all') => {
    setSelectedStatus(status);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        filteredLeads,
        selectedSource,
        selectedStatus,
        searchQuery,
        isLoading,
        setLeads,
        addLead,
        updateLead,
        setSourceFilter,
        setStatusFilter,
        setSearchQuery,
        setLoading,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
}
