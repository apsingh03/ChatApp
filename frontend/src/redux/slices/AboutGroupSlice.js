import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const authUserObject = JSON.stringify(
  localStorage.getItem("loggedData") !== null
    ? JSON.parse(localStorage.getItem("loggedData"))
    : null
);

export const getAboutGroupByIdAsync = createAsyncThunk(
  "aboutGroup/getById",
  async ({ groupId }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getAboutGroupById?groupId=${groupId}`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("getAboutGroupByIdAsync Error - ", error.response);
    }
  }
);

export const getAllGroupsJoinedUserAsync = createAsyncThunk(
  "aboutGroup/getAllGroupsJoinedUser",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getAllGroupsJoinedUser`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("getAllGroupsJoinedUserAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const aboutGroupSlice = createSlice({
  name: "aboutGroup",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAboutGroupByIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAboutGroupByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getAboutGroupByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default aboutGroupSlice.reducer;
