import type {
  CreateResult,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateUserCreditionals,
  RecoverPassCreditionals,
  StudyAreas,
  User,
  UserCreditionals,
  UserRoles
} from "@types";
import * as Api from "@api/user";
import { networkStateHandler } from "./network";
import { notify } from "./notifier";
import { pagination, search } from "@utils";

/** Reducer */
const initialState = {
  user: {} as User,
  studyAreas: [] as StudyAreas[],
  globalUserRoles: [] as UserRoles[]
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: typeof initialState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setStudyAreas: (
      state: typeof initialState,
      action: PayloadAction<StudyAreas[]>
    ) => {
      state.studyAreas = action.payload;
    },
    setUserRoles: (
      state: typeof initialState,
      action: PayloadAction<UserRoles[]>
    ) => {
      state.globalUserRoles = action.payload;
    }
  }
});

export const { setUser, setStudyAreas, setUserRoles } = user.actions;
export default user.reducer;

/** Actions  */
export function login(creditionals: UserCreditionals) {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getAccessToken(creditionals);
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
        const response = await Api.getMyInfo();
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
        const response = await Api.recoverPassword(creditionals);
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

export function getStudyAreas() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getUserStudyAreas();
        if (response) {
          dispatch(setStudyAreas(response));
        }
      })
    );
}

export function getAllUserRoles() {
  return (dispatch: CallableFunction) =>
    dispatch(
      networkStateHandler(async () => {
        const response = await Api.getUserRules();
        if (response) {
          dispatch(setUserRoles(response));
        }
      })
    );
}

export const UserProvider = {
  /** Get Users List */
  getUsersList: (params: GetListParams): Promise<GetListResult> =>
    new Promise((resolve, reject) => {
      Api.getUsers(params)!
        .then((response) => {
          let filtered_data = response.data;
          // handle search
          if (params.filter.q) {
            filtered_data = search({
              data: response.data,
              q: params.filter.q
            });
          }

          resolve({
            data: filtered_data,
            total: response.total
          });
        })
        .catch((e) => reject(e));
    }),

  /** Get a user */
  getUser: (user_id: number): Promise<GetOneResult> =>
    new Promise((resolve, reject) => {
      Api.getSingleUser(user_id)!
        .then((user) => resolve({ data: user }))
        .catch((e) => reject(e));
    }),

  /** Create User */
  createUser: (user: CreateUserCreditionals): Promise<CreateResult> =>
    new Promise((resolve, reject) => {
      Api.createUser(user)!
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
      Api.deleteUser(params.id as number)!
        .then((result) => {
          resolve({ data: result });
        })
        .catch((e) => reject(e));
    }),

  /** Upate a user */
  updateUser: (user_id: number, user_data: User): Promise<UpdateResult> =>
    new Promise((resolve, reject) => {
      Api.updateUser(user_id, user_data)!
        .then((user) => resolve({ data: user }))
        .catch((e) => reject(e));
    }),

  /** Delete many Users */
  deleteUsers: (params: DeleteManyParams): Promise<DeleteManyResult> =>
    new Promise((resolve, reject) => {
      Api.deleteUsers(params)!
        .then(() => {
          resolve({ data: [] });
        })
        .catch((e) => reject(e));
    })
};
