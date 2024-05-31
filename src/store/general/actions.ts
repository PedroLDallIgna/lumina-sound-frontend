import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserId } from "../../utils/token";

export const setUserId = createAsyncThunk("general/setUserId", async (token: string, thunkApi) => {
    const userId = await getUserId(token || "")
    return userId
})
