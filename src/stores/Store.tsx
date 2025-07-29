
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthService, CommonService } from "../services/service";

export const store = configureStore({
  reducer: {
    [CommonService.reducerPath]: CommonService.reducer,
    [AuthService.reducerPath]:AuthService.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CommonService.middleware)
  .concat(AuthService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
