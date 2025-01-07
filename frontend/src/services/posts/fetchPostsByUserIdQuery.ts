import { IPost } from "@/components/PostCard";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import postsService from "../postsService";

export const useFetchPostsByUserId = (userId: string) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore?.getState()?.access_token || "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await postsService.getPostsByUserId(userId, token);
        setPosts(postsData);
      } catch (e) {
        setError("Failed to fetch posts:" + e);
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchPosts();
    }
  }, [token, userId]);

  return { posts, loading, error };
};
