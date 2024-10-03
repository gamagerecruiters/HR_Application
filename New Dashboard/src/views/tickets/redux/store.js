import { configureStore } from "@reduxjs/toolkit";
import { ticketReducers } from "./ticket/ticketSlice";



export const store = configureStore({
  reducer: {
    tickets: ticketReducers,

  },
});
