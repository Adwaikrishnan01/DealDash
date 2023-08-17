import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:'search',
    initialState:{
        searchterm:''
    },
    reducers: {
        updateString: (state, action) => {
          //return action.payload; // Update the string value
          state.searchterm=action.payload;
        },
      },
})
export const { updateString } = searchSlice.actions;
export default searchSlice.reducer;