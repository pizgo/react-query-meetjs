import type { NextPage } from "next";

import styles from "../styles/Home.module.scss";
import {useQuery} from "@tanstack/react-query";
import {getRestaurants} from "../services/get-restaurants";

const Home: NextPage = () => {

  const { data: restaurantsList, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });
  console.log(restaurantsList)

  if (isLoading) {
      return <div>Loading...</div>
  }

  if (isError) {
      return <div>Error</div>;
  }

  return (
      <section className={styles.container}>
        <ul>
          {restaurantsList?.restaurants.map((restaurant) => {
            return (
                <li key={restaurant.name}>
                  <b>{restaurant.name}</b> - {restaurant.address}
                </li>
            )
          })}
        </ul>

      </section>
  )
};

export default Home;
