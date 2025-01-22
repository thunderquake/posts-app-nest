import { useFollowToggle } from "@/services/users/useFollowToggle";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "../ui/button";
import { Follower } from "./FollowerList";

const FollowerCard = (follower: Follower) => {
  const sideUserId = useAuthStore((state) => state.userId) || "";

  const isMyProfile =
    follower.username === useAuthStore((state) => state.username) || "";

  const { isFollowing, handleFollow } = useFollowToggle(
    sideUserId,
    follower.userId
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="grid gap-0.5">
          <a
            href={`/profile/${follower.username}`}
            className="text-sm hover:underline"
          >
            @{follower.username}
          </a>
        </div>
      </div>
      {!isMyProfile && (
        <Button variant="secondary" onClick={() => handleFollow()}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default FollowerCard;
