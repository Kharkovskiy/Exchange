import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import { useState, useEffect, useMemo } from "react";
import { Currency } from "../../common/constants";
import "./currencyExchange.css";
import { getCurrencyRate } from "../../common/helpers";

const CurrencyExchange = ({ currencies }) => {
  const [firstCurName, setFirstCurName] = useState(Currency.USD);
  const [firstCurRate, setFirstCurRate] = useState(() =>
    getCurrencyRate(currencies, Currency.USD)
  );
  const [firstInputValue, setFirstInputValue] = useState(0);

  const [secondCurName, setSecondCurName] = useState(Currency.EUR);
  const [secondCurRate, setSecondCurRate] = useState(() =>
    getCurrencyRate(currencies, Currency.EUR)
  );
  const [secondInputValue, setSecondInputValue] = useState(0);

  useEffect(() => {
    setSecondInputValue(calculateValues());
  }, [firstCurRate, secondCurRate]);

  const calculateValues = () =>
    ((firstInputValue * firstCurRate) / secondCurRate).toFixed(2);

  const makeList = (arr, setCurr, setRate) => {
    const handleClick = (item) => {
      setCurr(item.cc);
      setRate(item.rate);
    };

    return arr.map((item) => {
      return (
        <Dropdown.Item
          href="#"
          key={item.txt}
          onClick={() => handleClick(item)}
        >
          {item.cc}
        </Dropdown.Item>
      );
    });
  };

  const firstCurrencyList = useMemo(
    () => makeList(currencies, setFirstCurName, setFirstCurRate),
    [currencies, setFirstCurName, setFirstCurRate]
  );

  const secondCurrencyList = useMemo(
    () => makeList(currencies, setSecondCurName, setSecondCurRate),
    [currencies, setSecondCurName, setSecondCurRate]
  );

  const onFirstInputChange = (e) => {
    const value = e.target.value;
    setFirstInputValue(value);

    const secondValue = ((value * firstCurRate) / secondCurRate).toFixed(2);
    setSecondInputValue(secondValue);
  };

  const onSecondInputChange = (e) => {
    const value = e.target.value;
    setSecondInputValue(value);

    const firstValue = Number(
      ((e.target.value * secondCurRate) / firstCurRate).toFixed(2)
    );
    setFirstInputValue(firstValue);
  };

  return (
    <div className="exchange_section ">
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          value={firstInputValue}
          onChange={onFirstInputChange}
          aria-label="Text input with dropdown button"
        />
        <SplitButton
          variant="outline-secondary"
          title={firstCurName}
          id="segmented-button-dropdown-2"
        >
          {firstCurrencyList}
        </SplitButton>
      </div>

      <div className="input-group mb-3">
        <input
          type="number"
          value={secondInputValue}
          onChange={onSecondInputChange}
          className="form-control"
          aria-label="Text input with dropdown button"
        />
        <SplitButton
          variant="outline-secondary"
          title={secondCurName}
          id="segmented-button-dropdown-2"
        >
          {secondCurrencyList}
        </SplitButton>
      </div>

      <div className="custom_select"></div>
    </div>
  );
};

export default CurrencyExchange;
