import api from "@/lib/Axios/axiosConfig";
import type { UserApiResponse, UserData } from "../types.ts";

async function registerUser(data: FormData) {
  return await api.post<UserApiResponse<UserData>>("/users/register", data);
}

async function loginUser(credentials: { email: string; password: string }) {
  return await api.post<UserApiResponse<UserData>>("/users/login", credentials);
}

async function getCurrentUser() {
  return await api.get<UserApiResponse<UserData>>("/users/current-user");
}

async function logoutUser() {
  return await api.post<UserApiResponse<{}>>("/users/logout");
}

export { registerUser, loginUser, logoutUser, getCurrentUser };
