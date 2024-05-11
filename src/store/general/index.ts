import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDTO } from "../../dtos/user.dto";

export interface GeneralInitialState {
    loggedUser?: UserDTO;
};

const initialState: GeneralInitialState = {};

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<UserDTO>) => {
            state.loggedUser = action.payload;
        }
    }
});

export const { setLoggedUser } = generalSlice.actions;
export default generalSlice.reducer;
