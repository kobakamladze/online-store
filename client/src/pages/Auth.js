import { Container, Button } from "react-bootstrap/esm";
import { Form, Card } from "react-bootstrap";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { logIn, registration } from "../http/userAPI";
import { useDispatch } from "react-redux";

import { onLogInAction } from "../store/authReducer";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  const handleSubmitAction = ({ email, password }) => {
    if (isLogin) {
      return logIn({ email, password })
        .then((response) => {
          dispatch(onLogInAction());
          return response;
        })
        .catch((e) => alert(e.response.data.message))
        .finally(() => navigate("/"));
    }

    return registration({ email, password })
      .then((response) => {
        return response;
      })
      .catch((e) => alert(e.response.data.message));
  };

  return (
    <Container className="d-felx justify-content-center align-items-center mt-5">
      <Card style={{ width: 900, padding: 25, margin: "auto" }}>
        <h3>{isLogin ? "Log In" : "Registration"}</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => handleSubmitAction({ email, password })}
          >
            {isLogin ? "Log In" : "Register"}
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Auth;
