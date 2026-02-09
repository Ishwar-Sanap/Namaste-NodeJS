import {configureStore} from "@reduxjs/toolkit";
import useReducer  from "../store/userSlice";
import feedReducer from "../store/feedSlice"

const appStore = configureStore({
    reducer : {
        user : useReducer,
        feed : feedReducer
    }
});

export default appStore;
