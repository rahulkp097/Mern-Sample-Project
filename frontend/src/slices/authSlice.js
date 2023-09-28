import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    updatesetCredentials:(state,action)=>{
      console.log("state and payload are ",state,action)
      state.userInfo = {...state.userInfo,image: action.payload}
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    }
  },
});

export const { setCredentials, logout, updatesetCredentials } = authSlice.actions;

export default authSlice.reducer;
