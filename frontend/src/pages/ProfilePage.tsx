import { PostList } from "@/components/posts/PostList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import FollowerList from "@/components/users/FollowerList";
import UserEditForm from "@/components/users/UserEditForm";
import { AppSidebar } from "@/components/UserSidebar";
import { useFetchPostsByUserId } from "@/services/posts/useFetchPostsByUserId";
import { useFetchFollowers } from "@/services/users/useFetchFollowers";
import { useFetchFollowing } from "@/services/users/useFetchFollowing";
import { useFollowToggle } from "@/services/users/useFollowToggle";
import { useUser } from "@/services/users/useUser";
import { useAuthStore } from "@/stores/authStore";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username: urlUsername } = useParams<{ username: string }>();

  const sideUsername = useAuthStore((state) => state.username) || "";
  const sideEmail = useAuthStore((state) => state.email) || "";
  const token = useAuthStore((state) => state.access_token) || "";
  const sideUserId = useAuthStore((state) => state.userId) || "";

  const { data: user, refetch: refetchUser } = useUser(urlUsername || "");

  const userId = user?.id || "";

  const { data: followers } = useFetchFollowers(userId);
  const { data: following } = useFetchFollowing(userId);

  const { data: posts, refetch: refetchPosts } = useFetchPostsByUserId(
    user?.id || ""
  );

  const { isFollowing, handleFollow } = useFollowToggle(sideUserId, userId);

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
              <h2 className="mt-4">{user.description}</h2>
            </div>
            <div className="justify-self-end mr-6">
              {isMyProfile ? (
                <UserEditForm
                  initialData={user}
                  refetchUser={refetchUser}
                  refetchPosts={refetchPosts}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="mx-6 mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm font-semibold p-0">
                  {followers?.length} Followers
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Followers</DialogTitle>
                </DialogHeader>
                <FollowerList
                  followers={
                    followers?.map((f) => ({
                      username: f.name,
                      userId: f.id,
                    })) || []
                  }
                />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-sm font-semibold p-0 ml-4"
                >
                  {following?.length} Following
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Following</DialogTitle>
                </DialogHeader>
                <FollowerList
                  followers={
                    following?.map((f) => ({
                      username: f.name,
                      userId: f.id,
                    })) || []
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
          {!isMyProfile && (
            <div className="justify-self-end mx-6 mb-4">
              <Button
                className="max-w-18"
                onClick={() => handleFollow()}
                variant={isFollowing ? "outline" : "default"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          )}

          <Separator className="bg-gray-300 p-[0.5px] w-full" />
          <div className="flex justify-center w-full">
            <div className="max-w-screen-lg w-full">
              <PostList
                posts={posts ?? []}
                token={token}
                currentUserId={sideUserId}
                refetch={refetchPosts}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default ProfilePage;
