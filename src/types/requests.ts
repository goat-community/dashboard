import type { User } from "@types";
/** Network call functions arguments type */
export type RequestResult<T> = Promise<T> | null;

export interface UserCreditionals {
  username: string;
  password: string;
}

export interface RecoverPassCreditionals {
  email: string;
}

export interface CreateUserCreditionals extends User {
  password: string;
}
