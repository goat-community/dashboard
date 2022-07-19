import UsersCreate from "./UsersCreate";
import UsersEdit from "./UsersEdit";
import { UsersList } from "./UsersList";

export const UsersResource = {
  list: UsersList,
  create: UsersCreate,
  edit: UsersEdit
};
