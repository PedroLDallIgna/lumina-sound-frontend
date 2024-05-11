import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import GeneralReducer from "./general";

const store = configureStore({
    reducer: {
        general: GeneralReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
