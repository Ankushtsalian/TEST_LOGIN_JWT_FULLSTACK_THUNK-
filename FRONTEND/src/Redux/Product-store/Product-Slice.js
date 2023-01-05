import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProductsToLocalStorage,
  getTokenFromLocalStorage,
  removeProductFromLocalStorage,
} from "../../utils/Local-Storage";
import {
  deleteProductThunk,
  getAllProductsThunk,
  productFileThunk,
  productFormDataThunk,
} from "./Product-Thunk";

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
  errorMessage: "",
  errorStatusCode: 0,
  search: "",
  newProductList: [],
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  (_, thunkAPI) => {
    return getAllProductsThunk(_, thunkAPI);
  }
);

export const productFile = createAsyncThunk(
  "product/productFile",
  (formData, thunkAPI) => {
    return productFileThunk("/products/uploads", formData, thunkAPI);
  }
);

export const productFormData = createAsyncThunk(
  "product/productFormData",
  (fileFormData, thunkAPI) => {
    return productFormDataThunk("/products", fileFormData, thunkAPI);
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  ({ id, publicId }, thunkAPI) => {
    return deleteProductThunk("/products", { id, publicId }, thunkAPI);
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
      state.productList = [];
      state.errorMessage = "";
      state.errorStatusCode = 0;
      state.name = "";
      state.price = "";
    },
    ClearAllProductInputState: (state) => {
      state.name = "";
      state.price = "";
      state.image = "";
      state.src = "";
      state.public_id = "";
      state.imageValue = "";
    },
    clearProduct: (state) => {
      removeProductFromLocalStorage();
      state.newProductList = [];
      state.search = "";
    },
    ClearAllProductSearchInput: (state) => {
      state.search = "";
    },
    handleFormInputProduct: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    filteredProduct: (state, { payload }) => {
      state.newProductList = payload;
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
      addProductsToLocalStorage(payload.products);
    });

    builder.addCase(
      getAllProducts.rejected,
      (state, { payload: { errorStatusCode, message } }) => {
        state.isLoading = false;
        state.productList = [];

        state.errorMessage = message;
        state.errorStatusCode = errorStatusCode;
      }
    );
    builder.addCase(productFile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(productFile.fulfilled, (state, { payload }) => {
      state.tokenLog = getTokenFromLocalStorage();
      state.isLoading = false;
      state.image = payload.src;
      state.public_id = payload.public_id;
    });

    builder.addCase(
      productFile.rejected,
      (state, { payload: { errorStatusCode, message } }) => {
        state.isLoading = false;
        state.image = "";
        state.public_id = "";

        state.errorMessage = message;
        state.errorStatusCode = errorStatusCode;
      }
    );
    builder.addCase(productFormData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(productFormData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(
      productFormData.rejected,
      (state, { payload: { errorStatusCode, message } }) => {
        state.isLoading = false;
        state.errorMessage = message;
        state.errorStatusCode = errorStatusCode;
      }
    );
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(
      deleteProduct.rejected,
      (state, { payload: { errorStatusCode, message } }) => {
        state.isLoading = false;
        state.errorMessage = message;
        state.errorStatusCode = errorStatusCode;
      }
    );
  },
});

export const {
  handleSidebarMenu,
  ClearAllProductInputState,
  ClearAllProductState,
  handleFormInputProduct,
  filteredProduct,
  clearProduct,
  ClearAllProductSearchInput,
} = productSlice.actions;
export default productSlice.reducer;
