import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const authUserObject = JSON.stringify(
  localStorage.getItem("loggedData") !== null
    ? JSON.parse(localStorage.getItem("loggedData"))
    : null
);

export const getAllChatsAsync = createAsyncThunk("chats/getChats", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/users/getChats`, {
      headers: { Authorization: `${authUserObject}` },
    });
    return response.data;
  } catch (error) {
    console.log("getAllChatsAsync Error - ", error);
  }
});

export const createChatAsync = createAsyncThunk(
  "chats/createChat",
  async ({ message }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/users/createChat/`,
        { message },
        { headers: { Authorization: `${authUserObject}` } }
      );

      return response.data;
    } catch (error) {
      console.log("createChatAsync Error - ", error);
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
        state.data = action.payload;
      })

      .addCase(getAllChatsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createChatAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createChatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("payload ", action.payload);
        state.data.push(action.payload);
      })

      .addCase(createChatAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
