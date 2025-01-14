import { PostList } from "@/components/PostList";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/UserSidebar";
import { useFetchPostsByUserId } from "@/services/posts/useFetchPostsByUserId";
import { useUser } from "@/services/posts/useUser";
import { useAuthStore } from "@/stores/authStore";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username: urlUsername } = useParams<{ username: string }>();

  const sideUsername = useAuthStore?.getState()?.username || "";
  const sideEmail = useAuthStore?.getState()?.email || "";
  const token = useAuthStore?.getState()?.access_token || "";
  const sideUserId = useAuthStore?.getState()?.userId || "";

  const userResponse = useUser(urlUsername || "");
  const user = userResponse.data;

  const posts = useFetchPostsByUserId(user?.id || "").data || [];

  const isMyProfile = sideUsername === urlUsername;

  if (!user) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-600">User Not Found</h1>
      </div>
    );
  }

  //TODO: Add Edit button and page

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar username={sideUsername || ""} email={sideEmail} />
        <div className="flex flex-col w-full mx-auto">
          <div className="grid grid-cols-2 items-center">
            <div className="text-left row-span-1 m-6">
              <h1 className="text-2xl font-bold">@{urlUsername}</h1>
              <h2 className="mt-4">Description will be added later</h2>
            </div>
            <div className="justify-self-end mr-6">
              {isMyProfile ? (
                <Button className="max-w-16">Edit</Button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <Separator className="bg-gray-300 p-[0.5px] w-full" />
          <div className="flex justify-center w-full">
            <div className="max-w-screen-lg w-full">
              <PostList
                posts={posts}
                token={token}
                currentUserId={sideUserId}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default ProfilePage;
