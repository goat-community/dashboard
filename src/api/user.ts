import { AxiosError } from "axios";
import { instance, objectToFormData } from "@utils";
import type { UserToken, User, RequestResult, UserCreditionals } from "@types";

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
      throw err.message;
    });
}

export function getMyInfo(): RequestResult<User> {
  return instance
    .get("/users/me")
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err.message;
    });
}
