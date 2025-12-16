import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lead } from "../../types/lead";
import {
  deleteGoogleLeadApi,
  getGoogleLeadsApi,
  updateGoogleLeadStatusApi,
} from "./googleAddsApi";

interface GoogleLeadState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

const initialState: GoogleLeadState = {
  leads: [],
  loading: false,
  error: null,
};

export const fetchGoogleLeads = createAsyncThunk<
  Lead[],
  void,
  { rejectValue: string }
>("googleLeads/fetch", async (_, { rejectWithValue }) => {
  try {
    return await getGoogleLeadsApi();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch Google leads"
    );
  }
});

export const updateGoogleLeadStatus = createAsyncThunk<
  Lead,
  { id: string; status: Lead["status"] },
  { rejectValue: string }
>("GoogleLeads/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    return await updateGoogleLeadStatusApi(id, status);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to update lead status"
    );
  }
});

export const deleteGoogleLead = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("googleLeads/delete", async (id, { rejectWithValue }) => {
  try {
    await deleteGoogleLeadApi(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete lead"
    );
  }
});

const googleLeadSlice = createSlice({
  name: "googleLeads",
  initialState,
  reducers: {
    clearGoogleLeads: (state) => {
      state.leads = [];
    },

    addGoogleLead: (state, action: PayloadAction<Lead>) => {
      state.leads.unshift(action.payload);
    },

    updateGoogleLead: (state, action: PayloadAction<Lead>) => {
      state.leads = state.leads.map((lead) =>
        lead._id === action.payload._id ? action.payload : lead
      );
    },

    removeGoogleLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((lead) => lead._id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchGoogleLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGoogleLeads.fulfilled,
        (state, action: PayloadAction<Lead[]>) => {
          state.loading = false;
          state.leads = action.payload;
        }
      )
      .addCase(fetchGoogleLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(updateGoogleLeadStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateGoogleLeadStatus.fulfilled,
        (state, action: PayloadAction<Lead>) => {
          state.loading = false;
          state.leads = state.leads.map((lead) =>
            lead._id === action.payload._id ? action.payload : lead
          );
        }
      )
      .addCase(updateGoogleLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update status";
      })

      .addCase(deleteGoogleLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteGoogleLead.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.leads = state.leads.filter(
            (lead) => lead._id !== action.payload
          );
        }
      )
      .addCase(deleteGoogleLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete lead";
      });
  },
});

export const {
  clearGoogleLeads,
  addGoogleLead,
  updateGoogleLead,
  removeGoogleLead,
} = googleLeadSlice.actions;

export default googleLeadSlice.reducer;
