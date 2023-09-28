import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import adminauthSlice from "./slices/adminauthSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    adminauth: adminauthSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;