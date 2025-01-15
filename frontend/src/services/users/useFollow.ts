import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

interface User {
  id: string;
  following: User[];
}

const followUserRequest = async (
  followData: {
    userId: string;
    targetUserId: string;
  },
  token: string
): Promise<User> => {
  return handleRequest(async () => {
    const response = await apiInstance.put<User>(`/users/follow`, followData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useFollow = () => {
  const token = useAuthStore?.getState()?.access_token || "";
  return useMutation({
    mutationFn: (followData: { userId: string; targetUserId: string }) =>
      followUserRequest(followData, token),
  });
};
