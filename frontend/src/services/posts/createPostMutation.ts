import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postsService from "../postsService";

export const useCreatePost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const createPost = async (token: string, content: string, userId: string) => {
    setIsSubmitting(true);
    try {
      await postsService.createPost(token, { content, userId });
      navigate(0);
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createPost, isSubmitting };
};
