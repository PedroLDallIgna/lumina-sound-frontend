import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserId } from "../../utils/token";
import userServices from "../../services/users.services";
import artistAccountServices from "../../services/artistAccount.services";

export const setUserId = createAsyncThunk("general/setUserId", async (token: string) => {
    const userId = await getUserId(token || "")
    return userId
})

export const fetchUser = createAsyncThunk("general/fetchUser", async (token: string) => {
    const {data} = await userServices.get({headers: {Authorization: `Bearer ${token}`}});
    return data;
})

export const fetchArtist = createAsyncThunk("general/fetchArtist", async (token: string) => {
    const {data} = await artistAccountServices.get({headers: {Authorization: `Bearer ${token}`}});
    return data;
})
