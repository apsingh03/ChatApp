import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/UsersSlice";
import chatSlice from "./slices/Chatting";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    chat: chatSlice,
  },
});
