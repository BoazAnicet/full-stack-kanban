import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import boardsSlice from "../features/boards/boardsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    boards: boardsSlice,
  },
});
