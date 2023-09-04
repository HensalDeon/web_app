const initialState = {
    profileImage: "",
    userName: "",
    userDetails: null,
    loading: false,
    error: false,
    OTP: "",
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PROFILE_IMAGE_UPDATE_SUCCESS":
            return {
                ...state,
                profileImage: action.payload,
            };
        default:
            return state;
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERNAME":
            return {
                ...state,
                username: action.payload,
            };
        default:
            return state;
    }
};

export const setOtpReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_OTP":
            return {
                ...state,
                OTP: action.payload,
            };
        default:
            return state;
    }
};

export const userDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USER_DETAILS_REQUEST":
            return {
                ...state,
                loading: true,
                error: false,
            };
        case "FETCH_USER_DETAILS_SUCCESS":
            return {
                ...state,
                userDetails: action.payload,
                loading: false,
                error: false,
            };
        case "FETCH_USER_DETAILS_FAILURE":
            return {
                ...state,
                userDetails: null,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
