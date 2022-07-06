import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserCreditionals } from "@types";
import { getAccessToken } from "@api";

/** Reducer */
const initialState = {} as User;

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

/** Actions  */
export function getToken(creditionals: UserCreditionals) {
  return async (dispatch: CallableFunction) => {
    const response = await getAccessToken(creditionals);
    if (response) {
      console.log(response);
    }
  };
}
