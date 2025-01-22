import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

const getAllPostsRequest = async (token: string) => {
  return handleRequest(async () => {
    const response = await apiInstance.get("/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useFetchPosts = () => {
  const token = useAuthStore((state) => state.access_token) || "";

  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPostsRequest(token),
    enabled: !!token,
  });
};
