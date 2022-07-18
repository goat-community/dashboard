import type {
  CreateResult,
  DeleteParams,
  DeleteResult,
  GetListResult
} from "react-admin";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateUserCreditionals,
  RecoverPassCreditionals,
  User,
  UserCreditionals
} from "@types";
import {
  createUser,
  deleteUser,
  getAccessToken,
  getMyInfo,
  getUsers,
  recoverPassword
} from "@api/user";
import { networkStateHandler } from "./network";
import { notify } from "./notifier";

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

export function recoverWithEmail(creditionals: RecoverPassCreditionals) {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await recoverPassword(creditionals);
        if (response) {
          dispatch(notify(response.msg, "success"));
        }
      })
    );
}

export function logout() {
  return (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");

    window.location.href = "/";
  };
}

export const UserProvider = {
  /** Get Users List */
  getUsersList: (): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      getUsers()!
        .then((users) =>
          resolve({
            data: users,
            total: users?.length
          })
        )
        .catch((e) => reject(e));
    }),

  /** Get Users List */
  createUser: (user: CreateUserCreditionals): Promise<CreateResult> =>
    new Promise((resolve, reject) => {
      createUser(user)!
        .then((user) =>
          resolve({
            data: user
          })
        )
        .catch((e) => reject(e));
    }),

  /** Delete a User */
  deleteUser: (params: DeleteParams): Promise<DeleteResult> =>
    new Promise((resolve, reject) => {
      deleteUser(params.id as number)!
        .then((result) => {
          resolve({ data: result });
        })
        .catch((e) => reject(e));
    })
};
