import { instance } from "@utils";
import type { User, RequestResult, UserCreditionals } from "@types";

export function getAccessToken(
  creditionals: UserCreditionals
): RequestResult<User> {
  return instance
    .post("/login/access-token", {
      username: creditionals.username,
      password: creditionals.password
    })
    .then((response) => response.data)
    .catch((err) => alert(err));
}
