import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  currentUser: {
    _id: "",
    userId: "",
    email: "",
    __v: 0,
    addressLine1: "",
    city: "",
    country: "",
    firstName: "",
    lastName: "",
    role: "",
  },
  error: null,
  isLoading: false,
};

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (userId, thunkAPI) => {
    try {
      const resp = await axios(`${API_BASE_URL}/api/my/user/${userId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error loading user";
    });
  },
});

export default userSlice.reducer;
