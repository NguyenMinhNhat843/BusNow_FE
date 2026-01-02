import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import authReducer from "./slice/authSlice";
import tripReducer from "./slice/tripSlice";
import bookingReducer from "./slice/bookingSlice";
import filterTripReducer from "./slice/filterTripSlice";
import quanLyXeReducer from "./slice/QuanLyXeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer,
  booking: bookingReducer,
  filterTrip: filterTripReducer,
  quanLyXe: quanLyXeReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  throttle: 1000,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tạo persistor để dùng trong <PersistGate>
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
