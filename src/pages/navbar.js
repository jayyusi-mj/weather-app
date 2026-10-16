import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <Container>
      <nav>
        <div>
          <ul className="p-3">
            <li className="first-nav-link">
              <Link to="/current">Current</Link>
            </li>
            <li>
              <Link to="/hourly">Hourly</Link>
            </li>
            <li>
              <Link to="/seven-days">5 Days</Link>
            </li>
          </ul>
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
