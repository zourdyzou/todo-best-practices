import { HomePage } from "@/pages/HomePage/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Setup main error page!</div>,
  },
]);

export const App = () => <RouterProvider router={router} />;
