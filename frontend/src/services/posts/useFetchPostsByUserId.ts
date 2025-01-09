import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

const getPostsByUserIdRequest = async (userId: string, token: string) => {
  return handleRequest(async () => {
    const response = await apiInstance.get(`/posts/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useFetchPostsByUserId = (userId: string) => {
  const token = useAuthStore?.getState()?.access_token || "";

  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUserIdRequest(userId, token),
    enabled: !!token && !!userId,
  });
};
