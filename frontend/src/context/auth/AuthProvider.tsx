import { toast } from "@pheralb/toast";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../../api/auth/auth";
import type {
  LoginUser,
  PublicUser,
  RegisterUser,
} from "../../types/user.type";
import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const clearErrors = () => setErrors([]);

  const register = async (data: RegisterUser) => {
    try {
      setLoading(true);
      setErrors([]);

      const res = await registerRequest(data);
      setUser(res.data.user);
      setIsAuthenticated(true);
      navigate("/home");
      toast.success({ text: "¡Registro exitoso! Bienvenido 😎" });
    } catch (err: unknown) {
      const error = err as AxiosError<{
        errors?: string[];
        message?: string;
      }>;

      if (Array.isArray(error.response?.data?.errors)) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Error inesperado en el servidor"]);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginUser) => {
    try {
      setLoading(true);
      setErrors([]);

      const res = await loginRequest(data);
      setUser(res.data.user);
      setIsAuthenticated(true);
      navigate("/home");
      toast.success({ text: "Bienvenido de nuevo 😎" });
    } catch (err: unknown) {
      const error = err as AxiosError<{
        errors?: string[];
        message?: string;
      }>;

      if (Array.isArray(error.response?.data?.errors)) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["Error inesperado en el servidor"]);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const initialUsers = () => {
    let initials = "";
    if (user?.username) {
      const nameParts = user.username.split(" ");
      initials = nameParts
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    }
    return initials;
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        errors,
        register,
        login,
        logout,
        clearErrors,
        initialUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
