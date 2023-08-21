import axios from "axios";
import { GetRestaurantsResponse } from "models/restaurants-models";
import { baseApiUrl } from "./base-api-url";

export const getRestaurants = async (): Promise<GetRestaurantsResponse> => {
  try {
    const response = await axios.get<GetRestaurantsResponse>(
      `${baseApiUrl}/restaurants`
    );
    return response.data;
  } catch (error) {
    console.error("get-restaurants error:", error);

    throw error;
  }
};
