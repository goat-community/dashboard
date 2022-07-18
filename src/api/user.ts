import type { AxiosError } from "axios";
import type {
  UserToken,
  User,
  RequestResult,
  UserCreditionals,
  RecoverPassCreditionals,
  ErrorResponse,
  CreateUserCreditionals
} from "@types";
import { instance, objectToFormData } from "@utils";

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

export function getUsers(): RequestResult<User[]> {
  return instance
    .get(`/users`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function deleteUser(id: number): RequestResult<User | ErrorResponse> {
  return instance
    .delete(`/users/${id}`)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}

export function createUser(
  user: CreateUserCreditionals
): RequestResult<User | ErrorResponse> {
  return instance
    .post(`/users/`, user)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
