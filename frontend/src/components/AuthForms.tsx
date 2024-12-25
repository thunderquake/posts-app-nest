import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginSchema, signupSchema } from "@/schemas/authSchemas";
import postsService from "@/services/postsService";
import { useAuthStore } from "@/stores/authStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { UUID } from "crypto";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "react-router-dom";

type LoginFormData = {
  username: string;
  pass: string;
};

type SignupFormData = {
  username: string;
  email: string;
  pass: string;
};

export default function AuthForms() {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response: { access_token: string; userId: UUID } =
        await postsService.logIn(data);

      console.log(response);
      return response;
    },
    onSuccess: (response) => {
      const { access_token, userId } = response;

      useAuthStore.getState().login(access_token, userId);
      console.log("Login successful");
    },
    onError: (error: ErrorResponse) => {
      console.error("Login failed", error);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupFormData) => postsService.signUp(data),
    onSuccess: () => {
      console.log("Signup successful");
    },
    onError: (error) => {
      console.error("Signup failed", error);
    },
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onSubmitSignup = async (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="w-fit mx-auto">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your username and password to login.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="login-username">Username</Label>
                  <Input
                    id="login-username"
                    type="text"
                    {...registerLogin("username")}
                  />
                  {loginErrors.username && (
                    <p className="text-sm text-red-500">
                      {loginErrors.username.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      {...registerLogin("pass")}
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
                  {loginErrors.pass && (
                    <p className="text-sm text-red-500">
                      {loginErrors.pass.message}
                    </p>
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
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    {...registerSignup("username")}
                  />
                  {signupErrors.username && (
                    <p className="text-sm text-red-500">
                      {signupErrors.username.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    {...registerSignup("email")}
                  />
                  {signupErrors.email && (
                    <p className="text-sm text-red-500">
                      {signupErrors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      {...registerSignup("pass")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                  {signupErrors.pass && (
                    <p className="text-sm text-red-500">
                      {signupErrors.pass.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? "Signing up..." : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
