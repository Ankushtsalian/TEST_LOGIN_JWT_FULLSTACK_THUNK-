import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProfileFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../utils/Local-Storage";
import { profileImageThunk, profileNameThunk } from "./Profile-Thunk";

const initialState = {
  tokenLog: getTokenFromLocalStorage(),
  isLoading: false,
  uploaded: false,
  imageValue: getProfileFromLocalStorage(),
  user: "",
  errorMessage: "",
  errorStatusCode: "",
};

export const profileImage = createAsyncThunk(
  "profile/profileImage",
  async (formData, thunkAPI) => {
    return profileImageThunk("/profile", formData, thunkAPI);
  }
);

export const profileName = createAsyncThunk(
  "profile/profileName",
  async (thunkAPI) => {
    return profileNameThunk("/products", thunkAPI);
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    handleProfileInputState: (state) => {
      state.uploaded = !state.uploaded;
    },
    ClearAllState: (state) => {
      state.tokenLog = "";
      state.uploaded = false;
      state.imageValue = "";
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profileImage.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileImage.fulfilled, (state, { payload }) => {
      state.tokenLog = getTokenFromLocalStorage();
      state.isLoading = false;
      state.imageValue = payload;
      state.uploaded = !state.uploaded;
    });

    builder.addCase(profileImage.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.imageValue = null;
      state.user = null;
      // state.errorMessage = message;
      // state.errorStatusCode = errorStatusCode;
    });
    builder.addCase(profileName.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileName.fulfilled, (state, { payload }) => {
      state.tokenLog = getTokenFromLocalStorage();
      state.isLoading = false;
      state.imageValue = payload.src;
      state.user = payload.user;
    });

    builder.addCase(profileName.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.imageValue = null;
      state.user = null;
      // state.errorMessage = message;
      // state.errorStatusCode = errorStatusCode;
    });
  },
});

export const { handleProfileInputState, ClearAllState } = profileSlice.actions;
export default profileSlice.reducer;
