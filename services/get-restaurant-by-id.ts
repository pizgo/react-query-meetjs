import axios from "axios";
import { baseApiUrl } from "./base-api-url";

export const getRestaurantById = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`${baseApiUrl}/restaurants/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
