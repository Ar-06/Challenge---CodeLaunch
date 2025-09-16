import type {
  LoginUser,
  PublicUser,
  RegisterUser,
} from "src/types/user.type";
import axios from "./axiosAuth";

export const registerRequest = (user: RegisterUser) =>
  axios.post("/register", user);

export const loginRequest = (user: LoginUser) =>
  axios.post("/login", user);

export const logoutRequest = () => axios.post("/logout");

export const verifyTokenRequest = () => axios.get<PublicUser>("/verify");
