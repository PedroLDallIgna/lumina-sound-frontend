import { createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "../../dtos/user.dto";
import * as reducers from "./reducers"

export interface GeneralInitialState {
    loggedUser?: UserDTO;
};

const initialState: GeneralInitialState = {};

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers
});

export const { setLoggedUser } = generalSlice.actions;
export default generalSlice.reducer;
