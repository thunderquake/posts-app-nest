import { SignupFormData } from "@/components/AuthForms";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";
import postsService from "../postsService";

export const useSignup = (setSignupError: (error: string) => void) => {
  return useMutation({
    mutationFn: (data: SignupFormData) => postsService.signUp(data),
    onSuccess: () => {
      console.log("Signup successful");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setSignupError(error.message);
    },
  });
};
