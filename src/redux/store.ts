// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage

// reducers
import authReducer from "./slice/authSlice";
import tripReducer from "./slice/tripSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["trip"], // ✅ chỉ lưu những slice cần thiết (vd: 'trip')
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // tránh lỗi khi redux-persist dùng non-serializable value
    }),
});

// Tạo persistor để dùng trong <PersistGate>
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
