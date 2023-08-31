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
/** root Routes */

const router = createBrowserRouter([
    {
        path: "/",
        element: <Username />,
    },
    {
        path: "/password",
        element: <Password />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/profile",
        element: <Profile />,
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
