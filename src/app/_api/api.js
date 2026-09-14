import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:1010",
  headers: { "Content-Type": "application/json" },
});
