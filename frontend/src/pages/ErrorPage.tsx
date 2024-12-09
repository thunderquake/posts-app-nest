import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useEffect } from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <CardTitle>Oops! An Error Occurred</CardTitle>
          </div>
          <CardDescription>We're sorry, something went wrong.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {error.statusText ||
              error.message ||
              "An unexpected error occurred."}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
