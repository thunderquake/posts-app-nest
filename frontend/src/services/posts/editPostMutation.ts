import postsService from "@/services/postsService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useEditPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const editPost = async (token: string, postId: string, content: string) => {
    setIsSubmitting(true);
    try {
      await postsService.editPost(token, postId, content);
      navigate(0);
      return true;
    } catch (error) {
      console.error("Error editing post:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { editPost, isSubmitting };
};
