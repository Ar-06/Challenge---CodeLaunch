import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/auth/AuthProvider";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/Home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
