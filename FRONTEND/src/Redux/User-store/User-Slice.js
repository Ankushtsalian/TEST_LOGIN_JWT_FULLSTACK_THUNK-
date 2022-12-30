import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTokenToLocalStorage,
  removeProfileFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/Local-Storage";
import { loginUserThunk } from "./User-Thunk";

const initialState = {
  tokenLog: "",
  isLoading: false,
};
