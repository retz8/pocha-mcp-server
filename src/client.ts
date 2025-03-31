import axios from "axios";

// Create axios instance with default config
export const client = axios.create({
  baseURL: process.env.API_BASE_URL || "http://127.0.0.1:8000/api/v2",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
