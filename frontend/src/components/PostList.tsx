import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeletePost } from "@/services/posts/deletePostMutation";
import { useEditPost } from "@/services/posts/editPostMutation";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostContentModal from "./PostContentModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
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
  token: string;
  currentUserId: string;
}

export function PostList({ posts, token, currentUserId }: IPostListProps) {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [openEdit, setOpenEdit] = useState(false);
  const [content, setContent] = useState(posts[0]?.content || "");
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { editPost, isSubmitting } = useEditPost();
  const { deletePost } = useDeletePost();

  const handleOpenChange = (postId: string, isOpen: boolean) => {
    setOpenMenus((prev) => ({ ...prev, [postId]: isOpen }));
  };

  const handleEdit = (post: IPost) => {
    setSelectedPost(post);
    setContent(post.content);
    setOpenEdit(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (selectedPost) {
        await editPost(token, selectedPost.id, content);
        setOpenEdit(false);
        navigate(0);
        setContent("");
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const confirmDelete = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    try {
      await deletePost({ token, postId: postToDelete });
      setDeleteDialogOpen(false);
      navigate(0);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="space-y-4 w-full p-10">
      {posts.map((post) => (
        <Card key={post.id} className="max-w-screen-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <p className="font-bold">{post.user}</p>
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
                    <DropdownMenuItem onClick={() => handleEdit(post)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => confirmDelete(post.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
      {selectedPost && (
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <PostContentModal
            content={content}
            open={openEdit}
            onOpenChange={setOpenEdit}
            setContent={setContent}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            title="Edit post"
          />
        </Dialog>
      )}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
