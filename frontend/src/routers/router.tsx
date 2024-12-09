import ErrorPage from "@/pages/ErrorPage";
import NotFoundPage from "@/pages/NotFound";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
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
]);

export default router;
