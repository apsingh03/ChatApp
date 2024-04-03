import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const authUserObject = JSON.stringify(
  localStorage.getItem("loggedData") !== null
    ? JSON.parse(localStorage.getItem("loggedData"))
    : null
);

export const getAllChatsAsync = createAsyncThunk(
  "chats/getChats",
  async ({ page, itemsPerPage, withWhomId, idsCode }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getChats?withWhomId=${withWhomId}&page=${page}&itemsPerPage=${itemsPerPage}&idsCode=${idsCode}`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getAllChatsAsync Error - ", error.response);
    }
  }
);

export const getChatsLengthAsync = createAsyncThunk(
  "chats/chatLength",
  async ({ withWhomId }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getChatsLength?withWhomId=${withWhomId}`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getChatsLengthAsync Error - ", error.response);
    }
  }
);

export const getwithWhomConversationsAsync = createAsyncThunk(
  "chats/getwithWhomConversations",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getwithWhomConversations`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getwithWhomConversationsAsync Error - ", error.response);
    }
  }
);

export const getUserJoinedGroupsAsync = createAsyncThunk(
  "chats/getUserJoinedGroups",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getUserJoinedGroups`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getUserJoinedGroupsAsync Error - ", error.response);
    }
  }
);

export const createChatAsync = createAsyncThunk(
  "chats/createChat",
  async ({ message, withWhomId }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/users/createChat/`,
        { message, withWhomId },
        { headers: { Authorization: `${authUserObject}` } }
      );

      return response.data;
    } catch (error) {
      console.log("createChatAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllChatsAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllChatsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
      })

      .addCase(getAllChatsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getwithWhomConversationsAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getwithWhomConversationsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getwithWhomConversationsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getChatsLengthAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getChatsLengthAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
      })

      .addCase(getChatsLengthAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createChatAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createChatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("payload ", action.payload);
        // state.data.rows.push(action.payload);
      })

      .addCase(createChatAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
