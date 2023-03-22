import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

import { setCredentials } from "../../store/slices/authSlice";

const AuthorizedNavigation = ({ handleLogOut }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  return (
    <>
      <Button
        variant="secondary"
        className="m-2"
        key={crypto.randomUUID()}
        onClick={() => navigate(`/cart/${user.id}`)}
      >
        Cart
      </Button>

      <Button
        variant="secondary"
        key={crypto.randomUUID()}
        className="m-2"
        onClick={e => handleLogOut(e)}
      >
        Log Out
      </Button>
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

      <Button
        variant="secondary"
        className="m-2"
        key={crypto.randomUUID()}
        onClick={() => navigate("/registration")}
      >
        Register
      </Button>
    </>
  );
};

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // const [logout, { isLoading }] = useLoginMutation();

  const handleLogOut = async e => {
    e.preventDefault();
    dispatch(setCredentials({ id: null, email: null, role: null }));
    localStorage.clear();
  };

  const routes =
    user?.id && user?.email ? (
      <AuthorizedNavigation handleLogOut={handleLogOut} />
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
