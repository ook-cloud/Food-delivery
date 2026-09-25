import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:1010",
  headers: { "Content-Type": "application/json" },
});

server.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Токен байхгүй бол header-ийг цэвэрлэнэ
    }
  }
  return config;
});
