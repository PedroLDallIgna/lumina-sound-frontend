import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import GeneralReducer from "./general";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
}

const persistedGeneralReducer = persistReducer(persistConfig, GeneralReducer);

const store = configureStore({
    reducer: {
        general: persistedGeneralReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);

export default store;
