import { createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "../../dtos/user.dto";
import * as reducers from "./reducers"
import * as actions from "./actions"
import { ArtistAccountDTO } from "../../dtos/artistAccount.dto";

export interface GeneralInitialState {
    loggedUser?: UserDTO;
    artistData?: ArtistAccountDTO;
    sessionToken?: string;
    userId?: string;
};

const initialState: GeneralInitialState = {};

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(actions.setUserId.fulfilled, (state: GeneralInitialState, action) => {
            state.userId = action.payload
        }),
        builder.addCase(actions.fetchUser.fulfilled, (state: GeneralInitialState, action) => {
            state.loggedUser = action.payload
        }),
        builder.addCase(actions.fetchArtist.fulfilled, (state: GeneralInitialState, action) => {
            state.artistData = action.payload
        })
    }
});

export const { setLoggedUser, setSessionToken, setArtistData } = generalSlice.actions;
export default generalSlice.reducer;
