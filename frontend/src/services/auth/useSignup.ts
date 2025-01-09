import { SignupFormData } from "@/components/SignupCard";
import { SignUpParams } from "@/types/postsServiceTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";
import { apiInstance, handleRequest } from "../postsService";

const signUpRequest = async (params: SignUpParams) => {
  return handleRequest(async () => {
    const response = await apiInstance.post("/auth/signup", { ...params });
    return response.data;
  });
};

export const useSignup = (setSignupError: (error: string) => void) => {
  return useMutation({
    mutationFn: (data: SignupFormData) => signUpRequest(data),
    onSuccess: () => {
      console.log("Signup successful");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setSignupError(error.message);
    },
  });
};
