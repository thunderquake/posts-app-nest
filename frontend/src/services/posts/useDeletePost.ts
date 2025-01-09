import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiInstance, handleRequest } from "../postsService";

const deletePostRequest = async (token: string, postId: string) => {
  return handleRequest(async () => {
    const response = await apiInstance.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: ({ token, postId }: { token: string; postId: string }) =>
      deletePostRequest(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(0);
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });
  return { deletePost };
};
