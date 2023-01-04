import authHeader from "../../utils/Auth-Header";
import customFetch from "../../utils/Axios";
import errorMessage from "../../utils/Error-Message";
import {
  addProfileToLocalStorage,
  getTokenFromLocalStorage,
} from "../../utils/Local-Storage";
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
    console.log(error);
    const { errorStatusCode, message } = errorMessage(error, thunkAPI);
    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};

export const profileNameThunk = async (url, thunkAPI) => {
  try {
    const products = await customFetch.get(
      "/products/profile",
      authHeader(token, true)
    );

    return products.data;
  } catch (error) {
    const { errorStatusCode, message } = errorMessage(error, thunkAPI);
    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};
