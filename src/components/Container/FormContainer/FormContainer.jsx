import Button from "./Button/Button";
import styles from "./FormContainer.module.scss";

const FormContainer = () => {
  return (
    <form action="" className={styles.formContainer}>
      <input type="number" className={styles.formInput} />
      <select className={styles.currencySelect} />
      <Button />
    </form>
  );
};

export default FormContainer;
