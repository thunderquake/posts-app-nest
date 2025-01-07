import { useDeletePost } from "@/services/posts/deletePostMutation";
import { useEditPost } from "@/services/posts/editPostMutation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostAlertDialog from "./PostAlertDialog";
import PostCard, { IPost } from "./PostCard";
import PostContentModal from "./PostContentModal";
import { Dialog } from "./ui/dialog";

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
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          isOpen={openMenus[post.id]}
          onOpenChange={(isOpen) => handleOpenChange(post.id, isOpen)}
          onEdit={() => handleEdit(post)}
          onDelete={() => confirmDelete(post.id)}
        />
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
      <PostAlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onCancel={() => setDeleteDialogOpen(false)}
        onDelete={handleDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
}
