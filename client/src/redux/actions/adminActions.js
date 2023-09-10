import { getUsersList, searchUser } from "../../helper/adminAxios";

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
                dispatch(fetchUsersFailure(error.message));
            });
    };
};

export const searchUsersStart = () => ({
    type: "SEARCH_USERS_START",
});

export const searchUsersSuccess = (users) => ({
    type: "SEARCH_USERS_SUCCESS",
    payload: users,
});

export const searchUsersFailure = (error) => ({
    type: "SEARCH_USERS_FAILURE",
    payload: error,
});

export const searchUsers = (search) => {
    return (dispatch) => {
        dispatch(searchUsersStart());
        searchUser(search)
            .then((response) => {
                dispatch(searchUsersSuccess(response));
            })
            .catch((error) => {
                dispatch(searchUsersFailure(error.message));
            });
    };
};
