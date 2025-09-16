import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskProvider } from "../context/tasks/TaskProvider";
import { AuthProvider } from "../context/auth/AuthProvider";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/Home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
