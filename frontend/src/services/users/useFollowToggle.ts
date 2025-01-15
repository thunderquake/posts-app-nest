import { useFetchFollowers } from "@/services/users/useFetchFollowers";
import { useFollow } from "@/services/users/useFollow";
import { useUnfollow } from "@/services/users/useUnfollow";

export const useFollowToggle = (userId: string, targetUserId: string) => {
  const followMutation = useFollow();
  const unfollowMutation = useUnfollow();
  const { data: followers, refetch } = useFetchFollowers(targetUserId);

  const isFollowing = followers?.some((follower) => follower.id === userId);

  const handleFollow = async () => {
    if (targetUserId && userId) {
      if (isFollowing) {
        await unfollowMutation.mutateAsync({
          userId: userId,
          targetUserId: targetUserId,
        });
      } else {
        await followMutation.mutateAsync({
          userId: userId,
          targetUserId: targetUserId,
        });
      }

      refetch();
    }
  };

  return {
    isFollowing,
    handleFollow,
  };
};
