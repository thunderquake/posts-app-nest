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
import { useAuthStore } from "@/stores/authStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";

interface UserEditFormProps {
  initialData: User;
  refetchUser: () => void;
  refetchPosts: () => void;
}

interface UserEditFormData {
  name: string;
  description?: string;
}

const userEditSchema = yup.object().shape({
  name: yup
    .string()
    .required("Username is required")
    .max(50, "Username must not exceed 50 characters"),
  description: yup
    .string()
    .max(500, "Description must not exceed 500 characters"),
});

const UserEditForm = ({
  initialData,
  refetchUser,
  refetchPosts,
}: UserEditFormProps) => {
  const navigate = useNavigate();
  const { mutate: editUser, isPending } = useEditUser(
    refetchUser,
    refetchPosts
  );

  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
  } = useForm<UserEditFormData>({
    resolver: yupResolver(userEditSchema),
    defaultValues: {
      name: initialData.name,
      description: initialData.description,
    },
  });

  const onSubmit = async (data: UserEditFormData) => {
    const updateData: Partial<User> = {};
    if (data.name !== initialData.name) updateData.name = data.name;
    if (data.description !== initialData.description)
      updateData.description = data.description;

    if (Object.keys(updateData).length === 0) return;

    editUser(
      { userId: initialData.id, updateData },
      {
        onSuccess: () => {
          if (updateData.name) {
            useAuthStore
              .getState()
              .setUserDetails(updateData.name, initialData.email);
            navigate(`/profile/${updateData.name}`);
          }
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.status === 403) {
            setError("name", {
              type: "manual",
              message: "Username already taken",
            });
          } else {
            toast.error("An unexpected error occurred");
            console.error("An error occurred:", error);
          }
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-16">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("name")}
              placeholder="Enter your username"
              maxLength={50}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Tell us about yourself"
              rows={5}
              maxLength={500}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditForm;
