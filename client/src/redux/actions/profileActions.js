export const updateProfileImage = (imageBase64) => {
    return (dispatch) => {
        dispatch({ type: "PROFILE_IMAGE_UPDATE_SUCCESS", payload: imageBase64 });
    };
};
