import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeysRestaurantsEnum } from "models/query-keys-models";
import type { NextPage } from "next";
import { deleteRestaurantById } from "services/delete-restaurant-by-id";
import { getRestaurants } from "services/get-restaurants";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const {
    data: restaurantsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKeysRestaurantsEnum.restautants],
    queryFn: getRestaurants,
  });

  const { mutate: deleteRestaurantByIdMutate } =
    useMutation(deleteRestaurantById);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className={styles.container}>
      <ul className={styles["main-list"]}>
        {restaurantsList?.restaurants.map((restaurant) => {
          return (
            <li className={styles["main-list-item"]} key={restaurant.id}>
              <b>{restaurant.name}</b>
              {restaurant.address}
              <button
                onClick={() => deleteRestaurantByIdMutate(restaurant.id)}
                className={styles["delete-button"]}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Home;
