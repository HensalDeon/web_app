import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/index";
import { bindActionCreators } from "redux";
import { useFormik } from "formik";
import avatar from "../../assets/profile.png";
import { registerValidation } from "../../helper/validate";
import { registerUser } from "../../helper/axios";
import convertToBase64 from "../../helper/convert";

function AddUserModal({ closeModal }) {
    const dispatch = useDispatch();
    const profileImage = useSelector((state) => state.profileImage.profileImage);
    const { updateProfileImage } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        updateProfileImage(null);
    }, []);

    // Create a Formik instance
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
                loading: "Creating...",
                success: () => {
                    closeModal();
                    return <b>Registered Successfully...!</b>;
                },
                error: <b>Could not register</b>,
            });
        },
    });

    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        updateProfileImage(base64);
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={closeModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="flex items-center justify-center mb-6">
                        <label htmlFor="profile">
                            <img
                                src={profileImage || avatar}
                                alt="User Profile"
                                className={`w-16 h-16 rounded-full mr-4 cursor-pointer border-4 border-gray-100 shadow-lg`}
                            />
                            <input onChange={onUpload} type="file" id="profile" />
                        </label>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-500 focus:outline-none`}
                                placeholder="Edit the username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="text"
                                id="password"
                                name="password"
                                className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-500 focus:outline-none`}
                                placeholder="Enter the password"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-500 focus:outline-none`}
                                placeholder="Enter the email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white font-semibold p-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                            >
                                Add User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddUserModal;
