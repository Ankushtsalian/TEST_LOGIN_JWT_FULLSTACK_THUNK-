import authHeader from "../../utils/Auth-Header";
import customFetch from "../../utils/Axios";
import errorMessage from "../../utils/Error-Message";
import { addTokenToLocalStorage } from "../../utils/Local-Storage";
// import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const loginUserThunk = async (url, formInput, thunkAPI) => {
  try {
    const response = await customFetch.post("/login", formInput, authHeader());
    setTimeout(() => {
      alert(`Login Successfull with username : ${response.data.msg.username}`);
    }, 250);

    addTokenToLocalStorage(response.data.msg.token);
    return response.data.msg.token;
  } catch (error) {
    const { errorStatusCode, message } = errorMessage(error);
    alert(message);
    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};

export const registerUserThunk = async (url, formInput, thunkAPI) => {
  try {
    const response = await customFetch.post(
      "/register",
      formInput,
      authHeader()
    );

    setTimeout(() => {
      alert(
        `registration Successfull with username : ${response.data.msg.username}`
      );
    }, 250);
    addTokenToLocalStorage(response.data.msg.token);

    return response.data.msg.token;
  } catch (error) {
    const { errorStatusCode, message } = errorMessage(error);
    alert(message);
    return thunkAPI.rejectWithValue({ errorStatusCode, message });
  }
};
