import reducers from './reducers';
import thunk from 'redux-thunk'; 
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer : reducers,
    middleware : [thunk]
});

