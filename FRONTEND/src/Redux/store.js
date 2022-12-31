import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./User-store/User-Slice";
import ProductSlice from "./Product-store/Product-Slice";
import profileSlice from "./Profile-Store/Profile-Slice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    product: ProductSlice,
    profile: profileSlice,
  },
});
