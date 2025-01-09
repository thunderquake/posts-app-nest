import { PostParams } from "@/types/postsServiceTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiInstance, handleRequest } from "../postsService";

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createPost, isPending: isSubmitting } = useMutation({
    mutationFn: createPostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(0);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  return { createPost, isSubmitting };
};
