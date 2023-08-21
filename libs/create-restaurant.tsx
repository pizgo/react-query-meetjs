import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeysRestaurantsEnum } from "models/query-keys-models";

import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { createRestaurant } from "services/create-restaurant";

import styles from "styles/Home.module.scss";

const initialValues = { name: "", address: "" };
const CreateRestaurant: NextPage = () => {
  const queryClient = useQueryClient();
  const [formValues, setFormValues] = useState(initialValues);

  const handleFormValues = (value: string, name: string) => {
    setFormValues((prevState) => {
      return { ...prevState, [`${name}`]: value };
    });
  };
  const { mutate: createRestaurantMutate, isLoading } = useMutation(
    createRestaurant,
    {
      onSuccess: () => {
        toast.success("Restaurant successfully created!");
        queryClient.invalidateQueries({
          queryKey: [QueryKeysRestaurantsEnum.restautants],
        });
        setFormValues(initialValues);
      },
      onError: () => {
        toast.error("Something went wrong...");
      },
    }
  );

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRestaurantMutate(formValues);
  };

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
      <input
        className={styles["input-form"]}
        placeholder="Address"
        onChange={(e) => handleFormValues(e.target.value, "address")}
        name="address"
        value={formValues.address}
      />
      <button disabled={isLoading} className={styles["btn-form"]}>
        Create
      </button>
    </form>
  );
};

export default CreateRestaurant;
