import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("Name is required"),
  pass: yup.string().required("Password is required"),
});

export const signupSchema = yup.object({
  username: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  pass: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});
