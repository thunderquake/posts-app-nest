import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface PostContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  setContent: (content: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
}

const PostContentModal = ({
  content,
  setContent,
  isSubmitting,
  handleSubmit,
  title,
}: PostContentModalProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
          maxLength={500}
          rows={11}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </DialogContent>
  );
};

export default PostContentModal;
