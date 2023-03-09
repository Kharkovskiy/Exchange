import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { Currency } from "../../common/constants";
import { getCurrencyRate } from "../../common/helpers";
import "./header.css";

const Header = ({ currencies }) => {
  const eurToUah = getCurrencyRate(currencies, Currency.EUR).toFixed(2);
  const usdToUah = getCurrencyRate(currencies, Currency.USD).toFixed(2);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <p>USD/UAH: {usdToUah}</p>
          <p>EUR/UAH: {eurToUah}</p>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
