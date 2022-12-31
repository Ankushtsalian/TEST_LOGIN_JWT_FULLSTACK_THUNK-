import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProfileToLocalStorage,
  addTokenToLocalStorage,
  getProfileFromLocalStorage,
  getTokenFromLocalStorage,
  removeProfileFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/Local-Storage";
import { profileImageThunk, profileNameThunk } from "./Profile-Thunk";

const initialState = {
  tokenLog: getTokenFromLocalStorage(),
  isLoading: false,
  uploaded: false,
  imageValue: getProfileFromLocalStorage(),
  user: "",
  // loginUsername: "",
  // loginPassword: "",
  // registerUsername: "",
  // registerPassword: "",
  // registerResetPassword: "",
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
    // handleFormInput: (state, { payload: { name, value } }) => {
    //   state[name] = value;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(profileImage.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileImage.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.imageValue = payload;
      state.uploaded = !state.uploaded;
      addProfileToLocalStorage(payload);
    });

    builder.addCase(profileImage.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.imageValue = null;
      state.user = null;

      alert(payload);
    });
    builder.addCase(profileName.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileName.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.imageValue = payload.src;
      state.user = payload.user;
      addProfileToLocalStorage(payload.src);
    });

    builder.addCase(profileName.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.imageValue = null;
      state.user = null;
      alert(payload);
    });
  },
});

export const { handleProfileInputState } = profileSlice.actions;
export default profileSlice.reducer;
