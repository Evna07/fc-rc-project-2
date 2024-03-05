import styles from "./Button.module.scss";

const Button = () => {
  return (
    <button className={styles.actionButton} type="submit">
      Convert
    </button>
  );
};

export default Button;
