import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserCreditionals } from "@types";
import { getAccessToken, getMyInfo } from "@api/user";
import { networkStateHandler } from "./network";

/** Reducer */
const initialState = {
  user: {} as User
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: typeof initialState, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  }
});

export const { setUser } = user.actions;
export default user.reducer;

/** Actions  */
export function login(creditionals: UserCreditionals) {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await getAccessToken(creditionals);
        if (response?.access_token) {
          // write token to local storage
          localStorage.setItem("access_token", response.access_token);
          // get user info with the token from local storage
          dispatch(getMyUserInfo());
        }
      })
    );
}

export function getMyUserInfo() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await getMyInfo();
        if (response) {
          // write user information to session storage
          localStorage.setItem("user_info", JSON.stringify(response));
          dispatch(setUser(response));
          // redirect to the dashboard
          window.location.reload();
        }
      })
    );
}
