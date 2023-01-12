import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AUTHORIZED_ROUTES, UNAUTHORIZED_ROUTES } from "../../utils/Routes";

const NavBar = () => {
  const { authorized } = useSelector(({ state }) => state);

  const routes = authorized ? AUTHORIZED_ROUTES : UNAUTHORIZED_ROUTES;
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink style={{ color: "white", fontSize: "1.5rem" }} to="/">
            Shop
          </NavLink>
          <Nav className="ml-auto">
            {routes.map(({ label, path }, index) => (
              <Button variant="secondary" key={index}>
                {label}
              </Button>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
