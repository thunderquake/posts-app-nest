import { LoginFormData } from "@/components/LoginCard";
import { useAuthStore } from "@/stores/authStore";
import { LogInParams } from "@/types/postsServiceTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UUID } from "crypto";
import { useState } from "react";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { apiInstance, handleRequest } from "../postsService";

const loginRequest = async (params: LogInParams) => {
  return handleRequest(async () => {
    const response = await apiInstance.post("/auth/login", { ...params });
    return response.data;
  });
};

const getUserDetailsRequest = async (userId: UUID, token: string) => {
  return handleRequest(async () => {
    const response = await apiInstance.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => loginRequest(data),
    onSuccess: async (response) => {
      const { access_token, userId } = response;

      useAuthStore.getState().login(access_token, userId);

      const userDetails = await getUserDetailsRequest(userId, access_token);

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
