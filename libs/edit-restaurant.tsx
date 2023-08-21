import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeysRestaurantsEnum } from "models/query-keys-models";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { editRestaurant } from "services/edit-restaurant";
import { getRestaurantById } from "services/get-restaurant-by-id";

import styles from "styles/Home.module.scss";

const EditRestaurant: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const itemId: string = (id as string) ?? "";

  console.log(itemId);
  const { data } = useQuery({
    queryKey: ["single-restaurant", itemId],
    queryFn: () => getRestaurantById(Number(itemId)),
    enabled: Boolean(Number(itemId)),
  });

  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({ name: "", id: undefined });

  const handleFormValues = (value: string, name: string) => {
    setFormValues((prevState) => {
      return { ...prevState, [`${name}`]: value };
    });
  };
  const { mutate: editRestaurantMutate, isLoading } = useMutation(
    editRestaurant,
    {
      onSuccess: () => {
        toast.success("Restaurant successfully edited!");
        queryClient.invalidateQueries({
          queryKey: [QueryKeysRestaurantsEnum.restautants],
        });
        router.push("/");
      },
      onError: () => {
        toast.error("Something went wrong...");
      },
    }
  );

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editRestaurantMutate(formValues);
  };

  useEffect(() => {
    if (data) {
      setFormValues({ name: data.name, id: data.id });
    }
  }, [data]);

  return (
    <form
      onSubmit={(e) => handleSubmitForm(e)}
      className={styles["manage-form"]}
    >
      <input
        className={styles["input-form"]}
        placeholder="Name"
        onChange={(e) => handleFormValues(e.target.value, "name")}
        value={formValues.name}
        name="name"
      />

      <button disabled={isLoading} className={styles["btn-form"]}>
        Edit
      </button>
    </form>
  );
};

export default EditRestaurant;
