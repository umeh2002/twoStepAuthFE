import { createBrowserRouter } from "react-router-dom";
import Register from "../auth/Register";
import SignIn from "../auth/SignIn";
import Message from "../pages/Message";
import OptMessage from "../pages/OptMessage";
import Otp from "../auth/Otp";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRouter";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/:token/verify-account",
    element: <SignIn />,
  },
  {
    path: "/:token/first-verify",
    element: <Otp />,
  },
  {
    path: "/congrats",
    element: <Message />,
  },
  {
    path: "/message",
    element: <OptMessage />,
  },
  {
    path: "/homepage",
    element: (
      <PrivateRoute>
        <Home />,
      </PrivateRoute>
    ),
  },
]);
