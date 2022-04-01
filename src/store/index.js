import { configureStore } from "@reduxjs/toolkit";
import FormSlice from "./Form-slice";
import UserSlice from "./Users-slice";


const store = configureStore({
    reducer: {
        form: FormSlice.reducer,
        users: UserSlice.reducer,
    }
});

export default store