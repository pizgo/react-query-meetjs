import axios from "axios";
import { GetRestaurantsResponse } from "models/restaurants-models";
import { baseApiUrl } from "./base-api-url";

export const getRestaurantsPagination = async (
  page: number = 1,
  count: number = 1
): Promise<GetRestaurantsResponse> => {
  try {
    const response = await axios.get<GetRestaurantsResponse>(
      `${baseApiUrl}/restaurants?page=${page}&count=${count}`
    );
    return response.data;
  } catch (error) {
    console.error("get-restaurants error:", error);

    throw error;
  }
};
