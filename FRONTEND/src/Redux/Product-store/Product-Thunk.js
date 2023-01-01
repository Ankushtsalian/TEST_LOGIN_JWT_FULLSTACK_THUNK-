import authHeader from "../../utils/Auth-Header";
import customFetch from "../../utils/Axios";
import errorMessage from "../../utils/Error-Message";
import { getTokenFromLocalStorage } from "../../utils/Local-Storage";
// import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
const token = getTokenFromLocalStorage();

export const getAllProductsThunk = async (url, thunkAPI) => {
  try {
    const products = await customFetch.get(
      "/products",
      authHeader(token, true)
    );
    alert("product fetched");
    return products.data;
  } catch (error) {
    const { errorStatusCode, message } = errorMessage(error);
    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};

export const productFileThunk = async (url, formData, thunkAPI) => {
  try {
    const {
      data: {
        image: { src },
        public_id,
      },
    } = await customFetch.post(
      "/products/uploads",
      formData,
      authHeader(token, true)
    );
    alert(src);
    return { src, public_id };
  } catch (error) {
    const { errorStatusCode, message } = errorMessage(error);
    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};

export const productFormDataThunk = async (url, fileFormData, thunkAPI) => {
  try {
    await customFetch.post("/products", fileFormData, authHeader(token));
    alert("Image suceesfully Uploaded");
  } catch (error) {
    const { errorStatusCode, message } = errorMessage(error);

    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};

export const deleteProductThunk = async (url, { id, publicId }, thunkAPI) => {
  try {
    await customFetch.delete(
      `products/${id}/query?publicId=${publicId}`,
      authHeader(token)
    );
    alert("Product Deleted");
  } catch (error) {
    const { errorStatusCode, message } = errorMessage(error);

    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};
