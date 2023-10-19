import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions";

export const appSlice = createSlice({
    name: "address",
    initialState: {
        address: [],
        // oneUser: null,
        // cart: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.GetAllUsersByAdmin.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(
            actions.GetOneAddress.fulfilled,
            (state: any, action) => {
                state.isLoading = false;
                state.address = action.payload;
            }
        );

        builder.addCase(actions.GetAllUsersByAdmin.rejected, (state: any) => {
            state.isLoading = false;
        });
    },
});

export default appSlice.reducer;
