import { PayloadAction } from "@reduxjs/toolkit"
import { UserDTO } from "../../dtos/user.dto"
import { GeneralInitialState } from "."
import { ArtistAccountDTO } from "../../dtos/artistAccount.dto"
import { TrackResponse } from "../../types/trackResponse.type"

export const setLoggedUser = (state: GeneralInitialState, action: PayloadAction<UserDTO>) => {
    state.loggedUser = action.payload
}

export const setSessionToken = (state: GeneralInitialState, action: PayloadAction<string>) => {
    state.sessionToken = action.payload
}

export const setArtistData = (state: GeneralInitialState, action: PayloadAction<ArtistAccountDTO>) => {
    state.artistData = action.payload
}

export const addTrackToQueue = (state: GeneralInitialState, action: PayloadAction<TrackResponse[]>) => {
    state.queue.push(...action.payload)
}

export const removeTrackFromQueue = (state: GeneralInitialState, action: PayloadAction<number>) => {
    const index = state.queue.findIndex(track => track.id === action.payload)
    state.queue.splice(index, 1)
}
