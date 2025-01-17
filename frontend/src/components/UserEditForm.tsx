import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditUser } from "@/services/users/useEditUser";
import { User } from "@/services/users/useUser";
import { useValidateUsername } from "@/services/users/useValidateUsername";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostAlertDialog from "./PostAlertDialog";

interface UserEditFormProps {
  initialData: User;
  refetchUser: () => void;
  refetchPosts: () => void;
}

const UserEditForm = ({
  initialData,
  refetchUser,
  refetchPosts,
}: UserEditFormProps) => {
  const [userData, setUserData] = useState<User>(initialData);
  const [open, setOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { mutate: editUser, isPending } = useEditUser(
    refetchUser,
    refetchPosts
  );
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { refetch: validateUsername } = useValidateUsername(
    userData.name || ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userData.name !== initialData.name) {
      const { data: isUserValid } = await validateUsername();

      if (!isUserValid) {
        setUsernameError("username is already taken");
        return;
      }
    }

    setShowConfirmDialog(true);
  };

  const handleConfirm = async () => {
    try {
      editUser({ userId: userData.id, updateData: userData });
      setOpen(false);
      setUserData(userData);
      setShowConfirmDialog(false);

      useAuthStore.getState().setUserDetails(userData.name, userData.email);
      if (userData.name !== initialData.name) {
        navigate(`/profile/${userData.name}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      setUsernameError(null);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="max-w-16">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
                maxLength={50}
              />
              {usernameError && (
                <p className="text-sm text-red-500">{usernameError}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={userData.description}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows={5}
                maxLength={500}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <PostAlertDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onCancel={() => setShowConfirmDialog(false)}
        confirmText="Save Changes"
        onConfirm={handleConfirm}
        title="Confirm Changes"
        description="Are you sure you want to save these changes?"
      />
    </>
  );
};

export default UserEditForm;
