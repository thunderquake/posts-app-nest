import { useMutation } from "@tanstack/react-query";
import postsService from "../postsService";

export const useDeletePost = () => {
  const { mutateAsync: deletePost } = useMutation({
    mutationFn: ({ token, postId }: { token: string; postId: string }) =>
      postsService.deletePost(token, postId),
  });

  return { deletePost };
};
