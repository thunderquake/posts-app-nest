import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import PostDropdownMenu from "./PostDropdown";

export interface IPost {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: string;
}

interface PostCardProps {
  post: IPost;
  currentUserId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const PostCard = ({
  post,
  currentUserId,
  isOpen,
  onOpenChange,
  onEdit,
  onDelete,
}: PostCardProps) => {
  return (
    <Card className="max-w-screen-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <a
            href={`/profile/${post.user}`}
            className="font-bold hover:underline"
          >
            {post.user}
          </a>
          <CardTitle className="text-sm text-muted-foreground">
            Posted on {new Date(post.createdAt).toLocaleString()}
            {post.createdAt !== post.updatedAt && (
              <span>
                {" "}
                (Edited on {new Date(post.updatedAt).toLocaleString()})
              </span>
            )}
          </CardTitle>
        </div>
        {post.userId === currentUserId && (
          <PostDropdownMenu
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
