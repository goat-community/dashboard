import axios from "axios";
import { baseUrl } from "./baseUrl";

function getLocalAccessToken(): string | null {
  const accessToken = localStorage.getItem("accessToken") || null;
  return accessToken;
}

export const instance = axios.create({
  baseURL: baseUrl(),
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        return Promise.reject(err);
      }
      // Not enough permissions
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);
