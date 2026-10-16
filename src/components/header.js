import logo from '../logo.svg';
import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import GlobalVariables from '../assets/global-variables';
import { useFetchGeolocation } from '../functions/useFetchGeolocation';

const Header = () => {
  useFetchGeolocation(GlobalVariables.GEOLOCATION_DATABASE_CDN);
  return (
    <Container>
      <Row className="header d-flex">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="app-title-name ml-auto align-self-center">
          The Weather Network App
        </div>
      </Row>
    </Container>
  );
};

export default Header;
