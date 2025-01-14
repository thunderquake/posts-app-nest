import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

interface User {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  isVerified: boolean;
}

interface UseUserOptions {
  select?: string[];
}

const getUserRequest = async (userId: string, token: string): Promise<User> => {
  return handleRequest(async () => {
    const response = await apiInstance.get<User>(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useUser = (userId: string, options?: UseUserOptions) => {
  const token = useAuthStore?.getState()?.access_token || "";

  return useQuery<User>({
    queryKey: ["user", userId, options?.select],
    queryFn: () => getUserRequest(userId, token),
    enabled: !!token && !!userId,
  });
};
