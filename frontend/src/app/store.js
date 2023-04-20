import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import boardsSlice from "../features/boards/boardsSlice";
import boardTemplatesSlice from "../features/boardTemplates/boardTemplatesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    boards: boardsSlice,
    boardTemplates: boardTemplatesSlice,
  },
});
