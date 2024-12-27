import PostContentModal from "@/components/PostContentModal";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import postsService from "@/services/postsService";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dialog } from "@/components/ui/dialog";

export function CreatePostButton({ token }: { token: string }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const userId = useAuthStore?.getState()?.userId || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = { content, userId };

    try {
      const result = await postsService.createPost(token, formData);
      console.log(result.message);
      setContent("");
      setOpen(false);
      navigate(0);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
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
