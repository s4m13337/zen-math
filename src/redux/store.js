import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings";

export default configureStore({
    reducer: {
        settings: settingsReducer
    }
});