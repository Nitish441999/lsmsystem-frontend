import { Lead } from "../../types/lead";
import { baseApiURL } from "../../utils/baseApiUrl";
import axios from "axios";

const websiteApi = `${baseApiURL}/websitelead`;

export const getWebsiteLeadsApi = async (): Promise<Lead[]> => {
  try {
    const response = await axios.get<{ data: Lead[] }>(websiteApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Get website Lead API Error:", error);
    throw error;
  }
};

export const updateWebsiteLeadStatusApi = async (
  id: string,
  status: Lead["status"]
): Promise<Lead> => {
  try {
    const response = await axios.patch<{ data: Lead }>(
      `${websiteApi}/${id}`,
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
    console.error("Update Website Lead Status API Error:", error);
    throw error;
  }
};

export const deleteWebsiteLeadApi = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`${websiteApi}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data);
  } catch (error) {
    console.error("Delete Website Lead API Error:", error);
    throw error;
  }
};
