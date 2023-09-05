import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminActionCreators } from "../../redux/index";
import { bindActionCreators } from "redux";
import Loader from "../Loader";
import avatar from "../../assets/profile.png";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import { enableUser } from "../../helper/adminAxios";

function AdminLayout() {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dltModalOpen, setdltModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [userId, setuserId] = useState({});
    const users = useSelector((state) => state.adminUsers.users);
    const searchResults = useSelector((state) => state.adminUsers.searchResults);
    const isLoading = useSelector((state) => state.adminUsers.isLoading);
    const dispatch = useDispatch();
    const { fetchUsers, searchUsers } = bindActionCreators(adminActionCreators, dispatch);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (userDetail) => {
        setUserDetails(userDetail);
        setIsModalOpen(true);
    };

    const handleDelete = (userId) => {
        setuserId(userId);
        setdltModalOpen(true);
    };

    const handleEnable = async (userId) => {
        try {
          let response = await enableUser(userId);
          if(response) {
            toast.success("Enabled Succesfully!");
            fetchUsers()
          }
      } catch (error) {
        toast.error("Something went Wrong!")
        console.log(error);
      }
    };

    

    const handleSearch = () => {
        searchUsers(search);
    };

    const displayData = searchResults ? searchResults : users;

    return (
        <div className="overflow-x-auto">
            <Toaster position="top-center" reverseOrder={false} />

            {isModalOpen && (
                <Modal
                    user={userDetails}
                    closeModal={() => {
                        setIsModalOpen(false);
                        fetchUsers();
                        searchUsers(search);
                    }}
                />
            )}
            {dltModalOpen && (
                <DeleteModal
                    userId={userId}
                    closeModal={() => {
                        setdltModalOpen(false);
                    }}
                />
            )}
            {!isLoading ? (
                <>
                    <div className="relative rounded-full bg-white my-5 px-6 pt-2 pb-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-sm sm:px-10">
                        <div className="mx-auto max-w-md">
                            <form
                                action=""
                                className="mr-auto w-max"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch();
                                }}
                            >
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-600 focus:pl-16 focus:pr-4"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </form>
                        </div>
                    </div>

                    <div className="min-w-screen min-h-screen flex items-center justify-center font-sans overflow-hidden">
                        <div className="w-full lg:w-5/6">
                            <div className="bg-white shadow-md rounded my-6">
                                <table className="min-w-max w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-4  text-center">Profile</th>
                                            <th className="py-3 px-6 text-left">User Name</th>
                                            <th className="py-3 px-6 text-left">Email</th>
                                            <th className="py-3 px-6 text-center">Status</th>
                                            <th className="py-3 px-6 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    {displayData.map((user) => (
                                        <tbody key={user._id} className="text-gray-600 text-sm font-light">
                                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-3 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <img
                                                            className="w-9 h-9 rounded-full border-gray-200 border transform hover:scale-125"
                                                            src={user.profile || avatar}
                                                            alt="no"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center ">
                                                        <span>{user.username}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center w-4">
                                                        <span className="font-medium">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    {user.status && (
                                                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                            Active
                                                        </span>
                                                    )}

                                                    {!user.status && (
                                                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                                            Blocked
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        <button
                                                            onClick={() => handleEdit(user)}
                                                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        {!user.status && (
                                                            <button
                                                                onClick={() => handleEnable(user._id)}
                                                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    x="0px"
                                                                    y="0px"
                                                                    width="17"
                                                                    height="17"
                                                                    viewBox="0 0 48 48"
                                                                >
                                                                    <path d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"></path>
                                                                </svg>
                                                            </button>
                                                        )}
                                                        {user.status && (
                                                            <button
                                                                onClick={() => handleDelete(user._id)}
                                                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}
export default AdminLayout;
