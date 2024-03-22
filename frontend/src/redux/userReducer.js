// src/userReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Define the initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (pageNumber) => {
    try {
      const { data } = await axios.get(`/api/users?page=${pageNumber}`);
      return data.data.users;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, updateData }) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, {
        ...updateData,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data.user;
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updatedUser = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.userReducer;
