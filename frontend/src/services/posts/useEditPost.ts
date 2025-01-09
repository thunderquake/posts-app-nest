import { useMutation } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";
import { useFetchPosts } from "./useFetchPosts";

const editPostRequest = async (
  token: string,
  postId: string,
  content: string
) => {
  return handleRequest(async () => {
    const response = await apiInstance.put(
      `/posts/${postId}`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  });
};

export const useEditPost = () => {
  const { refetch } = useFetchPosts();

  const { mutate: editPost, isPending: isSubmitting } = useMutation({
    mutationFn: ({
      token,
      postId,
      content,
    }: {
      token: string;
      postId: string;
      content: string;
    }) => editPostRequest(token, postId, content),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error editing post:", error);
    },
  });

  return { editPost, isSubmitting };
};
