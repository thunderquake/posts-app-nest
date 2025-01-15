import { ScrollArea } from "@/components/ui/scroll-area";
import FollowerCard from "./FollowerCard";

export interface Follower {
  username: string;
  userId: string;
}

interface FollowerListProps {
  followers: Follower[];
}

const FollowerList = ({ followers }: FollowerListProps) => {
  return (
    <div className="w-full max-w-md mx-auto py-8">
      <ScrollArea className="max-h-[400px] rounded-lg border">
        <div className="grid gap-4 p-4">
          {followers.map((follower) => (
            <FollowerCard key={follower.username} {...follower} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export default FollowerList;
