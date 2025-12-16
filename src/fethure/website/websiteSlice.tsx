import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lead } from "../../types/lead";
import {
  getWebsiteLeadsApi,
  updateWebsiteLeadStatusApi,
  deleteWebsiteLeadApi,
} from "./websiteApi";

interface WebsiteLeadState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

const initialState: WebsiteLeadState = {
  leads: [],
  loading: false,
  error: null,
};

export const fetchWebsiteLeads = createAsyncThunk<
  Lead[],
  void,
  { rejectValue: string }
>("websiteLeads/fetch", async (_, { rejectWithValue }) => {
  try {
    return await getWebsiteLeadsApi();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch website leads"
    );
  }
});

export const updateWebsiteLeadStatus = createAsyncThunk<
  Lead,
  { id: string; status: Lead["status"] },
  { rejectValue: string }
>("websiteLeads/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    return await updateWebsiteLeadStatusApi(id, status);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to update lead status"
    );
  }
});

export const deleteWebsiteLead = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("websiteLeads/delete", async (id, { rejectWithValue }) => {
  try {
    await deleteWebsiteLeadApi(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete lead"
    );
  }
});

const websiteLeadSlice = createSlice({
  name: "websiteLeads",
  initialState,
  reducers: {
    clearWebsiteLeads: (state) => {
      state.leads = [];
    },

    addWebsiteLead: (state, action: PayloadAction<Lead>) => {
      state.leads.unshift(action.payload);
    },

    updateWebsiteLead: (state, action: PayloadAction<Lead>) => {
      state.leads = state.leads.map((lead) =>
        lead._id === action.payload._id ? action.payload : lead
      );
    },

    removeWebsiteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((lead) => lead._id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchWebsiteLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWebsiteLeads.fulfilled,
        (state, action: PayloadAction<Lead[]>) => {
          state.loading = false;
          state.leads = action.payload;
        }
      )
      .addCase(fetchWebsiteLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(updateWebsiteLeadStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateWebsiteLeadStatus.fulfilled,
        (state, action: PayloadAction<Lead>) => {
          state.loading = false;
          state.leads = state.leads.map((lead) =>
            lead._id === action.payload._id ? action.payload : lead
          );
        }
      )
      .addCase(updateWebsiteLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update status";
      })

      .addCase(deleteWebsiteLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteWebsiteLead.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.leads = state.leads.filter(
            (lead) => lead._id !== action.payload
          );
        }
      )
      .addCase(deleteWebsiteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete lead";
      });
  },
});

export const {
  clearWebsiteLeads,
  addWebsiteLead,
  updateWebsiteLead,
  removeWebsiteLead,
} = websiteLeadSlice.actions;

export default websiteLeadSlice.reducer;
