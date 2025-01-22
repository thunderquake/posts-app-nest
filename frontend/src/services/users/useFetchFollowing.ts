import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

export interface Following {
  id: string;
  name: string;
}

const fetchFollowingRequest = async (
  userId: string,
  token: string
): Promise<Following[]> => {
  return handleRequest(async () => {
    const response = await apiInstance.get<Following[]>(
      `/users/${userId}/following`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};

export const useFetchFollowing = (userId: string) => {
  const token = useAuthStore((state) => state.access_token) || "";

  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => fetchFollowingRequest(userId, token),
    enabled: !!userId && !!token,
  });
};
