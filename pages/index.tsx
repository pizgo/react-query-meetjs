import { useQuery } from "@tanstack/react-query";
import { QueryKeysRestaurantsEnum } from "models/query-keys-models";
import type { NextPage } from "next";
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
              <button className={styles["delete-button"]}>Delete</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Home;
