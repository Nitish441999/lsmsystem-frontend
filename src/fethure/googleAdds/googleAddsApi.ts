import { Lead } from "../../types/lead";
import { baseApiURL } from "../../utils/baseApiUrl";
import axios from "axios";

const googleApi = `${baseApiURL}/googlelead`;

export const getGoogleLeadsApi = async (): Promise<Lead[]> => {
  try {
    const response = await axios.get<{ data: Lead[] }>(googleApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Get Google Lead API Error:", error);
    throw error;
  }
};

export const updateGoogleLeadStatusApi = async (
  id: string,
  status: Lead["status"]
): Promise<Lead> => {
  try {
    const response = await axios.patch<{ data: Lead }>(
      `${googleApi}/${id}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Update Google Lead Status API Error:", error);
    throw error;
  }
};

export const deleteGoogleLeadApi = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`${googleApi}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data);
  } catch (error) {
    console.error("Delete Google Lead API Error:", error);
    throw error;
  }
};
