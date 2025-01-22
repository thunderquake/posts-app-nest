import { CreatePostButton } from "@/components/posts/CreatePostButton";
import { IPost } from "@/components/posts/PostCard";
import { PostList } from "@/components/posts/PostList";
import { AppSidebar } from "@/components/UserSidebar";
import { useFetchPosts } from "@/services/posts/useFetchPosts";
import { useAuthStore } from "@/stores/authStore";
import { SidebarProvider } from "@ui/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const username = useAuthStore((state) => state.username) || "";
  const email = useAuthStore((state) => state.email) || "";
  const token = useAuthStore((state) => state.access_token) || "";
  const currentUserId = useAuthStore((state) => state.userId) || "";

  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: postsData, isLoading, error, refetch } = useFetchPosts();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-storage")) {
      navigate("/signup");
    }
  }, [navigate]);

  useEffect(() => {
    if (postsData && token) {
      setPosts(postsData);
    }
  }, [postsData, token]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar username={username} email={email} />
        <div className="flex flex-col w-fit mx-auto">
          <h1 className="text-3xl font-bold text-center mt-4">All Posts</h1>
          {isLoading ? (
            <div>Loading posts...</div>
          ) : error ? (
            <div>Failed to fetch posts: {error.message}</div>
          ) : (
            <PostList
              posts={posts}
              token={token}
              currentUserId={currentUserId}
              refetch={refetch}
            />
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
