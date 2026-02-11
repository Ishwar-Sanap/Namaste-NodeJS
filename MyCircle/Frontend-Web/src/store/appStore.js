import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../store/userSlice";
import feedReducer from "../store/feedSlice";
import connectionsReducer from "../store/connectionsSlice";
import requestsReducer from "../store/requestsSlice";

const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests : requestsReducer,
  },
});

export default appStore;
