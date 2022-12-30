import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/Local-Storage";
import { loginUserThunk } from "./User-Thunk";
// import { Link, useNavigate } from "react-router-dom";

const initialState = {
  tokenLog: "",
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formInput, thunkAPI) => {
    return loginUserThunk("/login", formInput, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.tokenLog = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      removeTokenFromLocalStorage();
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tokenLog = payload;
      addTokenToLocalStorage(state.tokenLog);
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      removeTokenFromLocalStorage();
      state.isLoading = false;
      state.tokenLog = "";

      alert(payload);
    });
  },
});

export const { clearToken } = userSlice.actions;
export default userSlice.reducer;
