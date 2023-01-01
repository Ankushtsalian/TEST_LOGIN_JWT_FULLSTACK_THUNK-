import authHeader from "../../utils/Auth-Header";
import customFetch from "../../utils/Axios";
import { getTokenFromLocalStorage } from "../../utils/Local-Storage";
// import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
const token = getTokenFromLocalStorage();

export const getAllProductsThunk = async (url, formInput, thunkAPI) => {
  try {
    const products = await customFetch.get(
      "/products",
      authHeader(token, true)
    );
    alert("product fetched");
    // console.log(products.data.products);
    return products.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
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
    // console.log({ productFileThunk: { src, public_id } });
    return { src, public_id };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};
