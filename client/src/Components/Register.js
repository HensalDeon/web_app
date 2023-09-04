import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import { bindActionCreators } from "redux";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/axios";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const profileImage = useSelector((state) => state.profileImage.profileImage);
    const { updateProfileImage } = bindActionCreators(actionCreators, dispatch);

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values, { profile: profileImage || "" });
            let registerPromise = registerUser(values);
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success: <b>Registered Successfully...!</b>,
                error: <b>Could not register</b>
            })

            registerPromise.then(function(){ navigate('/') })

        }
    });

    /** formik doesn't support file upload so we need to create this handler */
    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        updateProfileImage(base64);
    };
    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center ">
                <div className={styles.glass} style={{ width: "45%" }}>
                    <div className="title flex-col flex items-center">
                        <h4 className="text-5xl font-bold ">Register</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">Happy to join you!</span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile" name="profile">
                                <img src={profileImage || avatar} className={styles.profile_image} alt="avatar" />
                            </label>
                            <input onChange={onUpload} type="file" id="profile" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                {...formik.getFieldProps("email")}
                                type="text"
                                className={styles.textbox}
                                placeholder="Email*"
                            />
                            <input
                                {...formik.getFieldProps("username")}
                                type="text"
                                className={styles.textbox}
                                placeholder="Username*"
                            />
                            <input
                                {...formik.getFieldProps("password")}
                                type="text"
                                className={styles.textbox}
                                placeholder="Password*"
                            />
                            <button type="submit" className={styles.btn}>
                                Register
                            </button>
                        </div>
                        <div className="text-center py-4">
                            <span className="text-gray-500">
                                Already Registered{" "}
                                <Link className="text-red-500" to="/">
                                    Login Now
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
