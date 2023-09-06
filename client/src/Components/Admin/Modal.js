import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import avatar from "../../assets/profile.png";
import { updateUser } from "../../helper/adminAxios";

function Modal({ user, closeModal }) {
    const specialChars = /[`!@#$%^&*()_+|=\-[\]{};':"\\,.<>/?~]/;
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required")
            .matches(specialChars, "Enter a valid email"),
        firstname: Yup.string(),
        lastname: Yup.string(),
    });

    // Create a Formik instance
    const formik = useFormik({
        initialValues: {
            username: user.username || "",
            email: user.email || "",
            firstname: user.firstname || "",
            lastname: user.lastname || "",
        },
        validationSchema,
        onSubmit: async (values) => {
            let updatePromise = updateUser(values, user._id);
            toast.promise(updatePromise, {
                loading: "Updating...",
                success: <b>Updated Successfully...!</b>,
                error: <b>Could not Update!</b>,
            });
        },
    });

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
                        <img src={user.profile || avatar} alt="User Profile" className="w-16 h-16 rounded-full mr-4" />
                        <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
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
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    formik.errors.username ? "border-red-500" : "border-gray-300"
                                } focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-500 focus:outline-none`}
                                placeholder="Edit your username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                            {/* Display an error message if username field has an error */}
                            {formik.errors.username && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstname" className="block text-gray-600 text-sm font-medium mb-2">
                                Firstname
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    formik.errors.username ? "border-red-500" : "border-gray-300"
                                } focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-500 focus:outline-none`}
                                placeholder="Edit your firstname"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                            />
                            {/* Display an error message if username field has an error */}
                            {formik.errors.username && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastname" className="block text-gray-600 text-sm font-medium mb-2">
                                Lastname
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    formik.errors.username ? "border-red-500" : "border-gray-300"
                                } focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-500 focus:outline-none`}
                                placeholder="Edit your lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                            />
                            {/* Display an error message if username field has an error */}
                            {formik.errors.username && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    formik.errors.email ? "border-red-500" : "border-gray-300"
                                } focus:ring focus:ring-indigo-300 focus:ring-opacity-50 focus:border-indigo-500 focus:outline-none`}
                                placeholder="Your email address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {/* Display an error message if email field has an error */}
                            {formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white font-semibold p-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                            >
                                Update Details
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Modal;
