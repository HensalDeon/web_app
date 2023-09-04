import { combineReducers } from "redux";
import { profileReducer, userReducer, userDetailReducer, setOtpReducer } from "./userReducer";
import { adminUsersReducer} from "./adminReducer"

const rootReducer = combineReducers({
    profileImage: profileReducer,
    userReducer: userReducer,
    userDetailReducer: userDetailReducer,
    setOtpReducer: setOtpReducer,
    adminUsers: adminUsersReducer
});

export default rootReducer;
