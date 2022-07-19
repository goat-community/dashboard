/**
 * React Admin uses a way to fetch data on
 * resources componentes called dataProvider.
 * In this file we will create our custom DP
 * https://marmelab.com/react-admin/Actions.html#getting-the-dataprovider-instance
 */
import type {
  CreateResult,
  DataProvider,
  DeleteResult,
  GetListResult,
  GetOneResult,
  UpdateResult
} from "react-admin";
import { UserProvider } from "@context/user";
import type { User } from "@types";

export const dataProvider: DataProvider = {
  getList: (resource, params): Promise<GetListResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.getUsersList(params);
    }
    return UserProvider.getUsersList(params);
  },
  getOne: (resource, params): Promise<GetOneResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.getUser(params.id);
    }
    return UserProvider.getUser(params.id);
  },
  create: (resource, params): Promise<CreateResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.createUser(params.data);
    }
    return UserProvider.createUser(params.data);
  },
  update: (resource, params): Promise<UpdateResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.updateUser(params.id as number, params.data as User);
    }
    return UserProvider.updateUser(params.id as number, params.data as User);
  },
  delete: (resource, params): Promise<DeleteResult> => {
    // Return promises based on the resource provided
    if (resource === "users") {
      return UserProvider.deleteUser(params);
    }
    return UserProvider.deleteUser(params);
  },

  getMany: (resource): any => new Promise((resolve) => resolve(resource)),
  getManyReference: (resource): any =>
    new Promise((resolve) => resolve(resource)),
  updateMany: (resource): any => new Promise((resolve) => resolve(resource)),
  deleteMany: (resource): any => new Promise((resolve) => resolve(resource))
};
