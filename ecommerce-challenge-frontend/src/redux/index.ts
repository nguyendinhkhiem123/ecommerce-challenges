import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices";
const store = configureStore({
  reducer,
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
export type IStoreDispatch = typeof store.dispatch;
export type AppDispatch = typeof store.dispatch;
