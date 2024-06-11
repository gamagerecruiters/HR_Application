import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "../features/Application/applicationSlice.js";

export const store = configureStore({
  reducer: {
    application: applicationReducer,
  },
});
