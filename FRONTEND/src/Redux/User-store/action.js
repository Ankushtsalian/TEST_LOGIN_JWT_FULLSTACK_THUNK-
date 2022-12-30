import * as types from "./actionTypes";

const loginUser = (user) => ({
  type: types.LOGIN_USER,
  payload: user,
});
const setToken = (token) => ({
  type: types.SET_TOKEN,
  payload: token,
});
