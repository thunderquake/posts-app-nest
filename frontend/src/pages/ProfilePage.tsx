import { useAuthStore } from "@/stores/authStore";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username: urlUsername } = useParams<{ username: string }>();
  const username = useAuthStore?.getState()?.username || "";

  if (urlUsername !== username) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full mx-auto">
      <div>
        <h1 className="text-center text-2xl font-bold">@{username}</h1>
        <Separator />
      </div>
    </div>
  );
};
export default ProfilePage;
