import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

export interface Follower {
  id: string;
  name: string;
}

const fetchFollowersRequest = async (
  userId: string,
  token: string
): Promise<Follower[]> => {
  return handleRequest(async () => {
    const response = await apiInstance.get<Follower[]>(
      `/users/${userId}/followers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};
export const useFetchFollowers = (userId: string) => {
  const token = useAuthStore?.getState()?.access_token || "";

  console.log();

  return useQuery({
    queryKey: ["followers", userId],
    queryFn: () => fetchFollowersRequest(userId, token),
    enabled: !!userId && !!token,
  });
};
