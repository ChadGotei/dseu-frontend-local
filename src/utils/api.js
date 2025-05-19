import axios from "axios";
import { baseUrl } from '../constants/LOCALES.JS';

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

// Add request interceptor to include Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;