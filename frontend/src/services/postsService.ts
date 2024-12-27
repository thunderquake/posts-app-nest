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

  async getAllPosts(token: string) {
    try {
      const response = await this.instance.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred while fetching posts.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Fetching posts failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed to fetch posts: ${errorMessage}`);
      } else {
        throw new Error("An unexpected error occurred while fetching posts.");
      }
    }
  }

  async createPost(token: string, post: PostParams) {
    try {
      const response = await this.instance.post("/posts", post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred while creating post.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Creating post failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed to create post: ${errorMessage}`);
      } else {
        throw new Error("An unexpected error occurred while creating post.");
      }
    }
  }

  async editPost(token: string, postId: string, content: string) {
    try {
      const response = await this.instance.put(
        `/posts/${postId}`,
        { content: content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred while editing post.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Editing post failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed to edit post: ${errorMessage}`);
      } else {
        throw new Error("An unexpected error occurred while editing post.");
      }
    }
  }

  async deletePost(token: string, postId: string) {
    try {
      const response = await this.instance.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage =
          (e.response?.data?.message as string).toLowerCase() ||
          "An error occurred while deleting post.";
        const errorStatus = e.response?.status || 500;

        console.error(
          `Deleting post failed with status ${errorStatus}: ${errorMessage}`
        );

        throw new Error(`Failed to delete post: ${errorMessage}`);
      } else {
        throw new Error("An unexpected error occurred while deleting post.");
      }
    }
  }
}

export default new postsService();
