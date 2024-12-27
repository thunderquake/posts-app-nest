import { CreatePostButton } from "@/components/CreatePostButton";
import IPost, { PostList } from "@/components/PostList";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/UserSidebar";
import postsService from "@/services/postsService";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const username = useAuthStore?.getState()?.username || "";
  const email = useAuthStore?.getState()?.email || "";
  const token = useAuthStore?.getState()?.access_token || "";

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-storage")) {
      navigate("/signup");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await postsService.getAllPosts(token);
        setPosts(postsData);
      } catch (e) {
        setError("Failed to fetch posts:" + e);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar username={username} email={email} />
        <div className="flex flex-col w-fit mx-auto">
          <h1 className="text-3xl font-bold text-center mt-4">All Posts</h1>
          {loading ? (
            <div>Loading posts...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
        <div className="fixed bottom-6 right-6">
          <CreatePostButton token={token} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainPage;
