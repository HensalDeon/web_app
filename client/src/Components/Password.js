import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../hooks/fetch.hook";
import { passwordValidate } from "../helper/validate";
import { verifyPassword } from "../helper/axios";
import Loader from "./Loader";
export default function Password() {
    const navigate = useNavigate();
    const username = useSelector((state) => state.userReducer.username);
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let loginPromise = verifyPassword({ username, password: values.password });
            toast.promise(
                loginPromise.then((res) => {
                    let { token } = res.data;
                    localStorage.setItem("token", token);
                    navigate("/profile");
                }),
                {
                    loading: "Checking...",
                    success: (result) => {
                        return <b>Login Successfully...!</b>;
                    },
                    error: <b>Password Not Match!</b>,
                }
            );
        },
    });

    if (isLoading) return <Loader />;
    if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex-col flex items-center">
                        <h4 className="text-5xl font-bold ">Hello {apiData?.firstName || apiData?.username}!</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore More by connecting with us.
                        </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <img src={apiData?.profile || avatar} className={styles.profile_image} alt="avatar" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                {...formik.getFieldProps("password")}
                                type="text"
                                className={styles.textbox}
                                placeholder="Password"
                            />
                            <button type="submit" className={styles.btn}>
                                Sign In
                            </button>
                        </div>
                        <div className="text-center py-4">
                            <span className="text-gray-500">
                                Forgot Password?{" "}
                                <Link className="text-red-500" to="/recovery">
                                    Recover Now
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
