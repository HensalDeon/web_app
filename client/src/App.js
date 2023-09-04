import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/** import all components */
import Username from "./Components/Username";
import Password from "./Components/Password";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Recovery from "./Components/Recovery";
import Reset from "./Components/Reset";
import PageNotFound from "./Components/PageNotFound";
import AdminLayout from "./Components/Admin/AdminLayout";

/** auth middlewares */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
/** root Routes */
const router = createBrowserRouter([
    {
        path: "/",
        element: <Username />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
    },
    {
        path: "/password",
        element: (
            <ProtectRoute>
                <Password />
            </ProtectRoute>
        ),
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/profile",
        element: (
            <AuthorizeUser>
                <Profile />
            </AuthorizeUser>
        ),
    },
    {
        path: "/recovery",
        element: <Recovery />,
    },
    {
        path: "/reset",
        element: <Reset />,
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);
console.log("Route Configuration:", router);
export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    );
}
