import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

import { logOut } from "../../http/userAPI";
import { useContext } from "react";
import { AuthorizedContext } from "../app/App";

const AuthorizedNavigation = ({ user: [authorized, setAuthorized] }) => {
  console.log(authorized, setAuthorized);
  const navigate = useNavigate();

  const handleLogOut = e => {
    e.preventDefault();
    return logOut()
      .then(() => setAuthorized(() => ({ id: null, email: null, role: null })))
      .finally(() => navigate("/"));
  };

  return (
    <>
      <Button
        variant="secondary"
        className="m-2"
        key={crypto.randomUUID()}
        onClick={() => navigate(`/cart/${authorized.id}`)}
      >
        Cart
      </Button>
      ,
      <Button
        variant="secondary"
        key={crypto.randomUUID()}
        className="m-2"
        onClick={e => handleLogOut(e)}
      >
        Log Out
      </Button>
      ,
    </>
  );
};

const UnauthorizedNavigation = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="secondary"
        className="m-2"
        key={crypto.randomUUID()}
        onClick={() => navigate(`/login`)}
      >
        Log In
      </Button>
      ,
      <Button
        variant="secondary"
        className="m-2"
        key={crypto.randomUUID()}
        onClick={() => navigate("/registration")}
      >
        Register
      </Button>
      ,
    </>
  );
};

const NavBar = () => {
  const [authorized, setAuthorized] = useContext(AuthorizedContext);

  const routes =
    authorized?.id && authorized?.email ? (
      <AuthorizedNavigation user={[authorized, setAuthorized]} />
    ) : (
      <UnauthorizedNavigation />
    );

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink
            style={{
              color: "white",
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
            to="/"
          >
            Shop
          </NavLink>
          <Nav className="ml-auto">{routes}</Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
