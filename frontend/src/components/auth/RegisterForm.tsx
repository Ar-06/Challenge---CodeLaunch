import { toast } from "@pheralb/toast";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { RegisterUser } from "src/types/user.type";
import { useAuth } from "../../context/auth/useAuth";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface RegisterFromProps {
  onToggleToLogin: () => void;
}

export const RegisterForm = ({ onToggleToLogin }: RegisterFromProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, errors, loading, clearErrors } = useAuth();

  const [form, setForm] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((s) => ({ ...s, [id]: value }));
    if (errors.length) clearErrors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      toast.error({ text: "Faltan campos" });
    }
    await register(form);
  };

  useEffect(() => {
      if (errors.length) {
        errors.forEach((err) => toast.error({ text: err }));
      }
    }, [errors]);

  return (
    <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-center">
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-center text-pretty">
          Únete y comienza a organizar tu vida
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Nombre de usuario
            </Label>
            <Input
              id="username"
              placeholder="Jhon Doe"
              value={form.username ?? ""}
              onChange={handleChange}
              className="h-11 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 border-slate-200 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo Electrónico{" "}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jhondoe@gmail.com"
              value={form.email ?? ""}
              onChange={handleChange}
              className="h-11 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 border-slate-200 focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="h-11 transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 border-slate-200 focus:border-blue-500"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-500" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-500" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-lg cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Cargando...
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Crear cuenta</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-slate-600">¿Ya tienes una cuenta?</p>
            <Button
              variant="link"
              onClick={onToggleToLogin}
              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <div className="flex items-center space-x-1">
                <ArrowLeft className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </div>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
