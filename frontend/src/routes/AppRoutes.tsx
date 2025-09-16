import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/auth/AuthProvider";
import { TaskProvider } from "../context/tasks/TaskProvider";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
