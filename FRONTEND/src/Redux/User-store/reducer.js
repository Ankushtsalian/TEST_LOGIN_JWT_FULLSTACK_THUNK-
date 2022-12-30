import * as types from "./actionTypes";

const initialState = {
  loginUsername: "",
  loginPassword: "",
  registerUsername: "",
  registerPassword: "",
  registerResetPassword: "",
  tokenLog: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // case types.GET_USERS:
    //   return { ...state, users: payload, loading: false };

    default:
      return state;
  }
};

export default userReducer;
