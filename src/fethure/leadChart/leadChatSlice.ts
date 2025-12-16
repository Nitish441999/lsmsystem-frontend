import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChartData } from "@/types/lead";
import {
  getSourceDistributionApi,
  getWeeklyLeadsChartApi,
} from "./leadChartApi";

interface ChartState {
  weeklyData: ChartData[];
  sourceDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  weeklyData: [],
  sourceDistribution: [],
  loading: false,
  error: null,
};

export const fetchWeeklyChart = createAsyncThunk<ChartData[]>(
  "chart/fetchWeekly",
  async () => {
    return await getWeeklyLeadsChartApi();
  }
);

export const fetchSourceDistribution = createAsyncThunk<
  { name: string; value: number; color: string }[]
>("chart/fetchSourceDistribution", async () => {
  return await getSourceDistributionApi();
});

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchWeeklyChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeeklyChart.fulfilled, (state, action) => {
        state.weeklyData = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeeklyChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Weekly chart error";
      })

      .addCase(fetchSourceDistribution.fulfilled, (state, action) => {
        state.sourceDistribution = action.payload;
      });
  },
});

export default chartSlice.reducer;
