import api, { refresh } from "@/lib/Axios/axiosConfig";
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
  try {
    const logout = await refresh.post<UserApiResponse<null>>("/users/logout");
    if (!logout.data.success) throw Error("Logout failed");
    localStorage.setItem("isAuth", "false");
    return logout.data as UserApiResponse<null>;
  } catch (error) {
    console.error(error);
  }
}

async function refreshAccessToken() {
  return await refresh.post("/users/refresh-token");
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
};
