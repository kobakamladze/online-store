import axios from "axios";

const baseURL = "http://localhost:5000";

const host = axios.create({ baseURL });
const authHost = axios.create({ baseURL });

const authInterceptor = config => {
  const token = localStorage.getItem("token");
  config.headers.authorization = `Bearer ${token}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);

export { host, authHost };
