import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utils/Local-Storage";
import { profileNameThunk } from "../Profile-Store/Profile-Thunk";
import { getAllProductsThunk, productFileThunk } from "./Product-Thunk";

const initialState = {
  tokenLog: getTokenFromLocalStorage(),
  isLoading: false,
  isClosed: false,
  name: "",
  price: "",
  image: "",
  src: "",
  public_id: "",
  imageValue: "",
  productList: [],
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (thunkAPI) => {
    return getAllProductsThunk("/products", thunkAPI);
  }
);

export const productFile = createAsyncThunk(
  "product/productFile",
  async (formData, thunkAPI) => {
    return productFileThunk("/products/uploads", formData, thunkAPI);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    handleSidebarMenu: (state) => {
      state.isClosed = !state.isClosed;
    },
    ClearAllProductState: (state) => {
      state.tokenLog = "";
    },
    ClearAllProfileInputState: (state) => {
      state.name = "";
      state.price = "";
      state.image = "";
      state.src = "";
      state.public_id = "";
      state.imageValue = "";
    },
    handleFormInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.tokenLog = getTokenFromLocalStorage();
      state.isLoading = false;
      state.productList = payload.products;
    });

    builder.addCase(getAllProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.productList = [];

      alert(payload);
    });
    builder.addCase(productFile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(productFile.fulfilled, (state, { payload }) => {
      state.tokenLog = getTokenFromLocalStorage();
      state.isLoading = false;
      state.image = payload.src;
      state.public_id = payload.public_id;
    });

    builder.addCase(productFile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.image = "";
      state.public_id = "";

      alert(payload);
    });
  },
});

export const {
  handleSidebarMenu,
  ClearAllProfileInputState,
  ClearAllProductState,
  handleFormInput,
} = productSlice.actions;
export default productSlice.reducer;
