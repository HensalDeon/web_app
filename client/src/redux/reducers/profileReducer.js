const initialState = {
    profileImage: '', 
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PROFILE_IMAGE_UPDATE_SUCCESS':
        return {
          ...state,
          profileImage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  