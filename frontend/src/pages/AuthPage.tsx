import { useState } from "react";
import { HeaderForm } from "../components/auth/HeaderForm";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <section className="w-full max-w-md mx-auto">
        <HeaderForm />

        {isLogin ? (
          <LoginForm onToogleToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleToLogin={() => setIsLogin(true)} />
        )}

        
      </section>
    </main>
  );
};
