import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserId } from "../../utils/token";
import * as userServices from "../../services/users.services";

export const setUserId = createAsyncThunk("general/setUserId", async (token: string, thunkApi) => {
    const userId = await getUserId(token || "")
    return userId
})

export const fetchUser = createAsyncThunk("general/fetchUser", async ({id, token}: {id: string, token: string}, thunkApi) => {
    const {data} = await userServices.getById(Number(id), {headers: {Authorization: `Bearer ${token}`}});
    return data;
})
