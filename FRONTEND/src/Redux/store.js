import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

// const middlewares = [reduxThunk];

// const store = createStore(rootReducer, applyMiddleware(...middlewares));

const middlewares = [
  process.env.NODE_ENV !== "production" && reduxThunk,
].filter(Boolean);

const composeEnhancer =
  process.env.NODE_ENV !== "production" &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
// export const store = createStore(rootReducer, undefined, composedEnhancers);

export const store = createStore(rootReducer, undefined, composedEnhancers);
export default store;
