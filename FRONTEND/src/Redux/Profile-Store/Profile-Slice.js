import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTokenToLocalStorage,
  getProfileFromLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/Local-Storage";

const initialState = {
  tokenLog: getTokenFromLocalStorage(),
  isLoading: false,
  uploaded: false,
  imageValue: getProfileFromLocalStorage(),
  // loginUsername: "",
  // loginPassword: "",
  // registerUsername: "",
  // registerPassword: "",
  // registerResetPassword: "",
};

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
});

export const { handleProfileInputState } = profileSlice.actions;
export default profileSlice.reducer;
