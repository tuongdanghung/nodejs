import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/usersSlice";
import productSlice from "./reducers/productSlice";
import orderSlice from "./reducers/orderSlice";
import blogSlice from "./reducers/blogSlice";
import addressSlice from "./reducers/addressSlice";
export const store = configureStore({
    reducer: {
        userReducer: usersSlice,
        productReducer: productSlice,
        orderReducer: orderSlice,
        blogReducer: blogSlice,
        addressReducer: addressSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
