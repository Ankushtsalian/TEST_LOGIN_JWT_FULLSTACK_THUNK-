import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./User-store/User-Slice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
