import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

import { logOut } from "../../http/userAPI";
import { onLogOutAction } from "../../store/authReducer";

const AuthorizedNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authorized } = useSelector(state => state);

  const handleLogOut = e => {
    e.preventDefault();
    dispatch(onLogOutAction());
    return logOut();
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
  const { authorized } = useSelector(state => state);

  const routes =
    authorized.id && authorized.email ? (
      <AuthorizedNavigation />
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
