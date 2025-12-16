import axios from "axios";
import { baseApiURL } from "@/utils/baseApiUrl";
import { ChartData } from "@/types/lead";

const weeklyChartApi = `${baseApiURL}/dashboard/weekly-leads`;
const sourceChartApi = `${baseApiURL}/dashboard/source-distribution`;

export const getWeeklyLeadsChartApi = async (): Promise<ChartData[]> => {
  const res = await axios.get<{ data: ChartData[] }>(weeklyChartApi);
  return res.data.data;
};

export const getSourceDistributionApi = async (): Promise<
  { name: string; value: number; color: string }[]
> => {
  const res = await axios.get<{ data: any[] }>(sourceChartApi);
  console.log(res.data.data);
  return res.data.data;
};
