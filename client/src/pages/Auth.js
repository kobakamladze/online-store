import { useState } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { Form, Card } from "react-bootstrap";
import { Container, Button } from "react-bootstrap/esm";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  useLoginMutation,
  useRegistrationMutation,
} from "../store/slices/apiSlice";
import { setCredentials } from "../store/slices/authSlice";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const [register] = useRegistrationMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = location.pathname === "/login";

  const handleSubmitAction = async (e, { email, password }) => {
    e.preventDefault();

    switch (location.pathname) {
      case "/login":
        try {
          const navigateTo = location.search ? -2 : "/";

          const data = await login({ email, password }).unwrap();

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          dispatch(
            setCredentials(jwt_decode(localStorage.getItem("accessToken")))
          );

          return navigate(navigateTo);
        } catch (e) {
          return e;
        }
      case "/registration":
        try {
          const response = await register({ email, password });
          console.log(response);

          setEmail("");
          setPassword("");

          return navigate("/login");
        } catch (e) {
          return navigate(0);
        }
      default:
        return navigate(0);
    }
  };

  return (
    <Container className="d-felx justify-content-center align-items-center mt-5">
      <Card style={{ width: 900, padding: 25, margin: "auto" }}>
        <h3>{isLogin ? "Log In" : "Registration"}</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <div>
              Do not have account?
              <NavLink to="/registration">Register</NavLink>
            </div>
          ) : (
            <div>
              Already have account?
              <NavLink to="/login">Log in</NavLink>
            </div>
          )}
          <Button
            variant="primary"
            type="submit"
            onClick={e => handleSubmitAction(e, { email, password })}
          >
            {isLogin ? "Log In" : "Register"}
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Auth;
