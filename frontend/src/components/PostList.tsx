import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default interface IPost {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: string;
}

interface IPostListProps {
  posts: IPost[];
}

export function PostList({ posts }: IPostListProps) {
  return (
    <div className="space-y-4 w-full p-10">
      {posts.map((post) => (
        <Card key={post.id} className="max-w-screen-lg">
          <CardHeader>
            <p className="font-bold">{post.user}</p>
            <CardTitle className="text-sm text-muted-foreground">
              Posted on {new Date(post.createdAt).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
