import { CreatePostButton } from "@/components/CreatePostButton";
import { IPost } from "@/components/PostCard";
import { PostList } from "@/components/PostList";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/UserSidebar";
import { useFetchPosts } from "@/services/posts/fetchAllPostsQuery";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const username = useAuthStore?.getState()?.username || "";
  const email = useAuthStore?.getState()?.email || "";
  const token = useAuthStore?.getState()?.access_token || "";
  const currentUserId = useAuthStore?.getState()?.userId || "";

  const [posts, setPosts] = useState<IPost[]>([]);
  const { posts: postsData, loading: isLoading, error } = useFetchPosts();

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
            <div>Failed to fetch posts: {error}</div>
          ) : (
            <PostList
              posts={posts}
              token={token}
              currentUserId={currentUserId}
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
