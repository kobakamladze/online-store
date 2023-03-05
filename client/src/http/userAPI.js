import jwt_decode from "jwt-decode";

import { host, authHost } from ".";

export const registration = ({ email, password }) =>
  host
    .post("/api/user/registration", { email, password })
    .then(({ data: { accessToken } }) => {
      localStorage.setItem("token", accessToken);
      return jwt_decode(accessToken);
    })
    .catch(e => console.log(e));

export const logIn = ({ email, password }) =>
  authHost.post("/api/user/login", { email, password }).then(({ data }) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return jwt_decode(data.accessToken);
  });

export const logOut = () => {
  localStorage.clear();
  return authHost.get("/api/user/logout").catch(e => console.log(e));
};

export const check = () =>
  authHost
    .get("/api/user/auth")
    .then(({ data }) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      return jwt_decode(data.accessToken);
    })
    .catch(e => {
      console.log(e);
      throw new Error();
    })
    .finally();
