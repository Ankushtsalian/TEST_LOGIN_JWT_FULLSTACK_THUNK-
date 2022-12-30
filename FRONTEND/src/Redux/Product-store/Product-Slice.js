import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/Local-Storage";

const initialState = {
  tokenLog: getTokenFromLocalStorage(),
  isLoading: false,
  isClosed: false,
  // loginUsername: "",
  // loginPassword: "",
  // registerUsername: "",
  // registerPassword: "",
  // registerResetPassword: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    handleSidebarMenu: (state) => {
      state.isClosed = !state.isClosed;
    },
    // handleFormInput: (state, { payload: { name, value } }) => {
    //   state[name] = value;
    // },
  },
});

export const { handleSidebarMenu } = productSlice.actions;
export default productSlice.reducer;
