import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lead } from "../../types/lead";
import { getdashboardApi } from "./dashboardApi";

interface DashboardData {
  totalLeads: number;
  todayLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: string;
  sourceWise: {
    website: number;
    google: number;
    meta: number;
  };
  latestLeads: Lead[];
  allLeads: Lead[];
}

interface DashboardState extends DashboardData {
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  loading: false,
  error: null,
  totalLeads: 0,
  todayLeads: 0,
  qualifiedLeads: 0,
  convertedLeads: 0,
  conversionRate: "0.00%",
  sourceWise: {
    website: 0,
    google: 0,
    meta: 0,
  },
  latestLeads: [],
  allLeads: [],
};

export const fetchDashboard = createAsyncThunk<DashboardData>(
  "dashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getdashboardApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard data"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addRealtimeLead(state, action: PayloadAction<Lead>) {
      const lead = action.payload;

      state.totalLeads += 1;

      state.todayLeads += 1;

      if (lead.source === "website") state.sourceWise.website += 1;
      if (lead.source === "google") state.sourceWise.google += 1;
      if (lead.source === "meta") state.sourceWise.meta += 1;

      state.latestLeads.unshift(lead);
      state.latestLeads = state.latestLeads.slice(0, 5);

      state.allLeads.unshift(lead);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDashboard.fulfilled,
        (state, action: PayloadAction<DashboardData>) => {
          state.loading = false;
          Object.assign(state, action.payload);
        }
      )
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ---------------- EXPORTS ---------------- */

export const { addRealtimeLead } = dashboardSlice.actions;
export default dashboardSlice.reducer;
