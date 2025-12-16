import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lead } from "../../types/lead";
import {
  deleteMetaLeadApi,
  getMetaLeadsApi,
  updateMetaLeadStatusApi,
} from "./metaAddApi";

interface MetaLeadState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

const initialState: MetaLeadState = {
  leads: [],
  loading: false,
  error: null,
};

export const fetchMetaLeads = createAsyncThunk<
  Lead[],
  void,
  { rejectValue: string }
>("metaLeads/fetch", async (_, { rejectWithValue }) => {
  try {
    return await getMetaLeadsApi();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch Meta leads"
    );
  }
});

export const updateMetaLeadStatus = createAsyncThunk<
  Lead,
  { id: string; status: Lead["status"] },
  { rejectValue: string }
>("metaLeads/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    return await updateMetaLeadStatusApi(id, status);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to update lead status"
    );
  }
});

export const deleteMetaLead = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("metaLeads/delete", async (id, { rejectWithValue }) => {
  try {
    await deleteMetaLeadApi(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete lead"
    );
  }
});

const metaLeadSlice = createSlice({
  name: "metaLeads",
  initialState,
  reducers: {
    clearMetaLeads: (state) => {
      state.leads = [];
    },

    addMetaLead: (state, action: PayloadAction<Lead>) => {
      state.leads.unshift(action.payload);
    },

    updateMetaLead: (state, action: PayloadAction<Lead>) => {
      state.leads = state.leads.map((lead) =>
        lead._id === action.payload._id ? action.payload : lead
      );
    },

    removeMetaLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((lead) => lead._id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchMetaLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMetaLeads.fulfilled,
        (state, action: PayloadAction<Lead[]>) => {
          state.loading = false;
          state.leads = action.payload;
        }
      )
      .addCase(fetchMetaLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(updateMetaLeadStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateMetaLeadStatus.fulfilled,
        (state, action: PayloadAction<Lead>) => {
          state.loading = false;
          state.leads = state.leads.map((lead) =>
            lead._id === action.payload._id ? action.payload : lead
          );
        }
      )
      .addCase(updateMetaLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update status";
      })

      .addCase(deleteMetaLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteMetaLead.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.leads = state.leads.filter(
            (lead) => lead._id !== action.payload
          );
        }
      )
      .addCase(deleteMetaLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete lead";
      });
  },
});

export const { clearMetaLeads, addMetaLead, updateMetaLead, removeMetaLead } =
  metaLeadSlice.actions;

export default metaLeadSlice.reducer;
