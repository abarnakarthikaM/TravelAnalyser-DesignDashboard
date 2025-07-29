
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { CommonService } from "../services/service";
import {headerReducer} from "./Headerslice"

export const store = configureStore({
  reducer: {
    [CommonService.reducerPath]: CommonService.reducer,
    headerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CommonService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
