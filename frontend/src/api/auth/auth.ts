import type {
  AuthResponse,
  LoginUser,
  PublicUser,
  RegisterUser,
} from "src/types/user.type";
import axios from "./axiosAuth";

export const registerRequest = (user: RegisterUser) =>
  axios.post<AuthResponse>("/register", user);

export const loginRequest = (user: LoginUser) =>
  axios.post<AuthResponse>("/login", user);

export const logoutRequest = () => axios.post("/logout");

export const verifyTokenRequest = () => axios.get<PublicUser>("/verify");
