import authHeader from "../../utils/Auth-Header";
import customFetch from "../../utils/Axios";
import errorMessage from "../../utils/Error-Message";
import {
  addProfileToLocalStorage,
  getTokenFromLocalStorage,
} from "../../utils/Local-Storage";
// import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
const token = getTokenFromLocalStorage();
export const profileImageThunk = async (url, formData, thunkAPI) => {
  try {
    const {
      data: {
        image: { src },
      },
    } = await customFetch.post(
      "/products/profile",
      formData,
      authHeader(token, true)
    );
    addProfileToLocalStorage(src);

    alert("Profile uploaded");
    return src;
  } catch (error) {
    const message = errorMessage(error);

    return thunkAPI.rejectWithValue(message);
  }
};

export const profileNameThunk = async (url, thunkAPI) => {
  try {
    const products = await customFetch.get(
      "/products",
      authHeader(token, true)
    );

    return products.data;
  } catch (error) {
    const message = errorMessage(error);

    return thunkAPI.rejectWithValue(message);
  }
};
