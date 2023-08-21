export type Restaurant = {
  address: string;
  createdAt: string;
  id: number;
  name: string;
  type: string;
  updatedAt: string;
};

export type GetRestaurantsResponse = {
  currentPage: number;
  restaurants: Restaurant[];
  totalCount: number;
};

export type CreateRestaurantRequest = { name: string; address: string };
