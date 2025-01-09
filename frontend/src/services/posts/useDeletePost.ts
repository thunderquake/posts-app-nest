import { useMutation } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";
import { useFetchPosts } from "./useFetchPosts";

const deletePostRequest = async (token: string, postId: string) => {
  return handleRequest(async () => {
    const response = await apiInstance.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useDeletePost = () => {
  const { refetch } = useFetchPosts();

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: ({ token, postId }: { token: string; postId: string }) =>
      deletePostRequest(token, postId),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });
  return { deletePost };
};
