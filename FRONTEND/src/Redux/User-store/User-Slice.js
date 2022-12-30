import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/Local-Storage";
import { loginUserThunk, registerUserThunk } from "./User-Thunk";

const initialState = {
  tokenLog: getTokenFromLocalStorage(),
  isLoading: false,
  loginUsername: "",
  loginPassword: "",
  registerUsername: "",
  registerPassword: "",
  registerResetPassword: "",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formInput, thunkAPI) => {
    return loginUserThunk("/login", formInput, thunkAPI);
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formInput, thunkAPI) => {
    return registerUserThunk("/register", formInput, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUserFormInput: (state) => {
      state.loginUsername = "";
      state.loginPassword = "";
      state.registerUsername = "";
      state.registerPassword = "";
      state.registerResetPassword = "";
    },
    clearToken: (state) => {
      state.tokenLog = null;
    },

    handleFormInput: (state, { payload: { name, value } }) => {
      state[name] = value;
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
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      removeTokenFromLocalStorage();
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tokenLog = payload;
      addTokenToLocalStorage(state.tokenLog);
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      removeTokenFromLocalStorage();
      state.isLoading = false;
      state.tokenLog = "";
      alert(payload);
    });
  },
});

export const { clearToken, handleFormInput, clearUserFormInput } =
  userSlice.actions;
export default userSlice.reducer;
