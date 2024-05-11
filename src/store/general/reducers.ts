import { PayloadAction } from "@reduxjs/toolkit"
import { UserDTO } from "../../dtos/user.dto"
import { GeneralInitialState } from "."

export const setLoggedUser = (state: GeneralInitialState, action: PayloadAction<UserDTO>) => {
    state.loggedUser = action.payload
}
