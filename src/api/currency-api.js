import { Uah } from "../common/constants";

const getUahExchangeRate = async () => {
  const response = await fetch(process.env.REACT_APP_CURRENCY);

  if (!response.ok) {
    throw new Error(
      `Could not fetch ${process.env.REACT_APP_CURRENCY}, status: ${response.status}`
    );
  }

  const data = await response.json();
  data.unshift(Uah);

  return data;
};

export default getUahExchangeRate;
