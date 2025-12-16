import { Lead } from "../../types/lead";
import { baseApiURL } from "../../utils/baseApiUrl";
import axios from "axios";

const metaApi = `${baseApiURL}/metalead`;

export const getMetaLeadsApi = async (): Promise<Lead[]> => {
  try {
    const response = await axios.get<{ data: Lead[] }>(metaApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Get meta Lead API Error:", error);
    throw error;
  }
};

export const updateMetaLeadStatusApi = async (
  id: string,
  status: Lead["status"]
): Promise<Lead> => {
  try {
    const response = await axios.patch<{ data: Lead }>(
      `${metaApi}/${id}`,
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
    console.error("Update Meta Lead Status API Error:", error);
    throw error;
  }
};

export const deleteMetaLeadApi = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`${metaApi}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data);
  } catch (error) {
    console.error("Delete Meta Lead API Error:", error);
    throw error;
  }
};
