// src/services/api.ts
import axios from "axios";

const API_URL = "http://198.211.105.95:8080";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;