import { PayloadAction } from "@reduxjs/toolkit"
import { UserDTO } from "../../dtos/user.dto"
import { GeneralInitialState } from "."
import { ArtistAccountDTO } from "../../dtos/artistAccount.dto"

export const setLoggedUser = (state: GeneralInitialState, action: PayloadAction<UserDTO>) => {
    state.loggedUser = action.payload
}

export const setSessionToken = (state: GeneralInitialState, action: PayloadAction<string>) => {
    state.sessionToken = action.payload
}

export const setArtistData = (state: GeneralInitialState, action: PayloadAction<ArtistAccountDTO>) => {
    state.artistData = action.payload
}
