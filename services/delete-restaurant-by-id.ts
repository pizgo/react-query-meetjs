import axios from "axios";
import { baseApiUrl } from "./base-api-url";

export const deleteRestaurantById = async (id: number): Promise<any> => {
  try {
    const response = await axios.delete(`${baseApiUrl}/restaurants/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
