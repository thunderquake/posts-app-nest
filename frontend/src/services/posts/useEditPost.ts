import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiInstance, handleRequest } from "../postsService";

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(0);
    },
    onError: (error) => {
      console.error("Error editing post:", error);
    },
  });

  return { editPost, isSubmitting };
};
