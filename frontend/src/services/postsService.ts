import { LogInParams, SignUpParams } from "@/types/postsServiceTypes";
import axios, { AxiosInstance } from "axios";

class postsService {
  baseUrl: string;
  instance: AxiosInstance;
  constructor(baseURL = "http://localhost:3000") {
    this.baseUrl = baseURL;
    this.instance = axios.create({ baseURL: this.baseUrl });
  }

  async signUp(params: SignUpParams) {
    try {
      const response = await this.instance.post("/auth/signup", { ...params });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data?.message);
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred during signup.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Signup failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed to sign up: ${errorMessage}`);
      } else {
        throw new Error("An unexpected error occurred during signup.");
      }
    }
  }

  async logIn(params: LogInParams) {
    try {
      const response = await this.instance.post("/auth/login", { ...params });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred during login.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Login failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed to log in: ${errorMessage}`);
      } else {
        throw new Error("An unexpected error occurred during login.");
      }
    }
  }
}

export default new postsService();
