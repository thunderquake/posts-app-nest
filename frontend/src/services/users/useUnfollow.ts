import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

interface User {
  id: string;
  following: User[];
}

const unfollowUserRequest = async (
  unfollowData: {
    userId: string;
    targetUserId: string;
  },
  token: string
): Promise<User> => {
  return handleRequest(async () => {
    const response = await apiInstance.put<User>(
      `/users/unfollow`,
      unfollowData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};

export const useUnfollow = () => {
  const token = useAuthStore((state) => state.access_token) || "";
  return useMutation({
    mutationFn: (unfollowData: { userId: string; targetUserId: string }) =>
      unfollowUserRequest(unfollowData, token),
  });
};
