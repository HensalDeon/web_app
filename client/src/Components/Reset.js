import React, { useEffect } from "react";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/axios";
import { Navigate, useNavigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";
import Loader from "./Loader";

export default function Reset() {
    const navigate = useNavigate();
    const username = useSelector((state) => state.userReducer.username);
    const [{isLoading, apiData, status, serverError}] = useFetch('create-resetSession');

    useEffect(()=>{
        console.log(apiData);
    })
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let resetPromise = resetPassword({ username, password: values.password });
            toast
                .promise(resetPromise, {
                    loading: "Updating...",
                    success: <b>Password reset Successfull!</b>,
                    error: <b> Could not Reset!</b>,
                })
                .then(() => {
                    navigate("/password");
                });
        },
    });

    if (isLoading) return <Loader />;
    // if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
    if (serverError) return <Navigate to="/password" replace={true} ></Navigate>
    if(status && status !== 201) return <Navigate to="/password" replace={true} ></Navigate>
    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass} style={{ width: "50%" }}>
                    <div className="title flex-col flex items-center">
                        <h4 className="text-5xl font-bold ">Reset</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter new password.</span>
                    </div>
                    <form className="pt-20" onSubmit={formik.handleSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                {...formik.getFieldProps("password")}
                                type="text"
                                className={styles.textbox}
                                placeholder="New Password"
                            />
                            <input
                                {...formik.getFieldProps("confirmPassword")}
                                type="text"
                                className={styles.textbox}
                                placeholder="Repeat Password"
                            />
                            <button type="submit" className={styles.btn}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
