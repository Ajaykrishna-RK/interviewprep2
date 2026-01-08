import { axiosInstance } from "../../api/axiosInstance";


export const companiesList = async () => {
  try {
    const response = await axiosInstance.get("/companies");
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch companies list:", error);
    throw error; 
  }
};
