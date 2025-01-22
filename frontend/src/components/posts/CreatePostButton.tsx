import PostContentModal from "@/components/posts/PostContentModal";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@ui/button";
import { Dialog, DialogTrigger } from "@ui/dialog";
import { useState } from "react";

import { useCreatePost } from "@/services/posts/useCreatePost";

export function CreatePostButton({ token }: { token: string }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const userId = useAuthStore?.getState()?.userId || "";
  const { createPost, isSubmitting } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      createPost({ token, post: { content, userId } });
      setContent("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="rounded-full p-6"
            onClick={() => setOpen(true)}
          >
            <p className="text-3xl">+</p>
            <span className="sr-only">Create new post</span>
          </Button>
        </DialogTrigger>
        <PostContentModal
          open={open}
          onOpenChange={setOpen}
          content={content}
          setContent={setContent}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          title="Create a new post"
        />
      </Dialog>
    </>
  );
}

export default CreatePostButton;
