import styles from "./Container.module.scss";
import FormContainer from "./FormContainer/FormContainer";

const Container = () => {
  return (
    <div className={styles.container}>
      <h1>Przelicznik walut</h1>
      <FormContainer />

      <span></span>
    </div>
  );
};

export default Container;
