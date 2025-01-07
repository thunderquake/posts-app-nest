import {
  LogInParams,
  PostParams,
  SignUpParams,
} from "@/types/postsServiceTypes";
import axios, { AxiosInstance } from "axios";

class postsService {
  baseUrl: string;
  instance: AxiosInstance;
  constructor(baseURL = "http://localhost:3000") {
    this.baseUrl = baseURL;
    this.instance = axios.create({ baseURL: this.baseUrl });
  }

  async handleAuthRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      return await requestFn();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred during the request.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Request failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Request failed: ${errorMessage}`);
      } else {
        throw new Error("An unexpected error occurred during the request.");
      }
    }
  }

  async signUp(params: SignUpParams) {
    return this.handleAuthRequest(async () => {
      const response = await this.instance.post("/auth/signup", { ...params });
      return response.data;
    });
  }

  async logIn(params: LogInParams) {
    return this.handleAuthRequest(async () => {
      const response = await this.instance.post("/auth/login", { ...params });
      return response.data;
    });
  }

  async getUserDetails(userId: string, token: string) {
    try {
      const response = await this.instance.get(`/users/${userId}`, {
        params: {
          select: "name,email",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred while fetching user details.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Fetching user details failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed to fetch user details: ${errorMessage}`);
      } else {
        throw new Error(
          "An unexpected error occurred while fetching user details."
        );
      }
    }
  }

  //TODO: Implement posts methods handling in  hooks in separate files

  async handlePostsRequest<T>(
    requestFn: () => Promise<T>,
    errorContext: string
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          `An error occurred while ${errorContext}.`;
        const errorStatus = e.response?.status || 500;

        console.error(
          `${errorContext} failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed ${errorContext}: ${errorMessage}`);
      } else {
        throw new Error(`An unexpected error occurred while ${errorContext}.`);
      }
    }
  }

  //done
  async getAllPosts(token: string) {
    return this.handlePostsRequest(async () => {
      const response = await this.instance.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }, "fetching posts");
  }

  //done
  async getPostsByUserId(token: string, userId: string) {
    return this.handlePostsRequest(async () => {
      const response = await this.instance.get(`/posts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }, "fetching user posts");
  }

  //done
  async createPost(token: string, post: PostParams) {
    return this.handlePostsRequest(async () => {
      const response = await this.instance.post("/posts", post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }, "creating post");
  }

  //done
  async editPost(token: string, postId: string, content: string) {
    return this.handlePostsRequest(async () => {
      const response = await this.instance.put(
        `/posts/${postId}`,
        { content: content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    }, "editing post");
  }

  async deletePost(token: string, postId: string) {
    return this.handlePostsRequest(async () => {
      const response = await this.instance.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }, "deleting post");
  }
}

export default new postsService();
