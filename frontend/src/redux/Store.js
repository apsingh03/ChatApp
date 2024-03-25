import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/UsersSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});
