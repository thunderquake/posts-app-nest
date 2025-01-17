import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";
import { User } from "./useUser";

export interface UpdateUser {
  name?: string;
  email?: string;
  description?: string;
}

const updateUserRequest = async (
  userId: string,
  updateData: UpdateUser,
  token: string
): Promise<User> => {
  return handleRequest(async () => {
    const response = await apiInstance.put<User>(
      `/users/${userId}`,
      updateData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};

export const useEditUser = (
  refetchUser: () => void,
  refetchPosts: () => void
) => {
  const token = useAuthStore?.getState()?.access_token || "";

  return useMutation({
    mutationFn: ({
      userId,
      updateData,
    }: {
      userId: string;
      updateData: UpdateUser;
    }) => updateUserRequest(userId, updateData, token),

    onSuccess: () => {
      refetchUser();
      refetchPosts();
    },
  });
};
