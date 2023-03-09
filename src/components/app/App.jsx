import "bootstrap/dist/css/bootstrap.min.css";

import Header from "../header/Header";
import CurrencyExchange from "../currencyExchange/CurrencyExchange";
import { useEffect, useState } from "react";
import getUahExchangeRate from "../../api/currency-api";

function App() {
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUahExchangeRate();
      setCurrencies(data);
    };

    fetchData();
  }, []);

  if (!currencies) {
    return (
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Header currencies={currencies} />
      <CurrencyExchange currencies={currencies} />
    </>
  );
}

export default App;
