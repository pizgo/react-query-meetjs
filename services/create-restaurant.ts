import axios from "axios";
import { CreateRestaurantRequest } from "models/restaurants-models";
import { baseApiUrl } from "./base-api-url";

export const createRestaurant = async (
  data: CreateRestaurantRequest
): Promise<any> => {
  try {
    const response = await axios.post(`${baseApiUrl}/restaurants`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
