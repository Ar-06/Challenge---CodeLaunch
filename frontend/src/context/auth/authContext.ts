import { createContext } from "react";
import type { LoginUser, PublicUser, RegisterUser } from "src/types/user.type";

interface AuthContextProps {
  user: PublicUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  errors: string[];
  register: (data: RegisterUser) => Promise<void>;
  login: (data: LoginUser) => Promise<void>;
  logout: () => Promise<void>;
  clearErrors: () => void;
  initialUsers: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
