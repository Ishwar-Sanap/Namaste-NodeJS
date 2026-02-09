import {configureStore} from "@reduxjs/toolkit";
import useReducer  from "../store/userSlice";

const appStore = configureStore({
    reducer : {
        user : useReducer
    }
});

export default appStore;
