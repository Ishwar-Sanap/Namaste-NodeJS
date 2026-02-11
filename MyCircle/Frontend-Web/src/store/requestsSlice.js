import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name : "requests",
    initialState : null,
    reducers:{
        addRequests:(state,action) => action.payload,
        removeRequest : (state, action)=>{
            const reqID = action.payload;
            const remainingRequests = state.filter((req)=> req._id !== reqID);
            return remainingRequests;
        }
    }
})

export const {addRequests ,removeRequest} = requestsSlice.actions;
export default requestsSlice.reducer;