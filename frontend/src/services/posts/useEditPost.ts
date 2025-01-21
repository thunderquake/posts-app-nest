import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiInstance, handleRequest } from "../postsService";
import { useFetchPostsByUserId } from "./useFetchPostsByUserId";

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

export const useEditPost = (refetch: () => void) => {
  const userId = useAuthStore?.getState()?.userId || "";
  const { refetch: refetchPostsByUserId } = useFetchPostsByUserId(userId);

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
      refetchPostsByUserId();
    },
    onError: (error) => {
      toast.error("Error editing post");
      console.error("Error editing post:", error);
    },
  });

  return { editPost, isSubmitting };
};
