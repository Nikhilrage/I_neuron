import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch, TypedUseSelectorHook } from "react-redux";
import { dashboardStateSlice } from "./slices/dashboardStateSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    dashboardState: dashboardStateSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
//console.log(userSlice);
