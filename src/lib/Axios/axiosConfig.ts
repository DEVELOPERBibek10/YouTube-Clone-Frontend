import type { ApiError } from "@/types";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  timeout: 6000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    let finalMessage = "An unexpected error occurred";

    if (error.response) {
      finalMessage =
        error.response.data?.message || `Error: ${error.response.status}`;
    } else if (error.request) {
      finalMessage = "Network error: Please check your internet connection.";
    } else {
      finalMessage = error.message;
    }

    error.message = finalMessage;

    return Promise.reject(error);
  }
);

export default api;
