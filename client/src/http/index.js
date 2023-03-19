import axios from "axios";

const baseURL = "http://localhost:5000";

const host = axios.create({ baseURL });
const authHost = axios.create({ baseURL });

const authInterceptor = config => {
  const accessToken = localStorage.getItem("accessToken");

  config.headers.authorization = `Bearer ${accessToken}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

export { host, authHost };
