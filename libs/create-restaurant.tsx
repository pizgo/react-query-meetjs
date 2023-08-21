import { useMutation } from "@tanstack/react-query";

import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { createRestaurant } from "services/create-restaurant";

import styles from "styles/Home.module.scss";

const initialValues = { name: "", address: "" };
const CreateRestaurant: NextPage = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleFormValues = (value: string, name: string) => {
    setFormValues((prevState) => {
      return { ...prevState, [`${name}`]: value };
    });
  };
  const { mutate: createRestaurantMutate } = useMutation(createRestaurant);

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
        name="name"
      />
      <input
        className={styles["input-form"]}
        placeholder="Address"
        onChange={(e) => handleFormValues(e.target.value, "address")}
        name="address"
      />
      <button className={styles["btn-form"]}>Create</button>
    </form>
  );
};

export default CreateRestaurant;
