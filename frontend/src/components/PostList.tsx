import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleOpenChange = (postId: string, isOpen: boolean) => {
    setOpenMenus((prev) => ({ ...prev, [postId]: isOpen }));
  };

  function handleEdit(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-4 w-full p-10">
      {posts.map((post) => (
        <Card key={post.id} className="max-w-screen-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <p className="font-bold">{post.user}</p>
              <CardTitle className="text-sm text-muted-foreground">
                Posted on {new Date(post.createdAt).toLocaleString()}
              </CardTitle>
            </div>
            <DropdownMenu
              open={openMenus[post.id]}
              onOpenChange={(isOpen) => handleOpenChange(post.id, isOpen)}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => handleEdit(post.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
