import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { teamReducer } from "./teamReducer";
export const store = configureStore({
  reducer: {
    userReducer,
    teamReducer,
  },
});
