import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import ManageMedicine from "./pages/manage-medicine/ManageMedicine";
import AddMedicine from "./pages/manage-medicine/AddMedicine";
import UpdateMedicine from "./pages/manage-medicine/UpdateMedicine";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import AddCategories from "./pages/ManageCategories/AddCategories";
import UpdateCategories from "./pages/ManageCategories/UpdateCategories";
import MedDetails from "./pages/MedDetails/MedDetails";
import CategorieDetails from "./pages/CategorieDetails/CategorieDetails";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import ManageRequest from "./pages/ManageRequest/ManageRequest";
import LayOutPage from "./pages/LayOutPage/LayOutPage";
import ManagePatient from "./pages/ManagePatient/ManagePatient";
import AddPatient from "./pages/ManagePatient/AddPatient";
import UpdatePatient from "./pages/ManagePatient/UpdatePatient";
import HistoryPage from "./pages/HistoryPage/HistoryPage";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LayOutPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/search-history",
        element: <HistoryPage />,
      },

      // {
      //   path: ":id",
      //   element: <MedicineDetails/>,
      // },
      // Guest middleware
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      {
        path: ":id",
        element: <MedDetails />,
      },
      {
        path: ":id",
        element: <CategorieDetails />,
      },

      // {
      //   path: "MedicineDetails",
      //   element: <MedDeta ,
      // },
      {
        path: "/manage-medicine",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageMedicine />,
          },
          {
            path: "add",
            element: <AddMedicine />,
          },
          {
            path: ":id",
            element: <UpdateMedicine />,
          },
          {
            path: ":id",
            element: <MedDetails />,
          },
        ],
      },
      {
        path: "/Manage-Cat",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageCategories />,
          },
          {
            path: "add",
            element: <AddCategories />,
          },
          {
            path: ":id",
            element: <UpdateCategories />,
          },
          {
            path: ":id",
            element: <CategorieDetails />,
          },
        ],
      },
      {
        path: "/Manage-Request",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageRequest />,
          },
        ],
      },
      {
        path: "/Manage-Patient",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManagePatient />,
          },
          {
            path: "add",
            element: <AddPatient />,
          },
          {
            path: ":id",
            element: <UpdatePatient />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
