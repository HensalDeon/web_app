import { getUser } from "../../helper/axios";

export const updateProfileImage = (imageBase64) => {
    return (dispatch) => {
        dispatch({ type: "PROFILE_IMAGE_UPDATE_SUCCESS", payload: imageBase64 });
    };
};

export const setUsername = (username) => {
    return (dispatch) => {
        dispatch({ type: "SET_USERNAME", payload: username });
    };
};

export const setOTP = (OTP) => {
    return (dispatch) => {
        dispatch({ type: "SET_OTP", payload: OTP });
    };
};

export const fetchUserDetails = (username) => {
    return async (dispatch) => {
        dispatch({ type: "FETCH_USER_DETAILS_REQUEST" });

        try {
            const userDetails = await getUser({ username: username });

            dispatch({
                type: "FETCH_USER_DETAILS_SUCCESS",
                payload: userDetails,
            });
        } catch (error) {
            console.error("Error fetching user details:", error);
            dispatch({ type: "FETCH_USER_DETAILS_FAILURE" });
        }
    };
};
