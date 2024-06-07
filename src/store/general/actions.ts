import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserId } from "../../utils/token";
import userServices from "../../services/users.services";

export const setUserId = createAsyncThunk("general/setUserId", async (token: string) => {
    const userId = await getUserId(token || "")
    return userId
})

export const fetchUser = createAsyncThunk("general/fetchUser", async (token: string) => {
    const {data} = await userServices.get({headers: {Authorization: `Bearer ${token}`}});
    return data;
})
