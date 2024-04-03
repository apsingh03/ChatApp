import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const authUserObject = JSON.stringify(
  localStorage.getItem("loggedData") !== null
    ? JSON.parse(localStorage.getItem("loggedData"))
    : null
);

export const getUserJoinedGroupsAsync = createAsyncThunk(
  "group/getUserJoinedGroups",
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

export const getGroupByIdAsync = createAsyncThunk(
  "group/getGroupById",
  async ({ groupId, page, itemsPerPage }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getGroupById/${groupId}?page=${page}&itemsPerPage=${itemsPerPage}`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getGroupByIdAsync Error - ", error.response);
    }
  }
);

export const getGroupByIdChatsLengthAsync = createAsyncThunk(
  "group/getGroupByIdChatsLength",
  async ({ groupId }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/users/getGroupByIdChatsLength/${groupId}`,
        {
          headers: { Authorization: `${authUserObject}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getGroupByIdChatsLengthAsync Error - ", error.response);
    }
  }
);

export const createGroupChatMessageAsync = createAsyncThunk(
  "chats/createChat",
  async ({ message, groupId }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/users/createGroupChat/`,
        { message, groupId },
        { headers: { Authorization: `${authUserObject}` } }
      );

      return response.data;
    } catch (error) {
      console.log("createChatAsync Error - ", error.response);
    }
  }
);

export const createGroupAsync = createAsyncThunk(
  "chats/createGroup",
  async ({ groupName }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/users/createGroup/`,
        { groupName },
        { headers: { Authorization: `${authUserObject}` } }
      );

      return response.data;
    } catch (error) {
      console.log("createGroupAsync Error - ", error.response);
    }
  }
);

export const allGroupAsync = createAsyncThunk("chats/allGroup", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/users/allGroup/`, {
      headers: { Authorization: `${authUserObject}` },
    });
    return response.data;
  } catch (error) {
    console.log("allGroupAsync Error - ", error.response);
  }
});

export const joinGroupViaInvitationLinkAsync = createAsyncThunk(
  "chats/joinGroupViaInvitationLink",
  async ({ inviteLink }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/users/joinGroupViaInvitationLink/`,
        { inviteLink },
        { headers: { Authorization: `${authUserObject}` } }
      );

      return response.data;
    } catch (error) {
      console.log(
        "joinGroupViaInvitationLinkAsync Error - ",
        error.response.data
      );
    }
  }
);

export const removeFromGroupAsync = createAsyncThunk(
  "chats/removeFromGroup",
  async ({ userId }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/users/removeFromGroupVia/${userId}`,

        { headers: { Authorization: `${authUserObject}` } }
      );

      return response.data;
    } catch (error) {
      console.log("removeFromGroupAsync Error - ", error.response.data);
    }
  }
);

export const joinGroupViaUserIdAsync = createAsyncThunk(
  "chats/joinGroupViaUserId",
  async ({ userId, groupId }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/users/joinGroupVia/`,
        { userId, groupId },
        { headers: { Authorization: `${authUserObject}` } }
      );

      return response.data;
    } catch (error) {
      console.log("joinGroupViaUserIdAsync Error - ", error.response.data);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserJoinedGroupsAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getUserJoinedGroupsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getUserJoinedGroupsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getGroupByIdChatsLengthAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getGroupByIdChatsLengthAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
      })

      .addCase(getGroupByIdChatsLengthAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getGroupByIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getGroupByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
      })

      .addCase(getGroupByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createGroupChatMessageAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createGroupChatMessageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("payload ", action.payload);
        // state.data.push(action.payload);
      })

      .addCase(createGroupChatMessageAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createGroupAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createGroupAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(createGroupAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(allGroupAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(allGroupAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(allGroupAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(joinGroupViaInvitationLinkAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(joinGroupViaInvitationLinkAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(joinGroupViaInvitationLinkAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default groupSlice.reducer;
