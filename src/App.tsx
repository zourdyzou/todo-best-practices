import HomePage from "@/pages/HomePage/HomePage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from '@/components/ui/toaster';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => (
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
