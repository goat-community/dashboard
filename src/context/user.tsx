import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@types";

const initialState = {
  username: ""
} as User;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state: User, action: PayloadAction<User>) => {
      state = action.payload;
    }
  }
});

export const { set } = user.actions;
export default user.reducer;
