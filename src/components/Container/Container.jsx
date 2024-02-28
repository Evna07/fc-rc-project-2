import { useState } from "react";
import styles from "./Container.module.scss";
import FormContainer from "./FormContainer/FormContainer";

const Container = () => {
  const [rateValue, setCalc] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currencies, setCurrencies] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);
  const [error, setError] = useState(null);

  const result = (rateValue, amount, currencies) => {
    if (amount.value !== "") {
      setDisplayLoading(false);
      setCalc(amount * rateValue);
      setAmount(amount);
      setCurrencies(currencies);
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Przelicznik walut</h1>
      <FormContainer
        result={result}
        displayLoading={displayLoading}
        setDisplayLoading={setDisplayLoading}
        setShowResult={setShowResult}
        setError={setError}
      />
      {showResult && (
        <span className={styles.calcResult} onSubmit={result}>
          {Number(amount).toFixed(2)} {currencies} ={" "}
          {Number(rateValue).toFixed(2)} PLN
        </span>
      )}
      {displayLoading && <span className={styles.loader}></span>}
      {error && <span className={styles.errorLabel}>{error}</span>}
    </div>
  );
};

export default Container;
