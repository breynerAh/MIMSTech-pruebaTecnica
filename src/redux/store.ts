import { configureStore } from "@reduxjs/toolkit";
import fontSlice from "./fontSlice";

export const store = configureStore({
  reducer: {
    font: fontSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
