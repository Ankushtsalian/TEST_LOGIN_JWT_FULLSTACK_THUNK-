import { logoutUser } from "../Redux";

const errorMessage = (error, thunkAPI) => {
  const message =
    (error.response && error.response.data && error.response.data.msg) ||
    error.message ||
    error.toString();
  console.log({ errorStatusCode: error.response.status, message });

  if (error.response.status === "401" || error.response.status === 401) {
    thunkAPI.dispatch(logoutUser());
  }
  return { errorStatusCode: error.response.status, message };
};

export default errorMessage;
