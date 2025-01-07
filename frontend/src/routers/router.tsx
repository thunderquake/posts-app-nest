import ErrorPage from "@/pages/ErrorPage";
import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFound";
import ProfilePage from "@/pages/ProfilePage";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:username",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
