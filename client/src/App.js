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
import AdminLogin from "./Components/Admin/AdminLogin";

/** auth middlewares */
import { AuthorizeAdmin, ProtectUserRoute, AuthorizeUser, ProtectAdminRoute, ProtectRoute } from "./middleware/auth";

/** root Routes */
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectUserRoute>
                <Username />,
            </ProtectUserRoute>
        ),
    },
    {
        path: "/admin-login",
        element: (
            <ProtectAdminRoute>
                <AdminLogin />
            </ProtectAdminRoute>
        ),
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
        path: "/admin",
        element: (
            <AuthorizeAdmin>
                <AdminLayout />
            </AuthorizeAdmin>
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
export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    );
}
