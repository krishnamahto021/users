import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  domains: [],
  users: [],
  teams: [],
  loadingDomains: false,
  loadingUsers: false,
  error: null,
};

export const fetchDomains = createAsyncThunk("team/fetchDomains", async () => {
  try {
    const response = await axios.get("/api/users/domains");
    return response.data.uniqueDomains;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

export const fetchUsersByDomain = createAsyncThunk(
  "team/fetchUsersByDomain",
  async ({ selectedDomain, pageNumber }) => {
    try {
      const response = await axios.get(
        `/api/users/user-domain?domain=${selectedDomain}&page=${pageNumber}`
      );
      return response.data.users;
    } catch (error) {
      console.log(error);
      throw Error(error.response.data.message);
    }
  }
);

export const fetchTeams = createAsyncThunk("team/fetchTeams", async () => {
  try {
    const response = await axios.get("/api/team");
    return response.data.teams;
  } catch (error) {
    throw Error(error.response.data.message);
  }
});

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.loadingDomains = true;
        state.error = null;
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.loadingDomains = false;
        state.domains = action.payload;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.loadingDomains = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsersByDomain.pending, (state) => {
        state.loadingUsers = true;
        state.error = null;
      })
      .addCase(fetchUsersByDomain.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersByDomain.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = action.error.message;
      });
    builder
      // Add case for fetching teams
      .addCase(fetchTeams.pending, (state) => {
        state.loadingTeams = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loadingTeams = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loadingTeams = false;
        state.error = action.error.message;
      });
  },
});

export const teamReducer = teamSlice.reducer;
export const teamSelector = (state) => state.teamReducer;
