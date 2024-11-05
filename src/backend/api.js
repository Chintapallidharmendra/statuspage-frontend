import axios from "axios";
import { SERVER_BACKEND_URL } from "../utils/const";
import { getToken } from "../utils/globals";

const api = axios.create({
  baseURL: SERVER_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;