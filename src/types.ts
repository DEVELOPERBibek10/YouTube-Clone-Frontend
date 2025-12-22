export interface UserData {
  id: string;
  avatar: string;
  coverImage?: string;
  fullName: string;
  username: string;
  email: string;
}
export interface UserApiResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  message: string;
}

export interface RegisterUserData {
  avatar: File[] | null;
  coverImage?: File;
  fullName: string;
  username: string;
  email: string;
  password: string;
}
