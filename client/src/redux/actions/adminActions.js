import { getUsersList } from "../../helper/adminAxios";

export const AdminActionTypes = {
    EDIT_USER: "EDIT_USER",
    DELETE_USER: "DELETE_USER",
    ADD_USER: "ADD_USER",
    SEARCH_USERS: "SEARCH_USERS",
};

export const fetchUsersStart = () => ({
    type: "FETCH_USERS_START",
});

export const fetchUsersSuccess = (users) => ({
    type: "FETCH_USERS_SUCCESS",
    payload: users,
});

export const fetchUsersFailure = (error) => ({
    type: "FETCH_USERS_FAILURE",
    payload: error,
});

export const fetchUsers = (users) => {
    return (dispatch) => {
        dispatch(fetchUsersStart());
        getUsersList()
            .then((response) => {
                dispatch(fetchUsersSuccess(response));
            })
            .catch((error) => {
                dispatch(fetchUsersFailure(error.message)); // Dispatch with a specific error message
            });
    };
};
