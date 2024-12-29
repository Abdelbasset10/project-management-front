import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ProjectDetails from "./pages/project-details/ProjectDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home />
  },
  {
    path: "/:id",
    element:<ProjectDetails />,
  },
]);

export default router;
