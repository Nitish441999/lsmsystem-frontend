import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lead, LeadSource, LeadStatus } from '@/types/lead';

interface LeadState {
  leads: Lead[];
  filteredLeads: Lead[];
  selectedSource: LeadSource | 'all';
  selectedStatus: LeadStatus | 'all';
  searchQuery: string;
  isLoading: boolean;
}

const initialState: LeadState = {
  leads: [],
  filteredLeads: [],
  selectedSource: 'all',
  selectedStatus: 'all',
  searchQuery: '',
  isLoading: false,
};

const filterLeads = (state: LeadState): Lead[] => {
  return state.leads.filter((lead) => {
    const matchesSource = state.selectedSource === 'all' || lead.source === state.selectedSource;
    const matchesStatus = state.selectedStatus === 'all' || lead.status === state.selectedStatus;
    const matchesSearch = state.searchQuery === '' || 
      lead.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesSource && matchesStatus && matchesSearch;
  });
};

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
      state.filteredLeads = filterLeads(state);
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.unshift(action.payload);
      state.filteredLeads = filterLeads(state);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
        state.filteredLeads = filterLeads(state);
      }
    },
    setSourceFilter: (state, action: PayloadAction<LeadSource | 'all'>) => {
      state.selectedSource = action.payload;
      state.filteredLeads = filterLeads(state);
    },
    setStatusFilter: (state, action: PayloadAction<LeadStatus | 'all'>) => {
      state.selectedStatus = action.payload;
      state.filteredLeads = filterLeads(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredLeads = filterLeads(state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setLeads,
  addLead,
  updateLead,
  setSourceFilter,
  setStatusFilter,
  setSearchQuery,
  setLoading,
} = leadSlice.actions;

export default leadSlice.reducer;
