import { useQuery } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";

const validateUsernameRequest = async (username: string): Promise<boolean> => {
  return handleRequest(async () => {
    const response = await apiInstance.get<boolean>(
      `/users/validate/${username}`
    );
    return response.data;
  });
};

export const useValidateUsername = (username: string) => {
  return useQuery<boolean>({
    queryKey: ["validateUsername", username],
    queryFn: () => validateUsernameRequest(username),
    enabled: !!username,
  });
};
