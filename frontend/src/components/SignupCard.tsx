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
import { signupSchema } from "@/schemas/authSchemas";
import { useSignup } from "@/services/auth/signupMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface SignupFormData {
  username: string;
  email: string;
  pass: string;
}

export const SignupCard = () => {
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const signupMutation = useSignup(setSignupError);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmitSignup = async (data: SignupFormData) => {
    signupMutation.mutate(data);
    reset();
  };

  const handleInputChange = () => {
    setSignupError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
        {signupError && <p className="text-sm text-red-500">{signupError}</p>}
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmitSignup)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="signup-username">Username</Label>
            <Input
              id="signup-username"
              type="text"
              {...register("username")}
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              {...register("email")}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showSignupPassword ? "text" : "password"}
                {...register("pass")}
                onChange={handleInputChange}
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
            {errors.pass && (
              <p className="text-sm text-red-500">{errors.pass.message}</p>
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
  );
};

export default SignupCard;
