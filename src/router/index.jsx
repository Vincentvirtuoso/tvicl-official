import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "user/:userId",
        element: <UserDetail />,
      },
      {
        path: "property/:propertyId",
        element: <PropertyDetail />,
      },
      {
        path: "add-property",
        element: <AddProperty />,
      },
      {
        path: "revenue",
        element: <Revenue />,
      },
    ],
  },
]);
export default router;
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Properties from "../pages/Properties";
import UserDetail from "../pages/UserDetail";
import PropertyDetail from "../pages/PropertyDetail";
import Revenue from "../pages/Revenue";
import AddProperty from "../pages/AddProperty";
