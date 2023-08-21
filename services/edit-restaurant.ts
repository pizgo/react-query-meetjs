import axios from "axios";
import { EditRestaurantRequest } from "models/restaurants-models";
import { baseApiUrl } from "./base-api-url";

export const editRestaurant = async (
  data: EditRestaurantRequest
): Promise<any> => {
  const { id, name } = data;
  try {
    const response = await axios.patch(`${baseApiUrl}/restaurants/${id}`, {
      name: name,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
