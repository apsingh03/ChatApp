import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

export const getAllUsersAsync = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/users/getAllUsers/`);
      return response.data;
    } catch (error) {
      console.log("getAllUsersAsync Error - ", error);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async ({ email, username, password, mobile }) => {
    try {
      const response = await axios.post(`${HOSTNAME}/users/createUser/`, {
        email: email,
        username: username,
        password: password,
        mobile: mobile,
      });

      return response.data;
    } catch (error) {
      console.log("createUserAsync Error - ", error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(`${HOSTNAME}/users/loginUser/`, {
        email: email,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.log("loginUserAsync Error  ", error);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedUserData: {
    isUserLogged:
      localStorage.getItem("loggedData") !== null
        ? JSON.parse(localStorage.getItem("loggedData")).isUserLogged
        : null,
    id:
      localStorage.getItem("loggedData") !== null
        ? JSON.parse(localStorage.getItem("loggedData")).id
        : null,
    username:
      localStorage.getItem("loggedData") !== null
        ? JSON.parse(localStorage.getItem("loggedData")).username
        : null,
    email:
      localStorage.getItem("loggedData") !== null
        ? JSON.parse(localStorage.getItem("loggedData")).email
        : null,
    createdAt:
      localStorage.getItem("loggedData") !== null
        ? JSON.parse(localStorage.getItem("loggedData")).createdAt
        : null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(loginUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default usersSlice.reducer;
