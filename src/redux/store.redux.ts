import { configureStore } from "@reduxjs/toolkit"
import {
    configReducer,
    authReducer,
    chainReducer,
    tabReducer,
    resultReducer,
    vaaReducer,
    refreshReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        configReducer,
        authReducer,
        chainReducer,
        tabReducer,
        resultReducer,
        vaaReducer,
        refreshReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
