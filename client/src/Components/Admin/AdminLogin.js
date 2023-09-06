import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import adminAvatar from "../../assets/admin.jpg";
import styles from "../../styles/Username.module.css";
import { passwordValidate, usernameValidate } from "../../helper/validate";
import { verifyAdmin } from "../../helper/adminAxios";

export default function AdminLogin() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            adminName: "",
            password: "",
        },
        validate: passwordValidate,
        usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let loginPromise = verifyAdmin({ adminName: values.adminName, password: values.password });
            toast.promise(
                loginPromise.then((res) => {
                    let { token } = res.data;
                    localStorage.setItem("adminToken", token);
                    navigate("/admin");
                }),
                {
                    loading: "Checking...",
                    success: (result) => {
                        return <b>Login Successfull...!</b>;
                    },
                    error: <b>Wrong Password!</b>,
                }
            );
        },
    });
    
    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={`py-10 ${styles.adminGlass}`}>
                    <div className="title flex-col flex items-center">
                        <h4 className="text-5xl font-bold ">Hello Admin!</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">Hope you have a good day.</span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <img src={adminAvatar} className={styles.profile_image} alt="avatar" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                {...formik.getFieldProps("adminName")}
                                type="text"
                                className={styles.textbox}
                                placeholder="Admin Name"
                            />
                            <input
                                {...formik.getFieldProps("password")}
                                type="text"
                                className={styles.textbox}
                                placeholder="Password"
                            />
                            <button type="submit" className={styles.btn}>
                                Let's Go
                            </button>
                        </div>
                        {/* <div className="text-center py-4">
                            <span className="text-gray-500">
                                Going for a break?{" "}
                                <button onClick={adminLogout} className="text-red-500">
                                    Log Out here
                                </button>
                            </span>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
}
