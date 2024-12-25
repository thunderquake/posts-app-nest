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
      throw new Error(`Failed to sign up + ${e}`);
    }
  }

  async logIn(params: LogInParams) {
    try {
      const response = await this.instance.post("/auth/login", { ...params });
      return response.data;
    } catch (e) {
      throw new Error(`Failed to sign up + ${e}`);
    }
  }
}

export default new postsService();
