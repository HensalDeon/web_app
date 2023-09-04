const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

export const adminUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_START":
            return {
                ...state,
                isLoading: true,    
                error: null,
            };

        case "FETCH_USERS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                users: action.payload,
                error: null,
            };

        case "FETCH_USERS_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        // ... Other cases for edit, delete, add, and search as before

        default:
            return state;
    }
};
