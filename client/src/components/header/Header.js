import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../../http/userAPI";
import { onLogOutAction } from "../../store/authReducer";

import { AUTHORIZED_ROUTES, UNAUTHORIZED_ROUTES } from "../../utils/Routes";

const NavBar = () => {
  const { authorized } = useSelector((state) => state);
  const routes = authorized ? AUTHORIZED_ROUTES : UNAUTHORIZED_ROUTES;

  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(onLogOutAction());
    return logOut();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink style={{ color: "white", fontSize: "1.5rem" }} to="/">
            Shop
          </NavLink>
          <Nav className="ml-auto">
            {routes.map(({ label, path, action }, idx) => (
              <Button
                variant="secondary"
                className="m-2"
                key={idx}
                href={path || null}
                onClick={label === "Log Out" ? (e) => handleLogOut(e) : null}
              >
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
