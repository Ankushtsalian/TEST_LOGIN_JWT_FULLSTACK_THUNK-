import {
  ClearAllProductState,
  ClearAllProfileState,
  clearUserToken,
  logoutUser,
} from "../Redux";

const errorMessage = (error, thunkAPI) => {
  const message =
    (error.response && error.response.data && error.response.data.msg) ||
    error.message ||
    error.toString();
  console.log({ errorStatusCode: error.response.status, message });

  return { errorStatusCode: error.response.status, message };
};

export default errorMessage;
