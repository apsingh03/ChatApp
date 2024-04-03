import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/UsersSlice";
import chatSlice from "./slices/Chatting";
import GroupSlice from "./slices/GroupSlice";
import AboutGroupSlice from "./slices/AboutGroupSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    chat: chatSlice,
    group: GroupSlice,
    aboutGroup: AboutGroupSlice,
  },
});
