import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeysRestaurantsEnum } from "models/query-keys-models";
import type { NextPage } from "next";
import { deleteRestaurantById } from "services/delete-restaurant-by-id";

import { toast } from "react-toastify";

import styles from "../styles/Home.module.scss";
import CreateRestaurant from "libs/create-restaurant";
import { getRestaurantsPagination } from "services/get-restaurants-pagination";
import { useState } from "react";
import { useRouter } from "next/router";
import { getRestaurantById } from "services/get-restaurant-by-id";

const Home: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const {
    data: restaurantsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKeysRestaurantsEnum.restautants, page],
    queryFn: () => getRestaurantsPagination(page, 2),
  });

  const { mutate: deleteRestaurantByIdMutate } = useMutation(
    deleteRestaurantById,
    {
      onSuccess: () => {
        toast.success("Restaurant successfully removed!");
        queryClient.invalidateQueries({
          queryKey: [QueryKeysRestaurantsEnum.restautants],
        });
      },
      onError: () => {
        toast.error("Something went wrong...");
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const prefetchRestaurant = async (id: number) => {
    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery({
      queryKey: [QueryKeysRestaurantsEnum.singleRestaurant, Number(id)],
      queryFn: () => getRestaurantById(Number(id)),
      staleTime: 2000,
    });
  };

  return (
    <section className={styles.container}>
      <CreateRestaurant />
      <ul className={styles["main-list"]}>
        {restaurantsList?.restaurants.length ? (
          restaurantsList?.restaurants.map((restaurant) => {
            return (
              <li
                onMouseEnter={() => prefetchRestaurant(restaurant.id)}
                className={styles["main-list-item"]}
                key={restaurant.id}
              >
                <b>{restaurant.name}</b>
                {restaurant.address}
                <button
                  onClick={() => router.push(`edit/${restaurant.id}`)}
                  className={styles["edit-button"]}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRestaurantByIdMutate(restaurant.id)}
                  className={styles["delete-button"]}
                >
                  Delete
                </button>
              </li>
            );
          })
        ) : (
          <p>No data</p>
        )}
      </ul>
      <div>
        <button
          disabled={restaurantsList.currentPage <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </section>
  );
};

export default Home;
