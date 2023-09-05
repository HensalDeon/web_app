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

        case "SEARCH_USERS_START":
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case "SEARCH_USERS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                searchResults: action.payload,
                error: null,
            };

        case "SEARCH_USERS_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
