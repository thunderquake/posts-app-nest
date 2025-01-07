import { LoginFormData } from "@/components/AuthForms";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UUID } from "crypto";
import { useState } from "react";
import { ErrorResponse, useNavigate } from "react-router-dom";
import postsService from "../postsService";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response: { access_token: string; userId: UUID } =
        await postsService.logIn(data);
      return response;
    },
    onSuccess: async (response) => {
      const { access_token, userId } = response;

      useAuthStore.getState().login(access_token, userId);

      const userDetails = await postsService.getUserDetails(
        userId,
        access_token
      );

      const { name, email } = userDetails;
      useAuthStore.getState().setUserDetails(name, email);

      console.log("Login successful");

      navigate("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setLoginError(error.message);
    },
  });

  return { loginMutation, loginError };
};
