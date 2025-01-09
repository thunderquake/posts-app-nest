import { PostParams } from "@/types/postsServiceTypes";
import { useMutation } from "@tanstack/react-query";
import { apiInstance, handleRequest } from "../postsService";
import { useFetchPosts } from "./useFetchPosts";

const createPostRequest = async ({
  token,
  post,
}: {
  token: string;
  post: PostParams;
}) => {
  return handleRequest(async () => {
    const response = await apiInstance.post("/posts", post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });
};

export const useCreatePost = () => {
  const { refetch } = useFetchPosts();

  const { mutate: createPost, isPending: isSubmitting } = useMutation({
    mutationFn: createPostRequest,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  return { createPost, isSubmitting };
};
