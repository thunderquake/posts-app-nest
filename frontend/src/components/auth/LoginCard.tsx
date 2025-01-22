import { loginSchema } from "@/schemas/authSchemas";
import { useLogin } from "@/services/auth/useLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface LoginFormData {
  username: string;
  pass: string;
}

export const LoginCard = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { loginMutation } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    loginMutation.mutate(data);
    reset();
  };

  const handleInputChange = () => {
    setLoginError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your username and password to login.
        </CardDescription>
        {loginError && <p className="text-sm text-red-500">{loginError}</p>}
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="login-username">Username</Label>
            <Input
              id="login-username"
              type="text"
              {...register("username")}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showLoginPassword ? "text" : "password"}
                {...register("pass")}
                onChange={handleInputChange}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
            {errors.pass && (
              <p className="text-sm text-red-500">{errors.pass.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginCard;
