import type { AxiosError } from "axios";
import type { DeleteManyParams, GetListParams } from "react-admin";
import type {
  UserToken,
  User,
  RequestResult,
  UserCreditionals,
  RecoverPassCreditionals,
  ErrorResponse,
  CreateUserCreditionals,
  StudyAreas,
  UserRoles
} from "@types";
import { instance, listQueryGenerator, objectToFormData } from "@utils";

export function getAccessToken(
  creditionals: UserCreditionals
): RequestResult<UserToken> {
  return instance
    .post("/login/access-token", objectToFormData(creditionals), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getMyInfo(): RequestResult<User> {
  return instance
    .get("/users/me")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function recoverPassword(
  creditionals: RecoverPassCreditionals
): RequestResult<{ msg: string }> {
  return instance
    .post(`/password-recovery/${creditionals.email}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getUsers(
  params: GetListParams
): RequestResult<{ data: User[]; total: number }> {
  return instance
    .get(
      `/users?limit=${params.pagination.perPage}&skip=${
        (params.pagination.page - 1) * params.pagination.perPage
      }`
    )
    .then((response: any) => ({
      data: response.data,
      total: response.headers["x-total-count"]
    }))
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteUser(id: number): RequestResult<User | ErrorResponse> {
  return instance
    .delete(`/users/?id=${id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createUser(
  user: CreateUserCreditionals
): RequestResult<User | ErrorResponse> {
  return instance
    .post(`/users`, user)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getSingleUser(
  user_id: number
): RequestResult<User | ErrorResponse> {
  return instance
    .get(`/users/${user_id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function updateUser(
  user_id: number,
  user: User
): RequestResult<User | ErrorResponse> {
  return instance
    .put(`/users/${user_id}`, user)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getUserStudyAreas(): RequestResult<StudyAreas[]> {
  return instance
    .get("/users/me/study-areas-list")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteUsers(
  params: DeleteManyParams
): RequestResult<string | ErrorResponse> {
  return instance
    .delete(`/users/${listQueryGenerator(params.ids)}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function getUserRules(): RequestResult<UserRoles[]> {
  return instance
    .get("/roles")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
