import { useState } from "react";
import { nanoid } from "nanoid";
import Button from "./Button/Button";
import styles from "./FormContainer.module.scss";
import { URL } from "../../../data/API_URL.js";
import { currencies } from "../../../data/currencyOptions.js";

const FormContainer = ({
  updateResult,
  setDisplayLoading,
  setShowResult,
  setError,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleListChange = (e) => {
    setSelectedCurrency(e.target.value);
    setShowResult(false);
  };

  const handleAmountSubmit = (e) => {
    e.preventDefault();
    setShowResult(false);
    setDisplayLoading(true);
    setError(false);
    const { amount, currencies } = e.currentTarget.elements;
    const formData = {
      amount: Number(amount.value),
      currency: currencies.value,
    };

    fetch(`${URL}${formData.currency}/`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data?.rates?.[0]?.mid;
        if (rate) {
          const rateValue = Number(rate);
          updateResult(rateValue, formData.amount, formData.currency);
        } else {
          setDisplayLoading(false);
          setError("Unable to get currency rate value.");
        }
      })
      .catch((err) => {
        setDisplayLoading(false);
        setError("Request Error");
      });

    e.currentTarget.elements.amount.value = "";
  };

  return (
    <form onSubmit={handleAmountSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="amount">Podaj kwotę:</label>
        <input
          required
          type="number"
          name="amount"
          id="amount"
          min="0.01"
          step="0.01"
          className={styles.formInput}
        />
      </div>

      <select
        id="currencies"
        className={styles.currencySelect}
        value={selectedCurrency}
        onChange={(e) => {
          handleListChange(e);
        }}
      >
        {currencies.map((currency) => (
          <option key={nanoid()} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <Button />
    </form>
  );
};

export default FormContainer;
