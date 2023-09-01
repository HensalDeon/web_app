import { combineReducers } from 'redux';
import profileReducer from './profileReducer'; 

const rootReducer = combineReducers({
  profileImage: profileReducer, 
});

export default rootReducer;
