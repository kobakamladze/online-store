import { host, authHost } from ".";
import jwt_decode from "jwt-decode";

export const registration = ({ email, password }) =>
  host
    .post("/api/user/registration", { email, password })
    .then(({ data: { accessToken } }) => {
      localStorage.setItem("token", accessToken);
      return jwt_decode(accessToken);
    });

export const logIn = ({ email, password }) =>
  authHost
    .post("/api/user/login", { email, password })
    .then(({ data: { accessToken } }) => {
      localStorage.setItem("token", accessToken);
      return jwt_decode(accessToken);
    });

export const logOut = () => {
  localStorage.clear();
  return authHost.get("/api/user/logout").catch(e => console.log(e));
};

export const check = () =>
  authHost
    .get("/api/user/auth")
    .then(({ data }) => {
      localStorage.setItem("token", data.accessToken);
      return jwt_decode(data.accessToken);
    })
    .catch(e => console.log(e));
