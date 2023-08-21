import EditRestaurant from "libs/edit-restaurant";
import type { NextPage } from "next";
import styles from "../../styles/Details.module.scss";

const Edit: NextPage = () => {
  return (
    <section className={styles.container}>
      <EditRestaurant />
    </section>
  );
};

export default Edit;
