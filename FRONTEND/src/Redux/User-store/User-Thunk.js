import authHeader from "../../utils/Auth-Header";
import customFetch from "../../utils/Axios";
// import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const loginUserThunk = async (url, formInput, thunkAPI) => {
  try {
    const response = await customFetch.post("/login", formInput, authHeader());

    // setToken((responseToken) => ({
    //   ...responseToken,
    //   tokenLog: response.data.msg.token,
    // }));
    // setFormInput((formValue) => ({
    //   ...formValue,

    //   loginUsername: "",
    //   loginPassword: "",
    //   registerUsername: "",
    //   registerPassword: "",
    //   registerResetPassword: "",
    // }));
    // // if (token) navigate("/protected");

    setTimeout(() => {
      alert(`Login Successfull with username : ${response.data.msg.username}`);
      //   toast.success("DONE");
    }, 250);
    return response.data.msg.token;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};
