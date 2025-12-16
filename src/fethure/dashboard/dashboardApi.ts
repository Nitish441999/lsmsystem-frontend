import { Lead } from "../../types/lead";
import { baseApiURL } from "../../utils/baseApiUrl";
import axios from "axios";

const dashboardApi = `${baseApiURL}/dashboard`;

export const getdashboardApi = async (): Promise<Lead[]> => {
  try {
    const response = await axios.get<{ data: Lead[] }>(dashboardApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Get Google Lead API Error:", error);
    throw error;
  }
};
