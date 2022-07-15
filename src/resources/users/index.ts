import VisitorCreate from "./UsersCreate";
import { UsersList } from "./UsersList";

export const UsersResource = {
  list: UsersList,
  create: VisitorCreate,
  edit: VisitorCreate
};
