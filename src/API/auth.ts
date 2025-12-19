import api from "@/lib/Axios/axiosConfig";
import type { UserData } from "../types.ts";

interface RegisterUserData {
  avatar: File;
  coverImage?: File;
  fullName: string;
  username: string;
  email: string;
  password: string;
}

async function registerUser(data: RegisterUserData) {
  return await api.post<UserData>("/user/register", data);
}

async function loginUser(email: string, password: string) {
  return await api.post<UserData>("/user/register", { email, password });
}

export { registerUser, loginUser };
